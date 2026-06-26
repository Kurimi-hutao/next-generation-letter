export const sourceNotes = {
  title: "创作与资料边界",
  paragraphs: [
    "《把牢底坐穿》是何敬平在狱中创作的诗作，并非写给当代青年的真实书信。本页面采用“来信/回信”的艺术化叙事形式。",
    "部分问答文字为创作者依据历史资料进行的当代化叙事转述，并非历史人物原话。",
    "AI 辅助画面仅用于象征性场景和转场，不作为历史影像资料。真实历史或城市照片保留来源署名入口。",
    "本作品避免生成英烈正面肖像、伪造历史档案、伪造亲笔信，不使用影视剧画面冒充历史资料。"
  ],
  attribution: [
    "H01/H03：Fanghong，CC BY 2.5，Wikimedia Commons。",
    "H02/H04：Yumeto，CC BY-SA 4.0，Wikimedia Commons。",
    "H05：Zhou Guanhuai，CC BY-SA 4.0，Wikimedia Commons。",
    "E01/E03：Jason_she，CC BY-SA 3.0，Wikimedia Commons。",
    "E02：Xiang Xinyu，CC BY-SA 4.0，Wikimedia Commons。",
    "L01：Gisling / 唐戈，CC BY-SA 3.0，Wikimedia Commons。",
    "F01：Serratedtrout，CC BY-SA 4.0，Wikimedia Commons。",
    "F02：Daniel Lu，CC BY-SA 4.0，Wikimedia Commons。",
    "F03：Graeme Bray，CC BY 3.0，Wikimedia Commons。",
    "F04：Harvey Barrison，CC BY-SA 2.0，Wikimedia Commons。"
  ]
};

