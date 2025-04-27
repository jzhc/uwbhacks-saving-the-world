import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Initiative } from "../../models/initiativesModel";         
import { getUser , getUserWithEmail} from "../../apis/user";                          
import { getComment, postComment } from "../../apis/comment";   
import { getSignatures, postSignature, getSignatureByUserUIDandInitiativeUID } from "../../apis/signature";     
import useFireAuth from "../hooks/useFireAuth";                  
// If you’d rather auto‑redirect, swap to useFireAuthWithKick
import { useNavigate } from "react-router-dom";
import { Comment } from "../../models/commentModel";
import { Signature } from "../../models/signatureModel"
import { useFireAuthWithKick } from "../../src/hooks/useFireAuth"
import NavBar from "../components/navbar";                           // navigation bar
import { getInitiative, updateInitiative } from "../../apis/initiative";


import { Link } from "react-router-dom";

export default function InitiativeDetail() {  
  /* ───── params & auth ───── */
  const { uid } = useParams();                 // route: /initiative/:uid
  const [currentUser, authInit] = useFireAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState(null);


  const [signature, setSignature] = useState("");
  const [signatures, setSignatures] = useState([]);
  const [sigCount, setSigCount] = useState(0);
  /* ───── initiative & creator ───── */
  const [initiative, setInitiative] = useState(null);
  const [creator, setCreator] = useState(null);
  const [signed, setSigned] = useState(false);
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [user, initializing] = useFireAuthWithKick();
  useEffect(() => {
      if (authInit) return;
      if (!currentUser) {
        navigate("/dashboard", { replace: true });
        return;
      }
  
      // setLoadingProfile(true);
      getUserWithEmail(currentUser.email)
        .then((userData) => {
          if (userData) {
            setProfile(userData);
          } else {
            setError("Profile not found.");
          }
        })
        .catch((err) => {
          console.error("Failed to load profile:", err);
          setError("Could not load profile. Please try again.");
        })
        .finally(() => {
          setLoadingProfile(false);
        });
  }, [authInit, currentUser, navigate]);
  
  useEffect(() => {
    async function s() {
      try {

        const sigs = await getSignatures(uid);
        setSignatures(sigs);
        const u = await getUserWithEmail(currentUser.email);
        const s = await getSignatureByUserUIDandInitiativeUID(u.UID, uid);
        if (s != null)
          setSigned(true);
      }
      catch(e) {

      }
    }
    s();
  }, [uid, sigCount, user])

  /* ------------------ load initiative (stub) ------------------ */
  useEffect(() => {
    async function fetchIvt() { 
      try {
        // TODO: replace stub with real fetch by uid

        const data = await getInitiative(uid)
        setInitiative(data[0]);

      } catch (e) {
        console.error("initiative load failed", e);
      }
    }
    fetchIvt();
  }, [uid, sigCount]);

  /* ------------------ load creator ------------------ */
  useEffect(() => {
    if (!initiative) return;
    (async () => {
      try {
        const [user] = await getUser(initiative.ScrumMasterId);
        setCreator(user);
      } catch (e) {
        console.error("creator load failed", e);
      }
    })();
  }, [initiative]);

  /* ───── comments ───── */
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingC, setLoadingC] = useState(true);

  const refreshComments = useCallback(async () => {
    if (!uid) return;
    setLoadingC(true);

    try {
      // ❶ use the correct id
      const raw = await getComment(uid);

      // ❷ normalise createdAt so Date() never breaks
      const sorted = raw
        .map(c => ({
          ...c,
          createdAt: (() => {
            const t = c.createdAt;
            if (!t) return 0;                         // missing
            if (typeof t === "object") {
              if (typeof t.toMillis === "function") return t.toMillis(); // Firestore v9
              if ("seconds" in t) return t.seconds * 1000;               // v8
            }
            return Number(t) || Date.parse(t) || 0;   // ms, ISO, etc.
          })()
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      setComments(sorted);
    } catch (err) {
      console.error("comment load failed", err);
    } finally {
      setLoadingC(false);
    }
  }, [uid]);   // keep the id in the closure fresh

  useEffect(() => {
    refreshComments();
  }, [refreshComments]);

  /* ------------------ submit comment ------------------ */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    // Build object exactly as your converter expects (omit undefined!)
    // const newUser = getUserWithEmail(currentUser.email);
    const comment = new Comment(
      null,
      currentUser.uid,
      uid,
      newComment.trim()
  )



    try {
      await postComment(comment);
      setNewComment("");
      refreshComments();
    } catch (err) {
      console.error("post failed", err);
    }
  }
  // console.log(uid);

  /*---------------sig------------------------*/
  async function handleSubmitSig(e) {
    e.preventDefault();
    const u = await getUserWithEmail(currentUser.email);
    console.log(u.UID);
    const sig = new Signature(null, u.UID, uid, signature);
    await postSignature(sig);
    setSignature("");
    //updateInitiative(null, null, null, null, null, null, sigCount + 1, null, null, null);
    setSigCount(sigCount + 1);
  }


  /*---------------sig------------------------*/
  async function handleSubmitSig(e) {
    e.preventDefault();
    const u = await getUserWithEmail(currentUser.email);
    console.log(u.UID);
    const sig = new Signature(null, u.UID, uid, signature);
    await postSignature(sig);
    setSignature("");
    //updateInitiative(null, null, null, null, null, null, sigCount + 1, null, null, null);
    setSigCount(sigCount + 1);
  }


  /* ------------------ UI ------------------ */
  if (!initiative) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-blue-800 animate-pulse">Loading initiative…</span>
      </div>
    );
  }
  // console.log(initiative);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* header */}
      <header className="bg-blue-900 py-6 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-white text-4xl font-bold">{initiative.title}</h1>
        </div>
      </header>

      {/* main */}
      <main className="container mx-auto px-6 py-10 space-y-8">
        {/* initiative card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 mb-4">
            Published on {" "}
            <time dateTime={`${initiative.publishYear}-${initiative.publishMonth}-${initiative.publishDay}`}>
              {`${initiative.publishMonth}/${initiative.publishDay}/${initiative.publishYear}`}
            </time>
          </p>
          <p className="text-blue-800 text-lg leading-relaxed">{initiative.description}</p>
        </div>

        {/* creator */}
        {creator ? (
          <Link to={`/u/${creator.UID}`} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-900">Created by</h2>
              <p className="mt-1 text-blue-800">{creator.firstName} {creator.lastName}</p>
              <p className="mt-1 italic text-gray-500">{creator.profession}</p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">👤</div>
          </Link>
        ) : (
          <div className="text-center text-blue-800 animate-pulse">Loading creator…</div>
        )}

        {/* Signature */} 
        <div className="bg-white rounded-2xl shadow-lg p-6 flex space-x-4">
          <div className="flex w-full">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-semibold text-blue-900 flex flex-col">Signatures</h2>
              {signed == false ? (
              <form onSubmit={handleSubmitSig} className="space-y-4">
                <input
                  className="w-80 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sign Here"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
                <button className="w-20 px-3 py-3 bg-blue-300 rounded-lg ml-2 hover:bg-blue-400">
                  sign
                </button>
              </form>
              ) : (
                <div className="bg-gray-300 p-4 rounded-lg">
                  You have already signed this initiative
                </div>
              )}
            </div>
            <div
              className="ml-auto h-30 overflow-y-auto p-4 rounded bg-gray-100"
            >
              <div className="grid grid-cols-3 gap-x-15 gap-y-2">
                {signatures.map((sig, index) => (
                  <div className="min-w-[100px] w- truncate" key={index}>
                    {sig.signature}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        
      

        {/* comments */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-blue-900">Comments</h2>

          {/* new comment */}
          {!authInit && currentUser ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
                placeholder="Write your comment…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </form>
          ) : authInit ? (
            <p className="text-blue-800 animate-pulse">Checking sign‑in…</p>
          ) : (
            <p className="text-gray-500 italic">Sign in to leave a comment.</p>
          )}

            {/* list */}
            {loadingC ? (
              <p className="text-blue-800 animate-pulse">Loading comments…</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-400">No comments yet. Be the first to respond!</p>
            ) : (
              <ul className="space-y-4">
                {comments.map(c => (
                  <li key={c.UID} className="border border-gray-200 rounded-lg p-4">
                    {/* simple header — you can improve this later */}
                    <p className="mb-2 font-semibold text-blue-900">
                      {c.userUID === currentUser?.uid ? "You" : "User"}
                    </p>
                    {/* the actual comment text */}
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {c.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}

        </div>
      </main>
    </div>
  );
}
