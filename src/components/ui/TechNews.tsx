import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Clock,
  ExternalLink,
  RefreshCw,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  readTime: number;
  trending?: boolean;
}

const TechNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const isMobile = useIsMobile();

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "5f9500e25cd14e1e9671a93dde5f1ccc";
  const BASE_URL = "https://newsapi.org/v2";

  const categories = [
    { id: "all", label: "ALL AI", icon: <TrendingUp className="w-3 h-3" /> },
    { id: "ml", label: "MACHINE LEARNING", icon: <Zap className="w-3 h-3" /> },
    {
      id: "llm",
      label: "LLMs & GPT",
      icon: <ExternalLink className="w-3 h-3" />,
    },
    {
      id: "research",
      label: "AI RESEARCH",
      icon: <RefreshCw className="w-3 h-3" />,
    },
  ];

  // Map categories to NewsAPI queries for AI content
  const getCategoryQuery = (category: string) => {
    switch (category) {
      case "ml":
        return "machine learning OR neural networks OR deep learning OR computer vision OR natural language processing OR supervised learning OR unsupervised learning";
      case "llm":
        return "GPT OR ChatGPT OR OpenAI OR large language model OR LLM OR Anthropic OR Claude OR Gemini OR transformer OR generative AI";
      case "research":
        return "AI research OR artificial intelligence research OR machine learning paper OR AI breakthrough OR AI study OR AI innovation OR AI publication";
      default:
        return "artificial intelligence OR AI OR machine learning OR deep learning OR neural networks OR GPT OR OpenAI OR AI news OR AI blog OR AI development";
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Debug logging
      console.log("API_KEY available:", !!API_KEY);
      console.log("Environment check:", import.meta.env.MODE);
      
      if (!API_KEY) {
        console.error("NewsAPI key is not available");
        setArticles([]);
        setLoading(false);
        return;
      }

      const query = getCategoryQuery(selectedCategory);
      const url = `${BASE_URL}/everything?q=${encodeURIComponent(
        query
      )}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      
      console.log("Fetching from:", url.replace(API_KEY, '[API_KEY]'));
      
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data.status, "Articles count:", data.articles?.length || 0);

      if (data.status === "ok" && data.articles) {
        const formattedArticles: NewsArticle[] = data.articles
          .filter(
            (article: any) =>
              article.title &&
              article.description &&
              article.url &&
              !article.title.includes("[Removed]") &&
              article.url !== "https://removed.com"
          )
          .map((article: any, index: number) => {
            const articleCategory =
              selectedCategory === "all" ? "ai" : selectedCategory;
            console.log(
              "Processing article:",
              article.title,
              "Category assigned:",
              articleCategory,
              "URL:",
              article.url
            );
            return {
              id: `${Date.now()}-${index}`,
              title: article.title,
              description: article.description,
              url: article.url,
              publishedAt: article.publishedAt,
              source: article.source?.name || "Unknown Source",
              category: articleCategory,
              readTime: Math.ceil(article.description?.length / 200) || 3,
              trending: index < 2, // Mark first 2 articles as trending
            };
          });

        setArticles(formattedArticles);
        setLastUpdate(new Date());
      } else {
        console.error("NewsAPI error:", data.message || "Unknown API error");
        console.error("Full API response:", data);
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Check if it's a network error or API key issue
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          console.error("API Key authentication failed");
        } else if (error.message.includes('429')) {
          console.error("API rate limit exceeded");
        }
      }
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]); // Refetch when category changes

  useEffect(() => {
    // Auto-refresh every 10 minutes (reduced frequency for API limits)
    const interval = setInterval(() => {
      if (!loading) {
        fetchNews();
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loading, selectedCategory]);

  const filteredArticles = articles.filter((article) => {
    // If "ALL" is selected, show all articles
    if (selectedCategory === "all") {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    }

    // For specific categories, only show articles that match that exact category
    const matchesCategory = article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - published.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search AI news and blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 ${
              isMobile ? "text-xs" : "text-sm"
            } bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300`}
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent/20"
              }`}
            >
              {category.icon}
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Update Status */}
        <div className="flex items-center justify-end">
          <motion.button
            onClick={fetchNews}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg border border-border bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 mr-2 ${
              loading ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>

          <div
            className={`${
              isMobile ? "text-[9px]" : "text-xs"
            } text-muted-foreground`}
          >
            Updated {formatTimeAgo(lastUpdate.toISOString())}
          </div>
        </div>
      </div>

      {/* News Articles */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="nothing-card animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4"></div>
                    <div className="h-3 bg-secondary rounded w-full"></div>
                    <div className="h-3 bg-secondary rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="nothing-card group hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center text-accent bg-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 ${
                        article.trending ? "ring-2 ring-accent/30" : ""
                      }`}
                    >
                      {categories.find((c) => c.id === article.category)
                        ?.icon || <TrendingUp className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4
                        className={`${
                          isMobile ? "text-xs" : "text-sm"
                        } font-semibold text-foreground line-clamp-2 hover:text-accent transition-colors cursor-pointer relative z-20`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Title clicked:", article.url);
                          if (
                            article.url &&
                            article.url !== "#" &&
                            article.url !== ""
                          ) {
                            window.open(
                              article.url,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                        title="Click to read full article"
                      >
                        {article.trending && (
                          <span className="inline-flex items-center gap-1 text-accent mr-2">
                            <Zap className="w-3 h-3" />
                          </span>
                        )}
                        {article.title}
                      </h4>
                    </div>

                    <p
                      className={`text-muted-foreground ${
                        isMobile ? "text-[10px]" : "text-xs"
                      } leading-relaxed mb-3 line-clamp-2`}
                    >
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span
                          className={`${
                            isMobile ? "text-[9px]" : "text-[10px]"
                          } font-medium`}
                        >
                          {article.source}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span
                            className={`${
                              isMobile ? "text-[9px]" : "text-[10px]"
                            }`}
                          >
                            {article.readTime}min read
                          </span>
                        </div>
                        <span
                          className={`${
                            isMobile ? "text-[9px]" : "text-[10px]"
                          }`}
                        >
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Read button clicked:", article.url);
                            if (
                              article.url &&
                              article.url !== "#" &&
                              article.url !== ""
                            ) {
                              window.open(
                                article.url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            } else {
                              alert("Article URL is not available");
                            }
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent rounded-md border border-accent/20 hover:border-accent transition-all duration-300 relative z-20"
                          title="Read full article"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="hidden sm:inline">Read</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechNews;
