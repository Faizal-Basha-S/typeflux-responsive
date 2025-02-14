
import { motion } from 'framer-motion';
import { Trophy, Target, Clock } from 'lucide-react';

const Results = ({ results }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Trophy className="w-8 h-8 text-purple-600" />
          </motion.div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          Test Complete!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          Here's how you performed
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-purple-50 rounded-lg text-center hover:shadow-md transition-all duration-200"
        >
          <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Words per Minute</p>
          <p className="text-3xl font-bold text-purple-600">
            {Math.round(results.wpm)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-green-50 rounded-lg text-center hover:shadow-md transition-all duration-200"
        >
          <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Accuracy</p>
          <p className="text-3xl font-bold text-green-600">
            {results.accuracy}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-blue-50 rounded-lg text-center hover:shadow-md transition-all duration-200"
        >
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Time</p>
          <p className="text-3xl font-bold text-blue-600">
            {results.time}s
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Results;
