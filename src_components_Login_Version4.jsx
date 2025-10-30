import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function Login({
  phase, phoneInput, setPhoneInput, codeInput, setCodeInput,
  showLoginError, onSubmitPhone, onSubmitCode, onReset, currentPhoneNumber
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-2xl shadow-2xl border-t-4 border-blue-500">
        {phase === 'phone' ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">အကောင့်ဝင်ရန်</h1>
            <p className="text-center text-gray-400 mb-8">သင့်ဖုန်းနံပါတ်ကို ထည့်သွင်းပါ။</p>
            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">ဖုန်းနံပါတ်</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-600">
                <span className="inline-flex items-center px-3 text-sm bg-gray-600 font-semibold">+95</span>
                <input
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  type="tel"
                  className={`bg-gray-700 text-white block flex-1 p-2.5 ${showLoginError ? 'border-red-500' : ''}`}
                  placeholder="9xxxxxxx"
                />
              </div>
            </div>
            <button onClick={onSubmitPhone} className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">ဆက်လုပ်ရန်</button>
          </>
        ) : (
          <>
            <button onClick={onReset} className="flex items-center text-gray-400 hover:text-blue-400 mb-4">
              <ChevronLeft className="w-5 h-5 mr-1" /> ပြန်သွားရန်
            </button>
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">အတည်ပြုကုဒ်</h1>
            <p className="text-center text-gray-400 mb-8 text-sm">{currentPhoneNumber} သို့ အတည်ပြုကုဒ် ပို့ပြီးပါပြီ (MOCK)</p>
            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">အတည်ပြုကုဒ် (5-ဒစ်ဂ်)</label>
              <input
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                type="text"
                className={`w-full text-center text-2xl p-2.5 rounded-lg bg-gray-700 border ${showLoginError ? 'border-red-500' : 'border-gray-600'} text-white`}
                maxLength={5}
                placeholder="12345"
              />
            </div>
            <button onClick={onSubmitCode} className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">အကောင့်ဝင်ရန်</button>
          </>
        )}
      </div>
    </div>
  );
}