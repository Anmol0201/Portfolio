import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  User,
  Code,
  Briefcase,
  Award,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  Database,
  Brain,
  Sun,
  Moon,
  Download,
  Star,
  TrendingUp,
} from "lucide-react";
import avatarImage from "@/assets/avatar.png";
import AnimatedSkillBar from "@/components/ui/AnimatedSkillBar";
import ProjectCard from "@/components/ui/ProjectCard";
import ParticleSystem from "@/components/ui/ParticleSystem";
import CursorTrail from "@/components/ui/CursorTrail";
import ParticleHover from "@/components/ui/ParticleHover";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Logo from "@/components/ui/Logo";
import FloatingElement from "@/components/ui/FloatingElement";
import ChatAssistant from "@/components/ui/ChatAssistant";
import TechNews from "@/components/ui/TechNews";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);

    // Hide landing animation after it completes (3.5 seconds to ensure smooth transition)
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`);

    // First, update the active section for immediate visual feedback
    setActiveSection(sectionId);

    // Use requestAnimationFrame for smoother execution
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset for better positioning - account for header height properly
        const headerOffset = isMobile ? 100 : 120; // Increased offset for mobile and desktop
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll with custom behavior
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add subtle visual feedback
        element.style.transition = "all 0.4s ease-out";
        element.style.transform = "translateY(-2px)";

        setTimeout(() => {
          element.style.transform = "translateY(0)";
        }, 400);
      }
    });
  };

  // Add scroll listener to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "resume", "portfolio", "news", "contact"];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerHeight = isMobile ? 100 : 120; // Match the header offset

      // Check which section is in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if it's in the top 30% of the viewport (accounting for header)
          if (
            rect.top <= windowHeight * 0.3 + headerHeight &&
            rect.bottom >= windowHeight * 0.1
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [isMobile]);

  const skills = {
    languages: [
      { name: "C", percentage: 85 },
      { name: "C++", percentage: 80 },
      { name: "JavaScript", percentage: 90 },
      { name: "Python", percentage: 95 },
    ],
    webDev: [
      { name: "HTML5", percentage: 95 },
      { name: "CSS3", percentage: 90 },
      { name: "ReactJS", percentage: 88 },
      { name: "NodeJS", percentage: 82 },
      { name: "ExpressJS", percentage: 80 },
      { name: "MongoDB", percentage: 75 },
      { name: "Redux", percentage: 70 },
    ],
    dataScience: [
      { name: "Machine Learning", percentage: 88 },
      { name: "Deep Learning", percentage: 85 },
      { name: "NLP", percentage: 80 },
      { name: "Generative AI", percentage: 90 },
      { name: "LangChain", percentage: 85 },
    ],
    concepts: [
      { name: "Data Structures", percentage: 90 },
      { name: "Algorithms", percentage: 85 },
      { name: "OOPS", percentage: 88 },
      { name: "DBMS", percentage: 80 },
      { name: "Computer Networks", percentage: 75 },
    ],
  };

  const projects = [
    {
      title: "DEVCRAFT STUDIO",
      description:
        "Modern AI-powered portfolio with multilingual chat assistant, responsive design, and analytics integration. Features 12-language support, theme switching, and professional branding.",
      tech: [
        "React",
        "TypeScript",
        "Groq AI",
        "Framer Motion",
        "Tailwind CSS",
        "Vercel Analytics",
      ],
      category: "Full Stack",
      githubUrl: "https://github.com/Anmol0201/Portfolio",
      liveUrl: "https://devcraft-studio.vercel.app/",
      featured: true,
    },
    {
      title: "AGRO-ADVISOR",
      description:
        "ML-based web application using Streamlit for crop recommendation based on soil and climate parameters.",
      tech: ["Machine Learning", "Streamlit", "Python", "Data-Analysis", "Data-Visualization"],
      category: "AI/ML",
       githubUrl: "https://github.com/Anmol0201/AGRO-ADVISOR",
      liveUrl: "https://crop-recommendation-system-minor.streamlit.app/",
    },
    {
      title: "TALK-TRACK",
      description:
        "Interactive WhatsApp chat analytics dashboard with user activity heatmaps and sentiment analysis.",
      tech: ["Streamlit", "Python", "NLP", "Data Visualization", "Pandas"],
      category: "Data Science",
     githubUrl: "https://github.com/Anmol0201/TalkTrack",
      liveUrl: "https://talk-track.vercel.app/",
    },
    {
      title: "CODE-GURU",
      description:
        "AI-powered code teaching assistant built with CodeLlama and Gradio for coding queries.",
      tech: ["CodeLlama", "Gradio", "AI", "REST API", "Python"],
      category: "AI/ML",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
    },
    {
      title: "MATHS-GPT",
      description:
        "AI-powered math assistant using LangChain and Groq for complex problem solving.",
      tech: ["LangChain", "Groq", "AI", "Mathematics", "Research"],
      category: "AI/ML",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
    },
    {
      title: "EASILY Job Portal",
      description:
        "Complete job portal with dashboard, ATS, personalized search, and real-time notifications.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Gmail API"],
      category: "Web Development",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
    },
    {
      title: "SMART-ATS",
      description:
        "AI-powered resume analyzer that evaluates resumes against job descriptions with improvement suggestions.",
      tech: ["Streamlit", "Google Gemini API", "PyPDF2", "AI", "NLP"],
      category: "AI/ML",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
    },
  ];

  const achievements = [
    "Finalist in VIHAAN (National Level Hackathon) - Delhi Technological University",
    "Finalist in CodeFiesta contest, MITS-DU",
    "Top performer in Google Cloud Study Jam, MITS-DU",
    "Core member, Google Developer Groups (GDG-MITS)",
    "Generative AI and Agentic AI certified from Udemy and Huggingface",
    "MERN Stack Web Development certified from Coding Ninjas",
  ];

  const services = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Web Development",
      description: "Full-stack development with modern frameworks",
      tech: ["React", "Node.js", "TypeScript"],
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI/ML Solutions",
      description: "Machine Learning and AI-powered applications",
      tech: ["Python", "TensorFlow", "LangChain"],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science",
      description: "Data analysis and intelligent insights",
      tech: ["Pandas", "Streamlit", "Visualization"],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "System Design",
      description: "Scalable architecture and system optimization",
      tech: ["REST APIs", "Databases", "Cloud"],
    },
  ];

  const navItems = [
    { id: "about", label: "ABOUT", icon: <User className="w-4 h-4" /> },
    {
      id: "resume",
      label: "RESUME",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "portfolio",
      label: "PROJECTS",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "news",
      label: "AI NEWS",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    { id: "contact", label: "CONTACT", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background font-mono">
      {/* DevCraft Studio Landing Animation */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div
              className={`text-center ${
                isMobile ? "px-4 w-full max-w-sm" : "space-y-8"
              }`}
            >
              {/* Creator Name Animation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`${
                  isMobile ? "text-sm mb-6" : "text-2xl mb-4"
                } font-light tracking-[0.2em] text-muted-foreground`}
              >
                ANMOL TIWARI
              </motion.div>

              {/* Main Logo Animation */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`relative ${isMobile ? "mb-6" : ""}`}
              >
                <motion.div
                  className={`${
                    isMobile ? "text-3xl" : "text-6xl md:text-8xl"
                  } font-bold tracking-wider bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent leading-tight`}
                  initial={{ backgroundPosition: "0%" }}
                  animate={{ backgroundPosition: "200%" }}
                  transition={{
                    duration: 2,
                    repeat: 1,
                    ease: "linear",
                    delay: 0.4,
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  DEVCRAFT
                </motion.div>

                {/* Glowing underline */}
                <motion.div
                  className={`${
                    isMobile ? "h-0.5 mt-2" : "h-1 mt-4"
                  } bg-gradient-to-r from-transparent via-accent to-transparent mx-auto`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                />
              </motion.div>

              {/* Studio Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`${
                  isMobile ? "text-base mb-4" : "text-2xl md:text-3xl"
                } font-light tracking-[0.3em] text-muted-foreground`}
              >
                STUDIO
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className={`${
                  isMobile ? "text-[10px] mb-8" : "text-sm"
                } text-muted-foreground/70 tracking-wider`}
              >
                CRAFTING DIGITAL EXPERIENCES
              </motion.div>

              {/* Skip Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                onClick={() => setShowLanding(false)}
                className={`absolute ${
                  isMobile ? "top-4 right-4 text-xs" : "top-6 right-6 text-sm"
                } text-muted-foreground hover:text-accent transition-colors tracking-wider flex items-center gap-2 z-10`}
              >
                SKIP
                <ChevronRight
                  className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                />
              </motion.button>

              {/* Particle Effects */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    initial={{
                      x:
                        Math.random() *
                        (isMobile
                          ? window.innerWidth * 0.8
                          : window.innerWidth),
                      y:
                        Math.random() *
                        (isMobile
                          ? window.innerHeight * 0.8
                          : window.innerHeight),
                      scale: 0,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className={`flex items-center justify-center gap-2 text-muted-foreground tracking-wider ${
                  isMobile ? "text-[10px] mt-6" : "text-sm"
                }`}
              >
                <motion.div
                  className={`${
                    isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                  } bg-accent rounded-full`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className={`${
                    isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                  } bg-accent rounded-full`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className={`${
                    isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                  } bg-accent rounded-full`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
                <span className={`${isMobile ? "ml-2" : "ml-3"}`}>
                  ENTERING PORTFOLIO
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add global smooth scroll */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        * {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header with DevCraft Logo */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b shadow-2xl ${
          isMobile ? "h-16" : "h-20"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.3) 100%)",
          backdropFilter: "blur(24px) saturate(1.2)",
          borderImage:
            theme === "dark"
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) 1"
              : "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent) 1",
          borderBottom:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
          boxShadow:
            theme === "dark"
              ? "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
              : "0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* DevCraft Studio Logo */}
          <motion.div
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo
              size={isMobile ? "sm" : "md"}
              variant="full"
              animated={false}
              className="hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center">
              <div
                className="backdrop-blur-2xl rounded-xl px-6 py-3 border shadow-xl"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.2)",
                  borderColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex gap-6">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`relative px-4 py-2 text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                        activeSection === item.id
                          ? theme === "dark"
                            ? "text-white"
                            : "text-black"
                          : theme === "dark"
                          ? "text-white/70 hover:text-white"
                          : "text-black/70 hover:text-black"
                      }`}
                    >
                      {/* Simple underline for active state */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className="flex items-center gap-2">
                        {item.icon}
                        <span className="tracking-wide">{item.label}</span>
                      </span>
                    </motion.button>
                  ))}

                  {/* Theme Toggle */}
                  {mounted && (
                    <motion.button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 text-xs font-medium transition-all duration-300 flex items-center ${
                        theme === "dark"
                          ? "text-white/70 hover:text-white"
                          : "text-black/70 hover:text-black"
                      }`}
                      title="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </motion.header>

      {/* Mobile Navigation - Bottom */}
      {isMobile && (
        <nav className="fixed bottom-4 left-4 right-4 z-50">
          <div
            className="backdrop-blur-2xl rounded-xl px-4 py-3 border shadow-xl"
            style={{
              background:
                theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
              borderColor:
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex gap-4 justify-center">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`relative px-3 py-2 text-xs font-medium transition-all duration-300 flex items-center ${
                    activeSection === item.id
                      ? theme === "dark"
                        ? "text-white"
                        : "text-black"
                      : theme === "dark"
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {/* Simple underline for active state */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="flex items-center">{item.icon}</span>
                </motion.button>
              ))}

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 text-xs font-medium transition-all duration-300 flex items-center ${
                    theme === "dark"
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                  title="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Profile Card - Completely Redesigned for Mobile */}
      <motion.div
        className={`${
          isMobile
            ? "relative w-full bg-card/95 border border-border rounded-xl p-4 shadow-lg mx-3 mb-6"
            : "fixed left-6 w-80 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl"
        } z-40 ${isMobile ? "mt-20" : "top-24"}`}
        initial={{ x: isMobile ? 0 : -100, opacity: 0, y: isMobile ? 20 : 0 }}
        animate={{ x: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <FloatingElement duration={4} delay={0.5}>
            <motion.div
              className={`${
                isMobile ? "w-16 h-16" : "w-24 h-24"
              } rounded-lg overflow-hidden mb-4 border border-border glyph-border`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={avatarImage}
                alt="Anmol Tiwari"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          </FloatingElement>

          {/* Name and Title */}
          <motion.h1
            className={`${
              isMobile ? "text-base" : "text-xl"
            } font-bold text-foreground mb-2 tracking-wide glow-text`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ANMOL TIWARI
          </motion.h1>

          <motion.div
            className={`bg-accent text-accent-foreground ${
              isMobile ? "px-2 py-1 text-[9px]" : "px-3 py-1 text-xs"
            } rounded font-medium mb-4 tracking-wider pulse-glow`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            SOFTWARE DEVELOPER
          </motion.div>

          {isMobile ? (
            // Mobile: Compact horizontal layout
            <div className="w-full space-y-3">
              {/* Quick Contact Row */}
              <div className="flex justify-center gap-4">
                <a
                  href="mailto:tiwarianmol173@gmail.com"
                  className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="tel:+918103107867"
                  className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Anmol0201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/anmol-tiwari-626866239/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Location & Education Row */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="text-center">
                  <p className="text-muted-foreground uppercase tracking-wider">
                    LOCATION
                  </p>
                  <p className="text-foreground font-medium">GWALIOR, INDIA</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground uppercase tracking-wider">
                    EDUCATION
                  </p>
                  <p className="text-foreground font-medium">BTECH IT</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full pulse-glow animate-pulse"></div>
                <span className="text-muted-foreground uppercase tracking-wider text-[9px]">
                  AVAILABLE FOR WORK
                </span>
              </div>
            </div>
          ) : (
            // Desktop: Original detailed layout
            <>
              {/* Contact Info */}
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground uppercase tracking-wider text-[10px]">
                      EMAIL
                    </p>
                    <a
                      href="mailto:tiwarianmol173@gmail.com"
                      className="text-foreground text-xs break-all bright-hover hover:text-accent transition-colors cursor-pointer"
                    >
                      tiwarianmol173@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground uppercase tracking-wider text-[10px]">
                      PHONE
                    </p>
                    <a
                      href="tel:+918103107867"
                      className="text-foreground text-xs bright-hover hover:text-accent transition-colors cursor-pointer"
                    >
                      +91-8103107867
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground uppercase tracking-wider text-[10px]">
                      EDUCATION
                    </p>
                    <p className="text-foreground text-xs bright-hover">
                      BTECH IT, MITS-DU
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 bg-secondary rounded border border-border flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground uppercase tracking-wider text-[10px]">
                      LOCATION
                    </p>
                    <p className="text-foreground text-xs bright-hover">
                      GWALIOR, INDIA
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                <a
                  href="https://github.com/Anmol0201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110 hover:rotate-12 pulse-glow"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/anmol-tiwari-626866239/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110 hover:rotate-12 pulse-glow"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-accent rounded-full pulse-glow animate-pulse"></div>
                <span className="text-muted-foreground uppercase tracking-wider bright-hover">
                  AVAILABLE FOR WORK
                </span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Main Content - Now flows naturally on mobile */}
      <div
        className={`min-h-screen ${
          isMobile ? "p-3 pb-24 pt-4" : "p-8 pl-96 pt-24"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {activeSection === "about" && (
            <AnimatedSection
              id="about"
              className={`${
                isMobile ? "max-w-full" : "max-w-4xl"
              } mx-auto space-y-12`}
            >
              <div>
                <motion.h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  ABOUT_ME
                </motion.h2>
                <motion.div
                  className="w-12 h-0.5 bg-accent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.div>
                <motion.div
                  className={`space-y-6 ${
                    isMobile ? "text-xs" : "text-sm"
                  } leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <p className="text-muted-foreground bright-hover">
                    I'M A PASSIONATE SOFTWARE DEVELOPER AND BTECH IT STUDENT
                    FROM MITS-DU, GWALIOR, WITH A DEEP LOVE FOR TECHNOLOGY AND
                    INNOVATION. MY JOURNEY IN PROGRAMMING BEGAN WITH CURIOSITY
                    AND HAS EVOLVED INTO A DEDICATION TO CRAFTING ELEGANT
                    SOLUTIONS THAT BRIDGE THE GAP BETWEEN HUMAN NEEDS AND
                    DIGITAL POSSIBILITIES.
                  </p>
                  <p className="text-muted-foreground bright-hover">
                    I THRIVE ON THE CHALLENGE OF LEARNING NEW TECHNOLOGIES AND
                    STAYING AT THE FOREFRONT OF THE RAPIDLY EVOLVING TECH
                    LANDSCAPE. MY APPROACH TO DEVELOPMENT IS ROOTED IN CLEAN
                    CODE PRINCIPLES, USER-CENTRIC DESIGN, AND A COMMITMENT TO
                    CONTINUOUS IMPROVEMENT. I BELIEVE IN THE POWER OF
                    COLLABORATION AND ENJOY WORKING WITH DIVERSE TEAMS TO BRING
                    INNOVATIVE IDEAS TO LIFE.
                  </p>
                  <p className="text-muted-foreground bright-hover">
                    WHEN I'M NOT CODING, YOU'LL FIND ME EXPLORING THE LATEST
                    DEVELOPMENTS IN ARTIFICIAL INTELLIGENCE, CONTRIBUTING TO
                    OPEN-SOURCE COMMUNITIES, OR MENTORING FELLOW STUDENTS. I'M
                    ALWAYS EXCITED TO CONNECT WITH LIKE-MINDED INDIVIDUALS AND
                    EXPLORE NEW OPPORTUNITIES THAT CHALLENGE ME TO GROW BOTH
                    PERSONALLY AND PROFESSIONALLY.
                  </p>
                </motion.div>
              </div>

              <div>
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-bold text-foreground mb-8 tracking-wide glow-text`}
                >
                  WHAT_I_DO
                </h3>
                <div
                  className={`grid ${
                    isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                  } gap-6`}
                >
                  {services.map((service, index) => (
                    <div key={index} className="nothing-card group">
                      <div className="flex items-start gap-4">
                        <div
                          className={`${
                            isMobile ? "w-10 h-10" : "w-12 h-12"
                          } bg-secondary rounded border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300`}
                        >
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`${
                              isMobile ? "text-xs" : "text-sm"
                            } font-bold text-foreground mb-2 tracking-wide uppercase`}
                          >
                            {service.title}
                          </h4>
                          <p
                            className={`text-muted-foreground ${
                              isMobile ? "text-[10px]" : "text-xs"
                            } leading-relaxed mb-3`}
                          >
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {service.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`${
                                  isMobile ? "text-[8px]" : "text-[10px]"
                                } px-2 py-1 bg-secondary rounded text-muted-foreground border border-border`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === "resume" && (
            <div
              id="resume"
              className="max-w-4xl mx-auto space-y-12 slide-in-up"
            >
              <div>
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                >
                  RESUME
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-8"></div>
              </div>

              {/* Education */}
              <div className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <h3
                    className={`${
                      isMobile ? "text-base" : "text-lg"
                    } font-bold text-foreground tracking-wide`}
                  >
                    EDUCATION
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent pl-4">
                    <h4
                      className={`${
                        isMobile ? "text-xs" : "text-sm"
                      } font-bold text-foreground tracking-wide`}
                    >
                      BACHELOR OF TECHNOLOGY IN INFORMATION TECHNOLOGY
                    </h4>
                    <p
                      className={`text-accent ${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-medium tracking-wide`}
                    >
                      MADHAV INSTITUTE OF TECHNOLOGY AND SCIENCE (MITS-DU),
                      GWALIOR
                    </p>
                    <p
                      className={`text-muted-foreground ${
                        isMobile ? "text-[10px]" : "text-xs"
                      }`}
                    >
                      2022 - 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <h3
                    className={`${
                      isMobile ? "text-base" : "text-lg"
                    } font-bold text-foreground tracking-wide`}
                  >
                    EXPERIENCE
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent pl-4">
                    <h4
                      className={`${
                        isMobile ? "text-xs" : "text-sm"
                      } font-bold text-foreground tracking-wide`}
                    >
                      SOFTWARE DEVELOPMENT INTERN
                    </h4>
                    <p
                      className={`text-accent ${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-medium tracking-wide`}
                    >
                      RISHISHWAR INDUSTRIES PVT LTD.
                    </p>
                    <p
                      className={`text-muted-foreground ${
                        isMobile ? "text-[10px]" : "text-xs"
                      } mb-3`}
                    >
                      MAY 2025 - JULY 2025
                    </p>
                    <p
                      className={`text-muted-foreground ${
                        isMobile ? "text-[10px]" : "text-xs"
                      } leading-relaxed`}
                    >
                      CONTRIBUTED TO A DYNAMIC DEVELOPMENT TEAM BY BUILDING AND
                      TESTING REST APIS, STRENGTHENING BACKEND INFRASTRUCTURE.
                      GAINED EXPOSURE TO APPLIED AI AND MACHINE LEARNING BY
                      ASSISTING IN THE INTEGRATION OF INTELLIGENT FEATURES.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <AnimatedSection className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-5 h-5 text-accent" />
                  <h3
                    className={`${
                      isMobile ? "text-base" : "text-lg"
                    } font-bold text-foreground tracking-wide`}
                  >
                    TECHNICAL_SKILLS
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h5
                      className={`${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2`}
                    >
                      <Star className="w-3 h-3 text-accent" />
                      PROGRAMMING_LANGUAGES
                    </h5>
                    <div className="space-y-3">
                      {skills.languages.map((skill, index) => (
                        <ParticleHover
                          key={skill.name}
                          particleColor="hsl(210, 100%, 70%)"
                        >
                          <AnimatedSkillBar
                            skill={skill.name}
                            percentage={skill.percentage}
                            delay={index}
                            category="languages"
                          />
                        </ParticleHover>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-px bg-border"></div>
                  <div>
                    <h5
                      className={`${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2`}
                    >
                      <Star className="w-3 h-3 text-accent" />
                      WEB_DEVELOPMENT
                    </h5>
                    <div className="space-y-3">
                      {skills.webDev.map((skill, index) => (
                        <ParticleHover
                          key={skill.name}
                          particleColor="hsl(48, 100%, 67%)"
                        >
                          <AnimatedSkillBar
                            skill={skill.name}
                            percentage={skill.percentage}
                            delay={index}
                            category="webDev"
                          />
                        </ParticleHover>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-px bg-border"></div>
                  <div>
                    <h5
                      className={`${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2`}
                    >
                      <Star className="w-3 h-3 text-accent" />
                      DATA_SCIENCE_&_AI
                    </h5>
                    <div className="space-y-3">
                      {skills.dataScience.map((skill, index) => (
                        <ParticleHover
                          key={skill.name}
                          particleColor="hsl(142, 76%, 36%)"
                        >
                          <AnimatedSkillBar
                            skill={skill.name}
                            percentage={skill.percentage}
                            delay={index}
                            category="dataScience"
                          />
                        </ParticleHover>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-px bg-border"></div>
                  <div>
                    <h5
                      className={`${
                        isMobile ? "text-[10px]" : "text-xs"
                      } font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2`}
                    >
                      <Star className="w-3 h-3 text-accent" />
                      CORE_CONCEPTS
                    </h5>
                    <div className="space-y-3">
                      {skills.concepts.map((skill, index) => (
                        <ParticleHover
                          key={skill.name}
                          particleColor="hsl(270, 100%, 80%)"
                        >
                          <AnimatedSkillBar
                            skill={skill.name}
                            percentage={skill.percentage}
                            delay={index}
                            category="concepts"
                          />
                        </ParticleHover>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Achievements */}
              <div className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-5 h-5 text-accent" />
                  <h3
                    className={`${
                      isMobile ? "text-base" : "text-lg"
                    } font-bold text-foreground tracking-wide`}
                  >
                    ACHIEVEMENTS_&_CERTIFICATIONS
                  </h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                      <p
                        className={`text-muted-foreground ${
                          isMobile ? "text-[10px]" : "text-xs"
                        } leading-relaxed`}
                      >
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "portfolio" && (
            <AnimatedSection
              id="portfolio"
              className={`${
                isMobile ? "max-w-full" : "max-w-4xl"
              } mx-auto space-y-12`}
            >
              <div>
                <motion.h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  PROJECTS
                </motion.h2>
                <motion.div
                  className="w-12 h-0.5 bg-accent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.div>
              </div>

              <div
                className={`grid ${
                  isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                } gap-6`}
              >
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </AnimatedSection>
          )}

          {activeSection === "news" && (
            <AnimatedSection
              id="news"
              className={`${
                isMobile ? "max-w-full" : "max-w-4xl"
              } mx-auto space-y-12`}
            >
              <div>
                <motion.h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  AI_NEWS
                </motion.h2>
                <motion.div
                  className="w-12 h-0.5 bg-accent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.div>
              </div>

              <TechNews />
            </AnimatedSection>
          )}

          {activeSection === "contact" && (
            <div
              className={`${
                isMobile ? "max-w-full" : "max-w-4xl"
              } mx-auto space-y-12 animate-fade-in`}
            >
              <div>
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide`}
                >
                  CONTACT
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-8"></div>
              </div>

              <div className="nothing-card relative z-10">
                <div className="text-center space-y-8 pointer-events-auto">
                  <div>
                    <h3
                      className={`${
                        isMobile ? "text-base" : "text-xl"
                      } font-bold text-foreground mb-4 tracking-wide`}
                    >
                      LET'S_WORK_TOGETHER
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        isMobile ? "text-xs" : "text-sm"
                      } leading-relaxed max-w-2xl mx-auto`}
                    >
                      I'M ALWAYS INTERESTED IN NEW OPPORTUNITIES AND EXCITING
                      PROJECTS. WHETHER YOU WANT TO DISCUSS A POTENTIAL
                      COLLABORATION OR JUST SAY HELLO, FEEL FREE TO REACH OUT!
                    </p>
                  </div>

                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                    } gap-6 relative z-20`}
                  >
                    <div className="flex flex-col items-center p-6 bg-secondary rounded border border-border relative">
                      <Mail className="w-8 h-8 text-accent mb-4" />
                      <h4
                        className={`font-bold text-foreground mb-2 ${
                          isMobile ? "text-xs" : "text-sm"
                        } tracking-wide`}
                      >
                        EMAIL
                      </h4>
                      <a
                        href="mailto:tiwarianmol173@gmail.com"
                        className={`text-muted-foreground hover:text-accent transition-colors ${
                          isMobile ? "text-[10px]" : "text-xs"
                        } cursor-pointer relative z-30 pointer-events-auto inline-block`}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href =
                            "mailto:tiwarianmol173@gmail.com";
                        }}
                      >
                        tiwarianmol173@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-secondary rounded border border-border relative">
                      <Phone className="w-8 h-8 text-accent mb-4" />
                      <h4
                        className={`font-bold text-foreground mb-2 ${
                          isMobile ? "text-xs" : "text-sm"
                        } tracking-wide`}
                      >
                        PHONE
                      </h4>
                      <a
                        href="tel:+918103107867"
                        className={`text-muted-foreground hover:text-accent transition-colors ${
                          isMobile ? "text-[10px]" : "text-xs"
                        } cursor-pointer relative z-30 pointer-events-auto inline-block`}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = "tel:+918103107867";
                        }}
                      >
                        +91-8103107867
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 relative z-20">
                    <a
                      href="https://github.com/Anmol0201/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 relative z-10 pointer-events-auto"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/anmol-tiwari-626866239/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 relative z-10 pointer-events-auto"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Particle Effects */}
      <ParticleSystem />
      <CursorTrail />

      {/* AI Chat Assistant */}
      <AnimatePresence>
        {!showLanding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ChatAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
