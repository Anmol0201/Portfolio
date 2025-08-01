import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
  Trash2,
  RotateCcw,
  AlertCircle,
  Globe,
  ChevronDown,
} from "lucide-react";
import { GroqService, ChatMessage } from "@/lib/groqService";
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  getUITranslations,
  getMultilingualQuickResponses,
} from "@/lib/languageUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatAssistantProps {
  className?: string;
}

// Component to format chat messages properly
const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  // Function to parse markdown links and convert them to clickable links
  const parseMarkdownLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the link element
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 underline font-medium transition-colors"
        >
          {linkText}
        </a>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const formatMessage = (text: string) => {
    // Split by double line breaks for paragraphs, but also handle single line breaks
    let paragraphs = text.split("\n\n");

    // If no double line breaks, try splitting by single line breaks for sentences
    if (paragraphs.length === 1) {
      // Split by periods followed by space and capital letter (end of sentence)
      const sentences = text.split(/\. (?=[A-Z])/);
      if (sentences.length > 1) {
        // Group sentences into paragraphs (every 2-3 sentences)
        paragraphs = [];
        for (let i = 0; i < sentences.length; i += 2) {
          const paragraph = sentences.slice(i, i + 2).join(". ");
          paragraphs.push(paragraph + (paragraph.endsWith(".") ? "" : "."));
        }
      }
    }

    return paragraphs
      .map((paragraph, index) => {
        if (!paragraph.trim()) return null;

        // Check if paragraph contains bullet points (lines starting with -)
        const lines = paragraph.split("\n");
        const hasBullets = lines.some((line) => line.trim().startsWith("-"));

        if (hasBullets) {
          return (
            <div key={index} className="mb-4">
              {lines.map((line, lineIndex) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("-")) {
                  return (
                    <div
                      key={lineIndex}
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-accent mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">
                        {parseMarkdownLinks(trimmedLine.substring(1).trim())}
                      </span>
                    </div>
                  );
                } else if (trimmedLine) {
                  return (
                    <div
                      key={lineIndex}
                      className="mb-2 font-medium text-foreground"
                    >
                      {parseMarkdownLinks(trimmedLine)}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        } else {
          // Regular paragraph - ensure good spacing
          return (
            <div key={index} className="mb-4 leading-relaxed">
              {parseMarkdownLinks(paragraph.trim())}
            </div>
          );
        }
      })
      .filter(Boolean);
  };

  return <div className="space-y-1">{formatMessage(content)}</div>;
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>("en");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useIsMobile();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const groqService = GroqService.getInstance();

  // Get UI translations for selected language
  const t = getUITranslations(selectedLanguage);
  const quickResponses = getMultilingualQuickResponses(selectedLanguage);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close language selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLanguageSelector &&
        event.target instanceof Element &&
        !event.target.closest(".language-selector")
      ) {
        setShowLanguageSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguageSelector]);

  // Initialize with welcome message based on selected language
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessages = {
        en: "👋 Hi! I'm Anmol's AI Assistant. I can tell you about his projects, skills, experience, and achievements. What would you like to know?",
        es: "👋 ¡Hola! Soy el Asistente de IA de Anmol. Puedo contarte sobre sus proyectos, habilidades, experiencia y logros. ¿Qué te gustaría saber?",
        hi: "👋 नमस्ते! मैं अनमोल का AI असिस्टेंट हूं। मैं उनकी परियोजनाओं, कौशल, अनुभव और उपलब्धियों के बारे में बता सकता हूं। आप क्या जानना चाहेंगे?",
        fr: "👋 Salut! Je suis l'Assistant IA d'Anmol. Je peux vous parler de ses projets, compétences, expérience et réalisations. Que souhaitez-vous savoir?",
        de: "👋 Hallo! Ich bin Anmols KI-Assistent. Ich kann Ihnen über seine Projekte, Fähigkeiten, Erfahrungen und Erfolge erzählen. Was möchten Sie wissen?",
      };

      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[selectedLanguage] || welcomeMessages.en,
        timestamp: new Date(),
        language: selectedLanguage,
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, selectedLanguage, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await groqService.sendMessage(
        inputMessage.trim(),
        selectedLanguage
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm experiencing technical difficulties. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    groqService.clearHistory();
    // Re-add welcome message in selected language
    const welcomeMessages = {
      en: "Chat cleared! I'm here to help you learn about Anmol's projects and skills. What would you like to know?",
      es: "¡Chat limpiado! Estoy aquí para ayudarte a conocer los proyectos y habilidades de Anmol. ¿Qué te gustaría saber?",
      hi: "चैट साफ़ हो गया! मैं यहाँ अनमोल की परियोजनाओं और कौशल के बारे में जानने में आपकी मदद करने के लिए हूँ। आप क्या जानना चाहेंगे?",
      fr: "Chat effacé! Je suis là pour vous aider à en savoir plus sur les projets et compétences d'Anmol. Que souhaitez-vous savoir?",
      de: "Chat gelöscht! Ich bin hier, um Ihnen dabei zu helfen, Anmols Projekte und Fähigkeiten kennenzulernen. Was möchten Sie wissen?",
    };

    const welcomeMessage: ChatMessage = {
      id: "welcome-new",
      role: "assistant",
      content: welcomeMessages[selectedLanguage] || welcomeMessages.en,
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages([welcomeMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div
      className={`${
        isMobile ? "fixed bottom-24 right-4" : "fixed bottom-6 right-6"
      } z-[100] ${className}`}
    >
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="w-14 h-14 bg-accent hover:bg-accent/80 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group relative z-[100]"
          >
            <MessageCircle className="w-6 h-6 text-accent-foreground group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-primary-foreground" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              />
            )}

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`${
                isMobile
                  ? "fixed inset-x-4 bottom-24 h-[70vh]"
                  : "absolute bottom-16 right-0 w-96 h-[600px]"
              } bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-[100]`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground">
                        {t.chatTitle}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Powered by Groq
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <div className="relative language-selector">
                      <button
                        onClick={() =>
                          setShowLanguageSelector(!showLanguageSelector)
                        }
                        className="p-1.5 hover:bg-secondary rounded transition-colors flex items-center gap-1"
                        title={t.languageSelector}
                      >
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {SUPPORTED_LANGUAGES[selectedLanguage].flag}
                        </span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      </button>

                      {/* Language Dropdown */}
                      <AnimatePresence>
                        {showLanguageSelector && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto language-selector"
                          >
                            {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setSelectedLanguage(lang.code);
                                  setShowLanguageSelector(false);
                                  // Clear messages to reload with new language
                                  setMessages([]);
                                }}
                                className={`w-full px-3 py-2 text-left hover:bg-secondary transition-colors flex items-center gap-2 ${
                                  selectedLanguage === lang.code
                                    ? "bg-secondary"
                                    : ""
                                }`}
                              >
                                <span className="text-sm">{lang.flag}</span>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    {lang.nativeName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lang.name}
                                  </div>
                                </div>
                                {selectedLanguage === lang.code && (
                                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={clearChat}
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                      title={t.clear}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-accent-foreground" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <FormattedMessage content={message.content} />
                      ) : (
                        message.content
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-accent-foreground" />
                    </div>
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Questions */}
                {messages.length === 1 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-muted-foreground text-center">
                      Quick questions:
                    </p>
                    {quickResponses.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        onClick={() => handleQuickQuestion(item.question)}
                        className="w-full text-left p-2 text-xs bg-secondary/50 hover:bg-secondary rounded border border-border transition-colors"
                      >
                        {item.question}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-secondary/30">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/50"
                    disabled={isLoading}
                    style={{
                      direction:
                        SUPPORTED_LANGUAGES[selectedLanguage].direction,
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-3 py-2 bg-accent hover:bg-accent/80 disabled:bg-accent/50 rounded transition-colors flex items-center justify-center"
                    title={t.send}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 text-accent-foreground animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-accent-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;
