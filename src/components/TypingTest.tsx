
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-lg leading-relaxed mb-4 select-none">
          {sampleText.split('').map((char, index) => {
            let className = 'transition-colors duration-150';
            if (index < currentInput.length) {
              className += currentInput[index] === char
                ? ' text-green-500'
                : ' text-red-500';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </p>
        <textarea
          ref={inputRef}
          value={currentInput}
          onChange={handleInput}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
          placeholder="Start typing here..."
          rows={3}
        />
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">WPM</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(calculateStats().wpm)}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-purple-600">
              {calculateStats().accuracy}%
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Mistakes</p>
            <p className="text-2xl font-bold text-purple-600">{mistakes}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TypingTest;
