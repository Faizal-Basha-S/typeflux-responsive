
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import TypingTest from '@/components/TypingTest';
import Results from '@/components/Results';
import { Timer, RefreshCw } from 'lucide-react';

const Index = () => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const handleTestComplete = (testResults) => {
    setResults(testResults);
    setIsTestActive(false);
    toast({
      title: "Test Complete!",
      description: `You typed at ${Math.round(testResults.wpm)} WPM with ${testResults.accuracy}% accuracy.`,
    });
  };

  const resetTest = () => {
    setResults(null);
    setIsTestActive(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
              <Timer className="w-4 h-4 mr-2" />
              Test your typing speed
            </span>
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            How fast can you type?
          </h1>
          <p className="text-gray-600">
            Start typing to begin the test. The timer will start automatically.
          </p>
        </div>

        {!results ? (
          <TypingTest
            isActive={isTestActive}
            setIsActive={setIsTestActive}
            onComplete={handleTestComplete}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Results results={results} />
            <div className="mt-6 text-center">
              <button
                onClick={resetTest}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
