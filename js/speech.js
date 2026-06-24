/* ============================================================
 *  上級英単語100  —  Speech (Web Speech API 読み上げ)
 *  © 2026 上級英単語100
 *  端末が未対応でも壊れないよう、すべてフォールバック付き。
 * ============================================================ */

const Speech = (() => {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let voices = [];
  let preferred = null;

  function refreshVoices() {
    if (!supported) return;
    voices = window.speechSynthesis.getVoices() || [];
    // できれば米/英の英語ネイティブ音声を選ぶ
    preferred =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name)) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices.find((v) => /en[-_]GB/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      null;
  }

  if (supported) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  /**
   * 単語を読み上げる
   * @param {string} text
   * @param {object} opts { onstart, onend }
   */
  function speak(text, opts = {}) {
    if (!supported || !text) { opts.onend && opts.onend(); return false; }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = (preferred && preferred.lang) || "en-US";
      if (preferred) u.voice = preferred;
      u.rate = 0.92;
      u.pitch = 1.0;
      u.volume = 1.0;
      if (opts.onstart) u.onstart = opts.onstart;
      if (opts.onend) { u.onend = opts.onend; u.onerror = opts.onend; }
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      console.warn("speak failed", e);
      opts.onend && opts.onend();
      return false;
    }
  }

  function cancel() { if (supported) { try { window.speechSynthesis.cancel(); } catch (e) {} } }

  return { supported, speak, cancel };
})();

window.Speech = Speech;
