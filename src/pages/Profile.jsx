import React from "react";
import { User2, MapPin, PencilLine, MessageSquare } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#EDEDF9] text-gray-900 font-sans flex flex-col">
      
      {/* Top Navy Strip - absolutely at top */}
      <div className="w-full h-10 bg-[#00004E]" />

      {/* Main Content */}
      <div className="flex-grow flex justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden mt-6">
          
          {/* Profile Banner */}
          <div className="p-8" style={{ backgroundColor: "#1873D3" }}>
            <div className="flex items-center gap-8 text-white">
              
              {/* Profile Picture */}
              <div className="w-28 h-28 bg-[#020082] rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
                <User2 size={40} />
              </div>

              <div>
                <h1 className="text-3xl font-bold leading-tight">User Name</h1>
                <p className="text-white text-sm flex items-center gap-1 mt-1">
                  <MapPin size={16} /> Location
                </p>
              </div>
            </div>
          </div>

          {/* Bio + Stats */}
          <div className="p-6">
            <p className="text-sm text-gray-700 mb-4 italic">
              “Short user bio goes here. You can keep this simple or write something meaningful.”
            </p>

            <div className="flex gap-8 text-gray-700 text-sm">
              <div><span className="font-bold">0</span> Initiatives</div>
              <div><span className="font-bold">0</span> Followers</div>
              <div><span className="font-bold">0</span> Following</div>
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#020082]">
                Recent Posts
              </h2>
              <button className="flex items-center gap-2 text-sm text-[#1873D3] hover:underline">
                <PencilLine size={16} />
                Write Post
              </button>
            </div>

            {/* Placeholder for posts */}
            <div className="space-y-3">
              <div className="bg-[#F5F7FB] border border-gray-200 p-4 rounded-md text-sm text-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">No posts yet</h3>
                  <p className="text-gray-500">Once you write posts, they’ll appear here.</p>
                </div>
                <MessageSquare size={20} className="text-gray-400" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
