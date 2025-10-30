```markdown
# Myanmar Short-Form App (React)

This repository contains a small React app (tailwind UI style) with:
- Login flow (mocked verification code)
- Feed, Chat, Wallet, Profile screens
- Gemini API helper utils (fetchGemini) with retries and backoff
- Modularized components under `src/components`

Setup
1. Copy `.env.example` to `.env` and set `REACT_APP_GEMINI_API_KEY`.
2. Install dependencies:
   - react, react-dom, lucide-react
   - tailwindcss (if you want same styling)
3. Start dev server (Create React App / Vite):
   npm install
   npm start

Notes
- Gemini model name used: `gemini-2.5-flash-preview-09-2025` — change as per your access.
- Google search grounding (tools) requires model/tool access; if not available, the call may return null.
- This project keeps Burmese UI strings intact.

What I improved
- Breaks App into focused components for better maintainability.
- fetchGemini utility with abort + backoff.
- Controlled inputs for login and safe state updates.

Next recommended steps
- Add TypeScript conversion and PropTypes.
- Add unit tests for fetchGemini (mock fetch) and auth flows.
- Integrate Tailwind properly (if not already).
- Add CI secret handling for GEMINI API key.
```