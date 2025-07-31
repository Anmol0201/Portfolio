// Language detection and multilingual support utilities
export type SupportedLanguage =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "hi"
  | "ja"
  | "ko"
  | "zh"
  | "ar"
  | "pt"
  | "ru"
  | "it";

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  direction: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    direction: "ltr",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    direction: "ltr",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    direction: "ltr",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    direction: "ltr",
  },
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    direction: "ltr",
  },
  ko: {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    direction: "ltr",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    direction: "ltr",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    direction: "ltr",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    direction: "ltr",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    direction: "ltr",
  },
};

// Language detection patterns
const LANGUAGE_PATTERNS: Record<SupportedLanguage, RegExp[]> = {
  en: [/\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/gi],
  es: [/\b(el|la|los|las|un|una|y|o|en|de|a|por|para|con|es|está|son)\b/gi],
  fr: [
    /\b(le|la|les|un|une|et|ou|de|du|des|à|dans|sur|pour|avec|est|sont)\b/gi,
  ],
  de: [
    /\b(der|die|das|ein|eine|und|oder|in|auf|zu|für|mit|ist|sind|haben)\b/gi,
  ],
  hi: [/[\u0900-\u097F]/g],
  ja: [/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g],
  ko: [/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g],
  zh: [/[\u4E00-\u9FFF]/g],
  ar: [/[\u0600-\u06FF]/g],
  pt: [/\b(o|a|os|as|um|uma|e|ou|em|de|para|com|é|são|está|estão)\b/gi],
  ru: [/[\u0400-\u04FF]/g],
  it: [/\b(il|la|lo|i|le|gli|un|una|e|o|in|di|a|da|per|con|è|sono)\b/gi],
};

// Detect language from text
export function detectLanguage(text: string): SupportedLanguage {
  const scores: Record<SupportedLanguage, number> = {
    en: 0,
    es: 0,
    fr: 0,
    de: 0,
    hi: 0,
    ja: 0,
    ko: 0,
    zh: 0,
    ar: 0,
    pt: 0,
    ru: 0,
    it: 0,
  };

  // Count matches for each language
  Object.entries(LANGUAGE_PATTERNS).forEach(([lang, patterns]) => {
    patterns.forEach((pattern) => {
      const matches = text.match(pattern) || [];
      scores[lang as SupportedLanguage] += matches.length;
    });
  });

  // Find language with highest score
  const detectedLang = Object.entries(scores).reduce((a, b) =>
    scores[a[0] as SupportedLanguage] > scores[b[0] as SupportedLanguage]
      ? a
      : b
  )[0] as SupportedLanguage;

  // Return English if no matches found
  return scores[detectedLang] > 0 ? detectedLang : "en";
}

// Get system prompt for specific language
export function getLanguageSystemPrompt(language: SupportedLanguage): string {
  const prompts: Record<SupportedLanguage, string> = {
    en: "You are Anmol's AI portfolio assistant. Respond in English with clear formatting.",
    es: "Eres el asistente de IA del portafolio de Anmol. Responde en español con formato claro.",
    fr: "Vous êtes l'assistant IA du portfolio d'Anmol. Répondez en français avec un formatage clair.",
    de: "Sie sind Anmols KI-Portfolio-Assistent. Antworten Sie auf Deutsch mit klarer Formatierung.",
    hi: "आप अनमोल के AI पोर्टफोलियो असिस्टेंट हैं। स्पष्ट फॉर्मेटिंग के साथ हिंदी में जवाब दें।",
    ja: "あなたはAnmolのAIポートフォリオアシスタントです。明確なフォーマットで日本語で応答してください。",
    ko: "당신은 Anmol의 AI 포트폴리오 어시스턴트입니다. 명확한 형식으로 한국어로 응답하세요.",
    zh: "您是Anmol的AI作品集助手。请用中文回答，格式清晰。",
    ar: "أنت مساعد محفظة الذكاء الاصطناعي لأنمول. اجب باللغة العربية مع تنسيق واضح.",
    pt: "Você é o assistente de IA do portfólio do Anmol. Responda em português com formatação clara.",
    ru: "Вы являетесь AI-помощником портфолио Анмола. Отвечайте на русском языке с четким форматированием.",
    it: "Sei l'assistente IA del portfolio di Anmol. Rispondi in italiano con formattazione chiara.",
  };

  return prompts[language];
}

