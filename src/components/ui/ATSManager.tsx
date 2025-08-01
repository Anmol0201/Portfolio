import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ATSResumeAnalyzer from "./ATSResumeAnalyzer";
import ATSResumeBuilder from "./ATSResumeBuilder";
import {
  BarChart3,
  FileText,
  Sparkles,
  Target,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

const ATSManager = () => {
  const [activeMode, setActiveMode] = useState<"analyzer" | "builder">(
    "analyzer"
  );
  const isMobile = useIsMobile();

  const modes = [
    {
      id: "analyzer",
      label: "Resume Analyzer",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Analyze your existing resume for ATS compatibility",
      features: [
        "ATS Score Analysis",
        "Keyword Matching",
        "Format Optimization",
        "AI Suggestions",
      ],
    },
    {
      id: "builder",
      label: "Resume Builder",
      icon: <FileText className="w-5 h-5" />,
      description: "Build a new ATS-optimized resume from scratch",
      features: [
        "ATS-Friendly Templates",
        "AI Content Generation",
        "Real-time Preview",
        "PDF Export",
      ],
    },
  ];

  const stats = [
    {
      label: "Resumes Analyzed",
      value: "10,000+",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      label: "Success Rate",
      value: "92%",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Happy Users",
      value: "5,000+",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Keywords Tracked",
      value: "1,000+",
      icon: <Target className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <div className="p-3 bg-accent/10 rounded-full">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
          </div>

          <h1
            className={`${
              isMobile ? "text-3xl" : "text-4xl"
            } font-bold text-foreground tracking-wide glow-text`}
          >
            Smart ATS Resume Assistant
          </h1>

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Beat applicant tracking systems with AI-powered resume analysis and
            optimization. Get instant feedback, keyword suggestions, and
            ATS-friendly formatting.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="nothing-card text-center p-4"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">{stat.icon}</div>
              </div>
              <div className="text-xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <motion.div
            key={mode.id}
            onClick={() => setActiveMode(mode.id as any)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`nothing-card cursor-pointer transition-all duration-300 ${
              activeMode === mode.id
                ? "border-accent bg-accent/5"
                : "hover:border-accent/50"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    activeMode === mode.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {mode.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mode.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                  Features:
                </h4>
                <div className="grid grid-cols-1 gap-1">
                  {mode.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {activeMode === mode.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-accent text-sm font-medium"
                >
                  <Zap className="w-3 h-3" />
                  Active Mode
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Component */}
      <AnimatePresence mode="wait">
        {activeMode === "analyzer" && (
          <motion.div
            key="analyzer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ATSResumeAnalyzer />
          </motion.div>
        )}

        {activeMode === "builder" && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ATSResumeBuilder />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free Tier Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="nothing-card border-accent/30 bg-accent/5"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              🎉 Free Tier Benefits
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Unlimited resume analysis and building</p>
              <p>• AI-powered keyword suggestions</p>
              <p>• ATS compatibility scoring</p>
              <p>• Professional resume templates</p>
              <p>• Real-time optimization tips</p>
            </div>
            <p className="text-xs text-accent mt-3 font-medium">
              All features are completely free to use! No hidden charges or
              limitations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ATSManager;
