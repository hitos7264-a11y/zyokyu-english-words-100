/* ============================================================
 *  上級英単語100  —  App (統合・初期化)
 *  © 2026 上級英単語100  / Created 2026-06-05
 * ============================================================ */

(function () {
  "use strict";

  /* ============================================================
   *  ホームの数値・リング更新 (進捗バー不使用)
   * ============================================================ */
  const HomeView = (() => {
    const RING_C = 2 * Math.PI * 42; // r=42

    function updateRing() {
      const { pct } = Store.counts();
      const ring = $("#homeRing");
      if (ring) ring.style.strokeDashoffset = RING_C * (1 - pct / 100);
      const pctEl = $("#homeRingPct");
      if (pctEl) pctEl.innerHTML = `${pct}<small>%</small>`;
    }

    function update() {
      const c = Store.counts();
      const set = (id, v) => { const el = $("#" + id); if (el) el.textContent = v; };
      set("statLearned", c.learned);
      set("statFav", c.fav);
      set("chipLearned", c.learned);
      set("chipFav", c.fav);
      set("chipNew", c.newCount);
      updateRing();
    }

    function renderTips() {
      const el = $("#tipsList");
      if (!el || !window.STUDY_TIPS) return;
      el.innerHTML = STUDY_TIPS.map((t) =>
        `<div class="tip-card">
          <span class="tip-icon"><i class="fa-solid ${t.icon}"></i></span>
          <div class="tip-body"><h4>${t.title}</h4><p>${t.body}</p></div>
        </div>`
      ).join("");
    }

    function bind() {
      $$(".quick-card[data-go]").forEach((c) => {
        c.addEventListener("click", () => { haptic(8); Router.go(c.dataset.go); });
      });
    }

    function init() {
      renderTips();
      update();
      bind();
      Store.subscribe(update);
    }
    return { init, update };
  })();

  /* ============================================================
   *  お気に入り復習ビュー
   * ============================================================ */
  const ReviewView = (() => {
    const listEl = $("#reviewList");
    const emptyEl = $("#reviewEmpty");
    const countEl = $("#reviewCount");

    function render() {
      const favs = WORD_DATA.filter((w) => Store.isFav(w.no));
      countEl.textContent = favs.length;
      if (!favs.length) { listEl.innerHTML = ""; emptyEl.hidden = false; return; }
      emptyEl.hidden = true;
      listEl.innerHTML = favs.map((w) => Render.wordCard(w)).join("");
      $$(".word-card", listEl).forEach((c, i) => c.style.animationDelay = Math.min(i * 28, 380) + "ms");
    }

    function bind() {
      listEl.addEventListener("click", (e) => {
        const favBtn = e.target.closest("[data-fav]");
        if (favBtn) {
          e.stopPropagation();
          const no = +favBtn.dataset.fav;
          Store.toggleFav(no);
          Toast.show("お気に入りを解除", "fav");
          haptic(10);
          render();
          return;
        }
        const card = e.target.closest(".word-card");
        if (card) {
          const favs = WORD_DATA.filter((w) => Store.isFav(w.no));
          Sheet.open(+card.dataset.no, favs);
        }
      });
    }

    function init() { render(); bind(); Store.subscribe(() => { if (Router.current === "review") render(); }); }
    return { init, render };
  })();

  /* ============================================================
   *  設定ビュー
   * ============================================================ */
  const SettingsView = (() => {
    function updateCounts() {
      const c = Store.counts();
      $("#setLearnedCount").textContent = c.learned;
      $("#setFavCount").textContent = c.fav;
    }
    function init() {
      const darkSw = $("#setDark");
      darkSw.checked = (Store.getSetting("theme") === "dark");
      darkSw.addEventListener("change", () => {
        const t = darkSw.checked ? "dark" : "light";
        Store.setSetting("theme", t); Theme.apply(t); haptic(8);
      });

      const autoSw = $("#setAutoSpeak");
      autoSw.checked = !!Store.getSetting("autoSpeak");
      if (!Speech.supported) {
        autoSw.disabled = true;
        autoSw.closest(".setting-row").style.opacity = ".55";
      }
      autoSw.addEventListener("change", () => { Store.setSetting("autoSpeak", autoSw.checked); haptic(8); });

      $("#resetLearned").addEventListener("click", () => {
        if (confirm("学習状況（習得済み）をすべてリセットします。よろしいですか？")) {
          Store.resetLearned(); Toast.show("学習状況をリセットしました", "ok"); haptic(16);
        }
      });
      $("#resetAll").addEventListener("click", () => {
        if (confirm("お気に入り・学習状況・設定をすべて削除します。元に戻せません。よろしいですか？")) {
          Store.resetAll();
          Theme.apply(Store.getSetting("theme"));
          $("#setAutoSpeak").checked = false;
          Toast.show("すべてのデータを削除しました", "info");
          haptic(20);
        }
      });

      updateCounts();
      Store.subscribe(() => { if (Router.current === "settings") updateCounts(); });
    }
    return { init, updateCounts };
  })();

  /* ============================================================
   *  今日の1語 (日付シードで固定)
   * ============================================================ */
  const DailyWord = (() => {
    let current = null;
    function pick() {
      const now = new Date();
      const seed = now.getFullYear() * 1000 + (now.getMonth() + 1) * 50 + now.getDate();
      const i = seed % WORD_DATA.length;
      return WORD_DATA[i];
    }
    function render() {
      current = pick();
      $("#dailyWord").textContent = current.word;
      $("#dailyPos").textContent = current.pos;
      $("#dailyMean").textContent = current.meaning;
    }
    function bind() {
      $("#dailyOpen").addEventListener("click", () => { if (current) Sheet.open(current.no, WORD_DATA.slice()); haptic(8); });
      $("#dailySpeak").addEventListener("click", (e) => {
        if (!current) return;
        const btn = e.currentTarget; btn.classList.add("playing");
        Speech.speak(current.word, { onend: () => btn.classList.remove("playing") });
      });
    }
    function init() { render(); bind(); }
    return { init };
  })();

  /* ============================================================
   *  ヘッダ操作
   * ============================================================ */
  function bindHeader() {
    $("#themeToggle").addEventListener("click", () => Theme.toggle());

    // 気まぐれ1語 (ランダム表示)
    $("#shuffleBtn").addEventListener("click", () => {
      const w = WORD_DATA[Math.floor(Math.random() * WORD_DATA.length)];
      Sheet.open(w.no, WORD_DATA.slice());
      haptic(12);
      const icon = $("#shuffleBtn i");
      icon.style.transition = "transform .5s var(--ease-back)";
      icon.style.transform = "rotate(360deg)";
      setTimeout(() => { icon.style.transition = "none"; icon.style.transform = "rotate(0)"; }, 520);
    });

    // ヘッダ影 (スクロール)
    const header = $("#appHeader");
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > 6);
        ticking = false;
      });
    }, { passive: true });
  }

  /* ============================================================
   *  初期化
   * ============================================================ */
  function init() {
    if (!window.WORD_DATA || !WORD_DATA.length) {
      console.error("WORD_DATA がありません");
      return;
    }

    Theme.init();
    Router.init();
    Sheet.init();

    HomeView.init();
    ListView.init();
    FlashView.init();
    QuizView.init();
    if (window.SpellView) SpellView.init();
    ReviewView.init();
    SettingsView.init();
    DailyWord.init();

    bindHeader();

    // ビュー遷移フック
    Router.onEnter("flash", () => FlashView.onEnter());
    Router.onEnter("quiz", () => QuizView.onEnter());
    Router.onEnter("spell", () => window.SpellView && SpellView.onEnter());
    Router.onEnter("review", () => ReviewView.render());
    Router.onEnter("list", () => { Router.moveIndicator(); });

    // 初期インジケータ
    requestAnimationFrame(() => Router.moveIndicator());

    // ListView から開く詳細で、お気に入りトグル後にリスト更新
    Store.subscribe(() => {
      // settings の数値などは各 view が購読済み
    });

    console.log("%c上級英単語100", "color:#2f5d62;font-weight:700;font-size:14px", "— Created 2026-06-05 / 全100語ロード完了");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.HomeView = HomeView;
})();
