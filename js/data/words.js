/* ============================================================
 *  大学入試 上級英単語 100  —  WORD DATA
 *  原典: 大学入試英単語100_上級.md
 *  © 2026 上級英単語100 / Created 2026-06-05
 *
 *  各語データ構造:
 *  {
 *    no:        通し番号 (1-100)
 *    word:      見出し語
 *    pos:       品詞 ［動］［形］等
 *    posKey:    分類キー (verb / adj / noun / mixed)
 *    initial:   先頭アルファベット (索引用)
 *    meaning:   意味
 *    point:     ポイント解説 (HTML可)
 *    tags:      タグ配列 (多義語・派生重要・対義語ペア・発音注意・経済社会 等)
 *  }
 * ============================================================ */

const WORD_DATA = [
  {
    no: 1, word: "abolish", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "（法律・制度・慣習などを）廃止する、撤廃する",
    point: "制度や法律を「完全になくす」イメージ。名詞は <b>abolition</b>。slavery（奴隷制）, the death penalty（死刑）, a law と結びつく。≒ do away with, eliminate。",
    tags: ["派生重要", "社会"]
  },
  {
    no: 2, word: "abstract", pos: "［形/名/動］", posKey: "mixed", initial: "A",
    meaning: "［形］抽象的な ／［名］要約・抄録 ／［動］抽出する",
    point: "反意語は <b>concrete</b>（具体的な）。アクセントは 形・名で前（ábstract）、動で後ろ（abstráct）。論説文で「abstract concept/idea（抽象的概念）」で頻出。",
    tags: ["多義語", "対義語ペア", "発音注意"]
  },
  {
    no: 3, word: "accumulate", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "（徐々に）蓄積する、積もる",
    point: "名詞 <b>accumulation</b>。お金・知識・経験・ほこりなど「少しずつ溜まる」もの全般。wealth, knowledge, experience と相性◎。",
    tags: ["派生重要"]
  },
  {
    no: 4, word: "acknowledge", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "①（事実だと）認める ②（受領などを）認める・謝意を表す",
    point: "発音 /əkˈnɒlɪdʒ/（g は読まない）、スペル注意。acknowledge that … / acknowledge ~ing。≒ admit, recognize。名詞 <b>acknowledgment</b>。",
    tags: ["多義語", "発音注意"]
  },
  {
    no: 5, word: "acquire", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "（努力して）習得する、（徐々に）獲得する",
    point: "語学・技能の「習得」によく使う（acquire a skill/language）。企業の「買収」の意味も（→ <b>acquisition</b>）。≒ obtain, gain。",
    tags: ["派生重要", "経済"]
  },
  {
    no: 6, word: "adequate", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "（必要を満たす程度に）十分な、適切な",
    point: "「十分すぎる」でなく「必要十分・ぎりぎり足りる」のニュアンス。反意語 <b>inadequate</b>。≒ sufficient。be adequate for/to do。",
    tags: ["対義語ペア"]
  },
  {
    no: 7, word: "advocate", pos: "［動/名］", posKey: "mixed", initial: "A",
    meaning: "［動 -keit］主張する・提唱する ／［名 -kət］擁護者・支持者",
    point: "動詞と名詞で語尾の発音が違う頻出語。advocate ~ing / advocate for …。名詞 <b>advocacy</b>（擁護運動）。≒ support, promote。",
    tags: ["発音注意", "社会"]
  },
  {
    no: 8, word: "aesthetic", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "美的な、審美的な、美学の",
    point: "発音注意 /esˈθetɪk/（エスˈセティック、英では /iːs-/ も）。名詞 <b>aesthetics</b>（美学）。芸術・デザイン論で頻出。",
    tags: ["発音注意"]
  },
  {
    no: 9, word: "alleviate", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "（苦痛・問題などを）緩和する、軽減する",
    point: "pain, stress, poverty, symptoms など「マイナスなもの」を和らげる。≒ relieve, ease, mitigate。名詞 <b>alleviation</b>。",
    tags: ["派生重要"]
  },
  {
    no: 10, word: "ambiguous", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "（複数の解釈ができて）曖昧な、多義的な",
    point: "「複数の意味に取れる」が核心。反意語 unambiguous, clear。名詞 <b>ambiguity</b>。vague（漠然）とは「二通りに取れる」点で区別されることも。",
    tags: ["派生重要"]
  },
  {
    no: 11, word: "anticipate", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "予期する、（予想して）前もって備える／楽しみに待つ",
    point: "単なる expect と違い「先を読んで備える」含み。<b>anticipate ~ing</b>（to不定詞は不可）。名詞 <b>anticipation</b>。",
    tags: ["文法注意"]
  },
  {
    no: 12, word: "apparent", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "①明白な ②見かけ上の（実際は違うかも）",
    point: "超重要多義語。文脈で意味が真逆気味に変わる。副詞 <b>apparently</b>（どうやら～らしい：伝聞・推量）が会話・長文ともに頻出。",
    tags: ["多義語"]
  },
  {
    no: 13, word: "arbitrary", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "恣意的な、（規則でなく）気まぐれな、独断的な",
    point: "「客観的根拠なく、その場で決める」。アクセント <b>ár</b>-bi-trar-y。an arbitrary decision/choice。",
    tags: ["発音注意"]
  },
  {
    no: 14, word: "assess", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "（価値・程度・状況を）評価する、査定する",
    point: "「程度を見積もって判断する」。≒ evaluate。名詞 <b>assessment</b>。risk / damage / situation を assess。",
    tags: ["派生重要"]
  },
  {
    no: 15, word: "assume", pos: "［動］", posKey: "verb", initial: "A",
    meaning: "①（証拠なしに）当然と思う・仮定する ②（役割・責任を）引き受ける",
    point: "多義語。assume that … の「思い込む」が読解頻出。②は assume responsibility/control/a role。名詞 <b>assumption</b>（前提・思い込み）は超頻出。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 16, word: "authentic", pos: "［形］", posKey: "adj", initial: "A",
    meaning: "本物の、真正の、信頼できる",
    point: "fake / counterfeit（偽物）の反対。authentic Japanese food（本格的な和食）。名詞 <b>authenticity</b>。",
    tags: ["派生重要"]
  },
  {
    no: 17, word: "autonomy", pos: "［名］", posKey: "noun", initial: "A",
    meaning: "自律、自治、自主性",
    point: "アクセント au-<b>tón</b>-o-my。形容詞 <b>autonomous</b>（自律した／自動運転の：autonomous car）。≒ independence。",
    tags: ["発音注意", "社会"]
  },
  {
    no: 18, word: "bias", pos: "［名/動］", posKey: "mixed", initial: "B",
    meaning: "偏見、先入観、偏り",
    point: "<b>be biased</b> (against/toward)「偏っている」。統計・心理・メディア論で頻出。≒ prejudice。中立は unbiased, objective。",
    tags: ["社会"]
  },
  {
    no: 19, word: "coherent", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "（話・論理が）首尾一貫した、筋の通った",
    point: "論理がつながっている状態。反意語 <b>incoherent</b>。名詞 <b>coherence</b>。英作文の評価項目にもなる語。",
    tags: ["対義語ペア"]
  },
  {
    no: 20, word: "coincide", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①（時間的に）同時に起こる ②一致する・合致する",
    point: "coincide with …。名詞 <b>coincidence</b>（偶然の一致）が頻出で、「偶然」の含みを伴うことが多い。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 21, word: "commodity", pos: "［名］", posKey: "noun", initial: "C",
    meaning: "商品、（特に）必需品・一次産品",
    point: "経済長文の超頻出語。日用品から原油・穀物などの市況商品まで。複数 commodities。",
    tags: ["経済"]
  },
  {
    no: 22, word: "compensate", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①埋め合わせる ②補償する・賠償する",
    point: "<b>compensate for …</b>（不足・損失を補う）。名詞 <b>compensation</b>（補償金・報酬）。≒ make up for。",
    tags: ["派生重要", "経済"]
  },
  {
    no: 23, word: "competent", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "有能な、（職務を果たす）能力のある",
    point: "「ずば抜けて優秀」より「きちんとこなせる」レベル。反意語 <b>incompetent</b>。名詞 <b>competence</b>。",
    tags: ["対義語ペア"]
  },
  {
    no: 24, word: "comprehensive", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "包括的な、総合的な、網羅的な",
    point: "comprehend（理解する）と混同注意。意味は「広く全部カバーする」。a comprehensive study/plan。アクセント com-pre-<b>hén</b>-sive。",
    tags: ["発音注意"]
  },
  {
    no: 25, word: "compromise", pos: "［名/動］", posKey: "mixed", initial: "C",
    meaning: "①妥協（する）・歩み寄る ②（信用・安全などを）損なう・危うくする",
    point: "reach/make a compromise。②「危険にさらす」（compromise security）が長文で意外な意味として狙われる。",
    tags: ["多義語"]
  },
  {
    no: 26, word: "conceive", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①思いつく・考え出す ②想像する ③妊娠する",
    point: "conceive of …。形容詞 <b>conceivable</b>（考えうる）/ <b>inconceivable</b>（信じられない）。名詞 concept, conception。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 27, word: "condemn", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①（強く）非難する ②（建物を）使用禁止にする・（刑に）処す",
    point: "発音 /kənˈdem/（語尾 -mn の n は黙字。派生で復活：condemnation /-mˈneɪ-/）。condemn ~ for …。≒ criticize（より強い）。",
    tags: ["多義語", "発音注意"]
  },
  {
    no: 28, word: "confront", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①（問題・困難に）立ち向かう・直面する ②（人に）立ち向かう・問い詰める",
    point: "<b>be confronted with/by …</b>（～に直面させられる）。名詞 <b>confrontation</b>（対立・対決）。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 29, word: "consensus", pos: "［名］", posKey: "noun", initial: "C",
    meaning: "（意見の）一致、総意",
    point: "スペル注意（× concensus）。reach (a) consensus。≒ agreement。「全員一致に近い合意」のニュアンス。",
    tags: ["スペル注意", "社会"]
  },
  {
    no: 30, word: "constitute", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①～を構成する ②（～と）みなされる・に相当する",
    point: "「A constitute B = A が集まって B を成す」。②「～にあたる」（This constitutes a crime.）が論説で頻出。名詞 <b>constitution</b>（憲法／構成／体質）。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 31, word: "contradict", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "①矛盾する ②反論する・否定する",
    point: "contra（反）+ dict（言う）。名詞 <b>contradiction</b>（矛盾）、形容詞 contradictory。論理を扱う長文の核心語。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 32, word: "controversial", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "議論を呼ぶ、賛否の分かれる",
    point: "名詞 <b>controversy</b>（論争）のアクセントに注意（<b>cón</b>-tro-ver-sy が一般的）。a controversial issue/topic。",
    tags: ["発音注意", "社会"]
  },
  {
    no: 33, word: "conventional", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "①従来の・在来型の ②慣習的な・型通りの",
    point: "名詞 <b>convention</b>（慣習／大会・条約）。「最新でない＝従来の」の意味が頻出（conventional weapons：通常兵器）。≒ traditional。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 34, word: "correlate", pos: "［動］", posKey: "verb", initial: "C",
    meaning: "相関関係がある、関連づける",
    point: "correlate with …。名詞 <b>correlation</b>（相関）。<b>「相関＝因果（causation）ではない」</b>はデータ系長文の定番テーマ。",
    tags: ["派生重要", "経済"]
  },
  {
    no: 35, word: "credible", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "信用できる、（話などが）信じられる",
    point: "cred（信じる）系。incredible（信じられない／すごい）, credulous（だまされやすい）と区別。名詞 <b>credibility</b>（信頼性）。",
    tags: ["派生重要"]
  },
  {
    no: 36, word: "crucial", pos: "［形］", posKey: "adj", initial: "C",
    meaning: "（決定的に）極めて重要な",
    point: "「これがないと結果が決まらない」ほど重要。≒ critical, vital, essential。crucial to/for …。発音 /ˈkruːʃl/。",
    tags: ["発音注意"]
  },
  {
    no: 37, word: "deceive", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "だます、欺く",
    point: "スペル -ei-（\"i before e except after c\" の典型）。名詞 deception, deceit。形容詞 <b>deceptive</b>（人を欺くような・紛らわしい）。",
    tags: ["スペル注意", "派生重要"]
  },
  {
    no: 38, word: "deduce", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "（一般原理から）推論する、演繹する",
    point: "deduce ~ from …。名詞 <b>deduction</b>（演繹／（給与の）控除）。⇔ induce/induction（帰納）。論理・推理系で頻出。",
    tags: ["対義語ペア", "派生重要"]
  },
  {
    no: 39, word: "deficient", pos: "［形］", posKey: "adj", initial: "D",
    meaning: "（必要なものが）不足している、欠乏した",
    point: "<b>be deficient in …</b>（～が欠けている）。名詞 deficiency（欠乏症）, deficit（赤字・不足）。⇔ sufficient。",
    tags: ["対義語ペア", "経済"]
  },
  {
    no: 40, word: "deliberate", pos: "［形/動］", posKey: "mixed", initial: "D",
    meaning: "［形 -rət］意図的な・慎重な ／［動 -reit］熟考する・審議する",
    point: "形容詞は「わざとやった＝故意の」（a deliberate lie）。副詞 <b>deliberately</b>（わざと）。品詞で語尾の発音が変わる。",
    tags: ["発音注意", "多義語"]
  },
  {
    no: 41, word: "denote", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "（記号・語が）～を示す、意味する",
    point: "≒ indicate, signify。<b>connote</b>（言外に含意する）と対比で出る（denote=明示的意味, connote=含意）。",
    tags: ["対義語ペア"]
  },
  {
    no: 42, word: "deprive", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "（必要なもの・権利を）奪う、剥奪する",
    point: "<b>deprive A of B</b>（A から B を奪う）の型が最頻出。受け身 be deprived of …。形容詞 deprived（恵まれない）。",
    tags: ["コロケーション", "社会"]
  },
  {
    no: 43, word: "derive", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "①得る・引き出す ②由来する",
    point: "derive A from B / derive from …。名詞 derivation, <b>derivative</b>（派生物／（金融）デリバティブ）。",
    tags: ["多義語", "派生重要", "経済"]
  },
  {
    no: 44, word: "deteriorate", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "悪化する、劣化する",
    point: "発音注意 /dɪˈtɪəriəreɪt/（de-<b>té</b>-rio-rate）。health, situation, relations が deteriorate。⇔ improve。名詞 deterioration。",
    tags: ["発音注意"]
  },
  {
    no: 45, word: "diminish", pos: "［動］", posKey: "verb", initial: "D",
    meaning: "①減少する・減らす ②（価値・評価を）低める",
    point: "≒ decrease, reduce。⇔ increase。<b>diminishing returns（収穫逓減）</b>は経済の重要表現。",
    tags: ["多義語", "経済"]
  },
  {
    no: 46, word: "discrepancy", pos: "［名］", posKey: "noun", initial: "D",
    meaning: "（あるべきものとの）食い違い、不一致",
    point: "a discrepancy between A and B。データ・証言・数字の「ズレ」に使う。≒ inconsistency, gap。",
    tags: ["経済"]
  },
  {
    no: 47, word: "distinct", pos: "［形］", posKey: "adj", initial: "D",
    meaning: "①（はっきり）別個の・異なる ②明瞭な",
    point: "distinct from …。<b>distinctive</b>（独特の）と区別。名詞 distinction（区別／卓越）。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 48, word: "diverse", pos: "［形］", posKey: "adj", initial: "D",
    meaning: "多様な、さまざまな",
    point: "名詞 <b>diversity</b>（多様性）は頻出テーマ。動詞 diversify（多様化する）。≒ varied。",
    tags: ["派生重要", "社会"]
  },
  {
    no: 49, word: "dominant", pos: "［形］", posKey: "adj", initial: "D",
    meaning: "支配的な、優勢な、（遺伝で）優性の",
    point: "動詞 dominate、名詞 dominance。⇔ recessive（劣性）/ subordinate。生物・社会論で頻出。",
    tags: ["派生重要", "社会"]
  },
  {
    no: 50, word: "elaborate", pos: "［形/動］", posKey: "mixed", initial: "E",
    meaning: "［形 -rət］精巧な・手の込んだ ／［動 -reit］詳しく述べる",
    point: "動詞は <b>elaborate on …</b>（～について詳述する）。形容詞「凝った」（an elaborate plan）。品詞で発音変化。",
    tags: ["発音注意", "多義語"]
  },
  {
    no: 51, word: "eliminate", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "①取り除く・排除する ②（競技などで）敗退させる",
    point: "eliminate A from B。名詞 elimination。≒ remove, get rid of。",
    tags: ["多義語"]
  },
  {
    no: 52, word: "emerge", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "①現れる・出現する ②（事実が）明らかになる",
    point: "emerge from …。形容詞 <b>emerging</b>（新興の：emerging markets 新興市場＝経済頻出）。emergency（緊急）とは別語。",
    tags: ["多義語", "経済"]
  },
  {
    no: 53, word: "empirical", pos: "［形］", posKey: "adj", initial: "E",
    meaning: "経験的な、実証的な、観察に基づく",
    point: "「理論・推測でなく、実験・観察データに基づく」。empirical evidence/study。⇔ theoretical。理系・社会科学で頻出。",
    tags: ["対義語ペア", "社会"]
  },
  {
    no: 54, word: "enhance", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "（質・価値・程度を）高める、向上させる",
    point: "「もともと良いものを更に良くする」。enhance quality/ability/value。≒ improve, boost。名詞 enhancement。",
    tags: ["派生重要"]
  },
  {
    no: 55, word: "entail", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "（必然的に）伴う、必要とする、引き起こす",
    point: "≒ involve, require。「A には当然 B が付いてくる」。This job entails a lot of travel.",
    tags: ["コロケーション"]
  },
  {
    no: 56, word: "evident", pos: "［形］", posKey: "adj", initial: "E",
    meaning: "明白な、明らかな",
    point: "It is evident that …。副詞 evidently（明らかに／どうやら）。名詞 evidence。≒ obvious, apparent, clear。",
    tags: ["派生重要"]
  },
  {
    no: 57, word: "evoke", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "（感情・記憶・イメージを）呼び起こす、喚起する",
    point: "evoke memories/emotions。<b>invoke</b>（神・法などに訴える・発動する）と混同注意。名詞 evocation。",
    tags: ["まぎらわしい"]
  },
  {
    no: 58, word: "exaggerate", pos: "［動］", posKey: "verb", initial: "E",
    meaning: "誇張する、大げさに言う",
    point: "スペル注意（-gg-、語尾 -ate）。名詞 exaggeration。「実際より大きく」表現すること。",
    tags: ["スペル注意"]
  },
  {
    no: 59, word: "explicit", pos: "［形］", posKey: "adj", initial: "E",
    meaning: "明示的な、はっきり述べられた／露骨な",
    point: "⇔ <b>implicit</b>（暗黙の）。この対義語ペアは論説で超頻出。副詞 explicitly。",
    tags: ["対義語ペア"]
  },
  {
    no: 60, word: "exploit", pos: "［動/名］", posKey: "mixed", initial: "E",
    meaning: "［動 -plóit］①搾取する ②（資源・機会を）活用する ／［名 éx-ploit］偉業",
    point: "マイナス（人を搾取）とプラス（うまく活用）の両義。名詞 <b>exploitation</b>（搾取／開発）。環境・労働の長文で頻出。",
    tags: ["多義語", "発音注意", "社会"]
  },
  {
    no: 61, word: "facilitate", pos: "［動］", posKey: "verb", initial: "F",
    meaning: "促進する、容易にする、（会議の）進行役を務める",
    point: "「物事をスムーズに進める手助けをする」。≒ ease, make easier。名詞 facilitator（進行役）, facility（施設／才能）。",
    tags: ["派生重要"]
  },
  {
    no: 62, word: "feasible", pos: "［形］", posKey: "adj", initial: "F",
    meaning: "実現可能な、実行できる",
    point: "≒ possible, viable。a feasible plan。名詞 feasibility（feasibility study：実現可能性調査）。",
    tags: ["派生重要", "経済"]
  },
  {
    no: 63, word: "fluctuate", pos: "［動］", posKey: "verb", initial: "F",
    meaning: "（不規則に）変動する、上下する",
    point: "prices/temperatures/rates が fluctuate。名詞 <b>fluctuation</b>。経済・データ長文の定番。",
    tags: ["経済"]
  },
  {
    no: 64, word: "fundamental", pos: "［形］", posKey: "adj", initial: "F",
    meaning: "根本的な、基本的な、不可欠な",
    point: "fundamental to …。名詞 fundamentals（基礎・基本事項）。≒ basic, essential。アクセント fun-da-<b>mén</b>-tal。",
    tags: ["発音注意"]
  },
  {
    no: 65, word: "hypothesis", pos: "［名］", posKey: "noun", initial: "H",
    meaning: "仮説",
    point: "複数形 <b>hypotheses</b> /-siːz/、アクセント hy-<b>póth</b>-e-sis に注意。動詞 hypothesize、形容詞 hypothetical（仮定の）。⇔ theory（より確立）。",
    tags: ["発音注意", "社会"]
  },
  {
    no: 66, word: "illuminate", pos: "［動］", posKey: "verb", initial: "I",
    meaning: "①照らす・明るくする ②（疑問などを）解明する・わかりやすくする",
    point: "比喩で「理解に光を当てる」。≒ clarify, shed light on。名詞 illumination。",
    tags: ["多義語"]
  },
  {
    no: 67, word: "implication", pos: "［名］", posKey: "noun", initial: "I",
    meaning: "①（通例複数で）影響・結果 ②含意・ほのめかし",
    point: "動詞 imply の名詞。the implications of …（～がもたらす潜在的影響）。「結論の含意」を問う読解で頻出。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 68, word: "impose", pos: "［動］", posKey: "verb", initial: "I",
    meaning: "①（税・規則・罰を）課す ②（意見などを）押し付ける",
    point: "<b>impose A on B</b>。impose on/upon …（人に迷惑をかける・つけ込む）も。名詞 imposition。",
    tags: ["多義語", "コロケーション", "経済"]
  },
  {
    no: 69, word: "inadequate", pos: "［形］", posKey: "adj", initial: "I",
    meaning: "不十分な、（能力的に）力不足の",
    point: "adequate の否定。feel inadequate（力不足だと感じる）。アクセント in-<b>ád</b>-e-quate。",
    tags: ["対義語ペア", "発音注意"]
  },
  {
    no: 70, word: "incentive", pos: "［名］", posKey: "noun", initial: "I",
    meaning: "（行動を促す）動機、誘因、奨励（金）",
    point: "経済学のキーワード。an incentive to do。≒ motivation, stimulus。",
    tags: ["経済"]
  },
  {
    no: 71, word: "inevitable", pos: "［形］", posKey: "adj", initial: "I",
    meaning: "避けられない、必然の",
    point: "It is inevitable that …。副詞 inevitably（必然的に・どうしても）。≒ unavoidable。アクセント in-<b>év</b>-i-ta-ble。",
    tags: ["発音注意"]
  },
  {
    no: 72, word: "infer", pos: "［動］", posKey: "verb", initial: "I",
    meaning: "推測する、（情報から）結論づける",
    point: "「書かれていない情報を読み取る」＝読解設問（Infer from the passage …）で最頻出。<b>話し手が imply、聞き手が infer</b>（方向が逆）。名詞 inference。",
    tags: ["まぎらわしい", "派生重要"]
  },
  {
    no: 73, word: "inherent", pos: "［形］", posKey: "adj", initial: "I",
    meaning: "（性質として）本来備わっている、固有の",
    point: "<b>be inherent in …</b>。「外から加わったのでなく内在する」。副詞 inherently。≒ intrinsic。",
    tags: ["コロケーション"]
  },
  {
    no: 74, word: "integrate", pos: "［動］", posKey: "verb", initial: "I",
    meaning: "①統合する・一体化する ②（社会に）溶け込ませる",
    point: "integrate A into/with B。名詞 integration。<b>integrity</b>（誠実さ／完全性）は別語として要注意。⇔ segregate（分離する）。",
    tags: ["多義語", "まぎらわしい", "社会"]
  },
  {
    no: 75, word: "intricate", pos: "［形］", posKey: "adj", initial: "I",
    meaning: "複雑な、入り組んだ",
    point: "≒ complex, complicated。細部が絡み合った「精巧な複雑さ」。an intricate pattern/system。",
    tags: []
  },
  {
    no: 76, word: "justify", pos: "［動］", posKey: "verb", initial: "J",
    meaning: "正当化する、（行為の）正しさを示す",
    point: "justify ~ing。名詞 justification。\"The end justifies the means（目的は手段を正当化する）\" は定番。≒ defend, warrant。",
    tags: ["派生重要"]
  },
  {
    no: 77, word: "legitimate", pos: "［形］", posKey: "adj", initial: "L",
    meaning: "①合法的な・正当な ②（理由などが）もっともな",
    point: "⇔ illegitimate。a legitimate concern（もっともな懸念）。動詞 legitimize。アクセント le-<b>gít</b>-i-mate。",
    tags: ["多義語", "発音注意", "社会"]
  },
  {
    no: 78, word: "manipulate", pos: "［動］", posKey: "verb", initial: "M",
    meaning: "①（巧みに・不正に）操作する ②（道具などを）うまく扱う",
    point: "人を「操る」マイナス用法が頻出。data manipulation も。名詞 manipulation。",
    tags: ["多義語"]
  },
  {
    no: 79, word: "notion", pos: "［名］", posKey: "noun", initial: "N",
    meaning: "概念、考え、観念",
    point: "≒ idea, concept。have no notion of …（～が全くわからない）。「the notion that …（～という考え）」の形が論説で頻出。",
    tags: ["社会"]
  },
  {
    no: 80, word: "obscure", pos: "［形/動］", posKey: "mixed", initial: "O",
    meaning: "［形］①不明瞭な・わかりにくい ②無名の ／［動］覆い隠す・わかりにくくする",
    point: "⇔ clear / famous。動詞用法（曇らせる・隠す）も長文で。名詞 obscurity。",
    tags: ["多義語"]
  },
  {
    no: 81, word: "obstacle", pos: "［名］", posKey: "noun", initial: "O",
    meaning: "障害（物）、妨げ",
    point: "an obstacle to …（～への障害）。overcome an obstacle（障害を克服する）。≒ barrier, hindrance。",
    tags: ["コロケーション"]
  },
  {
    no: 82, word: "perceive", pos: "［動］", posKey: "verb", initial: "P",
    meaning: "①知覚する・気づく ②（～と）みなす・受け取る",
    point: "<b>perceive A as B</b>（A を B と捉える）。名詞 perception（知覚／受け止め方）、形容詞 perceptive（洞察力のある）。認知・心理系で頻出。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 83, word: "persistent", pos: "［形］", posKey: "adj", initial: "P",
    meaning: "①持続する・根強い ②しつこい・粘り強い",
    point: "動詞 persist（<b>persist in ~ing</b>：あくまで～し続ける）。名詞 persistence（粘り強さ）。a persistent problem。",
    tags: ["多義語", "コロケーション"]
  },
  {
    no: 84, word: "phenomenon", pos: "［名］", posKey: "noun", initial: "P",
    meaning: "現象、（驚くべき）事象",
    point: "複数形 <b>phenomena</b> に注意（\"phenomena is\" は誤り）。アクセント phe-<b>nóm</b>-e-non。a natural/social phenomenon。",
    tags: ["発音注意", "社会"]
  },
  {
    no: 85, word: "plausible", pos: "［形］", posKey: "adj", initial: "P",
    meaning: "もっともらしい、（一見）信じられそうな",
    point: "「説得力があるが本当とは限らない」含み。a plausible explanation。⇔ implausible。≒ credible, believable。",
    tags: ["対義語ペア"]
  },
  {
    no: 86, word: "prevail", pos: "［動］", posKey: "verb", initial: "P",
    meaning: "①普及している・広く行き渡る ②（最終的に）勝つ・打ち勝つ",
    point: "prevail over/against …（打ち勝つ）。形容詞 prevailing（一般的な）/ prevalent（広まっている）、名詞 prevalence。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 87, word: "profound", pos: "［形］", posKey: "adj", initial: "P",
    meaning: "①深遠な・深い ②（影響などが）甚大な",
    point: "a profound effect/impact（多大な影響）。≒ deep（抽象的な「深さ」）。副詞 profoundly。",
    tags: ["多義語"]
  },
  {
    no: 88, word: "prohibit", pos: "［動］", posKey: "verb", initial: "P",
    meaning: "（法・規則で）禁止する",
    point: "<b>prohibit A from ~ing</b>。≒ ban, forbid（forbid 人 to do）。名詞 prohibition。法律・規則の長文で頻出。",
    tags: ["コロケーション", "社会"]
  },
  {
    no: 89, word: "prominent", pos: "［形］", posKey: "adj", initial: "P",
    meaning: "①際立った・目立つ ②著名な・卓越した",
    point: "a prominent figure（著名人）。名詞 prominence。≒ outstanding, eminent。",
    tags: ["多義語"]
  },
  {
    no: 90, word: "provoke", pos: "［動］", posKey: "verb", initial: "P",
    meaning: "①（反応・感情を）引き起こす ②挑発する・怒らせる",
    point: "provoke a reaction/anger。形容詞 <b>provocative</b>（挑発的な・刺激的な）。名詞 provocation。",
    tags: ["多義語", "派生重要"]
  },
  {
    no: 91, word: "reluctant", pos: "［形］", posKey: "adj", initial: "R",
    meaning: "気が進まない、しぶしぶの",
    point: "<b>be reluctant to do</b>。副詞 reluctantly。名詞 reluctance。⇔ willing, eager。",
    tags: ["コロケーション", "対義語ペア"]
  },
  {
    no: 92, word: "resemble", pos: "［動］", posKey: "verb", initial: "R",
    meaning: "似ている、類似する",
    point: "<b>他動詞</b>で前置詞を取らない（× resemble to / × resemble with）点が文法問題で頻出。名詞 resemblance（類似点）。",
    tags: ["文法注意"]
  },
  {
    no: 93, word: "restrain", pos: "［動］", posKey: "verb", initial: "R",
    meaning: "①（行動・感情を）抑える・制止する ②拘束する",
    point: "restrain oneself（自制する）。名詞 <b>restraint</b>（抑制・自制）。≒ hold back, curb。restrict（制限する）と区別。",
    tags: ["多義語", "まぎらわしい"]
  },
  {
    no: 94, word: "scrutinize", pos: "［動］", posKey: "verb", initial: "S",
    meaning: "精査する、綿密に調べる",
    point: "名詞 <b>scrutiny</b>（精査・厳しい監視）。under scrutiny（注視されて）。≒ examine closely, inspect。",
    tags: ["派生重要"]
  },
  {
    no: 95, word: "simultaneous", pos: "［形］", posKey: "adj", initial: "S",
    meaning: "同時の、同時に起こる",
    point: "副詞 simultaneously。simultaneous interpretation（同時通訳）。アクセント si-mul-<b>tá</b>-ne-ous。",
    tags: ["発音注意"]
  },
  {
    no: 96, word: "subtle", pos: "［形］", posKey: "adj", initial: "S",
    meaning: "①微妙な・かすかな ②巧妙な・繊細な",
    point: "発音注意 /ˈsʌtl/（<b>b は黙字</b>＝「サトゥル」）。a subtle difference（微妙な違い）。名詞 subtlety、副詞 subtly。",
    tags: ["発音注意", "多義語"]
  },
  {
    no: 97, word: "sufficient", pos: "［形］", posKey: "adj", initial: "S",
    meaning: "（必要を満たすのに）十分な",
    point: "sufficient for/to do。⇔ insufficient。名詞 sufficiency。≒ enough, adequate（adequate より「足りている」が中立的）。",
    tags: ["対義語ペア"]
  },
  {
    no: 98, word: "tangible", pos: "［形］", posKey: "adj", initial: "T",
    meaning: "①触れられる・有形の ②明白な・具体的な",
    point: "⇔ <b>intangible</b>（無形の：intangible assets 無形資産＝経済頻出）。tangible evidence/results（具体的成果）。",
    tags: ["対義語ペア", "経済"]
  },
  {
    no: 99, word: "undermine", pos: "［動］", posKey: "verb", initial: "U",
    meaning: "（徐々に）弱める、（土台を）むしばむ、損なう",
    point: "under（下）+ mine（坑道を掘る）→「足元を掘り崩す」。undermine confidence/authority/efforts。≒ weaken。",
    tags: ["コロケーション"]
  },
  {
    no: 100, word: "vulnerable", pos: "［形］", posKey: "adj", initial: "V",
    meaning: "①傷つきやすい・（攻撃・影響に）弱い ②（立場が）脆弱な",
    point: "<b>be vulnerable to …</b>（～に対して弱い・さらされやすい）。発音 /ˈvʌlnərəbl/。名詞 vulnerability。⇔ resilient（回復力のある）。",
    tags: ["コロケーション", "発音注意", "対義語ペア"]
  },
];

