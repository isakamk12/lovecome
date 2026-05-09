document.addEventListener('DOMContentLoaded', () => {
    // 魔法の粉（パーティクル）の生成
    createMagicDust();

    // 作品データのレンダリング
    renderBookshelf();

    // タグフィルタリング機能
    setupTagFilters();
});

/**
 * 作品データ
 */
const NOVEL_DATA = [
    // 英数字
    { author: "100chobori", title: "最後の一滴", tags: ["英数字", "社会人", "現代", "少し不思議"] },
    { author: "Aki Dortu", title: "【恋愛】物足りない恋人たち", tags: ["英数字", "社会人", "現代恋愛", "ほのぼの"] },
    { author: "Asaya", title: "菜の花畑で、君を待つ", tags: ["英数字", "百合", "ホラー・ダーク", "青春"] },
    { author: "K", title: "大女優の恋、引き受けます。", tags: ["英数字", "学園・青春", "ラブコメ"] },
    { author: "KMT", title: "コスモガール", tags: ["英数字", "学園・青春", "SF・ファンタジー"] },
    { author: "Megumi", title: "火刑台で記憶を取り戻した悪役令嬢は、異端審問官を跪かせる 新作", tags: ["英数字", "異世界", "悪役令嬢", "ヤンデレ・執着"] },
    { author: "NIKE", title: "【完結】誘拐されたので、3日後に私を殺す裏社会最強の殺し屋に、告白してみた結果", tags: ["英数字", "現代", "ダークロマンス"] },
    { author: "PPHiT", title: "学年一の才女を拾ったら癒されました", tags: ["英数字", "学園・青春", "同居生活", "ラブコメ"] },
    { author: "R.D", title: "このハッカー、ネーミングセンス皆無につき。 ～都市伝説《K》の正体は、ミルクティーを愛する無自覚系女子高生～", tags: ["英数字", "現代", "コメディ", "サイバー"] },
    { author: "Arare", title: "【完結】おねショタに抗え、日本兵！", tags: ["英数字", "異世界", "コメディ", "ほのぼの"] },
    { author: "KMT", title: "幸せの旅路", tags: ["英数字", "青春", "ヒューマンドラマ", "現代"] },
    { author: "ono", title: "この世界はあまりにも傷付いた", tags: ["英数字", "コメディ", "異世界"] },
    { author: "mifune5252", title: "龍鱗の記憶〜憧憬のアルヴィス〜", tags: ["英数字", "サスペンス", "ヒューマンドラマ", "戦争・歴史"] },
    { author: "@tiana0405", title: "鈴虫が泣く頃に", tags: ["英数字", "現代恋愛", "純文学", "少し不思議"] },
    { author: "ウルトラサイダー", title: "西園寺万里は○したい！", tags: ["英数字", "ヤンデレ・執着", "学園・青春", "ラブコメ"] },
    { author: "kuratano", title: "スルー・ザ・夜伽！ ～鉄壁巫女は神に溺愛される～", tags: ["英数字", "SF・ファンタジー", "ラブコメ", "コメディ"] },
    { author: "ono", title: "巡礼", tags: ["英数字", "異世界", "SF・ファンタジー"] },

    // あ行
    { author: "あっぴー", title: "下心、丸聞こえ！ 地獄の婿選び", tags: ["あ行", "ホラー・ダーク", "ラブコメ", "少し不思議"] },
    { author: "アサギリナオト", title: "深海の転生者", tags: ["あ行", "SF・ファンタジー", "現代恋愛"] },
    { author: "安堂 英", title: "女の子の自分に無いもの第一話（その1）", tags: ["あ行", "学園・青春", "現代恋愛", "ほのぼの"] },
    { author: "位相 朔", title: "ダウン着て、ダウン", tags: ["あ行", "ホラー・ダーク", "少し不思議", "社会人"] },
    { author: "伊阪 証", title: "夫人革命逃亡記", tags: ["あ行", "主催者", "異世界"] },
    { author: "伊阪 証", title: "Lovely Baddy", tags: ["あ行", "主催者", "SF・ファンタジー", "学園・青春"] },
    { author: "伊阪 証", title: "逆タイムカプセル", tags: ["あ行", "主催者", "SF・ファンタジー", "学園・青春"] },
    { author: "伊阪 証", title: "言葉は少し不器用なので", tags: ["あ行", "主催者", "学園・青春", "少し不思議", "ラブコメ"] },
    { author: "伊阪 証", title: "ヘイト･ラブ･コンバージョン", tags: ["あ行", "主催者", "SF・ファンタジー", "ヤンデレ・執着", "ダークロマンス"] },
    { author: "伊阪 証", title: "半端にスイッチング", tags: ["あ行", "主催者", "ラブコメ", "少し不思議"] },
    { author: "伊阪 証", title: "エスカレーション･ハート", tags: ["あ行", "主催者", "現代恋愛", "ホラー・ダーク"] },
    { author: "伊阪 証", title: "元ヤン悪役令嬢", tags: ["あ行", "主催者", "悪役令嬢", "異世界"] },
    { author: "伊阪 証", title: "怪奇作家の恋愛事情", tags: ["あ行", "主催者", "社会人", "ホラー・ダーク", "現代恋愛"] },
    { author: "伊阪 証", title: "レンタル彼氏vsレンタル彼女", tags: ["あ行", "主催者", "社会人", "ラブコメ", "現代恋愛"] },
    { author: "伊阪 証", title: "Trendy Treading Trangedy", tags: ["あ行", "主催者", "SF・ファンタジー", "ホラー・ダーク"] },
    { author: "伊阪 証", title: "十年前マッチングアプリ", tags: ["あ行", "主催者", "社会人", "現代恋愛"] },
    { author: "伊阪 証", title: "注文の多いラブコメディ", tags: ["あ行", "主催者", "学園・青春", "ラブコメ", "ほのぼの"] },
    { author: "伊阪 証", title: "陸上部vs美術部 〜トップスピードと一本線の物語〜", tags: ["あ行", "主催者", "学園・青春"] },
    { author: "伊阪 証", title: "読書感想文と君", tags: ["あ行", "主催者", "学園・青春"] },
    { author: "伊阪 証", title: "私なら伝えられる", tags: ["あ行", "主催者", "社会人", "現代"] },
    { author: "伊阪 証", title: "お弁当のかたより", tags: ["あ行", "主催者", "現代", "ほのぼの"] },
    { author: "伊阪 証", title: "雪解けの春", tags: ["あ行", "主催者", "現代", "ほのぼの"] },
    { author: "伊阪 証", title: "猫のように君は去る", tags: ["あ行", "主催者", "現代"] },
    { author: "伊阪 証", title: "失恋専門医", tags: ["あ行", "主催者", "少し不思議", "現代"] },
    { author: "伊阪 証", title: "ラブコメディの後始末", tags: ["あ行", "主催者", "学園・青春", "ラブコメ"] },
    { author: "伊阪 証", title: "泡立つ脳", tags: ["あ行", "主催者", "SF・ファンタジー", "社会人", "現代恋愛"] },
    { author: "うつせみ", title: "男をATM扱いする性格最悪なVTuberの中身が、同じクラスの惣菜屋の看板娘だった話", tags: ["あ行", "学園・青春", "ラブコメ"] },
    { author: "えいじ", title: "まさかのマッチング", tags: ["あ行", "社会人", "現代恋愛", "ラブコメ"] },
    { author: "詠夢 凛", title: "気高き令嬢は、その秘めやかな彼＜イチモツ＞をただ愛でたいだけ", tags: ["あ行", "学園・青春", "コメディ"] },
    { author: "縁代まと", title: "【本編完結】白永くんはいっぱい食べたい ～転生したら食事の神だったので、すべて美味しくいただきます！～", tags: ["あ行", "異世界", "SF・ファンタジー", "ほのぼの"] },
    { author: "有木珠乃", title: "召喚された司書の相談所〜偽装結婚ですが旦那様にひたすら尽くされています〜", tags: ["あ行", "異世界", "ほのぼの", "SF・ファンタジー"] },
    { author: "明日見 慧", title: "天の川星", tags: ["あ行", "現代", "ヒューマンドラマ"] },
    { author: "一本杉省吾", title: "手をつないで 幼き頃、抱いた殺意", tags: ["あ行", "ヒューマンドラマ", "現代"] },
    { author: "エスツー", title: "クレイジーレズと呼ばれた少女、自分が戦闘あり乙女ゲーの大ボス悪役令嬢だと気付いたので開き直って今世で推しのサブキャラメイドを愛でる", tags: ["あ行", "異世界", "悪役令嬢", "百合", "コメディ"] },
    { author: "あとろん", title: "204X年、AIが孤独を埋めてくれたので、結婚する理由がわからなくなった 〜君がいなくても生きられる世界で、君と生きたいと思った〜", tags: ["あ行", "現代", "SF・ファンタジー", "社会人", "現代恋愛"] },
    { author: "秋野凛花", title: "ふわめで！〜ふわりちゃんは今日も御曹司をふわふわ愛でる。〜", tags: ["あ行", "現代恋愛", "ほのぼの"] },
    { author: "有木珠乃＠『ヒロ弟』コミカライズ配信中", title: "帝不在の平安後宮〜それでも私が入内する理由〜", tags: ["あ行", "ミステリー", "現代恋愛", "戦争・歴史"] },

    // か行
    { author: "海凪ととかる@沈没ライフ", title: "れすとあ。─モンキーガール、風になる─ 最新", tags: ["か行", "学園・青春"] },
    { author: "柿井優嬉", title: "私の彼氏はだらしない", tags: ["か行", "現代恋愛", "ほのぼの"] },
    { author: "加須 千花", title: "紅艶 〜大豪族につかえる三人の女官、恋物語〜", tags: ["か行", "ヤンデレ・執着", "ほのぼの"] },
    { author: "加藤裕也", title: "シスコン馬鹿は、あきらめない。", tags: ["か行", "少し不思議", "ラブコメ", "学園・青春"] },
    { author: "金森 亮", title: "初恋は四つの君を殺してしまう。", tags: ["か行", "ホラー・ダーク", "学園・青春", "現代恋愛"] },
    { author: "かず斉入道", title: "俺流の徳川家康はこうだ！ 未来を知る俺が尽くすならば、同じ悪役令嬢様ならば織田の姫様よりも今川の姫様の方に使える事にした！", tags: ["か行", "異世界", "悪役令嬢", "SF・ファンタジー"] },
    { author: "軽部雄二", title: "野球の王子様２ 芦田愛菜はマネージャーになりたい", tags: ["か行", "学園・青春", "コメディ"] },
    { author: "黒白のアレ。", title: "ゲーム世界に転生した。そして災悪に恋をした。", tags: ["か行", "異世界", "SF・ファンタジー", "ラブコメ"] },
    { author: "暮雲 ＠日光嫌い", title: "幼馴染が、義妹でグイグイ来る話〜家族になってから距離がおかしい彼女と、拒否できない私〜", tags: ["か行", "百合", "学園・青春", "同居生活"] },
    { author: "胡", title: "マンボウはストレスで死ぬ", tags: ["か行", "ホラー・ダーク", "SF・ファンタジー"] },
    { author: "古池ケロ太", title: "心を読めるクラスの氷姫がドヤ顔で僕の心を看破してくるんだけど、一つも当たってない件", tags: ["か行", "学園・青春", "ラブコメ", "少し不思議", "コメディ"] },
    { author: "小向 八雲", title: "「凶」から始まる四匹と一人 〜おみくじを引いたら美女悪神が憑いてきた件〜", tags: ["か行", "SF・ファンタジー", "コメディ"] },
    { author: "小向 八雲", title: "冥王夫婦とニッポンの冬", tags: ["か行", "SF・ファンタジー", "ラブコメ", "同居生活", "コメディ"] },
    { author: "固定標識", title: "黄身を喰らう", tags: ["か行", "ホラー・ダーク", "SF・ファンタジー", "ヤンデレ・執着", "現代恋愛"] },
    { author: "川埜榮娜", title: "＊本編完結＊ ゴリマッチョが大好きな令嬢のお話～周りには細マッチョしか居ないので諦めていたら、王城で理想のゴリマッチョと出会いました。頑張って旦那様にしたいと思います～", tags: ["か行", "異世界", "ラブコメ", "コメディ"] },
    { author: "北園れら", title: "キジも鳴かずば撃たれまい！", tags: ["か行", "サスペンス", "アクション", "ミステリー", "ホラー・ダーク"] },
    { author: "古朗伍", title: "懐いてた年下の女の子が三年空けると口が悪くなってた話", tags: ["か行", "ラブコメ", "現代恋愛", "学園・青春"] },
    { author: "小森さつき", title: "この関係、経過観察中〜補講で出会った二人は、まだ恋じゃない〜", tags: ["か行", "学園・青春", "現代恋愛", "ほのぼの"] },
    { author: "甲斐柄ほたて", title: "失われし月の花は湖上に咲く", tags: ["か行", "現代", "ミステリー", "少し不思議"] },
    { author: "交換日記", title: "短歌ギャラリー「猫と満月」", tags: ["か行", "現代", "純文学", "ほのぼの"] },

    // さ行
    { author: "坂道冬秋", title: "クルリ〜お母さんとママ〜", tags: ["さ行", "SF・ファンタジー", "少し不思議"] },
    { author: "桜百合", title: "嘘と煙草、君と夕 ──女装したらギャルと友達になった話──", tags: ["さ行", "学園・青春", "ラブコメ"] },
    { author: "サッドライプ", title: "夢現世界の災凶姫～Disastress in the Parasomnias～", tags: ["さ行", "異世界", "ヤンデレ・執着", "ラブコメ"] },
    { author: "佐斗ナサト", title: "蒼き炎のジャヤシュリー", tags: ["さ行", "SF・ファンタジー"] },
    { author: "沙華やや子", title: "i-ro-go-to", tags: ["さ行", "社会人", "現代恋愛"] },
    { author: "紗世", title: "彼と再婚した日、私はまだ“誰かの代わり”だった", tags: ["さ行", "社会人", "現代恋愛", "ダークロマンス"] },
    { author: "式部", title: "アダムを噛んで、熱を吸う", tags: ["さ行", "学園・青春", "ヤンデレ・執着", "ダークロマンス"] },
    { author: "白神天稀", title: "(自称)幼馴染が『存在しない思い出』を植え付けようとしてる！？", tags: ["さ行", "学園・青春", "ラブコメ"] },
    { author: "終末の色", title: "【GW限定】千年エルフのリゼルカさん SS part2", tags: ["さ行", "異世界", "SF・ファンタジー", "ほのぼの"] },
    { author: "セキド烏雲", title: "転生したら『異世界』だった件 ——勘違いしたイタい転生者が秒で自滅する特異点ギルドの日常とモブ達の物語", tags: ["さ行", "異世界", "コメディ", "ヤンデレ・執着"] },
    { author: "志熊みゅう", title: "『お前が運命の番だなんて最悪だ』と言われたので、魔女に愛を消してもらいました", tags: ["さ行", "異世界", "SF・ファンタジー", "ホラー・ダーク"] },
    { author: "すまげんちゃんねる", title: "その恋愛フラグ、折らせていただきます。～折れば折るほど、彼が“落ちる”音が聞こえる～", tags: ["さ行", "学園・青春", "ラブコメ", "コメディ"] },
    { author: "スマイルゼロ", title: "わたくし恋なんてしていませんわ！〜恋愛バトルは乙女の嗜み〜", tags: ["さ行", "学園・青春", "ラブコメ", "アクション", "コメディ"] },
    { author: "すとろう", title: "クラスのイケてるギャルにＡＥＤ使ったら「イケメンならなぁ」と愚痴られたんですが……", tags: ["さ行", "学園・青春", "現代恋愛", "コメディ"] },
    { author: "深海さん", title: "俺が彼女がいると嘘をついたらなぜかクラスのアイドルが距離を詰めてきた話", tags: ["さ行", "学園・青春", "ラブコメ", "現代恋愛"] },
    { author: "ささやん", title: "（修正中）賢者を引退して山小屋暮らしの私が訳ありエルフを嫁にするまで", tags: ["さ行", "異世界", "SF・ファンタジー", "ほのぼの"] },

    // た行
    { author: "田仲らんが", title: "最強の魔女が記憶喪失のフリをしたら〜幼馴染に「記憶を失う前からこうだったよ？」とありえんくらい甘えられる件〜【百合】", tags: ["た行", "百合", "ヤンデレ・執着", "ラブコメ", "SF・ファンタジー"] },
    { author: "ちづ", title: "蛞蝓にも角がある", tags: ["た行", "ホラー・ダーク", "SF・ファンタジー"] },
    { author: "円つみき", title: "ただ、恋愛するだけの話――リングを降りた君と 第二部", tags: ["た行", "社会人", "現代恋愛"] },
    { author: "手塚エマ", title: "僕の教室の隣には国民的アイドルが座っている", tags: ["た行", "学園・青春", "ラブコメ"] },
    { author: "通りすがりの冒険者", title: "魔界王立パンデモニウム女学園生徒会の憂鬱 〜コミケの帰りにいきなり魔界に飛ばされたら、生徒会の雑務係になったんだが？〜", tags: ["た行", "異世界", "学園・青春", "コメディ", "ラブコメ"] },
    { author: "丹暮", title: "美人すぎる先輩がいるんだが、射撃部所属って何その部活？え？俺も入るの？え？トップを目指すの？", tags: ["た行", "現代恋愛", "コメディ", "ラブコメ", "学園・青春"] },
    { author: "千古不易", title: "カケヨメ！‐文芸シットコム‐", tags: ["た行", "学園・青春", "コメディ", "ヒューマンドラマ"] },
    { author: "黄昏一刻", title: "サレ賢者の俺TSUREEE! 間男勇者と元嫁シタ剣士パーティが地獄過ぎて笑う", tags: ["た行", "異世界", "SF・ファンタジー", "ホラー・ダーク", "コメディ"] },
    { author: "滝村礼二", title: "音間さんは音MADがお好き", tags: ["た行", "学園・青春", "ラブコメ", "コメディ"] },

    // な行
    { author: "直三二郭", title: "【完結】紋常時篤飛露は強いが弱い 〜彼と彼女と、そして家族と〜", tags: ["な行", "学園・青春", "ホラー・ダーク", "ラブコメ", "SF・ファンタジー"] },
    { author: "七瀬絢斗", title: "彼女がギャルになった理由を、俺は知らない。", tags: ["な行", "サスペンス", "現代", "現代恋愛"] },
    { author: "奈月遥", title: "指し子姫", tags: ["な行", "現代", "社会人"] },
    { author: "並木空", title: "外伝・氷の公爵と白姫菊", tags: ["な行", "異世界", "SF・ファンタジー"] },

    // は行
    { author: "花咲たいざ", title: "カノジョの鼻毛がこんにちは ～進化した人類は鼻毛を選択した～", tags: ["は行", "学園・青春", "ラブコメ", "SF・ファンタジー", "コメディ"] },
    { author: "妃水", title: "食べる", tags: ["は行", "ホラー・ダーク", "学園・青春", "ヤンデレ・執着"] },
    { author: "ファッション＠スカリー", title: "茨姫にフラれた俺がなりゆきで付き合ったのは、茨姫に瓜二つの俺の恋愛相談役の子でした", tags: ["は行", "学園・青春", "ラブコメ"] },
    { author: "冬乃一華", title: "ラトノアの狂戦士", tags: ["は行", "SF・ファンタジー", "ホラー・ダーク"] },
    { author: "フルーツロールx", title: "ダチュラの恋 〜恋した相手は敵でした〜", tags: ["は行", "ラブコメ", "現代"] },
    { author: "へるきち", title: "神聖カワサキ帝国の王女様と近衛騎士", tags: ["は行", "現代", "SF・ファンタジー", "コメディ"] },
    { author: "ぽにみゅら", title: "とある騎士の馴れ初め物語～まわしの女奴隷～", tags: ["は行", "SF・ファンタジー", "コメディ"] },
    { author: "ぽにみゅら", title: "ハードボイルド（自称）な僕にラブコメみたいな青春は似合わない", tags: ["は行", "学園・青春", "ラブコメ", "コメディ"] },
    { author: "ぽんぽこ解放太郎", title: "【全裸で最強】おっぱいプルプルぽんぽこダンスで無防備感を極め、世界一になりました", tags: ["は行", "学園・青春", "コメディ", "ラブコメ"] },
    { author: "ヒナゲシ２号", title: "愛より深し", tags: ["は行", "純文学", "ヒューマンドラマ", "戦争・歴史"] },
    { author: "藤咲紫亜", title: "白猫に惑う律動、紅薔薇に捧ぐ輪舞曲", tags: ["は行", "異世界", "現代恋愛", "ヒューマンドラマ"] },
    { author: "深谷ぼくたちん家", title: "ビオトープ！", tags: ["は行", "百合", "ラブコメ", "学園・青春"] },
    { author: "春街はる", title: "彼女の遺書", tags: ["は行", "現代", "SF・ファンタジー", "現代恋愛"] },
    { author: "白米おしょう", title: "拝啓、輝くあなたへ☆【お前なんなん？続編】", tags: ["は行", "現代", "コメディ", "学園・青春", "青春"] },
    { author: "品画十帆", title: "病院アイドルをプロデュース", tags: ["は行", "学園・青春", "現代恋愛", "ほのぼの"] },

    // ま行
    { author: "真野魚尾", title: "キューピッドは密やかに微笑む", tags: ["ま行", "現代恋愛", "社会人"] },
    { author: "みなみくん", title: "深海シンドローム彼女", tags: ["ま行", "少し不思議"] },
    { author: "みなみくん", title: "プラトニックラプソディ", tags: ["ま行", "現代", "現代恋愛"] },
    { author: "みなみくん", title: "れいんあふたーざれいにー", tags: ["ま行", "学園・青春", "現代恋愛"] },
    { author: "ミンミンこおろぎ", title: "【完結】普通の女の子？のアタシ、冒険者やってます。", tags: ["ま行", "異世界", "SF・ファンタジー", "ラブコメ"] },
    { author: "もちもちしっぽ", title: "花婿図鑑〜もふもふ姫が真実の愛を掴むまでの研究記録〜", tags: ["ま行", "異世界", "SF・ファンタジー", "ほのぼの", "ラブコメ"] },
    { author: "湊 マチ", title: "【完結】家族との愛、秘密の恋――その選択は運命を大きく変える。 成功の影で揺れる心、破壊と再生の物語。 圧倒的な感動と共感がここにある。", tags: ["ま行", "現代", "ヒューマンドラマ", "純文学"] },

    // や行
    { author: "八尾 遥", title: "天邪鬼な私に、宣戦布告されました。", tags: ["や行", "学園・青春", "ラブコメ"] },
    { author: "八ツ手谷 蔦", title: "訳ありぼっち令嬢、悪辣辺境伯様に拾われました", tags: ["や行", "異世界", "悪役令嬢", "ラブコメ"] },
    { author: "ゆいゆい", title: "卒業旅行でクラスの私以外の女子全員が幼馴染と付き合っていたことが判明した話", tags: ["や行", "学園・青春", "コメディ"] },
    { author: "夢神 蒼茫", title: "王子の初恋と黒薔薇の剣姫", tags: ["や行", "SF・ファンタジー"] },
    { author: "ヨッシー", title: "サクラサク", tags: ["や行", "ラブコメ", "コメディ", "学園・青春"] },

    // わ行
    { author: "らっぽん", title: "『俺のせいで学園一の美少女の株価（好感度）がストップ高なんだが』", tags: ["ら行", "学園・青春", "ラブコメ", "コメディ"] },

    // 複数名義
    { author: "荒川瀰都土＆産土", title: "幼なじみがくる！", tags: ["複数名義", "学園・青春", "SF・ファンタジー", "同居生活", "ラブコメ"] }
];

