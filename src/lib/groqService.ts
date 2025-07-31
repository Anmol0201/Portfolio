import Groq from "groq-sdk";
import { generateSystemPrompt } from "./portfolioKnowledge";
import {
  detectLanguage,
  getLanguageSystemPrompt,
  SupportedLanguage,
} from "./languageUtils";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: SupportedLanguage;
}

export class GroqService {
  private static instance: GroqService;
  private conversationHistory: ChatMessage[] = [];

  // Available models in order of preference
  private availableModels = [
    "llama-3.1-8b-instant",
    "llama-3.1-70b-versatile", // Keeping as fallback in case it comes back
    "mixtral-8x7b-32768",
    "gemma-7b-it",
  ];

  private currentModelIndex = 0;

  private constructor() {}

  static getInstance(): GroqService {
    if (!GroqService.instance) {
      GroqService.instance = new GroqService();
    }
    return GroqService.instance;
  }

  async sendMessage(
    userMessage: string,
    selectedLanguage?: SupportedLanguage
  ): Promise<string> {
    // Use selected language first, fallback to detection if none provided
    const targetLanguage = selectedLanguage || detectLanguage(userMessage);
    console.log(
      "Target language:",
      targetLanguage,
      "Selected:",
      selectedLanguage,
      "Detected:",
      detectLanguage(userMessage)
    );

    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        console.error("Groq API key not found in environment variables");
        return "Configuration Error: API key not found. Please check the environment setup.";
      }

      console.log("Sending message to Groq API:", {
        userMessage,
        targetLanguage,
        apiKey: apiKey.substring(0, 10) + "...",
      });