// Get UI translations
export function getUITranslations(language: SupportedLanguage) {
  const translations: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      chatTitle: "Anmol's AI Assistant",
      placeholder: "Ask me about Anmol's projects, skills, or experience...",
      send: "Send",
      clear: "Clear",
      retry: "Retry",
      typing: "AI is typing...",
      error: "Error occurred",
      offline: "Offline mode",
      languageSelector: "Language",
    },
    es: {
      chatTitle: "Asistente IA",
      placeholder:
        "Pregúntame sobre los proyectos, habilidades o experiencia de Anmol...",
      send: "Enviar",
      clear: "Limpiar",
      retry: "Reintentar",
      typing: "La IA está escribiendo...",
      error: "Error ocurrido",
      offline: "Modo sin conexión",
      languageSelector: "Idioma",
    },
    fr: {
      chatTitle: "Assistant IA",
      placeholder:
        "Demandez-moi à propos des projets, compétences ou expérience d'Anmol...",
      send: "Envoyer",
      clear: "Effacer",
      retry: "Réessayer",
      typing: "L'IA tape...",
      error: "Erreur survenue",
      offline: "Mode hors ligne",
      languageSelector: "Langue",
    },
    de: {
      chatTitle: "KI-Assistent",
      placeholder:
        "Fragen Sie mich über Anmols Projekte, Fähigkeiten oder Erfahrungen...",
      send: "Senden",
      clear: "Löschen",
      retry: "Wiederholen",
      typing: "KI tippt...",
      error: "Fehler aufgetreten",
      offline: "Offline-Modus",
      languageSelector: "Sprache",
    },
    hi: {
      chatTitle: "AI सहायक",
      placeholder: "अनमोल की परियोजनाओं, कौशल या अनुभव के बारे में पूछें...",
      send: "भेजें",
      clear: "साफ़ करें",
      retry: "पुनः प्रयास",
      typing: "AI टाइप कर रहा है...",
      error: "त्रुटि हुई",
      offline: "ऑफ़लाइन मोड",
      languageSelector: "भाषा",
    },
    ja: {
      chatTitle: "AIアシスタント",
      placeholder: "Anmolのプロジェクト、スキル、経験について聞いてください...",
      send: "送信",
      clear: "クリア",
      retry: "再試行",
      typing: "AIが入力中...",
      error: "エラーが発生しました",
      offline: "オフラインモード",
      languageSelector: "言語",
    },
    ko: {
      chatTitle: "AI 어시스턴트",
      placeholder: "Anmol의 프로젝트, 기술 또는 경험에 대해 물어보세요...",
      send: "전송",
      clear: "지우기",
      retry: "다시 시도",
      typing: "AI가 입력 중...",
      error: "오류 발생",
      offline: "오프라인 모드",
      languageSelector: "언어",
    },
    zh: {
      chatTitle: "AI助手",
      placeholder: "询问Anmol的项目、技能或经验...",
      send: "发送",
      clear: "清除",
      retry: "重试",
      typing: "AI正在输入...",
      error: "发生错误",
      offline: "离线模式",
      languageSelector: "语言",
    },
    ar: {
      chatTitle: "مساعد الذكاء الاصطناعي",
      placeholder: "اسألني عن مشاريع أنمول ومهاراته أو خبرته...",
      send: "إرسال",
      clear: "مسح",
      retry: "إعادة المحاولة",
      typing: "الذكاء الاصطناعي يكتب...",
      error: "حدث خطأ",
      offline: "وضع عدم الاتصال",
      languageSelector: "اللغة",
    },
    pt: {
      chatTitle: "Assistente IA",
      placeholder:
        "Pergunte-me sobre projetos, habilidades ou experiência do Anmol...",
      send: "Enviar",
      clear: "Limpar",
      retry: "Tentar novamente",
      typing: "IA está digitando...",
      error: "Erro ocorreu",
      offline: "Modo offline",
      languageSelector: "Idioma",
    },
    ru: {
      chatTitle: "ИИ Помощник",
      placeholder: "Спросите меня о проектах, навыках или опыте Анмола...",
      send: "Отправить",
      clear: "Очистить",
      retry: "Повторить",
      typing: "ИИ печатает...",
      error: "Произошла ошибка",
      offline: "Офлайн режим",
      languageSelector: "Язык",
    },
    it: {
      chatTitle: "Assistente IA",
      placeholder: "Chiedimi dei progetti, competenze o esperienza di Anmol...",
      send: "Invia",
      clear: "Cancella",
      retry: "Riprova",
      typing: "L'IA sta scrivendo...",
      error: "Errore verificato",
      offline: "Modalità offline",
      languageSelector: "Lingua",
    },
  };

  return translations[language] || translations.en;
}

