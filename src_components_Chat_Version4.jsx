import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Chat({ chatSummary, isSummaryLoading, onSummarize }) {
  const mockChat1Text = "မေမေ ဒီနေ့ ညနေ ၅ နာရီမှာ အန်တီမေနဲ့ ကန်စွန်းရွက်၊ ခရမ်းချဉ်သီး၊ ကြက်သား တို့ကို ဈေးဝယ်ဖို့ ချိန်းထားတယ်။ ပြီးရင် အိမ်မှာ စောင့်နေမယ်။";
  const chatId1 = 'chat-1';

  return (
    <div className="app-screen p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">စကားပြောခန်းများ</h1>
      <div id="chat-list" className="space-y-3 pb-20">
        <div className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition shadow-lg">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg mr-4">A</div>
            <div className="flex-grow">
              <div className="font-semibold flex justify-between items-center">
                <span>မေမေ</span>
                <span className="text-xs text-gray-500">10:45 AM</span>
              </div>
              <div className="text-sm text-gray-300 mt-1">{mockChat1Text}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600">
            <button
              onClick={() => onSummarize(chatId1, mockChat1Text)}
              disabled={isSummaryLoading}
              className={`px-4 py-2 bg-yellow-500 ${isSummaryLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'} rounded-lg flex items-center`}
            >
              {isSummaryLoading ? 'စောင့်နေပါ...' : <><Sparkles className="w-4 h-4 mr-2" /> စာတိုချုပ်ရန် ✨</>}
            </button>

            {chatSummary[chatId1] && (
              <div className={`text-sm mt-3 p-3 rounded-lg border-2 ${chatSummary[chatId1] === 'စာတိုချုပ်ခြင်း မအောင်မြင်ပါ။' ? 'bg-red-900/50 text-red-300 border-red-500' : 'bg-gray-900/50 text-yellow-300 border-yellow-500'}`}>
                <p className="font-medium mb-1">အတိုချုပ်စာတမ်း:</p>
                <p>{chatSummary[chatId1]}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition shadow-lg">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-lg mr-4">B</div>
          <div className="flex-grow">
            <div className="font-semibold">လုပ်ငန်းအဖွဲ့</div>
            <div className="text-sm text-gray-400 truncate text-red-400 font-medium">ငွေလွှဲမှု အတည်ပြုပြီးပါပြီ။</div>
          </div>
          <div className="text-xs text-gray-500">Yesterday</div>
        </div>
      </div>
    </div>
  );
}