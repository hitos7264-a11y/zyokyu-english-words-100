/* ============================================================
 *  上級英単語100  —  Spell test (つづり入力テスト)
 *  © 2026 上級英単語100  / Created 2026-06-05
 * ============================================================ */

const SpellView = (() => {
  const cfg = $("#spellConfig");
  const stage = $("#spellStage");
  const resultEl = $("#spellResult");

  const countSeg = $("#spellCount");
  const hintSeg = $("#spellHint");
  const rangeSeg = $("#spellRange");
  const startBtn = $("#spellStart");

  const curEl = $("#spellCur"), maxEl = $("#spellMax"), scoreEl = $("#spellScore");
  const stepsEl = $("#spellSteps");
  const meanEl = $("#spellMean"), hintTextEl = $("#spellHintText");
  const inputEl = $("#spellInput"), submitBtn = $("#spellSubmit");
  const feedbackEl = $("#spellFeedback"), nextBtn = $("#spellNext");

  let opt = { count: 20, hint: "first", range: "all" };
  let questions = [];
  let idx = 0, score = 0, answered = false, review = [];

  function bindSeg(seg, key, parse) {
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      $$("button", seg).forEach((x) => x.classList.toggle("active", x === b));
      opt[key] = parse ? parse(b.dataset[key]) : b.dataset[key];
      haptic(8);
    });
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function shortMeaning(m) {
    let s = m.split(/[／/]/)[0].replace(/^[①-⑩]\s*/, "");
    return s.length > 30 ? s.slice(0, 29) + "…" : s;
  }

  function buildPool() {
    let arr = WORD_DATA.slice();
    if (opt.range === "unlearned") arr = arr.filter((w) => !Store.isLearned(w.no));
    else if (opt.range === "fav") arr = arr.filter((w) => Store.isFav(w.no));
    return arr;
  }

  function start() {
    const pool = buildPool();
    if (!pool.length) { Toast.show("対象の単語がありません", "info"); return; }
    const n = Math.min(opt.count, pool.length);
    questions = shuffle(pool).slice(0, n);
    idx = 0; score = 0; review = [];
    cfg.hidden = true; resultEl.hidden = true; stage.hidden = false;
    maxEl.textContent = questions.length;
    scoreEl.textContent = "0";
    renderSteps();
    showQuestion();
    haptic(12);
  }

  function renderSteps() {
    stepsEl.innerHTML = questions.map((_, i) => `<span class="quiz-step" data-i="${i}"></span>`).join("");
    updateSteps();
  }
  function updateSteps() {
    $$(".quiz-step", stepsEl).forEach((s, i) => s.classList.toggle("cur", i === idx));
  }

  function hintFor(word) {
    if (opt.hint === "none") return "";
    if (opt.hint === "length") return word.split("").map(() => "_").join(" ");
    // first
    return `<b>${word[0]}</b>` + " " + word.slice(1).split("").map(() => "_").join(" ");
  }

  function showQuestion() {
    answered = false;
    const w = questions[idx];
    curEl.textContent = idx + 1;
    updateSteps();
    meanEl.textContent = shortMeaning(w.meaning);
    hintTextEl.innerHTML = hintFor(w.word);
    inputEl.value = "";
    inputEl.className = "spell-input";
    inputEl.disabled = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "spell-feedback";
    nextBtn.classList.remove("show");
    submitBtn.disabled = false;
    setTimeout(() => inputEl.focus(), 80);
  }

  function check() {
    if (answered) return;
    const w = questions[idx];
    const guess = inputEl.value.trim().toLowerCase();
    if (!guess) { inputEl.focus(); return; }
    answered = true;
    inputEl.disabled = true;
    submitBtn.disabled = true;
    const correct = guess === w.word.toLowerCase();
    if (correct) {
      score++;
      scoreEl.textContent = score;
      inputEl.classList.add("correct");
      feedbackEl.className = "spell-feedback ok";
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> 正解！`;
      $$(".quiz-step", stepsEl)[idx].classList.add("correct");
      Store.setLearned(w.no, true);
      haptic(16);
    } else {
      inputEl.classList.add("wrong");
      feedbackEl.className = "spell-feedback ng";
      feedbackEl.innerHTML = `正解は <span class="ans">${w.word}</span>`;
      $$(".quiz-step", stepsEl)[idx].classList.add("wrong");
      haptic(30);
    }
    review.push({ w, correct, guess });
    nextBtn.classList.add("show");
    nextBtn.innerHTML = idx >= questions.length - 1
      ? '結果を見る <i class="fa-solid fa-flag-checkered"></i>'
      : '次へ <i class="fa-solid fa-arrow-right"></i>';
    Speech.speak(w.word);
  }

  function next() {
    if (!answered) return;
    idx++;
    if (idx >= questions.length) finish();
    else showQuestion();
  }

  function finish() {
    stage.hidden = true; resultEl.hidden = false;
    const total = questions.length;
    $("#spellCorrect").textContent = score;
    $("#spellTotal").textContent = total;
    const pct = Math.round((score / total) * 100);
    const ring = $("#spellRing");
    const C = 2 * Math.PI * 70;
    ring.style.strokeDashoffset = C;
    requestAnimationFrame(() => { ring.style.strokeDashoffset = C * (1 - pct / 100); });

    let title, msg;
    if (pct === 100) { title = "完璧なつづり！"; msg = "スペルも完全に身についています。"; }
    else if (pct >= 80) { title = "お見事"; msg = "スペルミスしやすい語を最終確認しましょう。"; }
    else if (pct >= 60) { title = "good"; msg = "-ei-, -gg- など綴りの罠に注意。"; }
    else { title = "もう一歩"; msg = "見て覚えるだけでなく、書いて覚えると定着します。"; }
    $("#spellTitle").textContent = title;
    $("#spellMsg").textContent = msg;

    const wrong = review.filter((r) => !r.correct);
    const list = (wrong.length ? wrong : review).slice(0, 12);
    $("#spellReviewList").innerHTML = list.map((r) =>
      `<button class="qr-review-item ${r.correct ? "ok" : "ng"}" data-no="${r.w.no}">
        <span class="qri-mark"><i class="fa-solid ${r.correct ? "fa-circle-check" : "fa-circle-xmark"}"></i></span>
        <span class="qri-word en">${r.w.word}</span>
        <span class="qri-mean">${r.correct ? "正解" : "→ " + (r.guess || "(無回答)")}</span>
      </button>`
    ).join("");
    haptic(24);
  }

  function reset() { cfg.hidden = false; stage.hidden = true; resultEl.hidden = true; }

  function init() {
    bindSeg(countSeg, "count", (v) => +v);
    bindSeg(hintSeg, "hint");
    bindSeg(rangeSeg, "range");
    startBtn.addEventListener("click", start);
    submitBtn.addEventListener("click", check);
    nextBtn.addEventListener("click", next);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (answered) next(); else check();
    });
    $("#spellRetry").addEventListener("click", () => { reset(); start(); });
    $("#spellBackHome").addEventListener("click", () => { reset(); Router.go("home"); });
    $("#spellReviewList").addEventListener("click", (e) => {
      const item = e.target.closest(".qr-review-item");
      if (item) Sheet.open(+item.dataset.no, WORD_DATA.slice());
    });
  }

  function onEnter() { if (stage.hidden && resultEl.hidden) reset(); }

  return { init, reset, onEnter, start };
})();

window.SpellView = SpellView;
