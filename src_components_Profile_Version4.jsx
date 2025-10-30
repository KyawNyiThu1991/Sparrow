import React from 'react';
import { LogOut } from 'lucide-react';

export default function Profile({ onRequestDevice, onLogout }) {
  return (
    <div className="app-screen p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">ကိုယ်ရေးအချက်အလစ် & ဆက်တင်များ</h1>

      <div className="bg-gray-700 p-6 rounded-2xl shadow-xl mb-6 flex items-center border-l-4 border-purple-500">
        <img src="https://placehold.co/80x80/4b5563/fff?text=User" alt="User Profile" className="w-20 h-20 rounded-full mr-4 border-4 border-purple-500" />
        <div>
          <p className="text-xl font-bold">Aung Aung</p>
          <p className="text-sm text-gray-400">@user_alpha</p>
          <p className="text-xs text-purple-300 mt-2 p-1 bg-gray-800 rounded inline-block">ဗီဒီယို ၅၀ / နောက်လိုက် ၁.၂K</p>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-3">ဘာသာစကား</h2>
        <select onChange={() => alert('ဘာသာစကား ပြောင်းရန် UI ကို အလုပ်လုပ်ရန်လိုသည်။')} className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
          <option value="my">မြန်မာ (Myanmar)</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="bg-gray-700 p-4 rounded-xl pb-20">
        <h2 className="font-semibold mb-3 text-red-400">လုံခြုံရေး & ကိုယ်ရေးအချက်အလက်</h2>
        <div className="flex justify-between items-center py-2 border-b border-gray-600">
          <p>ဖုန်းတစ်လုံးတည်း အသုံးပြုမှု</p>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-600">အဓိက စက်</span>
        </div>
        <div className="py-2">
          <p>အခြားစက်ပစ္စည်း အတည်ပြုချက်</p>
          <button onClick={onRequestDevice} className="mt-2 w-full p-2 bg-purple-600 rounded-lg font-semibold">စက်အသစ်ခွင့်ပြုရန် တောင်းဆိုပါ</button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button onClick={onLogout} className="w-full p-2 bg-red-600 rounded-lg font-semibold"><LogOut className="inline-block w-4 h-4 mr-2" /> အကောင့်ထွက်မည်</button>
        </div>
      </div>
    </div>
  );
}