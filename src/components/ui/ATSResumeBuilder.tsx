import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Download,
  Eye,
  Wand2,
  Save,
  FileText,
} from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  category: string;
  skills: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
}

const ATSResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [previewMode, setPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();

  const sections = [
    {
      id: "personal",
      label: "Personal Info",
      icon: <User className="w-4 h-4" />,
    },
    { id: "summary", label: "Summary", icon: <FileText className="w-4 h-4" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    { id: "skills", label: "Skills", icon: <Award className="w-4 h-4" /> },
  ];

  // Add new experience
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""],
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  // Update experience
  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: any
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Add responsibility to experience
  const addResponsibility = (expId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, ""] }
          : exp
      ),
    }));
  };

  // Update responsibility
  const updateResponsibility = (
    expId: string,
    index: number,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((resp, i) =>
                i === index ? value : resp
              ),
            }
          : exp
      ),
    }));
  };

  // Add education
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  // Update education
  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Add skill category
  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: "",
      skills: [""],
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  // Update skill category
  const updateSkillCategory = (id: string, field: keyof Skill, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  // AI-powered content generation
  const generateAIContent = async (
    type: "summary" | "responsibility",
    context?: string
  ) => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      if (type === "summary") {
        const aiSummary =
          "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams to achieve business objectives.";
        setResumeData((prev) => ({ ...prev, summary: aiSummary }));
      } else if (type === "responsibility" && context) {
        const aiResponsibilities = [
          "Developed and maintained responsive web applications using React and TypeScript",
          "Collaborated with design team to implement pixel-perfect UI components",
          "Optimized application performance resulting in 40% faster load times",
          "Mentored junior developers and conducted code reviews",
        ];
        return aiResponsibilities;
      }
      setIsGenerating(false);
    }, 2000);
  };

  // Generate resume preview
  const generatePreview = () => {
    return (
      <div className="bg-white text-black p-8 max-w-4xl mx-auto min-h-screen">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
          <h1 className="text-2xl font-bold mb-2">
            {resumeData.personalInfo.fullName}
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
            </div>
            <div>{resumeData.personalInfo.location}</div>
            {resumeData.personalInfo.linkedin && (
              <div>LinkedIn: {resumeData.personalInfo.linkedin}</div>
            )}
            {resumeData.personalInfo.portfolio && (
              <div>Portfolio: {resumeData.personalInfo.portfolio}</div>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
              PROFESSIONAL EXPERIENCE
            </h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-700">
                      {exp.company}, {exp.location}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <ul className="text-sm ml-4 list-disc">
                  {exp.responsibilities
                    .filter((r) => r.trim())
                    .map((resp, index) => (
                      <li key={index} className="mb-1">
                        {resp}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
              EDUCATION
            </h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.graduationDate}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
              TECHNICAL SKILLS
            </h2>
            {resumeData.skills.map((skillGroup) => (
              <div key={skillGroup.id} className="mb-2">
                <span className="font-semibold">{skillGroup.category}: </span>
                <span className="text-sm">
                  {skillGroup.skills.filter((s) => s.trim()).join(", ")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
              CERTIFICATIONS
            </h2>
            <ul className="text-sm ml-4 list-disc">
              {resumeData.certifications
                .filter((c) => c.trim())
                .map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Resume Preview</h2>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setPreviewMode(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.button>
          </div>
        </div>

        <div className="nothing-card overflow-hidden">{generatePreview()}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          className={`${
            isMobile ? "text-2xl" : "text-3xl"
          } font-bold text-foreground tracking-wide glow-text`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📝 ATS Resume Builder
        </motion.h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create an ATS-friendly resume with AI assistance. Optimized for
          applicant tracking systems.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="nothing-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Build Progress</h3>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setPreviewMode(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-secondary text-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <Eye className="w-3 h-3" />
              Preview
            </motion.button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.icon}
              {!isMobile && section.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        {activeSection === "personal" && (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="nothing-card"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        fullName: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        phone: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        location: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        linkedin: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        portfolio: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  placeholder="johndoe.dev"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "summary" && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="nothing-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Professional Summary
              </h3>
              <motion.button
                onClick={() => generateAIContent("summary")}
                disabled={isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm hover:bg-accent/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3" />
                AI Generate
              </motion.button>
            </div>

            <textarea
              value={resumeData.summary}
              onChange={(e) =>
                setResumeData((prev) => ({ ...prev, summary: e.target.value }))
              }
              placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
              className="w-full h-32 p-4 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none text-sm"
            />

            <p className="text-xs text-muted-foreground mt-2">
              Tip: Keep it concise (3-4 lines) and include keywords from your
              target job descriptions.
            </p>
          </motion.div>
        )}

        {activeSection === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="nothing-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  Work Experience
                </h3>
                <motion.button
                  onClick={addExperience}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  Add Experience
                </motion.button>
              </div>

              {resumeData.experience.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No work experience added yet. Click "Add Experience" to get
                  started.
                </p>
              ) : (
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "jobTitle",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                            placeholder="Senior Software Engineer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Company *
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                            placeholder="Tech Corp Inc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "location",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                            placeholder="San Francisco, CA"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Start Date *
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "endDate",
                                e.target.value
                              )
                            }
                            disabled={exp.current}
                            className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm disabled:opacity-50"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "current",
                                e.target.checked
                              )
                            }
                            className="mr-2"
                          />
                          <label className="text-sm text-foreground">
                            Current Position
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-foreground">
                            Key Responsibilities & Achievements
                          </label>
                          <motion.button
                            onClick={() => addResponsibility(exp.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-2 py-1 bg-secondary text-foreground rounded text-xs hover:bg-secondary/80 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>

                        {exp.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={resp}
                              onChange={(e) =>
                                updateResponsibility(
                                  exp.id,
                                  respIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 px-3 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                              placeholder="Led development of React application resulting in 25% performance improvement"
                            />
                            {exp.responsibilities.length > 1 && (
                              <motion.button
                                onClick={() => {
                                  const newResponsibilities =
                                    exp.responsibilities.filter(
                                      (_, i) => i !== respIndex
                                    );
                                  updateExperience(
                                    exp.id,
                                    "responsibilities",
                                    newResponsibilities
                                  );
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </motion.button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          onClick={() => {
                            setResumeData((prev) => ({
                              ...prev,
                              experience: prev.experience.filter(
                                (e) => e.id !== exp.id
                              ),
                            }));
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-md text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Similar implementations for education and skills sections would go here */}
      </AnimatePresence>

      {/* Bottom Actions */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </motion.button>

        <motion.button
          onClick={() => setPreviewMode(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview & Download
        </motion.button>
      </div>
    </div>
  );
};

export default ATSResumeBuilder;
