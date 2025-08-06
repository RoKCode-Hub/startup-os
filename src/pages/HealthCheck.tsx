
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, HelpCircle, ArrowRight, BarChart3 } from "lucide-react";
import { categories as initialCategories } from '@/data/questionnaire';
import { Category } from '@/types/questionnaire';
import { dynamicIconImport } from '@/utils/dynamicIconImport';
import CategoryCard from '@/components/CategoryCard';
import QuestionCard from '@/components/QuestionCard';
import ResultsChart from '@/components/ResultsChart';
import { LucideIcon } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface CategoryWithIcon extends Category {
  IconComponent: LucideIcon | null;
}

const HealthCheck = () => {
  const [view, setView] = useState<'systems' | 'questionnaire' | 'assessment' | 'results'>('systems');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [categoriesWithIcons, setCategoriesWithIcons] = useState<CategoryWithIcon[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [systems] = useState([
    {
      id: 1,
      name: "User Authentication",
      status: "operational",
      lastChecked: "2 minutes ago",
      uptime: "99.99%"
    },
    {
      id: 2,
      name: "Database Services",
      status: "operational",
      lastChecked: "5 minutes ago",
      uptime: "99.98%"
    },
    {
      id: 3,
      name: "API Gateway",
      status: "operational",
      lastChecked: "3 minutes ago",
      uptime: "99.95%"
    },
    {
      id: 4,
      name: "Storage System",
      status: "operational",
      lastChecked: "7 minutes ago",
      uptime: "99.99%"
    },
    {
      id: 5,
      name: "Payment Processing",
      status: "degraded",
      lastChecked: "10 minutes ago",
      uptime: "99.50%",
      message: "We're experiencing delays in payment processing. Our team is working on it."
    },
    {
      id: 6,
      name: "Email Service",
      status: "operational",
      lastChecked: "4 minutes ago",
      uptime: "99.97%"
    }
  ]);

  useEffect(() => {
    const loadIcons = async () => {
      const withIcons = await Promise.all(
        categories.map(async (category) => {
          const IconComponent = await dynamicIconImport(category.icon);
          return {
            ...category,
            IconComponent
          };
        })
      );
      setCategoriesWithIcons(withIcons);
    };
    
    loadIcons();
  }, [categories]);

  const updateQuestionRating = (rating: number) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[currentCategoryIndex];
    category.questions[currentQuestionIndex].rating = rating;
    
    // Recalculate category score
    category.score = category.questions.reduce((sum, q) => sum + q.rating, 0);
    
    setCategories(updatedCategories);
  };

  const nextQuestion = () => {
    const currentCategory = categories[currentCategoryIndex];
    
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setView('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(categories[currentCategoryIndex - 1].questions.length - 1);
    }
  };

  const resetAssessment = () => {
    const resetCategories = initialCategories.map(category => ({
      ...category,
      questions: category.questions.map(question => ({ ...question, rating: 0 })),
      score: 0
    }));
    setCategories(resetCategories);
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setView('questionnaire');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="text-green-500" size={20} />;
      case "degraded":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "outage":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <HelpCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "outage":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];
  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const completedQuestions = categories.reduce((sum, cat, catIndex) => {
    if (catIndex < currentCategoryIndex) {
      return sum + cat.questions.length;
    } else if (catIndex === currentCategoryIndex) {
      return sum + currentQuestionIndex;
    }
    return sum;
  }, 0);

  const progress = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;

  const renderSystemsView = () => (
    <>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Current Status</h3>
            <span className="text-sm text-gray-500">Last updated: May 2, 2025 at 10:35 AM</span>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              All Systems Operational
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
              Uptime: 99.98%
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4 mb-8">
        {systems.map((system) => (
          <Card key={system.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(system.status)}
                  <h3 className="ml-2 font-medium">{system.name}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    Checked {system.lastChecked}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(system.status)}`}>
                    {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                  </span>
                </div>
              </div>
              {system.message && (
                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {system.message}
                </div>
              )}
              <div className="mt-2 text-sm text-gray-500">
                Uptime: {system.uptime}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Business Health Assessment</h3>
              <p className="text-muted-foreground mb-4">
                Beyond system monitoring, evaluate your overall business health across key areas
              </p>
            </div>
            <BarChart3 className="h-12 w-12 text-primary opacity-60" />
          </div>
          <Button onClick={() => setView('questionnaire')} className="w-full sm:w-auto">
            Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="health-header"
          title={view === 'systems' ? "System Health Status" : view === 'questionnaire' ? "Business Categories" : view === 'assessment' ? "Assessment" : "Assessment Results"}
          description={view === 'systems' ? "Real-time monitoring of all Startup OS services and components" : view === 'questionnaire' ? "Select a category to begin your business health assessment" : view === 'assessment' ? "Rate each statement based on how well it describes your current situation" : "Your comprehensive business health analysis"}
          className="pt-16"
        >
          {view === 'systems' && renderSystemsView()}
          
          {view === 'questionnaire' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => setView('systems')}>
                  ← Back to Systems
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoriesWithIcons.map((category, index) => (
                  category.IconComponent && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CategoryCard
                        title={category.title}
                        description={category.description}
                        score={category.score}
                        maxScore={category.maxScore}
                        icon={category.IconComponent}
                        onClick={() => {
                          setCurrentCategoryIndex(index);
                          setCurrentQuestionIndex(0);
                          setView('assessment');
                        }}
                      />
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          )}
          
          {view === 'assessment' && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => setView('questionnaire')}>
                  ← Back to Categories
                </Button>
                <div className="text-sm text-muted-foreground">
                  Question {completedQuestions + 1} of {totalQuestions}
                </div>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{currentCategory.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {currentQuestionIndex + 1} of {currentCategory.questions.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <QuestionCard
                question={currentQuestion.text}
                currentRating={currentQuestion.rating}
                onRatingChange={updateQuestionRating}
              />
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevQuestion}
                  disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={currentQuestion.rating === 0}
                >
                  {(currentCategoryIndex === categories.length - 1 && 
                    currentQuestionIndex === currentCategory.questions.length - 1) 
                    ? 'View Results' : 'Next'}
                </Button>
              </div>
            </motion.div>
          )}
          
          {view === 'results' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setView('systems')}>
                  ← Back to Systems
                </Button>
                <Button onClick={resetAssessment}>
                  Retake Assessment
                </Button>
              </div>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-light text-primary mb-4">
                    {categories.reduce((sum, cat) => sum + cat.score, 0)}
                    <span className="text-muted-foreground text-lg">
                      /{categories.reduce((sum, cat) => sum + cat.maxScore, 0)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Overall business health score across all categories
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoriesWithIcons.map((category, index) => (
                  category.IconComponent && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CategoryCard
                        title={category.title}
                        description={category.description}
                        score={category.score}
                        maxScore={category.maxScore}
                        icon={category.IconComponent}
                        onClick={() => {}}
                      />
                    </motion.div>
                  )
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResultsChart categories={categories} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthCheck;
