/* ============================================================
 *  上級英単語100  —  Flashcard mode
 *  © 2026 上級英単語100
 *  - 3D フリップ / スワイプ操作 / ドット式の現在位置 (進捗バー不使用)
 * ============================================================ */

const FlashView = (() => {
  // 設定要素
  const cfg = $("#flashConfig");
  const stage = $("#flashStage");
  const done = $("#flashDone");

  const rangeSeg = $("#flashRange");
  const orderSeg = $("#flashOrder");
  const sideSeg = $("#flashSide");
  const startBtn = $("#flashStart");

  // 実行要素
  const card = $("#flashCard");
  const cardWrap = $("#flashCardWrap");
  const curEl = $("#flashCur");
  const totalEl = $("#flashTotal");
  const dotsEl = $("#flashDots");
  const fcNo = $("#fcNo"), fcPos = $("#fcPos"), fcWord = $("#fcWord");
  const fbWord = $("#fbWord"), fbPos = $("#fbPos"), fbMeaning = $("#fbMeaning"), fbPoint = $("#fbPoint");

  let opt = { range: "all", order: "seq", side: "front" };
  let deck = [];
  let idx = 0;
  let flipped = false;
  let result = { good: 0, again: 0 };
  let againPile = [];

  /* ---- 設定セグメント ---- */
  function bindSeg(seg, key) {
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      $$("button", seg).forEach((x) => x.classList.toggle("active", x === b));
      opt[key] = b.dataset[key];
      haptic(8);
    });
  }

  function buildDeck() {
    let arr = WORD_DATA.slice();
    if (opt.range === "unlearned") arr = arr.filter((w) => !Store.isLearned(w.no));
    else if (opt.range === "fav") arr = arr.filter((w) => Store.isFav(w.no));
    if (opt.order === "shuffle") arr = shuffle(arr);
    return arr;
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function start() {
    deck = buildDeck();
    if (!deck.length) {
      Toast.show(opt.range === "fav" ? "お気に入りの単語がありません" : "対象の単語がありません", "info");
      return;
    }
    idx = 0; result = { good: 0, again: 0 }; againPile = [];
    cfg.hidden = true; done.hidden = true; stage.hidden = false;
    totalEl.textContent = deck.length;
    renderDots();
    show(0, true);
    haptic(12);
  }

  function renderDots() {
    const max = 40; // ドットが多すぎる時は間引く
    if (deck.length <= max) {
      dotsEl.innerHTML = deck.map((_, i) => `<span class="flash-dot" data-i="${i}"></span>`).join("");
    } else {
      dotsEl.innerHTML = `<span class="flash-counter" style="font-size:11px;color:var(--ink-mute)">●</span>`;
    }
    updateDots();
  }
  function updateDots() {
    $$(".flash-dot", dotsEl).forEach((d, i) => {
      d.classList.toggle("done", i < idx);
      d.classList.toggle("cur", i === idx);
    });
  }

  function show(i, enter) {
    const w = deck[i];
    if (!w) return;
    flipped = (opt.side === "back");
    card.classList.toggle("flipped", flipped);

    fcNo.textContent = "#" + String(w.no).padStart(2, "0");
    fcPos.textContent = w.pos;
    fcWord.textContent = w.word;
    fbWord.textContent = w.word;
    fbPos.textContent = w.pos;
    fbMeaning.textContent = w.meaning;
    fbPoint.innerHTML = w.point;

    curEl.textContent = i + 1;
    updateDots();

    if (enter) { card.classList.remove("enter"); void card.offsetWidth; card.classList.add("enter"); }

    if (Store.getSetting("autoSpeak")) setTimeout(() => Speech.speak(w.word), 260);
  }

  function flip() {
    flipped = !flipped;
    card.classList.toggle("flipped", flipped);
    haptic(8);
  }

  function next(dir) {
    // dir: 'good' | 'again'
    const w = deck[idx];
    if (dir === "good") {
      result.good++;
      Store.setLearned(w.no, true);
      card.classList.add("swipe-right");
    } else {
      result.again++;
      againPile.push(w);
      card.classList.add("swipe-left");
    }
    haptic(dir === "good" ? 14 : 10);

    setTimeout(() => {
      card.classList.remove("swipe-left", "swipe-right");
      idx++;
      if (idx >= deck.length) {
        // もう一度の山があれば続行するか確認 → ここでは終了画面へ
        finish();
      } else {
        show(idx, true);
      }
    }, 360);
  }

  function finish() {
    stage.hidden = true;
    done.hidden = false;
    $("#fdGood").textContent = result.good;
    $("#fdAgain").textContent = result.again;
    const msg = result.again === 0
      ? "全問「覚えた」！見事です。"
      : `「もう一度」が ${result.again} 語。お気に入りに入れて復習しましょう。`;
    $("#flashDoneMsg").textContent = msg;
    Store.bumpStat("flashRounds");
    // 紙吹雪なしの上品な完了演出 (印が押される)
    haptic(20);
  }

  /* ---- スワイプ操作 ---- */
  function bindSwipe() {
    let sx = 0, sy = 0, dx = 0, dy = 0, dragging = false, moved = false;
    cardWrap.addEventListener("touchstart", (e) => {
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; dragging = true; moved = false;
      card.style.transition = "none";
    }, { passive: true });
    cardWrap.addEventListener("touchmove", (e) => {
      if (!dragging) return;
      dx = e.touches[0].clientX - sx; dy = e.touches[0].clientY - sy;
      if (Math.abs(dx) > 8) moved = true;
      if (Math.abs(dx) > Math.abs(dy)) {
        const rot = dx / 18;
        card.style.transform = `${flipped ? "rotateY(180deg) " : ""}translateX(${flipped ? -dx : dx}px) rotate(${flipped ? -rot : rot}deg)`;
      }
    }, { passive: true });
    cardWrap.addEventListener("touchend", () => {
      if (!dragging) return;
      dragging = false;
      card.style.transition = "";
      card.style.transform = "";
      if (Math.abs(dx) > 90) { next(dx > 0 ? "good" : "again"); }
      else if (!moved) { flip(); }
      dx = 0; dy = 0;
    });
    // クリック(PC)でフリップ
    card.addEventListener("click", (e) => {
      if (e.target.closest(".speak-btn")) return;
      flip();
    });
  }

  function bindSpeak() {
    const speakNow = (btn) => {
      const w = deck[idx]; if (!w) return;
      btn && btn.classList.add("playing");
      Speech.speak(w.word, { onend: () => btn && btn.classList.remove("playing") });
    };
    $("#fcSpeak")?.addEventListener("click", (e) => { e.stopPropagation(); speakNow(e.currentTarget); });
    $("#fbSpeak")?.addEventListener("click", (e) => { e.stopPropagation(); speakNow(e.currentTarget); });
  }

  function reset() {
    cfg.hidden = false; stage.hidden = true; done.hidden = true;
  }

  function init() {
    bindSeg(rangeSeg, "range");
    bindSeg(orderSeg, "order");
    bindSeg(sideSeg, "side");
    startBtn.addEventListener("click", start);
    $("#flashFlip").addEventListener("click", flip);
    $("#flashGood").addEventListener("click", () => next("good"));
    $("#flashAgain").addEventListener("click", () => next("again"));
    $("#flashRestart").addEventListener("click", () => { reset(); start(); });
    $("#flashBackHome").addEventListener("click", () => { reset(); Router.go("home"); });
    bindSwipe();
    bindSpeak();

    // キーボード操作 (PC)
    document.addEventListener("keydown", (e) => {
      if (Router.current !== "flash" || stage.hidden) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") next("good");
      else if (e.key === "ArrowLeft") next("again");
    });
  }

  /* ビューに入るたび設定画面へ戻す (実行中でなければ) */
  function onEnter() {
    if (stage.hidden && done.hidden) reset();
  }

  return { init, reset, onEnter, start };
})();

window.FlashView = FlashView;
