/* ============================================================
 *  上級英単語100  —  Store (状態管理 / localStorage)
 *  © 2026 上級英単語100
 *
 *  進捗バーは「不使用」(要件) 。状態は数値・リング・タグで表現。
 *  保存対象:
 *   - learned : Set<no>   覚えた単語
 *   - fav     : Set<no>   お気に入り
 *   - settings: { theme, autoSpeak }
 *   - stats   : { flashRounds, quizRuns, lastSeen }
 * ============================================================ */

const Store = (() => {
  const KEY = "advWords100.v1";

  const def = () => ({
    learned: [],
    fav: [],
    settings: { theme: "light", autoSpeak: false },
    stats: { flashRounds: 0, quizRuns: 0, bestQuiz: 0, lastSeen: 0 },
  });

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return def();
      const parsed = JSON.parse(raw);
      const base = def();
      return {
        learned: Array.isArray(parsed.learned) ? parsed.learned : base.learned,
        fav: Array.isArray(parsed.fav) ? parsed.fav : base.fav,
        settings: { ...base.settings, ...(parsed.settings || {}) },
        stats: { ...base.stats, ...(parsed.stats || {}) },
      };
    } catch (e) {
      console.warn("Store load failed", e);
      return def();
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Store save failed", e);
    }
  }

  /* ---- 購読 (変更通知) ---- */
  const listeners = new Set();
  function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function emit() { listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } }); }

  /* ---- 学習状態 ---- */
  function isLearned(no) { return state.learned.includes(no); }
  function isFav(no) { return state.fav.includes(no); }

  function setLearned(no, on) {
    const has = isLearned(no);
    if (on && !has) state.learned.push(no);
    else if (!on && has) state.learned = state.learned.filter((n) => n !== no);
    else return;
    save(); emit();
  }
  function toggleLearned(no) { setLearned(no, !isLearned(no)); return isLearned(no); }

  function setFav(no, on) {
    const has = isFav(no);
    if (on && !has) state.fav.push(no);
    else if (!on && has) state.fav = state.fav.filter((n) => n !== no);
    else return;
    save(); emit();
  }
  function toggleFav(no) { setFav(no, !isFav(no)); return isFav(no); }

  /* ---- 設定 ---- */
  function getSetting(k) { return state.settings[k]; }
  function setSetting(k, v) { state.settings[k] = v; save(); emit(); }

  /* ---- 統計 ---- */
  function bumpStat(k, by = 1) { state.stats[k] = (state.stats[k] || 0) + by; save(); }
  function setStat(k, v) { state.stats[k] = v; save(); }
  function getStats() { return { ...state.stats }; }

  /* ---- 集計 ---- */
  function counts() {
    const total = WORD_DATA.length;
    const learned = state.learned.length;
    const fav = state.fav.length;
    return {
      total, learned, fav,
      newCount: total - learned,
      pct: total ? Math.round((learned / total) * 100) : 0,
    };
  }

  /* ---- リセット ---- */
  function resetLearned() { state.learned = []; save(); emit(); }
  function resetAll() { state = def(); save(); emit(); }

  return {
    subscribe,
    isLearned, isFav,
    setLearned, toggleLearned,
    setFav, toggleFav,
    getSetting, setSetting,
    bumpStat, setStat, getStats,
    counts,
    resetLearned, resetAll,
    get raw() { return state; },
  };
})();

window.Store = Store;