/* ============================================================
 *  覚え方のコツ（おまけ）— md 原典より
 * ============================================================ */
const STUDY_TIPS = [
  {
    icon: "fa-layer-group",
    title: "派生語ごと覚える",
    body: "abolish→abolition、imply→implication のように、動詞・名詞・形容詞をセットで。入試は派生形で出題されることが多い。"
  },
  {
    icon: "fa-arrows-left-right",
    title: "対義語ペアで覚える",
    body: "explicit ⇔ implicit、tangible ⇔ intangible、deduce ⇔ induce など。一気に2語入る。"
  },
  {
    icon: "fa-shuffle",
    title: "多義語を最優先で",
    body: "apparent / assume / exploit / compromise / prevail などは、辞書的な意味より「文脈でどっちの意味か」を見抜く練習が効く。"
  },
  {
    icon: "fa-link",
    title: "コロケーション（語の相性）で覚える",
    body: "deprive A of B、impose A on B、be reluctant to do のように、前置詞・型ごと覚えると英作文でもそのまま使える。"
  },
  {
    icon: "fa-volume-high",
    title: "発音/アクセントの罠",
    body: "subtle, condemn, phenomena, hypothesis, aesthetic, deteriorate あたりはリスニング・アクセント問題で狙われやすい。"
  }
];