/**
 * メルヘンなカラーパレット
 */
const BOOK_COLORS = [
    "#4a2531", "#2b3a4a", "#3b4a3b", "#5a3c22", 
    "#4a1b41", "#1b3a4a", "#4a441b", "#4a1b1b",
    "#2d4a1b", "#1b1b4a", "#4a321b", "#321b4a"
];

/**
 * 本棚をレンダリングする関数
 */
function renderBookshelf() {
    const container = document.getElementById('bookshelf-container');
    if (!container) return;

    container.innerHTML = ''; // クリア

    NOVEL_DATA.forEach((book, index) => {
        const bookEl = createBookElement(book, index);
        container.appendChild(bookEl);
    });
}

/**
 * 本の要素（HTML）を生成する関数
 */
function createBookElement(data, index) {
    const article = document.createElement('article');
    article.classList.add('book');
    article.setAttribute('data-tags', data.tags.join(','));
    
    // カラーの決定（ループ）
    const color = BOOK_COLORS[index % BOOK_COLORS.length];
    article.style.setProperty('--book-color', color);
    
    // 読み込みアニメーションの遅延
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    setTimeout(() => {
        article.style.transition = 'all 0.6s ease';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
    }, 100 + index * 30);

    // タイトルの改行処理（長すぎる場合に備えて）
    const displayTitle = data.title.length > 20 ? data.title.substring(0, 18) + "..." : data.title;

    article.innerHTML = `
        <div class="book-cover">
            <div class="book-decoration top"></div>
            <h2 class="book-title">${displayTitle}</h2>
            <p class="book-author">著：${data.author}</p>
            <div class="book-tags">
                ${data.tags.map(tag => `<span class="mini-tag">#${tag}</span>`).join('')}
            </div>
            <div class="book-decoration bottom"></div>
        </div>
        <div class="book-spine"></div>
        <div class="book-pages"></div>
    `;

    return article;
}

/**
 * 背景の「魔法の粉」エフェクトを生成する関数
 */
function createMagicDust() {
    const container = document.getElementById('magic-dust-container');
    const particleCount = 40; 

    for (let i = 0; i < particleCount; i++) {
        const dust = document.createElement('div');
        dust.classList.add('dust');
        
        const size = Math.random() * 3 + 1; 
        const posX = Math.random() * 100; 
        const delay = Math.random() * 4; 
        const duration = Math.random() * 3 + 3; 

        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${posX}vw`;
        dust.style.animationDelay = `${delay}s, ${delay}s`;
        dust.style.animationDuration = `${duration}s, 2s`; 

        container.appendChild(dust);
    }
}

/**
 * タグクリック時のフィルタリング処理
 */
function setupTagFilters() {
    const filterButtons = document.querySelectorAll('.tag');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // アクティブ状態の切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const books = document.querySelectorAll('.book');

            books.forEach(book => {
                const bookTags = book.getAttribute('data-tags').split(',');
                
                if (filterValue === 'all' || bookTags.includes(filterValue)) {
                    book.style.display = 'block';
                    setTimeout(() => {
                        book.style.opacity = '1';
                        book.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    book.style.opacity = '0';
                    book.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        book.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}
