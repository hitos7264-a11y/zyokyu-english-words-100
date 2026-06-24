/* ============================================================
 *  上級英単語100  —  UI 共通部品
 *  © 2026 上級英単語100
 *  - $/$$ ショートハンド
 *  - Toast
 *  - View ルーティング (タブ + インジケータ)
 *  - テーマ切り替え
 *  - 詳細ボトムシート (開閉・ドラッグ)
 *  - タグ / 単語カードの描画ヘルパ
 * ============================================================ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---- 触覚フィードバック (対応端末のみ) ---- */
function haptic(ms = 10) {
  if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
}

/* ============================================================
 *  Toast
 * ============================================================ */
const Toast = (() => {
  const stack = $("#toastStack");
  function show(msg, type = "info", icon) {
    if (!stack) return;
    const icons = { ok: "fa-circle-check", fav: "fa-star", info: "fa-circle-info" };
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${icon || icons[type] || icons.info}"></i><span>${msg}</span>`;
    stack.appendChild(el);
    el.addEventListener("animationend", (e) => {
      if (e.animationName === "toastOut") el.remove();
    });
    // 念のため自動削除
    setTimeout(() => el.remove(), 3200);
  }
  return { show };
})();

/* ============================================================
 *  テーマ
 * ============================================================ */
const Theme = (() => {
  const root = document.documentElement;
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#1a1813" : "#2f5d62");
    const icon = $("#themeToggle i");
    if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    const sw = $("#setDark");
    if (sw) sw.checked = theme === "dark";
  }
  function toggle() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    Store.setSetting("theme", next);
    apply(next);
    haptic(8);
  }
  function init() { apply(Store.getSetting("theme") || "light"); }
  return { apply, toggle, init };
})();

/* ============================================================
 *  View ルーティング
 * ============================================================ */
const Router = (() => {
  const tabbar = $("#tabbar");
  const indicator = $("#tabIndicator");
  let current = "home";
  const hooks = {}; // view -> fn(enter)

  function onEnter(view, fn) { hooks[view] = fn; }

  function moveIndicator() {
    const activeTab = $(`.tab.active`, tabbar);
    if (!activeTab || !indicator) return;
    indicator.style.width = activeTab.offsetWidth + "px";
    indicator.style.transform = `translateX(${activeTab.offsetLeft - 6}px)`;
  }

  function go(view, opts = {}) {
    if (!$(`#view-${view}`)) return;
    current = view;
    $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === view));
    $$(".tab", tabbar).forEach((t) => t.classList.toggle("active", t.dataset.view === view));
    moveIndicator();
    // 一覧ビューのみアルファレールを表示
    const rail = $("#alphaRail");
    if (rail) rail.style.display = view === "list" ? "" : "none";
    // スクロール先頭へ
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "smooth" });
    if (hooks[view]) hooks[view](opts);
  }

  function init() {
    $$(".tab", tabbar).forEach((tab) => {
      tab.addEventListener("click", () => { haptic(8); go(tab.dataset.view); });
    });
    window.addEventListener("resize", moveIndicator);
    requestAnimationFrame(moveIndicator);
  }

  return { init, go, onEnter, get current() { return current; }, moveIndicator };
})();

/* ============================================================
 *  描画ヘルパ
 * ============================================================ */
const Render = (() => {
  function tagChips(tags) {
    if (!tags || !tags.length) return "";
    return tags.map((t) => {
      const m = TAG_META[t];
      if (!m) return "";
      return `<span class="tag ${m.cls}">${m.label}</span>`;
    }).join("");
  }

  function wordCard(w) {
    const learned = Store.isLearned(w.no);
    const fav = Store.isFav(w.no);
    return `
      <button class="word-card${learned ? " learned" : ""}" data-pos="${w.posKey}" data-no="${w.no}">
        <span class="wc-state">習得済み</span>
        <div class="wc-top">
          <span class="wc-no">${String(w.no).padStart(2, "0")}</span>
          <div class="wc-main">
            <div class="wc-word en">${w.word}<span class="wc-pos">${w.pos}</span></div>
            <div class="wc-meaning">${w.meaning}</div>
          </div>
          <span class="wc-fav${fav ? " on" : ""}" data-fav="${w.no}" role="button" aria-label="お気に入り">
            <i class="${fav ? "fa-solid" : "fa-regular"} fa-star"></i>
          </span>
        </div>
        ${w.tags && w.tags.length ? `<div class="wc-tags">${tagChips(w.tags)}</div>` : ""}
      </button>`;
  }

  return { tagChips, wordCard };
})();

