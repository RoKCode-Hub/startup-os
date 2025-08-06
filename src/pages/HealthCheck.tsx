
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, FileQuestion, Grid3X3 } from "lucide-react";
import { categories as initialCategories } from '@/data/questionnaire';
import { Category } from '@/types/questionnaire';
import { dynamicIconImport } from '@/utils/dynamicIconImport';
import CategoryCard from '@/components/CategoryCard';
import QuestionCard from '@/components/QuestionCard';
import ResultsChart from '@/components/ResultsChart';
import { LucideIcon } from 'lucide-react';

interface CategoryWithIcon extends Category {
  IconComponent: LucideIcon | null;
}

const HealthCheck = () => {
  const [view, setView] = useState<'intro' | 'assess,emt' | 'results'>('intro');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [categoriesWithIcons, setCategoriesWithIcons] = useState<CategoryWithIcon[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
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
    setView('intro');
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

  const renderIntroView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-none bg-card/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-light mb-4">Startup OS Health Check</CardTitle>
          <p className="text-muted-foreground text-lg">
            A quick evaluation of your company's operating system across five key dimensions
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            This questionnaire evaluates 5 categories: Direction, Traction, Leadership, Collaboration, and Organizational Setup. Rate each statement on a scale of 1-5.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Estimated time:</div>
                <div className="text-sm text-muted-foreground">Approx. 5 minutes</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
              <FileQuestion className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Questions:</div>
                <div className="text-sm text-muted-foreground">{totalQuestions} total</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
              <Grid3X3 className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Categories:</div>
                <div className="text-sm text-muted-foreground">{categories.length} sections</div>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button 
              onClick={() => setView('assessment')} 
              className="px-8 py-6 text-lg font-medium rounded-full bg-destructive hover:bg-destructive/90"
            >
              Begin Health Check <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="health-header"
          title={view === 'intro' ? "Business Health Assessment" : view === 'assessment' ? "Assessment" : "Assessment Results"}
          description={view === 'intro' ? "Evaluate your startup's operating system across critical dimensions" : view === 'assessment' ? "Rate each statement based on how well it describes your current situation" : "Your comprehensive business health analysis"}
          className="pt-16"
        >
          {view === 'intro' && renderIntroView()}
          
          {view === 'assessment' && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => setView('intro')}>
                  ← Back to Intro
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
              
              <div className="flex justify-center items-center space-x-8 mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevQuestion}
                  disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}
                  className="px-6"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={currentQuestion.rating === 0}
                  className="px-6"
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
                <Button variant="outline" onClick={() => setView('intro')}>
                  ← Back to Intro
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
