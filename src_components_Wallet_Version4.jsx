import React from 'react';
import { Sparkles, DownloadCloud, UploadCloud, Send, TrendingUp, TrendingDown, CheckCircle, RefreshCw } from 'lucide-react';

export default function Wallet({
  cryptoInsight, isInsightLoading, onGenerateInsight,
  transactionMessage, onMockTransaction
}) {
  return (
    <div className="app-screen p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-400">ငွေကြေးပိုက်ဆံအိတ်</h1>

      <div className="bg-gray-700 p-6 rounded-2xl shadow-xl mb-6 border-t-4 border-green-500">
        <p className="text-sm text-gray-400">စုစုပေါင်းလက်ကျန်</p>
        <p className="text-4xl font-extrabold mb-4 text-white">$ 5,420.50 USD</p>
        <p className="text-lg font-medium text-green-300">0.15 BTC | 2.5 ETH</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <button onClick={() => onMockTransaction('deposit')} className="p-4 bg-blue-600 rounded-xl flex flex-col items-center"><DownloadCloud className="w-6 h-6 mb-1" /><span className="text-xs">သွင်းခြင်း</span></button>
        <button onClick={() => onMockTransaction('withdraw')} className="p-4 bg-red-600 rounded-xl flex flex-col items-center"><UploadCloud className="w-6 h-6 mb-1" /><span className="text-xs">ထုတ်ယူခြင်း</span></button>
        <button onClick={() => onMockTransaction('transfer')} className="p-4 bg-yellow-600 rounded-xl flex flex-col items-center"><Send className="w-6 h-6 mb-1" /><span className="text-xs">လွှဲပြောင်း</span></button>
      </div>

      <div className="bg-gray-700 p-4 rounded-xl shadow-lg mb-8 border border-purple-500">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-purple-300 flex items-center"><Sparkles className="w-5 h-5 mr-2" /> Crypto Market Insight</h2>
          <button onClick={onGenerateInsight} disabled={isInsightLoading} className="px-3 py-1 bg-purple-600 text-white rounded-lg">{isInsightLoading ? 'စောင့်နေပါ...' : 'Insight ရယူရန် ✨'}</button>
        </div>
        <div className={`text-gray-300 text-sm italic min-h-12 p-3 rounded-lg border ${isInsightLoading ? 'bg-gray-900/50 text-yellow-400 flex items-center' : 'bg-gray-800/50'}`}>
          {isInsightLoading ? <div className="flex items-center"><RefreshCw className="animate-spin mr-2" /> နောက်ဆုံးရ Bitcoin အခြေအနေကို ရှာဖွေနေသည်...</div> : cryptoInsight}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">ငွေပေးငွေယူမှတ်တမ်း</h2>
      {transactionMessage && (
        <div className={`p-3 text-sm rounded-lg mb-4 font-medium ${transactionMessage.type === 'success' ? 'bg-green-900/70 text-green-200' : transactionMessage.type === 'pending' ? 'bg-yellow-900/70 text-yellow-200' : 'bg-red-900/70 text-red-200'} flex items-center`}>
          {transactionMessage.type === 'pending' && <span className="animate-spin mr-2">🌀</span>}
          {transactionMessage.type === 'success' && <CheckCircle className="w-4 h-4 mr-2" />}
          {transactionMessage.text}
        </div>
      )}

      <div className="space-y-3 pb-20">
        <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center"><TrendingUp className="w-5 h-5 text-green-400 mr-3" /><div><p className="font-medium">BTC ဝယ်ယူမှု</p><p className="text-xs text-gray-400">2025-10-25</p></div></div>
          <p className="text-green-400 font-bold">+ 0.01 BTC</p>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center"><TrendingDown className="w-5 h-5 text-red-400 mr-3" /><div><p className="font-medium">လူမှုမီဒီယာ ဆုကြေး</p><p className="text-xs text-gray-400">2025-10-24</p></div></div>
          <p className="text-red-400 font-bold">- $50.00</p>
        </div>
      </div>
    </div>
  );
}