export const chapters = [
  {
    id: "prologue",
    number: "00",
    title: "序章：谁是“下一代”",
    shortTitle: "序章",
    theme: "history-dark",
    height: 2600,
    eyebrow: "1948 年，重庆。",
    headline: "下一代，来信了",
    lead: ["有人在黑暗中，写下了三个字：", "下一代。"],
    paragraphs: [
      "你们曾为了下一代，选择留在黑暗里。",
      "今天，我们就是你们盼望的下一代。",
      "这封信，写给所有未能看见黎明的人。"
    ],
    assets: [
      { src: "00_Cover/AI_Cover_DarkLetter.webp", alt: "黑暗中浮现的空白旧信纸", role: "hero", position: "center 42%", ai: true },
      { src: "00_Cover/AI_WindowLight.webp", alt: "铁窗投下的微弱光线", role: "support", position: "center center", ai: true }
    ],
    archiveNotes: ["封面情境图为 AI 辅助创作，不作为历史影像资料。"],
    aiDisclosure: "本画面为 AI 辅助情境化创作。"
  },
  {
    id: "archive",
    number: "01",
    title: "黑暗中的来信",
    shortTitle: "来信",
    theme: "archive-dark",
    height: 3200,
    eyebrow: "那不是一封真正寄出的信。",
    headline: "是一首写在牢狱中的诗。",
    quote: "“为了免除下一代的苦难，我们愿——愿把这牢底坐穿。”",
    paragraphs: [
      "何敬平在《把牢底坐穿》中写下的这句话，成为这封回信的起点。",
      "它不是邀请我们缅怀痛苦，而是把一个问题递到今天：下一代，真的到来了吗？"
    ],
    assets: [
      { src: "01_History_Archive_Real/H01_Zhazidong_Exterior_2006.jpg", alt: "渣滓洞外景资料照片", role: "archive", position: "center center", real: true },
      { src: "01_History_Archive/AI_BlankPrisonPaper.webp", alt: "旧纸与短铅笔的象征画面", role: "paper", position: "center center", ai: true }
    ],
    archiveNotes: ["《把牢底坐穿》是诗作，并非写给当代青年的真实书信。", "真实照片仅作小幅档案影像使用。"],
    aiDisclosure: "空白旧纸为 AI 辅助情境化创作。"
  },
  {
    id: "three-days",
    number: "02",
    title: "距离黎明，只剩三天",
    shortTitle: "三天",
    theme: "ember",
    height: 3400,
    eyebrow: "1949.11.27",
    headline: "距离黎明，只剩三天。",
    paragraphs: [
      "解放的脚步，已经来到山城之外。",
      "可有些人，永远停在了黎明之前。",
      "他们不知道，自己牺牲以后，那个“下一代”是否真的会到来。"
    ],
    assets: [
      { src: "01_History_Archive/AI_FireShadowWall.webp", alt: "火光映照的墙面与紧闭木门", role: "hero", position: "center 48%", ai: true },
      { src: "01_History_Archive/Overlay_BurntEdge.png", alt: "", role: "overlay", position: "center center", decorative: true, ai: true }
    ],
    archiveNotes: ["本章采用象征性火光和纸边，不展示血腥场面。"],
    aiDisclosure: "火光墙影为 AI 辅助情境化创作。"
  },
  {
    id: "too-light",
    number: "03",
    title: "一句太轻的回答",
    shortTitle: "回答",
    theme: "desk-night",
    height: 3000,
    eyebrow: "2026 年，一个大学生提笔写信。",
    headline: "可“很好”两个字，怎么能够回答一生？",
    letterDraft: ["敬爱的先辈：", "我们现在过得很", "好……"],
    paragraphs: [
      "高楼、桥梁、灯火和数字，真的就是他们等待的答案吗？",
      "于是我把这句太轻的回答划掉，带着那句“下一代”，走进今天的重庆。"
    ],
    assets: [
      { src: "02_Student_Letter/AI_ModernDeskNight.webp", alt: "现代自习室夜晚写信桌面", role: "hero", position: "center center", ai: true }
    ],
    archiveNotes: ["本章回信文字为当代叙事创作。"],
    aiDisclosure: "写信桌面为 AI 辅助情境化创作。"
  },
  {
    id: "city-answer",
    number: "04",
    title: "去一座城市里寻找回答",
    shortTitle: "城市",
    theme: "transition-blue",
    height: 2800,
    eyebrow: "2026 年，回信的人到了。",
    headline: "我想看看，他们曾经相信的未来，究竟长成了什么模样。",
    paragraphs: [
      "我走进校园、街巷、轨道和实验室。",
      "铁窗的竖线，变成桥索；桥索伸向轨道；轨道又通往一扇扇明亮的窗。"
    ],
    assets: [
      { src: "03_Transition/AI_BarsToBridge.webp", alt: "铁窗到桥索与轨道的转场画面", role: "hero", position: "center center", ai: true },
      { src: "03_Transition/AI_RedLineCity.webp", alt: "暗红线形成山城交通脉络", role: "overlay", position: "center center", ai: true }
    ],
    archiveNotes: ["本章为象征性转场，不对应具体历史档案。"],
    aiDisclosure: "转场图为 AI 辅助情境化创作。"
  },
  {
    id: "education",
    number: "05",
    title: "回信之一：我们有书读",
    shortTitle: "书读",
    theme: "morning",
    height: 3700,
    eyebrow: "你们曾担心的孩子，今天能够读书吗？",
    headline: "第一封回信：我们有书读",
    paragraphs: [
      "今天，知识不再是少数人的特权。",
      "我们可以坐在明亮的教室里，读自己选择的书，研究尚未解决的问题，也可以大胆想象一个还不存在的未来。",
      "你们说的“下一代”，已经能够用自己的眼睛认识世界。"
    ],
    assets: [
      { src: "04_Education_Real/E02_University_Morning.jpg", alt: "重庆大学校园晨光资料照片", role: "hero", position: "center 45%", real: true },
      { src: "04_Education/AI_ClassroomLight.webp", alt: "晨光照进空教室与书页", role: "paper", position: "center center", ai: true },
      { src: "04_Education_Real/E03_Huxi_Campus_Hill_Path.jpg", alt: "虎溪校区山间道路资料照片", role: "archive", position: "center center", real: true }
    ],
    archiveNotes: ["校园照片来自开放许可素材，页面进行了低饱和统一调色。"],
    aiDisclosure: "教室晨光为 AI 辅助情境化创作。"
  },
  {
    id: "ordinary-life",
    number: "06",
    title: "回信之二：我们有路走",
    shortTitle: "路走",
    theme: "ordinary",
    height: 3700,
    eyebrow: "今天的重庆，不只是一片灯火。",
    headline: "第二封回信：我们有路走",
    paragraphs: [
      "清晨，有人掀开蒸笼，有人穿过雨雾，有人沿着轨道去上班。",
      "这些普通日子不是宏大的口号，却是“下一代”真正抵达的地方。",
      "我们有路可以走，也有人愿意把路继续修得更稳、更亮。"
    ],
    assets: [
      { src: "05_OrdinaryLife_Real/L01_Chongqing_Snack_Shop.jpg", alt: "重庆街边小吃店资料照片", role: "hero", position: "center 55%", real: true },
      { src: "05_OrdinaryLife/Overlay_WarmSteam.png", alt: "", role: "overlay", decorative: true, ai: true },
      { src: "05_OrdinaryLife/Overlay_RainFog.png", alt: "", role: "overlay", decorative: true, ai: true }
    ],
    archiveNotes: ["生活素材用于表现普通人的日常，不作为城市旅游宣传图。"],
    aiDisclosure: "蒸汽与雨雾为透明叠加素材。"
  },
  {
    id: "future",
    number: "07",
    title: "回信之三：我们有梦可以追",
    shortTitle: "追梦",
    theme: "future-dawn",
    height: 3700,
    eyebrow: "今天的青年，能否亲手参与未来的建造？",
    headline: "第三封回信：我们有梦可以追",
    paragraphs: [
      "你们曾经等待一个新的中国。",
      "今天的我们，正在学习怎样制造机器、建造桥梁，设计程序、治疗疾病、探索星空。",
      "我们不必再等待别人决定未来。我们可以亲手参与它的建造。"
    ],
    assets: [
      { src: "06_Future/AI_MechanicalDawn.webp", alt: "机械、桥梁和实验仪器与黎明的象征画面", role: "hero", position: "center center", ai: true },
      { src: "06_Future_Real/F02_Chaotianmen_Bridge_Fog_2026.jpg", alt: "重庆桥梁与江面雾色资料照片", role: "wide", position: "center center", real: true }
    ],
    archiveNotes: ["本章保留真实金属、桥梁和晨光质感，避免科幻化界面。"],
    aiDisclosure: "机械晨光为 AI 辅助情境化创作。"
  },
  {
    id: "remembrance",
    number: "08",
    title: "我们仍然记得",
    shortTitle: "记得",
    theme: "remembrance",
    height: 2800,
    eyebrow: "回到红岩旧址。",
    headline: "我终于明白，最重要的回答，不只是“我们过得很好”。",
    paragraphs: [
      "还应该告诉你们：",
      "我们没有忘记。",
      "记得，不是停在过去；记得，是知道今天的光从哪里来。"
    ],
    assets: [
      { src: "01_History_Archive_Real/H05_Geleshan_Martyrs_Mausoleum.jpg", alt: "歌乐山烈士陵园资料照片", role: "hero", position: "center 45%", real: true },
      { src: "07_Remembrance/Overlay_RedPlum.png", alt: "", role: "overlay", decorative: true, ai: true }
    ],
    archiveNotes: ["纪念场景采用留白和背影式叙事，不做表演式悲情。"],
    aiDisclosure: "红梅叠加为 AI 辅助画面。"
  },
  {
    id: "ending",
    number: "09",
    title: "尾声：写给再下一代",
    shortTitle: "尾声",
    theme: "ending",
    height: 2700,
    eyebrow: "完整回信，在晨光中展开。",
    headline: "下一代，来信了",
    letter: [
      "敬爱的先辈：",
      "我们就是你们曾经牵挂的下一代。",
      "今天，我们有书可以读，有路可以走，有梦想可以追逐。",
      "你们没有看见的黎明，已经照进校园、街巷、车间，也照进了千万个普通人的生活。",
      "但我们知道，仅仅享受这束光，还不够。",
      "我们也要像你们一样，为尚未到来的下一代，留下一座更好的城市，一个更明亮的明天。",
      "这封回信，还没有结束。它将由我们继续写下去。"
    ],
    paragraphs: [
      "你们为下一代守住信仰，我们为再下一代守住黎明。",
      "记录时代脉搏，激扬青年声音。"
    ],
    assets: [
      { src: "08_Ending/AI_UnfoldedLetter.webp", alt: "晨光中展开的长信纸", role: "paper", position: "center center", ai: true },
      { src: "08_Ending/AI_FinalDawn.webp", alt: "重庆山城江面与黎明的象征画面", role: "hero", position: "center 48%", ai: true }
    ],
    archiveNotes: ["资料说明、图片来源和 AI 标注均压入尾章内部。"],
    aiDisclosure: "尾章画面为 AI 辅助情境化创作。"
  }
];
