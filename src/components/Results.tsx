
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
          <Trophy className="w-8 h-8 text-purple-600" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Test Complete!</h2>
        <p className="text-gray-600">Here's how you performed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-purple-50 rounded-lg text-center"
        >
          <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Words per Minute</p>
          <p className="text-3xl font-bold text-purple-600">
            {Math.round(results.wpm)}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-green-50 rounded-lg text-center"
        >
          <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Accuracy</p>
          <p className="text-3xl font-bold text-green-600">
            {results.accuracy}%
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-blue-50 rounded-lg text-center"
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
