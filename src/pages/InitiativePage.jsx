import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFireAuth from "../hooks/useFireAuth";
import { getUser, getUserWithEmail } from "../../apis/user";
import { getInitiative } from "../../apis/initiative";
import { getSignatures, postSignature, getSignatureByUserUIDandInitiativeUID } from "../../apis/signature";
import { getComment, postComment } from "../../apis/comment";
import { Comment } from "../../models/commentModel";
import { Signature } from "../../models/signatureModel";
import NavBar from "../components/navbar";
import { Info, Heart, MessageCircle } from 'lucide-react';

export default function InitiativeDetail() {
  const { uid } = useParams();
  const [currentUser, authInit] = useFireAuth();
  const navigate = useNavigate();

  // Initiative and user state
  const [initiative, setInitiative] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [hasSigned, setHasSigned] = useState(false);
  const [signatureText, setSignatureText] = useState("");
  const [sigCount, setSigCount] = useState(0);

  // Creator
  const [creator, setCreator] = useState(null);

  // Comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // Load Creator
  useEffect(() => {
    if (!initiative) return;
    (async () => {
      try {
        const [user] = await getUser(initiative.ScrumMasterId);
        setCreator(user);        setCreator(user);
      } catch (e) {
        console.error("creator load failed", e);        console.error("creator load failed", e);
      }
    })();
  }, [initiative]);

  // Redirect unauthenticated user
  useEffect(() => {
    if (authInit) return;
    if (!currentUser) navigate("/dashboard", { replace: true });
  }, [authInit, currentUser, navigate]);

  // Load initiative
  useEffect(() => {
    async function load() {
      const [data] = await getInitiative(uid);
      setInitiative(data);
    }
    if (uid) load();
  }, [uid, sigCount]);

  // Load signatures
  useEffect(() => {
    async function loadSigs() {
      if (!currentUser) return;
      const all = await getSignatures(uid);
      setSignatures(all);
      const user = await getUserWithEmail(currentUser.email);
      const existing = await getSignatureByUserUIDandInitiativeUID(user.UID, uid);
      setHasSigned(Boolean(existing));
    }
    loadSigs();
  }, [uid, currentUser, sigCount]);

  // Load comments
  const refreshComments = useCallback(async () => {
    setLoadingComments(true);
    const raw = await getComment(uid);
    const sorted = raw
      .map(c => ({
        ...c,
        createdAt: typeof c.createdAt === 'object'
          ? (c.createdAt.seconds || c.createdAt.toMillis()) * 1000
          : Date.parse(c.createdAt)
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
    setComments(sorted);
    setLoadingComments(false);
  }, [uid]);

  useEffect(() => { if (uid) refreshComments(); }, [refreshComments, uid]);

  // Handlers
  const handleSignature = async (e) => {
    e.preventDefault();
    const user = await getUserWithEmail(currentUser.email);
    await postSignature(new Signature(null, user.UID, uid, signatureText.trim()));
    setSignatureText("");
    setSigCount(c => c + 1);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await postComment(new Comment(null, currentUser.uid, uid, newComment.trim()));
    setNewComment("");
    refreshComments();
  };

  // Loading state
  if (!initiative) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-blue-700 font-medium animate-pulse">Loading initiative...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* Hero */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{initiative.title}</h1>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Section Wrapper */}
        {/** Each section has label, content, clear contrast **/}

        {creator ? (
           <Link to={`/u/${creator.UID}`} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">          
             <div className="flex-1">
               <h2 className="text-xl font-semibold text-blue-900">Created by</h2>
               <p className="mt-1 text-blue-800">{creator.firstName} {creator.lastName}</p>             
               <p className="mt-1 italic text-gray-500">{creator.profession}</p>     
               <p className="text-gray-600 mb-4">
                 Published on {" "}
                 <time dateTime={`${initiative.publishYear}-${initiative.publishMonth}-${initiative.publishDay}`}>
                   {`${initiative.publishMonth}/${initiative.publishDay}/${initiative.publishYear}`}
                 </time>
               </p>
             </div>
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">👤</div>
           </Link>
         ) : (
           <div className="text-center text-blue-800 animate-pulse">Loading creator…</div>   
      )}

        <Section title="Overview" Icon={Info}>
          <p className="text-gray-800 leading-relaxed">{initiative.description}</p>
        </Section>

        <Section title="Details" Icon={Info}>
          <p className="text-gray-800 leading-relaxed">{initiative.details}</p>
        </Section>

        <Section title="Rationale" Icon={Info}>
          <p className="text-gray-800 leading-relaxed">{initiative.rationale}</p>
        </Section>

        <Section title={`Signatures (${signatures.length})`} Icon={Heart}>
          {!hasSigned ? (
            <form onSubmit={handleSignature} className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                className="w-full sm:flex-1 border border-gray-300 bg-white rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Type your signature"
                value={signatureText}
                onChange={e => setSignatureText(e.target.value)}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-700 text-white font-medium rounded px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
                disabled={!signatureText.trim()}
              >Sign</button>
            </form>
          ) : (
            <p className="text-gray-600 italic">You've already signed.</p>
          )}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
            {signatures.map((sig, i) => (
              <div key={i} className="bg-gray-100 rounded px-2 py-1 text-gray-700 truncate">
                {sig.signature}
              </div>
            ))}
          </div>
        </Section>

        <Section title={`Comments (${comments.length})`} Icon={MessageCircle}>
          {currentUser && !authInit ? (
            <form onSubmit={handleComment} className="space-y-4">
              <textarea
                className="w-full border border-gray-300 bg-white rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                rows={4}
                placeholder="Write a comment"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-700 text-white font-medium rounded px-6 py-2 hover:bg-green-600 disabled:opacity-50"
                disabled={!newComment.trim()}
              >Post Comment</button>
            </form>
          ) : authInit ? (
            <p className="text-gray-500">Verifying...</p>
          ) : (
            <p className="text-gray-500 italic">Sign in to comment</p>
          )}

          {loadingComments ? (
            <p className="text-gray-500 mt-4">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 italic mt-4">No comments yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {comments.map(c => (
                <li key={c.UID} className="border border-green-300 bg-white rounded px-4 py-3">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {c.userUID === currentUser.uid ? "You" : "User"}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>
    </div>
  );
}

function Section({ title, Icon, children }) {
  return (
    <section className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
