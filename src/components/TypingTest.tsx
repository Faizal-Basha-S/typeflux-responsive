
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const sampleText = "The quick brown fox jumps over the lazy dog. Programming is both an art and a science, requiring creativity and logical thinking. Technology continues to shape our world in unprecedented ways.";

const TypingTest = ({ isActive, setIsActive, onComplete }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const calculateStats = () => {
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = currentInput.trim().split(/\s+/).length;
    const wpm = wordsTyped / timeInMinutes;
    const accuracyPercentage = Math.max(0, Math.min(100, ((currentInput.length - mistakes) / currentInput.length) * 100));

    return {
      wpm,
      accuracy: Math.round(accuracyPercentage),
      mistakes,
      time: Math.round(timeInMinutes * 60),
    };
  };

  const handleInput = (e) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (value.length > currentInput.length) {
      const expectedChar = sampleText[value.length - 1];
      const actualChar = value[value.length - 1];
      
      if (expectedChar !== actualChar) {
        setMistakes(prev => prev + 1);
      }
    }

    setCurrentInput(value);

    if (value.length >= sampleText.length) {
      onComplete(calculateStats());
    }
  };

  const progress = (currentInput.length / sampleText.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Progress bar */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        
        <p className="text-lg leading-relaxed mb-6 select-none font-mono">
          {sampleText.split('').map((char, index) => {
            let className = 'px-[1px] transition-all duration-150 relative';
            
            if (index < currentInput.length) {
              const isCorrect = currentInput[index] === char;
              className += isCorrect
                ? ' text-green-500'
                : ' text-red-500';
              
              if (index === currentInput.length - 1) {
                className += ' after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500 after:animate-pulse';
              }
            } else if (index === currentInput.length) {
              className += ' bg-purple-100 rounded';
            }
            
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={className}
              >
                {char}
              </motion.span>
            );
          })}
        </p>
        
        <textarea
          ref={inputRef}
          value={currentInput}
          onChange={handleInput}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 hover:border-purple-200"
          placeholder="Start typing here..."
          rows={3}
        />
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <p className="text-sm text-gray-500 mb-1">WPM</p>
            <motion.p 
              className="text-3xl font-bold text-purple-600"
              key={calculateStats().wpm}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {Math.round(calculateStats().wpm)}
            </motion.p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <p className="text-sm text-gray-500 mb-1">Accuracy</p>
            <motion.p 
              className="text-3xl font-bold text-purple-600"
              key={calculateStats().accuracy}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {calculateStats().accuracy}%
            </motion.p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <p className="text-sm text-gray-500 mb-1">Mistakes</p>
            <motion.p 
              className="text-3xl font-bold text-purple-600"
              key={mistakes}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {mistakes}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TypingTest;
