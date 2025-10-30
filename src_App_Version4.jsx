import React, { useState, useMemo, useRef } from 'react';
import Feed from './components/Feed';
import Chat from './components/Chat';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Login from './components/Login';
import Modal from './components/Modal';
import { fetchGemini } from './utils/fetchGemini';

// Top-level icons used in nav
import { Video, MessageSquare, Wallet as WalletIcon, User } from 'lucide-react';

const MOCK_CODE = '12345';
const screens = ['feed', 'chat', 'wallet', 'profile'];
const primaryColorMap = {
  'feed': 'text-red-500',
  'chat': 'text-blue-400',
  'wallet': 'text-green-400',
  'profile': 'text-purple-400'
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPhase, setLoginPhase] = useState('phone');
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [phoneInput, setPhoneInput] = useState('9770123456');
  const [codeInput, setCodeInput] = useState('');
  const [currentScreen, setCurrentScreen] = useState('feed');
  const [modal, setModal] = useState(null);
  const [showLoginError, setShowLoginError] = useState(false);

  // Wallet / LLM states
  const [cryptoInsight, setCryptoInsight] = useState('နောက်ဆုံးရ Crypto စျေးကွက် သတင်းများကို ရယူရန် "Insight ရယူရန်" ခလုတ်ကို နှိပ်ပါ။');
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState(null);

  // Chat
  const [chatSummary, setChatSummary] = useState({});
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const runtimeApiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
  const isMounted = useRef(true);

  const showModal = (title, content, colorClass = 'text-yellow-400', showConfirm = false, confirmAction = null) => {
    setModal({ title, content, colorClass, showConfirm, confirmAction });
  };
  const closeModal = () => setModal(null);

  // Auth handlers
  const submitPhoneNumber = () => {
    const phoneNumber = phoneInput.trim();
    if (phoneNumber.length < 9 || isNaN(phoneNumber)) {
      setShowLoginError(true);
      showModal("အမှား", "ဖုန်းနံပါတ် မမှန်ကန်ပါ။", 'text-red-500');
      return;
    }
    setShowLoginError(false);
    setCurrentPhoneNumber('+95 ' + phoneNumber);
    setLoginPhase('code');
  };

  const submitVerificationCode = () => {
    if (codeInput.trim() !== MOCK_CODE) {
      setShowLoginError(true);
      showModal("အတည်ပြုချက် မအောင်မြင်ပါ", "ကုဒ် မမှန်ကန်ပါ။", 'text-red-500');
      return;
    }
    setShowLoginError(false);
    setIsAuthenticated(true);
    showModal("အကောင့်ဝင်ခြင်း အောင်မြင်ပါသည်", `${currentPhoneNumber} မှ အောင်မြင်စွာ အကောင့်ဝင်လိုက်ပါသည်။`, 'text-green-500');
  };

  const resetLogin = () => {
    setLoginPhase('phone');
    setPhoneInput('');
    setCodeInput('');
    setShowLoginError(false);
  };

  const performLogout = () => {
    setIsAuthenticated(false);
    setLoginPhase('phone');
    showModal("အကောင့်ထွက်ခြင်း", "သင်၏ အကောင့်မှ အောင်မြင်စွာ ထွက်ခွာခဲ့ပါသည်။", 'text-yellow-400');
  };

  // Wallet handlers
  const mockTransaction = (action) => {
    setTransactionMessage({ type: 'pending', text: "ကျေးဇူးပြု၍ ခဏစောင့်ပါ..." });
    setTimeout(() => {
      if (action === 'transfer') setTransactionMessage({ type: 'success', text: "✅ ငွေလွှဲပြောင်းမှု အောင်မြင်ပါသည်။" });
      else if (action === 'withdraw') setTransactionMessage({ type: 'success', text: "✅ ငွေထုတ်ယူမှု စတင်ပါသည်။" });
      else setTransactionMessage({ type: 'success', text: "✅ ငွေသွင်းမှု အတည်ပြုပြီးပါသည်။" });
    }, 1600);
  };

  const generateCryptoInsight = async () => {
    if (!runtimeApiKey) {
      showModal("API Key မရှိပါ", "REACT_APP_GEMINI_API_KEY ကို သတ်မှတ်ပေးပါ။", 'text-red-500');
      return;
    }
    setIsInsightLoading(true);
    setCryptoInsight('');
    const userQuery = "Provide a very brief, concise summary of the current Bitcoin market trend and a one-sentence sentiment analysis. Respond only in Burmese. Single paragraph < 50 words.";
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "google_search": {} }],
      systemInstruction: { parts: [{ text: "You are a financial analyst. Output Burmese, <50 words." }] }
    };
    try {
      const text = await fetchGemini(runtimeApiKey, 'gemini-2.5-flash-preview-09-2025', payload);
      if (!isMounted.current) return;
      setIsInsightLoading(false);
      setCryptoInsight(text || 'စျေးကွက် အချက်အလက် မရရှိပါ။');
    } catch (e) {
      setIsInsightLoading(false);
      setCryptoInsight('Insight ရယူရာတွင် အမှား ဖြစ်ခဲ့သည်။');
    }
  };

  const summarizeChatMessage = async (chatId, originalText) => {
    if (!runtimeApiKey) {
      showModal("API Key မရှိပါ", "REACT_APP_GEMINI_API_KEY ကို သတ်မှတ်ပေးပါ။", 'text-red-500');
      return;
    }
    setIsSummaryLoading(true);
    const payload = {
      contents: [{ parts: [{ text: `Summarize into one concise Burmese sentence: "${originalText}"` }] }],
      systemInstruction: { parts: [{ text: "You are helpful. Output Burmese." }] }
    };
    try {
      const text = await fetchGemini(runtimeApiKey, 'gemini-2.5-flash-preview-09-2025', payload);
      if (!isMounted.current) return;
      setIsSummaryLoading(false);
      setChatSummary(prev => ({ ...prev, [chatId]: text || 'စာတိုချုပ်ခြင်း မအောင်မြင်ပါ။' }));
    } catch (e) {
      setIsSummaryLoading(false);
      setChatSummary(prev => ({ ...prev, [chatId]: 'စာတိုချုပ်ခြင်း မအောင်မြင်ပါ။' }));
    }
  };

  const renderScreen = useMemo(() => {
    switch (currentScreen) {
      case 'feed': return <Feed />;
      case 'chat': return <Chat chatSummary={chatSummary} isSummaryLoading={isSummaryLoading} onSummarize={summarizeChatMessage} />;
      case 'wallet': return <Wallet cryptoInsight={cryptoInsight} isInsightLoading={isInsightLoading} onGenerateInsight={generateCryptoInsight} transactionMessage={transactionMessage} onMockTransaction={mockTransaction} />;
      case 'profile': return <Profile onRequestDevice={() => showModal('လုံခြုံရေး','စက်အသစ် အတည်ပြုချက် ပေးသည်။')} onLogout={() => showModal('အကောင့်ထွက်ရန်','ထွက်မလား?', 'text-red-500', true, performLogout)} />;
      default: return <Feed />;
    }
  }, [currentScreen, cryptoInsight, isInsightLoading, transactionMessage, chatSummary, isSummaryLoading]);

  return (
    <div className="w-full h-screen bg-gray-900">
      <style>{`
        html, body, #root { height:100%; margin:0; padding:0; overflow:hidden; font-family:Inter, sans-serif; }
        .app-screen { min-height: calc(100vh - 64px); padding-bottom:64px; }
      `}</style>
      <div className="w-full h-full max-w-md mx-auto">
        {!isAuthenticated ? (
          <Login
            phase={loginPhase}
            phoneInput={phoneInput}
            setPhoneInput={setPhoneInput}
            codeInput={codeInput}
            setCodeInput={setCodeInput}
            showLoginError={showLoginError}
            onSubmitPhone={() => { submitPhoneNumber(); }}
            onSubmitCode={() => submitVerificationCode()}
            onReset={resetLogin}
            currentPhoneNumber={currentPhoneNumber}
          />
        ) : (
          <div className="max-w-md mx-auto shadow-2xl bg-gray-800 w-full h-full flex flex-col overflow-hidden">
            <div className="flex-grow overflow-hidden relative">
              <div className="absolute inset-0 overflow-y-auto">{renderScreen}</div>
            </div>

            <nav className="flex-shrink-0 bg-gray-900 border-t-2 border-gray-700 flex justify-around p-2">
              {screens.map(screen => (
                <button key={screen} onClick={() => setCurrentScreen(screen)} className={`flex flex-col items-center p-1 rounded-lg w-1/4 ${currentScreen === screen ? primaryColorMap[screen] : 'text-gray-400'}`}>
                  {screen === 'feed' && <Video className="w-6 h-6" />}
                  {screen === 'chat' && <MessageSquare className="w-6 h-6" />}
                  {screen === 'wallet' && <WalletIcon className="w-6 h-6" />}
                  {screen === 'profile' && <User className="w-6 h-6" />}
                  <span className="text-xs mt-1 font-semibold">{screen === 'feed' ? 'ဖိဒ်' : screen === 'chat' ? 'စကားပြော' : screen === 'wallet' ? 'ပိုက်ဆံအိတ်' : 'ပရိုဖိုိုင်'}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
      <Modal modal={modal} closeModal={closeModal} />
    </div>
  );
}