// Get multilingual quick responses
export function getMultilingualQuickResponses(language: SupportedLanguage) {
  const responses: Record<
    SupportedLanguage,
    Array<{ question: string; response: string }>
  > = {
    en: [
      {
        question: "Tell me about Anmol's AI projects",
        response: "Ask about AI/ML projects",
      },
      {
        question: "What are his technical skills?",
        response: "Ask about programming skills",
      },
      {
        question: "How can I contact him?",
        response: "Ask for contact information",
      },
      {
        question: "What's his experience?",
        response: "Ask about work experience",
      },
    ],
    es: [
      {
        question: "Cuéntame sobre los proyectos de IA de Anmol",
        response: "Pregunta sobre proyectos de IA/ML",
      },
      {
        question: "¿Cuáles son sus habilidades técnicas?",
        response: "Pregunta sobre habilidades de programación",
      },
      {
        question: "¿Cómo puedo contactarlo?",
        response: "Pregunta por información de contacto",
      },
      {
        question: "¿Cuál es su experiencia?",
        response: "Pregunta sobre experiencia laboral",
      },
    ],
    fr: [
      {
        question: "Parlez-moi des projets IA d'Anmol",
        response: "Demandez à propos des projets IA/ML",
      },
      {
        question: "Quelles sont ses compétences techniques?",
        response: "Demandez à propos des compétences de programmation",
      },
      {
        question: "Comment puis-je le contacter?",
        response: "Demandez les informations de contact",
      },
      {
        question: "Quelle est son expérience?",
        response: "Demandez à propos de l'expérience professionnelle",
      },
    ],
    de: [
      {
        question: "Erzählen Sie von Anmols KI-Projekten",
        response: "Fragen Sie nach KI/ML-Projekten",
      },
      {
        question: "Was sind seine technischen Fähigkeiten?",
        response: "Fragen Sie nach Programmierfähigkeiten",
      },
      {
        question: "Wie kann ich ihn kontaktieren?",
        response: "Fragen Sie nach Kontaktinformationen",
      },
      {
        question: "Was ist seine Erfahrung?",
        response: "Fragen Sie nach Berufserfahrung",
      },
    ],
    hi: [
      {
        question: "अनमोल के AI प्रोजेक्ट्स के बारे में बताएं",
        response: "AI/ML प्रोजेक्ट्स के बारे में पूछें",
      },
      {
        question: "उनके तकनीकी कौशल क्या हैं?",
        response: "प्रोग्रामिंग कौशल के बारे में पूछें",
      },
      {
        question: "मैं उनसे कैसे संपर्क कर सकता हूं?",
        response: "संपर्क जानकारी के लिए पूछें",
      },
      {
        question: "उनका अनुभव क्या है?",
        response: "कार्य अनुभव के बारे में पूछें",
      },
    ],
    ja: [
      {
        question: "AnmolのAIプロジェクトについて教えて",
        response: "AI/MLプロジェクトについて聞く",
      },
      {
        question: "彼の技術スキルは何ですか？",
        response: "プログラミングスキルについて聞く",
      },
      { question: "どうやって連絡できますか？", response: "連絡先情報を聞く" },
      { question: "彼の経験は何ですか？", response: "職歴について聞く" },
    ],
    ko: [
      {
        question: "Anmol의 AI 프로젝트에 대해 알려주세요",
        response: "AI/ML 프로젝트에 대해 묻기",
      },
      {
        question: "그의 기술 스킬은 무엇인가요?",
        response: "프로그래밍 기술에 대해 묻기",
      },
      { question: "어떻게 연락할 수 있나요?", response: "연락처 정보 묻기" },
      {
        question: "그의 경험은 무엇인가요?",
        response: "업무 경험에 대해 묻기",
      },
    ],
    zh: [
      { question: "告诉我Anmol的AI项目", response: "询问AI/ML项目" },
      { question: "他的技术技能是什么？", response: "询问编程技能" },
      { question: "我如何联系他？", response: "询问联系信息" },
      { question: "他的经验是什么？", response: "询问工作经验" },
    ],
    ar: [
      {
        question: "أخبرني عن مشاريع الذكاء الاصطناعي لأنمول",
        response: "اسأل عن مشاريع الذكاء الاصطناعي/التعلم الآلي",
      },
      {
        question: "ما هي مهاراته التقنية؟",
        response: "اسأل عن مهارات البرمجة",
      },
      {
        question: "كيف يمكنني الاتصال به؟",
        response: "اسأل عن معلومات الاتصال",
      },
      { question: "ما هي خبرته؟", response: "اسأل عن الخبرة العملية" },
    ],
    pt: [
      {
        question: "Fale sobre os projetos de IA do Anmol",
        response: "Pergunte sobre projetos de IA/ML",
      },
      {
        question: "Quais são suas habilidades técnicas?",
        response: "Pergunte sobre habilidades de programação",
      },
      {
        question: "Como posso contatá-lo?",
        response: "Pergunte por informações de contato",
      },
      {
        question: "Qual é a experiência dele?",
        response: "Pergunte sobre experiência profissional",
      },
    ],
    ru: [
      {
        question: "Расскажите об ИИ проектах Анмола",
        response: "Спросите о ИИ/МЛ проектах",
      },
      {
        question: "Какие у него технические навыки?",
        response: "Спросите о навыках программирования",
      },
      {
        question: "Как я могу с ним связаться?",
        response: "Спросите контактную информацию",
      },
      {
        question: "Какой у него опыт?",
        response: "Спросите о профессиональном опыте",
      },
    ],
    it: [
      {
        question: "Parlami dei progetti IA di Anmol",
        response: "Chiedi dei progetti IA/ML",
      },
      {
        question: "Quali sono le sue competenze tecniche?",
        response: "Chiedi delle competenze di programmazione",
      },
      {
        question: "Come posso contattarlo?",
        response: "Chiedi informazioni di contatto",
      },
      {
        question: "Qual è la sua esperienza?",
        response: "Chiedi dell'esperienza lavorativa",
      },
    ],
  };

  return responses[language] || responses.en;
}