/* タグ → 表示メタ（色クラス・ラベル） */
const TAG_META = {
  "多義語":      { label: "多義語",      cls: "tag-poly" },
  "派生重要":    { label: "派生重要",    cls: "tag-deriv" },
  "対義語ペア":  { label: "対義語ペア",  cls: "tag-anto" },
  "発音注意":    { label: "発音注意",    cls: "tag-pron" },
  "スペル注意":  { label: "スペル注意",  cls: "tag-spell" },
  "文法注意":    { label: "文法注意",    cls: "tag-gram" },
  "コロケーション": { label: "コロケーション", cls: "tag-collo" },
  "まぎらわしい": { label: "まぎらわしい", cls: "tag-confuse" },
  "経済":        { label: "経済",        cls: "tag-econ" },
  "社会":        { label: "社会",        cls: "tag-social" },
};

/* 品詞分類メタ */
const POS_META = {
  verb:  { label: "動詞",   icon: "fa-bolt" },
  adj:   { label: "形容詞", icon: "fa-palette" },
  noun:  { label: "名詞",   icon: "fa-cube" },
  mixed: { label: "複数品詞", icon: "fa-shapes" },
};

if (typeof window !== "undefined") {
  window.WORD_DATA = WORD_DATA;
  window.STUDY_TIPS = STUDY_TIPS;
  window.TAG_META = TAG_META;
  window.POS_META = POS_META;
}

