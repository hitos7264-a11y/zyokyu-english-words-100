/* ============================================================
 *  上級英単語100  —  List view (一覧 / 検索 / フィルタ / 索引)
 *  © 2026 上級英単語100
 * ============================================================ */

const ListView = (() => {
  const listEl = $("#wordList");
  const emptyEl = $("#listEmpty");
  const searchInput = $("#searchInput");
  const searchBox = $("#searchBox");
  const searchClear = $("#searchClear");
  const filterRow = $("#filterRow");
  const sortSelect = $("#sortSelect");
  const resultCount = $("#resultCount");
  const alphaRail = $("#alphaRail");

  let query = "";
  let activeFilter = "all";
  let sortMode = "no";

  /* フィルタ定義 */
  const FILTERS = [
    { key: "all",     label: "すべて",       icon: "fa-layer-group" },
    { key: "unlearned", label: "未学習",     icon: "fa-circle" },
    { key: "learned", label: "習得済み",     icon: "fa-circle-check" },
    { key: "fav",     label: "お気に入り",   icon: "fa-star" },
    { key: "verb",    label: "動詞",         icon: "fa-bolt" },
    { key: "adj",     label: "形容詞",       icon: "fa-palette" },
    { key: "noun",    label: "名詞",         icon: "fa-cube" },
    { key: "mixed",   label: "複数品詞",     icon: "fa-shapes" },
    { key: "多義語",   label: "多義語",       icon: "fa-shuffle" },
    { key: "対義語ペア", label: "対義語ペア", icon: "fa-arrows-left-right" },
    { key: "発音注意", label: "発音注意",     icon: "fa-volume-high" },
    { key: "派生重要", label: "派生重要",     icon: "fa-sitemap" },
    { key: "経済",     label: "経済",         icon: "fa-chart-line" },
    { key: "社会",     label: "社会",         icon: "fa-users" },
  ];

  function renderFilters() {
    filterRow.innerHTML = FILTERS.map((f) =>
      `<button class="filter-chip${f.key === activeFilter ? " active" : ""}" data-filter="${f.key}">
        <i class="fa-solid ${f.icon}"></i>${f.label}</button>`
    ).join("");
  }

  function matchFilter(w) {
    switch (activeFilter) {
      case "all": return true;
      case "unlearned": return !Store.isLearned(w.no);
      case "learned": return Store.isLearned(w.no);
      case "fav": return Store.isFav(w.no);
      case "verb": case "adj": case "noun": case "mixed": return w.posKey === activeFilter;
      default: return w.tags && w.tags.includes(activeFilter);
    }
  }

  function matchQuery(w) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      w.point.toLowerCase().includes(q) ||
      (w.tags && w.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  function getFiltered() {
    let arr = WORD_DATA.filter((w) => matchFilter(w) && matchQuery(w));
    switch (sortMode) {
      case "alpha": arr.sort((a, b) => a.word.localeCompare(b.word)); break;
      case "alphaDesc": arr.sort((a, b) => b.word.localeCompare(a.word)); break;
      case "learned": arr.sort((a, b) => (Store.isLearned(a.no) - Store.isLearned(b.no)) || (a.no - b.no)); break;
      default: arr.sort((a, b) => a.no - b.no);
    }
    return arr;
  }

  function render() {
    const arr = getFiltered();
    resultCount.textContent = arr.length;

    if (!arr.length) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      renderAlphaRail([]);
      return;
    }
    emptyEl.hidden = true;

    // 番号順 or A→Z のときはアルファ区切りを入れる
    const useDivider = (sortMode === "no" || sortMode === "alpha") && !query && activeFilter === "all";
    let html = "";
    let lastInitial = "";
    arr.forEach((w, i) => {
      if (useDivider && w.initial !== lastInitial) {
        const cnt = arr.filter((x) => x.initial === w.initial).length;
        html += `<div class="alpha-divider" id="alpha-${w.initial}"><span class="ad-letter en">${w.initial}</span><span class="ad-line"></span><span class="ad-count">${cnt}</span></div>`;
        lastInitial = w.initial;
      }
      html += Render.wordCard(w);
    });
    listEl.innerHTML = html;

    // アニメーションのスタガー
    $$(".word-card", listEl).forEach((c, i) => {
      c.style.animationDelay = Math.min(i * 22, 400) + "ms";
    });

    renderAlphaRail(useDivider ? [...new Set(arr.map((w) => w.initial))] : []);
  }

  function renderAlphaRail(present) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    if (!present.length) { alphaRail.innerHTML = ""; alphaRail.style.opacity = "0"; return; }
    alphaRail.style.opacity = "1";
    alphaRail.innerHTML = letters.map((L) =>
      `<button class="${present.includes(L) ? "" : "disabled"}" data-alpha="${L}">${L}</button>`
    ).join("");
  }

  /* 現在の文脈リスト (詳細シートの前後ナビ用) */
  function contextList() { return getFiltered(); }

  function bind() {
    // 検索
    let deb;
    searchInput.addEventListener("input", () => {
      query = searchInput.value.trim();
      searchBox.classList.toggle("has-value", !!query);
      clearTimeout(deb);
      deb = setTimeout(render, 120);
    });
    searchClear.addEventListener("click", () => {
      searchInput.value = ""; query = "";
      searchBox.classList.remove("has-value");
      render(); searchInput.focus();
    });

    // フィルタ
    filterRow.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      $$(".filter-chip", filterRow).forEach((c) => c.classList.toggle("active", c === btn));
      haptic(8);
      render();
    });

    // 並び替え
    sortSelect.addEventListener("change", () => { sortMode = sortSelect.value; render(); });

    // カードのクリック (詳細 / お気に入り)
    listEl.addEventListener("click", (e) => {
      const favBtn = e.target.closest("[data-fav]");
      if (favBtn) {
        e.stopPropagation();
        const no = +favBtn.dataset.fav;
        const on = Store.toggleFav(no);
        favBtn.classList.toggle("on", on);
        favBtn.classList.add("pulse");
        favBtn.querySelector("i").className = (on ? "fa-solid" : "fa-regular") + " fa-star";
        setTimeout(() => favBtn.classList.remove("pulse"), 500);
        Toast.show(on ? "お気に入りに追加" : "お気に入りを解除", "fav");
        haptic(10);
        return;
      }
      const card = e.target.closest(".word-card");
      if (card) Sheet.open(+card.dataset.no, contextList());
    });

    // アルファレール
    alphaRail.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-alpha]");
      if (!btn || btn.classList.contains("disabled")) return;
      const target = document.getElementById("alpha-" + btn.dataset.alpha);
      if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); haptic(8); }
    });
  }

  /* 外部から1語の状態が変わったら再描画 */
  function refresh() { render(); }

  function focusWord(no) {
    // フィルタを解除して全件表示にしてから該当語を開く
    activeFilter = "all"; query = ""; sortMode = "no";
    searchInput.value = ""; searchBox.classList.remove("has-value");
    sortSelect.value = "no";
    $$(".filter-chip", filterRow).forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
    render();
    Sheet.open(no, contextList());
  }

  function init() {
    renderFilters();
    render();
    bind();
    Store.subscribe(() => {
      // カードの見た目だけ軽量更新
      $$(".word-card", listEl).forEach((card) => {
        const no = +card.dataset.no;
        card.classList.toggle("learned", Store.isLearned(no));
        const favBtn = card.querySelector("[data-fav]");
        if (favBtn) {
          const on = Store.isFav(no);
          favBtn.classList.toggle("on", on);
          favBtn.querySelector("i").className = (on ? "fa-solid" : "fa-regular") + " fa-star";
        }
      });
    });
  }

  return { init, refresh, focusWord, contextList };
})();

window.ListView = ListView;
