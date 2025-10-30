import React from 'react';
import { Zap, Search, Heart, MessageSquare, Share2 } from 'lucide-react';

export default function Feed() {
  return (
    <div className="app-screen p-0 pt-2 overflow-y-auto">
      <header className="p-4 flex justify-between items-center sticky top-0 bg-gray-800 z-10 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-red-500 flex items-center"><Zap className="w-6 h-6 mr-2 animate-pulse" /> <span>ဗီဒီယိုဖိဒ်</span></h1>
        <button className="text-gray-300 hover:text-red-400 p-2 rounded-full bg-gray-700 shadow-md"><Search className="w-5 h-5" /></button>
      </header>
      <div className="space-y-4 pb-20">
        <div className="h-[80vh] min-h-[500px] bg-gray-900 flex flex-col justify-end p-4 rounded-lg relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://placehold.co/600x800/222/fff?text=ဗီဒီယို+၁')" }} />
          <div className="relative z-10 flex justify-between items-end">
            <div className="max-w-[70%]">
              <h2 className="text-2xl font-extrabold mb-1 text-white">ခေါင်းစဉ်အမှတ် (၁)</h2>
              <p className="text-sm text-gray-200 mb-4">@user_alpha - သီချင်းကောင်းကောင်းလေးများ...</p>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <button className="p-3 bg-red-600 rounded-full hover:scale-110 transition"><Heart className="w-6 h-6 text-white" /></button>
              <button className="p-3 bg-gray-600 rounded-full hover:scale-110 transition"><MessageSquare className="w-6 h-6" /></button>
              <button className="p-3 bg-gray-600 rounded-full hover:scale-110 transition"><Share2 className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
        <div className="h-[80vh] min-h-[500px] bg-gray-900 flex flex-col justify-end p-4 rounded-lg relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://placehold.co/600x800/222/fff?text=ဗီဒီယို+၂')" }} />
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold mb-1 text-white">ခေါင်းစဉ်အမှတ် (၂)</h2>
            <p className="text-sm text-gray-200 mb-4">@user_beta - ခရီးသွားမှတ်တမ်း...</p>
          </div>
        </div>
      </div>
    </div>
  );
}