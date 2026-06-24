/* ============================================================
 *  上級英単語100  —  Quiz mode (4択)
 *  © 2026 上級英単語100
 *  - 英→意味 / 意味→英 / ミックス
 *  - ステップドット (進捗バー不使用) で位置表示
 * ============================================================ */

const QuizView = (() => {
  const cfg = $("#quizConfig");
  const stage = $("#quizStage");
  const resultEl = $("#quizResult");

  const typeSeg = $("#quizType");
  const countSeg = $("#quizCount");
  const rangeSeg = $("#quizRange");
  const startBtn = $("#quizStart");

  const curEl = $("#quizCur"), maxEl = $("#quizMax"), scoreEl = $("#quizScore");
  const stepsEl = $("#quizSteps");
  const qTypeEl = $("#quizQType"), qWordEl = $("#quizQWord"), qJpEl = $("#quizQJp"), qSpeakEl = $("#quizSpeak");
  const optionsEl = $("#quizOptions");
  const nextBtn = $("#quizNext");

  let opt = { type: "e2j", count: 20, range: "all" };
  let questions = [];
  let idx = 0;
  let score = 0;
  let answered = false;
  let review = [];

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

  // 意味は ①② や ／ が入るので、先頭の要点だけ短く出す補助
  function shortMeaning(m) {
    // 「①…②…」→ 最初の節
    let s = m.split(/[／/]/)[0];
    s = s.replace(/^[①-⑩]\s*/, "");
    return s.length > 24 ? s.slice(0, 23) + "…" : s;
  }

  function buildPool() {
    let arr = WORD_DATA.slice();
    if (opt.range === "unlearned") arr = arr.filter((w) => !Store.isLearned(w.no));
    else if (opt.range === "fav") arr = arr.filter((w) => Store.isFav(w.no));
    return arr;
  }

  function makeQuestions() {
    const pool = buildPool();
    if (pool.length < 4) return null;
    const n = Math.min(opt.count, pool.length);
    const chosen = shuffle(pool).slice(0, n);
    return chosen.map((w) => {
      const mode = opt.type === "mix" ? (Math.random() < 0.5 ? "e2j" : "j2e") : opt.type;
      // ダミー選択肢
      const others = shuffle(WORD_DATA.filter((x) => x.no !== w.no)).slice(0, 3);
      const pool4 = shuffle([w, ...others]);
      return { w, mode, options: pool4, answerNo: w.no };
    });
  }

  function start() {
    const q = makeQuestions();
    if (!q) { Toast.show("対象が4語に満たないため出題できません", "info"); return; }
    questions = q; idx = 0; score = 0; review = [];
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
    $$(".quiz-step", stepsEl).forEach((s, i) => {
      s.classList.toggle("cur", i === idx);
    });
  }

  function showQuestion() {
    answered = false;
    const q = questions[idx];
    curEl.textContent = idx + 1;
    updateSteps();
    nextBtn.classList.remove("show");

    if (q.mode === "e2j") {
      qTypeEl.textContent = "この語の意味は？";
      qWordEl.textContent = q.w.word; qWordEl.hidden = false;
      qJpEl.hidden = true;
      qSpeakEl.hidden = false;
      optionsEl.innerHTML = q.options.map((o, i) =>
        optionHtml(i, shortMeaning(o.meaning), o.no)
      ).join("");
    } else {
      qTypeEl.textContent = "この意味の英単語は？";
      qWordEl.hidden = true;
      qJpEl.textContent = shortMeaning(q.w.meaning); qJpEl.hidden = false;
      qSpeakEl.hidden = true;
      optionsEl.innerHTML = q.options.map((o, i) =>
        optionHtml(i, `<span class="en" style="font-family:var(--font-en);font-weight:600">${o.word}</span>`, o.no)
      ).join("");
    }
    // 入場アニメ
    $(".quiz-question").classList.remove("qIn"); void $(".quiz-question").offsetWidth;
  }

  function optionHtml(i, text, no) {
    const key = ["A", "B", "C", "D"][i];
    return `<button class="quiz-option" data-no="${no}">
      <span class="opt-key">${key}</span>
      <span class="opt-text">${text}</span>
      <span class="opt-mark"><i class="fa-solid fa-circle-check"></i></span>
    </button>`;
  }

  function answer(btn) {
    if (answered) return;
    answered = true;
    const q = questions[idx];
    const picked = +btn.dataset.no;
    const correct = picked === q.answerNo;
    const step = $$(".quiz-step", stepsEl)[idx];

    $$(".quiz-option", optionsEl).forEach((o) => {
      o.disabled = true;
      const no = +o.dataset.no;
      if (no === q.answerNo) { o.classList.add("correct"); o.querySelector(".opt-mark i").className = "fa-solid fa-circle-check"; }
      else if (o === btn) { o.classList.add("wrong"); o.querySelector(".opt-mark i").className = "fa-solid fa-circle-xmark"; }
      else o.classList.add("dim");
    });

    if (correct) {
      score++;
      scoreEl.textContent = score;
      step.classList.add("correct");
      haptic(16);
    } else {
      btn.classList.add("shake");
      step.classList.add("wrong");
      haptic(30);
    }

    review.push({ w: q.w, correct });
    nextBtn.classList.add("show");
    nextBtn.innerHTML = idx >= questions.length - 1
      ? '結果を見る <i class="fa-solid fa-flag-checkered"></i>'
      : '次へ <i class="fa-solid fa-arrow-right"></i>';
  }

  function next() {
    if (!answered) return;
    idx++;
    if (idx >= questions.length) finish();
    else showQuestion();
  }

  function finish() {
    stage.hidden = true;
    resultEl.hidden = false;
    const total = questions.length;
    $("#qrCorrect").textContent = score;
    $("#qrTotal").textContent = total;
    const pct = Math.round((score / total) * 100);

    // リング
    const ring = $("#qrRing");
    const C = 2 * Math.PI * 70;
    ring.style.strokeDashoffset = C;
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = C * (1 - pct / 100);
    });

    // メッセージ
    let title, msg;
    if (pct === 100) { title = "満点！圧巻です"; msg = "上級語彙を完全にものにしています。"; }
    else if (pct >= 80) { title = "お見事"; msg = "あと一歩で完璧。間違えた語を復習しましょう。"; }
    else if (pct >= 60) { title = "good"; msg = "基礎はOK。多義語・派生語の確認を。"; }
    else { title = "復習しよう"; msg = "焦らず、フラッシュカードで反復しましょう。"; }
    $("#qrTitle").textContent = title;
    $("#qrMsg").textContent = msg;

    // 復習リスト (間違えた語を優先表示)
    const wrong = review.filter((r) => !r.correct);
    const list = (wrong.length ? wrong : review).slice(0, 12);
    $("#qrReviewList").innerHTML = list.map((r) =>
      `<button class="qr-review-item ${r.correct ? "ok" : "ng"}" data-no="${r.w.no}">
        <span class="qri-mark"><i class="fa-solid ${r.correct ? "fa-circle-check" : "fa-circle-xmark"}"></i></span>
        <span class="qri-word en">${r.w.word}</span>
        <span class="qri-mean">${shortMeaning(r.w.meaning)}</span>
      </button>`
    ).join("");

    Store.bumpStat("quizRuns");
    if (pct > (Store.getStats().bestQuiz || 0)) Store.setStat("bestQuiz", pct);
    haptic(24);
  }

  function reset() {
    cfg.hidden = false; stage.hidden = true; resultEl.hidden = true;
  }

  function bindSpeak() {
    qSpeakEl.addEventListener("click", () => {
      const q = questions[idx]; if (!q) return;
      qSpeakEl.classList.add("playing");
      Speech.speak(q.w.word, { onend: () => qSpeakEl.classList.remove("playing") });
    });
  }

  function init() {
    bindSeg(typeSeg, "type");
    bindSeg(countSeg, "count", (v) => +v);
    bindSeg(rangeSeg, "range");
    startBtn.addEventListener("click", start);

    optionsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".quiz-option");
      if (btn) answer(btn);
    });
    nextBtn.addEventListener("click", next);
    $("#quizRetry").addEventListener("click", () => { reset(); start(); });
    $("#quizBackHome").addEventListener("click", () => { reset(); Router.go("home"); });

    // 結果の復習リストから詳細へ
    $("#qrReviewList").addEventListener("click", (e) => {
      const item = e.target.closest(".qr-review-item");
      if (item) Sheet.open(+item.dataset.no, WORD_DATA.slice());
    });

    bindSpeak();
  }

  function onEnter() {
    if (stage.hidden && resultEl.hidden) reset();
  }

  return { init, reset, onEnter, start };
})();

window.QuizView = QuizView;
