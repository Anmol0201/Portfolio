import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Mail,
  Pho      {/* Profile Card */}
      <motion.div
        className={`${
          isMobile
            ? "relative w-full bg-card/95 border border-border rounded-xl p-4 shadow-lg mx-3 mt-20 mb-6"
            : "fixed top-32 left-6 w-80 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl"
        } z-40`}
        initial={{ x: isMobile ? 0 : -100, opacity: 0, y: isMobile ? 20 : 0 }}
        animate={{ x: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
      >n,
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
} from "lucide-react";
import avatarImage from "@/assets/avatar.png";
import AnimatedSkillBar from "@/components/ui/AnimatedSkillBar";
import ProjectCard from "@/components/ui/ProjectCard";
import ParticleSystem from "@/components/ui/ParticleSystem";
import CursorTrail from "@/components/ui/CursorTrail";
import ParticleHover from "@/components/ui/ParticleHover";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingElement from "@/components/ui/FloatingElement";
import ChatAssistant from "@/components/ui/ChatAssistant";
import Logo from "@/components/ui/Logo";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
      tech: ["Machine Learning", "Streamlit", "Python", "SVM", "Decision Tree"],
      category: "AI/ML",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
    },
    {
      title: "TALK-TRACK",
      description:
        "Interactive WhatsApp chat analytics dashboard with user activity heatmaps and sentiment analysis.",
      tech: ["Streamlit", "Python", "NLP", "Data Visualization", "Pandas"],
      category: "Data Science",
      githubUrl: "https://github.com/Anmol0201/",
      liveUrl: "#",
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
    { id: "contact", label: "CONTACT", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Logo */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={() => scrollToSection("about")}
      >
        <Logo
          size="md"
          variant="full"
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {/* Navigation */}
      <nav
        className={`fixed z-50 ${
          isMobile ? "bottom-4 left-4 right-4" : "top-6 right-6"
        }`}
      >
        <div className="nothing-nav rounded-lg p-1 pulse-glow">
          <div className={`flex gap-1 ${isMobile ? "justify-center" : ""}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${
                  isMobile ? "px-2 py-2" : "px-4 py-2"
                } rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground glow-text"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary bright-hover"
                }`}
              >
                {item.icon}
                {!isMobile && item.label}
              </button>
            ))}
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`${
                  isMobile ? "px-2 py-2" : "px-3 py-2"
                } rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary bright-hover transform hover:scale-105`}
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <motion.div
        className={`${
          isMobile
            ? "relative w-full bg-card/95 border border-border rounded-xl p-4 shadow-lg mx-3 mt-20 mb-6"
            : "fixed top-32 left-6 w-80 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl"
        } z-40`}
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
                  <p className="text-muted-foreground uppercase tracking-wider">LOCATION</p>
                  <p className="text-foreground font-medium">GWALIOR, INDIA</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground uppercase tracking-wider">EDUCATION</p>
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

      {/* Main Content */}
      <div
        className={`min-h-screen ${
          isMobile ? "p-3 pb-24" : "p-8 pl-96"
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
                    isMobile ? "text-2xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ABOUT_ME
                </motion.h2>
                <motion.div
                  className="w-12 h-0.5 bg-accent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                ></motion.div>
                <motion.div
                  className={`space-y-6 ${
                    isMobile ? "text-xs" : "text-sm"
                  } leading-relaxed`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
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
                <h3 className="text-xl font-bold text-foreground mb-8 tracking-wide glow-text">
                  WHAT_I_DO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div key={index} className="nothing-card group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-foreground mb-2 tracking-wide uppercase">
                            {service.title}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {service.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-[10px] px-2 py-1 bg-secondary rounded text-muted-foreground border border-border"
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
                <h2 className="text-3xl font-bold text-foreground mb-6 tracking-wide glow-text">
                  RESUME
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-8"></div>
              </div>

              {/* Education */}
              <div className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-foreground tracking-wide">
                    EDUCATION
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent pl-4">
                    <h4 className="text-sm font-bold text-foreground tracking-wide">
                      BACHELOR OF TECHNOLOGY IN INFORMATION TECHNOLOGY
                    </h4>
                    <p className="text-accent text-xs font-medium tracking-wide">
                      MADHAV INSTITUTE OF TECHNOLOGY AND SCIENCE (MITS-DU),
                      GWALIOR
                    </p>
                    <p className="text-muted-foreground text-xs">2022 - 2026</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="nothing-card">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-foreground tracking-wide">
                    EXPERIENCE
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent pl-4">
                    <h4 className="text-sm font-bold text-foreground tracking-wide">
                      SOFTWARE DEVELOPMENT INTERN
                    </h4>
                    <p className="text-accent text-xs font-medium tracking-wide">
                      RISHISHWAR INDUSTRIES PVT LTD.
                    </p>
                    <p className="text-muted-foreground text-xs mb-3">
                      MAY 2025 - JULY 2025
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      CONTRIBUTED TO A DYNAMIC DEVELOPMENT TEAM BY BUILDING AND
                      TESTING REST APIS, STRENGTHENING BACKEND INFRASTRUCTURE.
                      GAINED EXPOSURE TO APPLIED AI AND MACHINE LEARNING BY
                      ASSISTING IN THE INTEGRATION OF INTELLIGENT FEATURES.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <AnimatedSection className="nothing-card" delay={0.4}>
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
                    <h5 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
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
                    <h5 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
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
                    <h5 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
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
                    <h5 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
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
                  <h3 className="text-lg font-bold text-foreground tracking-wide">
                    ACHIEVEMENTS_&_CERTIFICATIONS
                  </h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground text-xs leading-relaxed">
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
                    isMobile ? "text-2xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide glow-text`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  PROJECTS
                </motion.h2>
                <motion.div
                  className="w-12 h-0.5 bg-accent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                ></motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
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
                    isMobile ? "text-2xl" : "text-3xl"
                  } font-bold text-foreground mb-6 tracking-wide`}
                >
                  CONTACT
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-8"></div>
              </div>

              <div className="nothing-card relative z-10">
                <div className="text-center space-y-8 pointer-events-auto">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 tracking-wide">
                      LET'S_WORK_TOGETHER
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                      I'M ALWAYS INTERESTED IN NEW OPPORTUNITIES AND EXCITING
                      PROJECTS. WHETHER YOU WANT TO DISCUSS A POTENTIAL
                      COLLABORATION OR JUST SAY HELLO, FEEL FREE TO REACH OUT!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                    <div className="flex flex-col items-center p-6 bg-secondary rounded border border-border relative">
                      <Mail className="w-8 h-8 text-accent mb-4" />
                      <h4 className="font-bold text-foreground mb-2 text-sm tracking-wide">
                        EMAIL
                      </h4>
                      <a
                        href="mailto:tiwarianmol173@gmail.com"
                        className="text-muted-foreground hover:text-accent transition-colors text-xs cursor-pointer relative z-30 pointer-events-auto inline-block"
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
                      <h4 className="font-bold text-foreground mb-2 text-sm tracking-wide">
                        PHONE
                      </h4>
                      <a
                        href="tel:+918103107867"
                        className="text-muted-foreground hover:text-accent transition-colors text-xs cursor-pointer relative z-30 pointer-events-auto inline-block"
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
      <ChatAssistant />
    </div>
  );
};

export default Portfolio;