/* ============================================================
 *  詳細ボトムシート
 * ============================================================ */
const Sheet = (() => {
  const scrim = $("#scrim");
  const sheet = $("#detailSheet");
  const body = $("#sheetBody");
  const handle = $("#sheetHandle");
  let currentList = []; // 現在の文脈の単語配列 (前後ナビ)
  let currentIndex = -1;

  function buildContent(w) {
    const learned = Store.isLearned(w.no);
    const fav = Store.isFav(w.no);
    const pm = POS_META[w.posKey] || {};
    return `
      <div class="sheet-head">
        <span class="sheet-no">#${String(w.no).padStart(2, "0")}</span>
        <div class="sheet-titlewrap">
          <div class="sheet-word en">${w.word}<span class="sheet-pos">${w.pos}</span></div>
          <div class="sheet-actions">
            <button class="sheet-action" id="sheetSpeak"><i class="fa-solid fa-volume-high"></i> 発音を聞く</button>
            <button class="sheet-action fav${fav ? " on" : ""}" id="sheetFav"><i class="${fav ? "fa-solid" : "fa-regular"} fa-star"></i> お気に入り</button>
            <button class="sheet-action learn${learned ? " on" : ""}" id="sheetLearn"><i class="fa-solid ${learned ? "fa-circle-check" : "fa-circle"}"></i> ${learned ? "習得済み" : "覚えた"}</button>
          </div>
        </div>
      </div>

      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-book"></i> 意味</span>
        <div class="sheet-meaning">${w.meaning}</div>
      </div>

      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-lightbulb"></i> ポイント</span>
        <div class="sheet-point">${w.point}</div>
      </div>

      ${exampleBlock(w)}
      ${relationBlock(w)}

      ${w.tags && w.tags.length ? `
      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-tags"></i> 分類</span>
        <div class="sheet-tags">${Render.tagChips(w.tags)} ${posTag(pm)}</div>
      </div>` : `
      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-tags"></i> 分類</span>
        <div class="sheet-tags">${posTag(pm)}</div>
      </div>`}

      <div class="sheet-nav">
        <button id="sheetPrev" ${currentIndex <= 0 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i> 前の語</button>
        <button id="sheetNext" ${currentIndex >= currentList.length - 1 ? "disabled" : ""}>次の語 <i class="fa-solid fa-chevron-right"></i></button>
      </div>`;
  }

  function posTag(pm) {
    if (!pm.label) return "";
    return `<span class="tag tag-gram"><i class="fa-solid ${pm.icon}" style="font-size:9px;margin-right:3px"></i>${pm.label}</span>`;
  }

  function exampleBlock(w) {
    const ex = window.EXAMPLES && EXAMPLES[w.no];
    if (!ex) return "";
    return `
      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-quote-left"></i> 例文</span>
        <div class="example-box">
          <p class="ex-en en">${ex.en} <button class="ex-speak speak-btn" data-ex="${w.no}" style="padding:3px 9px;font-size:11px;margin-left:4px"><i class="fa-solid fa-volume-high"></i></button></p>
          <p class="ex-ja">${ex.ja}</p>
        </div>
      </div>`;
  }

  function relationGroup(label, items, cls, icon) {
    if (!items || !items.length) return "";
    return `
      <div class="rel-group">
        <span class="rel-label ${cls}"><i class="fa-solid ${icon}"></i> ${label}</span>
        <div class="rel-chips">${items.map((x) => `<span class="rel-chip ${cls}">${x}</span>`).join("")}</div>
      </div>`;
  }

  function relationBlock(w) {
    const r = window.RELATIONS && RELATIONS[w.no];
    if (!r) return "";
    const groups =
      relationGroup("派生語", r.deriv, "rel-deriv", "fa-sitemap") +
      relationGroup("類義語 ≒", r.syn, "rel-syn", "fa-equals") +
      relationGroup("反意語 ⇔", r.anto, "rel-anto", "fa-arrows-left-right") +
      relationGroup("型・相性", r.collo, "rel-collo", "fa-link") +
      relationGroup("混同注意", r.confuse, "rel-confuse", "fa-triangle-exclamation");
    if (!groups) return "";
    return `
      <div class="sheet-section">
        <span class="ss-label"><i class="fa-solid fa-diagram-project"></i> 関連語マップ</span>
        <div class="rel-map">${groups}</div>
      </div>`;
  }

  function bindContent(w) {
    const speak = () => {
      const btn = $("#sheetSpeak");
      btn && btn.classList.add("playing");
      Speech.speak(w.word, { onend: () => btn && btn.classList.remove("playing") });
    };
    $("#sheetSpeak")?.addEventListener("click", speak);

    // 例文の発音
    const exBtn = body.querySelector(".ex-speak");
    if (exBtn && window.EXAMPLES && EXAMPLES[w.no]) {
      exBtn.addEventListener("click", () => {
        const plain = EXAMPLES[w.no].en.replace(/<[^>]+>/g, "");
        exBtn.classList.add("playing");
        Speech.speak(plain, { onend: () => exBtn.classList.remove("playing") });
      });
    }

    $("#sheetFav")?.addEventListener("click", () => {
      const on = Store.toggleFav(w.no);
      const btn = $("#sheetFav");
      btn.classList.toggle("on", on);
      btn.querySelector("i").className = (on ? "fa-solid" : "fa-regular") + " fa-star";
      Toast.show(on ? "お気に入りに追加しました" : "お気に入りを解除しました", "fav");
      haptic(10);
    });

    $("#sheetLearn")?.addEventListener("click", () => {
      const on = Store.toggleLearned(w.no);
      const btn = $("#sheetLearn");
      btn.classList.toggle("on", on);
      btn.querySelector("i").className = "fa-solid " + (on ? "fa-circle-check" : "fa-circle");
      btn.lastChild.textContent = on ? " 習得済み" : " 覚えた";
      Toast.show(on ? "「習得済み」に記録しました" : "未学習に戻しました", "ok");
      haptic(12);
    });

    $("#sheetPrev")?.addEventListener("click", () => { if (currentIndex > 0) openByIndex(currentIndex - 1); });
    $("#sheetNext")?.addEventListener("click", () => { if (currentIndex < currentList.length - 1) openByIndex(currentIndex + 1); });

    if (Store.getSetting("autoSpeak")) setTimeout(speak, 280);
  }

  function openByIndex(i) {
    currentIndex = i;
    const w = currentList[i];
    if (!w) return;
    body.innerHTML = buildContent(w);
    body.scrollTop = 0;
    bindContent(w);
  }

  function open(no, list) {
    currentList = (list && list.length) ? list : WORD_DATA.slice();
    currentIndex = currentList.findIndex((x) => x.no === no);
    if (currentIndex < 0) { currentList = WORD_DATA.slice(); currentIndex = currentList.findIndex((x) => x.no === no); }
    openByIndex(currentIndex);
    scrim.classList.add("show");
    sheet.classList.add("show");
    document.body.classList.add("no-scroll");
    haptic(8);
  }

  function close() {
    sheet.classList.remove("show");
    scrim.classList.remove("show");
    document.body.classList.remove("no-scroll");
    Speech.cancel();
  }

  /* ドラッグで閉じる */
  function initDrag() {
    let startY = 0, curY = 0, dragging = false;
    const start = (y) => { startY = y; dragging = true; sheet.style.transition = "none"; };
    const move = (y) => {
      if (!dragging) return;
      curY = Math.max(0, y - startY);
      sheet.style.transform = `translateX(-50%) translateY(${curY}px)`;
    };
    const end = () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (curY > 110) close();
      curY = 0;
    };
    handle.addEventListener("touchstart", (e) => start(e.touches[0].clientY), { passive: true });
    handle.addEventListener("touchmove", (e) => move(e.touches[0].clientY), { passive: true });
    handle.addEventListener("touchend", end);
    handle.addEventListener("mousedown", (e) => { start(e.clientY);
      const mm = (ev) => move(ev.clientY);
      const mu = () => { end(); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
      window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu);
    });
  }

  function init() {
    scrim.addEventListener("click", close);
    initDrag();
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  return { init, open, close };
})();

window.$ = $; window.$$ = $$;
window.haptic = haptic;
window.Toast = Toast; window.Theme = Theme;
window.Router = Router; window.Render = Render; window.Sheet = Sheet;
