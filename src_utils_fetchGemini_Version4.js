// Utility to call Gemini-like generateContent endpoint with retries, backoff, and abort support.
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

export async function fetchGemini(apiKeyParam, modelName, payload, { signal } = {}) {
  if (!apiKeyParam) {
    throw new Error('Missing API key for Gemini.');
  }

  const url = `${API_BASE_URL}${modelName}:generateContent?key=${apiKeyParam}`;
  let retries = 0;
  const maxRetries = 5;

  while (retries < maxRetries) {
    try {
      const controller = new AbortController();
      if (signal) {
        if (signal.aborted) controller.abort();
        else signal.addEventListener('abort', () => controller.abort(), { once: true });
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (res.status === 429) {
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        await new Promise(r => setTimeout(r, delay));
        retries++;
        continue;
      }

      if (!res.ok) {
        let body = null;
        try { body = await res.json(); } catch (e) { body = await res.text(); }
        throw new Error(`API error ${res.status}: ${JSON.stringify(body)}`);
      }

      const json = await res.json();
      const candidate = json.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) {
        return candidate.content.parts[0].text;
      }
      if (json.output?.[0]?.content?.text) {
        return json.output[0].content.text;
      }
      throw new Error('Unexpected Gemini response shape.');
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      retries++;
      const delay = Math.min(1000 * Math.pow(2, retries), 8000);
      await new Promise(r => setTimeout(r, delay));
      if (retries >= maxRetries) {
        console.error('fetchGemini final error:', err);
        return null;
      }
    }
  }
  return null;
}