      // Add user message to history with language
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: userMessage,
        timestamp: new Date(),
        language: targetLanguage,
      };

      this.conversationHistory.push(userMsg);

      // Prepare messages for Groq API with multilingual system prompt
      const baseSystemPrompt = generateSystemPrompt(targetLanguage);
      const languageSystemPrompt = getLanguageSystemPrompt(targetLanguage);
      const multilingualInstructions = `

LANGUAGE INSTRUCTIONS:
- Target language: ${targetLanguage}
- ${languageSystemPrompt}
- Always respond in the same language as the user's question
- Use proper formatting with double line breaks between paragraphs
- Use bullet points with dashes (-) for lists
- Be culturally appropriate for the target language`;

      const messages = [
        {
          role: "system" as const,
          content: baseSystemPrompt + multilingualInstructions,
        },
        ...this.conversationHistory.slice(-10).map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
      ];

      console.log("Prepared multilingual messages for API:", messages);

      // Try API call with model fallback
      let completion;
      let lastError;

      for (
        let i = this.currentModelIndex;
        i < this.availableModels.length;
        i++
      ) {
        try {
          console.log(`Trying model: ${this.availableModels[i]}`);

          completion = await groq.chat.completions.create({
            messages,
            model: this.availableModels[i],
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
          });

          // If successful, update current model index
          this.currentModelIndex = i;
          console.log(`Successfully used model: ${this.availableModels[i]}`);
          break;
        } catch (modelError) {
          console.log(`Model ${this.availableModels[i]} failed:`, modelError);
          lastError = modelError;

          // If this was a model decommissioned error, try next model
          if (
            modelError instanceof Error &&
            (modelError.message.includes("decommissioned") ||
              modelError.message.includes("model") ||
              modelError.message.includes("invalid_request_error"))
          ) {
            continue;
          } else {
            // If it's not a model issue, throw the error
            throw modelError;
          }
        }
      }

      // If no model worked, throw the last error
      if (!completion) {
        throw lastError || new Error("All models failed");
      }

      console.log("Groq API response:", completion);

      const assistantResponse =
        completion.choices[0]?.message?.content ||
        "I apologize, but I'm having trouble responding right now. Please try again.";

      // Add assistant response to history with target language
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
        language: targetLanguage,
      };

      this.conversationHistory.push(assistantMsg);

      return assistantResponse;
    } catch (error) {
      console.error("Detailed error calling Groq API:", error);

      // Remove the failed user message from history if needed
      this.conversationHistory.pop();

      // Use fallback response instead of generic error
      const fallbackResponse = this.getFallbackResponse(
        userMessage,
        targetLanguage
      );

      // Add fallback response to history
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          fallbackResponse +
          "\n\n⚠️ Note: AI assistant is currently using offline mode due to API connectivity issues.",
        timestamp: new Date(),
        language: targetLanguage,
      };

      this.conversationHistory.push(fallbackMsg);

      // Provide helpful error messages based on specific error types
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        if (
          error.message.includes("API key") ||
          error.message.includes("authentication")
        ) {
          return (
            "Authentication Error: Invalid API key. Using offline mode.\n\n" +
            fallbackResponse
          );
        }
        if (
          error.message.includes("rate limit") ||
          error.message.includes("quota")
        ) {
          return (
            "Rate Limit Error: Too many requests. Using offline mode.\n\n" +
            fallbackResponse
          );
        }
        if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          return (
            "Network Error: Unable to connect to AI service. Using offline mode.\n\n" +
            fallbackResponse
          );
        }
      }

      return (
        fallbackResponse +
        "\n\n⚠️ Note: AI assistant is currently in offline mode."
      );
    }
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Predefined quick responses for common questions
  getQuickResponses(): Array<{ question: string; response: string }> {
    return [
      {
        question: "Tell me about Anmol's AI projects",
        response:
          "I'd be happy to tell you about my AI/ML projects! I've built several innovative applications including AGRO-ADVISOR for crop recommendation using machine learning, CODE-GURU an AI-powered coding assistant, MATHS-GPT for mathematical problem solving, and SMART-ATS for AI-powered resume analysis. Each project showcases different aspects of AI/ML from NLP to computer vision.",
      },
      {
        question: "What are Anmol's technical skills?",
        response:
          "My technical expertise spans multiple domains: Programming Languages (Python 95%, JavaScript 90%, C++ 80%, C 85%), Web Development (React 88%, Node.js 82%, HTML5/CSS3 90%+), AI/ML (Machine Learning 88%, Deep Learning 85%, Generative AI 90%, LangChain 85%), and strong foundation in Data Structures & Algorithms (90%). I'm particularly passionate about AI/ML and full-stack development.",
      },
      {
        question: "How can I contact Anmol?",
        response:
          "You can reach me through several channels: Email at [tiwarianmol173@gmail.com](mailto:tiwarianmol173@gmail.com), Phone at [+91-8103107867](tel:+918103107867), GitHub at [github.com/Anmol0201](https://github.com/Anmol0201/), or LinkedIn at [linkedin.com/in/anmol-tiwari-626866239](https://www.linkedin.com/in/anmol-tiwari-626866239/). I'm always open to discussing new opportunities, collaborations, or interesting projects!",
      },
    ];
  }

  // Fallback responses when API is unavailable
  getFallbackResponse(
    userMessage: string,
    language: SupportedLanguage = "en"
  ): string {
    const message = userMessage.toLowerCase();

    // Multilingual fallback responses
    const responses = {
      en: {
        projects:
          "I'd love to tell you about my AI/ML projects!\n\nI've built several exciting applications:\n\n- AGRO-ADVISOR: Crop recommendation using machine learning\n- TALK-TRACK: WhatsApp analytics with sentiment analysis\n- CODE-GURU: AI coding assistant with teaching capabilities\n- MATHS-GPT: Mathematical problem solver using LangChain\n- SMART-ATS: Resume analyzer with improvement suggestions\n\nEach project showcases different AI/ML technologies like NLP, machine learning, and deep learning.",
        skills:
          "My core technical skills include:\n\nProgramming Languages:\n- Python (95%)\n- JavaScript (90%)\n- C++ (80%)\n- C (85%)\n\nAI/ML Technologies:\n- Machine Learning (88%)\n- Deep Learning (85%)\n- Generative AI (90%)\n- LangChain (85%)\n\nWeb Development:\n- React (88%)\n- Node.js (82%)\n- MongoDB (75%)\n\nI'm particularly passionate about AI/ML and full-stack development!",
        contact:
          "You can contact me through several channels:\n\n- Email: [tiwarianmol173@gmail.com](mailto:tiwarianmol173@gmail.com)\n- Phone: [+91-8103107867](tel:+918103107867)\n- GitHub: [github.com/Anmol0201](https://github.com/Anmol0201/)\n- LinkedIn: [linkedin.com/in/anmol-tiwari-626866239](https://www.linkedin.com/in/anmol-tiwari-626866239/)\n\nI'm always open to discussing new opportunities and exciting projects!",
        default:
          "Hi! I'm Anmol's AI Assistant.\n\nI can tell you about:\n- His AI/ML projects and technical skills\n- Professional experience and education\n- Contact information and achievements\n- Web development and data science expertise\n\nWhat would you like to know about my work and experience?",
      },
      es: {
        projects:
          "¡Me encantaría contarte sobre mis proyectos de IA/ML!\n\nHe construido varias aplicaciones emocionantes:\n\n- AGRO-ADVISOR: Recomendación de cultivos usando machine learning\n- TALK-TRACK: Análisis de WhatsApp con análisis de sentimientos\n- CODE-GURU: Asistente de código con IA con capacidades de enseñanza\n- MATHS-GPT: Solucionador de problemas matemáticos usando LangChain\n- SMART-ATS: Analizador de currículos con sugerencias de mejora\n\nCada proyecto muestra diferentes tecnologías de IA/ML como NLP, machine learning y deep learning.",
        skills:
          "Mis habilidades técnicas principales incluyen:\n\nLenguajes de Programación:\n- Python (95%)\n- JavaScript (90%)\n- C++ (80%)\n- C (85%)\n\nTecnologías de IA/ML:\n- Machine Learning (88%)\n- Deep Learning (85%)\n- IA Generativa (90%)\n- LangChain (85%)\n\nDesarrollo Web:\n- React (88%)\n- Node.js (82%)\n- MongoDB (75%)\n\n¡Soy particularmente apasionado por IA/ML y desarrollo full-stack!",
        contact:
          "Puedes contactarme a través de varios canales:\n\n- Email: [tiwarianmol173@gmail.com](mailto:tiwarianmol173@gmail.com)\n- Teléfono: [+91-8103107867](tel:+918103107867)\n- GitHub: [github.com/Anmol0201](https://github.com/Anmol0201/)\n- LinkedIn: [linkedin.com/in/anmol-tiwari-626866239](https://www.linkedin.com/in/anmol-tiwari-626866239/)\n\n¡Siempre estoy abierto a discutir nuevas oportunidades y proyectos emocionantes!",
        default:
          "¡Hola! Soy el Asistente de IA de Anmol.\n\nPuedo contarte sobre:\n- Sus proyectos de IA/ML y habilidades técnicas\n- Experiencia profesional y educación\n- Información de contacto y logros\n- Desarrollo web y experiencia en ciencia de datos\n\n¿Qué te gustaría saber sobre mi trabajo y experiencia?",
      },
      hi: {
        projects:
          "मुझे अपने AI/ML प्रोजेक्ट्स के बारे में बताने में खुशी होगी!\n\nमैंने कई रोमांचक एप्लिकेशन बनाए हैं:\n\n- AGRO-ADVISOR: मशीन लर्निंग का उपयोग करके फसल सिफारिश\n- TALK-TRACK: भावना विश्लेषण के साथ WhatsApp एनालिटिक्स\n- CODE-GURU: शिक्षण क्षमताओं के साथ AI कोडिंग असिस्टेंट\n- MATHS-GPT: LangChain का उपयोग करके गणितीय समस्या समाधानकर्ता\n- SMART-ATS: सुधार सुझावों के साथ रिज्यूमे विश्लेषक\n\nहर प्रोजेक्ट NLP, मशीन लर्निंग और डीप लर्निंग जैसी विभिन्न AI/ML तकनीकों को प्रदर्शित करता है।",
        skills:
          "मेरे मुख्य तकनीकी कौशल में शामिल हैं:\n\nप्रोग्रामिंग भाषाएं:\n- Python (95%)\n- JavaScript (90%)\n- C++ (80%)\n- C (85%)\n\nAI/ML तकनीकें:\n- मशीन लर्निंग (88%)\n- डीप लर्निंग (85%)\n- जेनेरेटिव AI (90%)\n- LangChain (85%)\n\nवेब डेवलपमेंट:\n- React (88%)\n- Node.js (82%)\n- MongoDB (75%)\n\nमैं विशेष रूप से AI/ML और फुल-स्टैक डेवलपमेंट के लिए उत्साहित हूं!",
        contact:
          "आप कई चैनलों के माध्यम से मुझसे संपर्क कर सकते हैं:\n\n- ईमेल: [tiwarianmol173@gmail.com](mailto:tiwarianmol173@gmail.com)\n- फोन: [+91-8103107867](tel:+918103107867)\n- GitHub: [github.com/Anmol0201](https://github.com/Anmol0201/)\n- LinkedIn: [linkedin.com/in/anmol-tiwari-626866239](https://www.linkedin.com/in/anmol-tiwari-626866239/)\n\nमैं हमेशा नए अवसरों और रोमांचक परियोजनाओं पर चर्चा के लिए तैयार हूं!",
        default:
          "नमस्ते! मैं अनमोल का AI सहायक हूं।\n\nमैं बता सकता हूं:\n- उनके AI/ML प्रोजेक्ट्स और तकनीकी कौशल\n- व्यावसायिक अनुभव और शिक्षा\n- संपर्क जानकारी और उपलब्धियां\n- वेब डेवलपमेंट और डेटा साइंस विशेषज्ञता\n\nआप मेरे काम और अनुभव के बारे में क्या जानना चाहेंगे?",
      },
    };

    // Get responses for the detected language, fallback to English
    const langResponses = responses[language] || responses.en;

    if (
      message.includes("project") ||
      message.includes("ai") ||
      message.includes("ml") ||
      message.includes("proyecto") ||
      message.includes("प्रोजेक्ट")
    ) {
      return langResponses.projects;
    }

    if (
      message.includes("skill") ||
      message.includes("technology") ||
      message.includes("tech") ||
      message.includes("habilidad") ||
      message.includes("कौशल")
    ) {
      return langResponses.skills;
    }

    if (
      message.includes("contact") ||
      message.includes("reach") ||
      message.includes("email") ||
      message.includes("contacto") ||
      message.includes("संपर्क")
    ) {
      return langResponses.contact;
    }

    return langResponses.default;
  }
}
