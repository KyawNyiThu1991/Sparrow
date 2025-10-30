import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Modal({ modal, closeModal }) {
  if (!modal) return null;
  const { title, content, colorClass = 'text-yellow-400', showConfirm = false, confirmAction = null } = modal;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xs text-center border-t-4 border-blue-500">
        <h3 className={`text-2xl font-bold mb-3 ${colorClass}`}>{title}</h3>
        <p className="text-gray-300 mb-6">{content}</p>
        <div className="flex flex-col space-y-3">
          {showConfirm && (
            <button
              onClick={() => { closeModal(); confirmAction && confirmAction(); }}
              className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold transition flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" /> အတည်ပြုသည်
            </button>
          )}
          <button onClick={closeModal} className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition flex items-center justify-center">
            {showConfirm ? <XCircle className="w-5 h-5 mr-2" /> : null} {showConfirm ? 'ပယ်ဖျက်သည်' : 'ပိတ်မည်'}
          </button>
        </div>
      </div>
    </div>
  );
}