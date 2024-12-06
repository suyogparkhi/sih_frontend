import React from "react";
import { BarChart2, PieChart, Activity, Zap, Cpu, HardDrive, MemoryStickIcon as Memory } from 'lucide-react';

const ModelPerformance = ({ modelMetrics, darkMode }) => {
  if (!modelMetrics) return null;

  return (
    <div className={` ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow p-6`}>
      <h2 className={`text-xl font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
        <BarChart2 className="mr-2 text-cyan-500" />
        Model Performance
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
          <div className={`text-gray-600 flex items-center justify-center ${darkMode ? 'text-gary-600' : 'text-gray-600'}`}>
            <Activity className="mr-2 text-cyan-500" />
            ACCURACY
          </div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-gray-600' : 'text-cyan-600'}`}>{modelMetrics.accuracy}%</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
          <div className={`text-gray-600 flex items-center justify-center ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>
            <Zap className="mr-2 text-cyan-500" />
            LOSS
          </div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-gray-800' : 'text-blue-600'}`}>{modelMetrics.loss}</div>
        </div>
      </div>

      <h3 className={`font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
        <PieChart className="mr-2 text-cyan-500" />
        Confusion Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className={`px-4 py-2 bg-cyan-50 ${darkMode ? 'text-gray-200' : ''}`}></th>
              <th className={`px-4 py-2 bg-cyan-50 ${darkMode ? 'text-gray-600' : ''}`}>HELLO_GOOGLE</th>
              <th className={`px-4 py-2 bg-cyan-50 ${darkMode ? 'text-gray-600' : ''}`}>NOISE</th>
              <th className={`px-4 py-2 bg-cyan-50 ${darkMode ? 'text-gray-600' : ''}`}>UNKNOWN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(modelMetrics.confusionMatrix).map(([key, values]) => (
              <tr key={key}>
                <td className={`px-4 py-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{key}</td>
                <td className={`px-4 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>{values.hello_google || '0'}%</td>
                <td className={`px-4 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>{values.noise || '0'}%</td>
                <td className={`px-4 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>{values.unknown || '0'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className={`font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
          <Activity className="mr-2 text-cyan-500" />
          Additional Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>Area under ROC Curve</div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.metrics?.rocCurve}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>Precision</div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.metrics?.precision}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>Recall</div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.metrics?.recall}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>F1 Score</div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.metrics?.f1Score}</div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className={`font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
          <Cpu className="mr-2 text-cyan-500" />
          Device Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'} flex items-center justify-center`}>
              <Zap className="mr-1 text-cyan-500" size={16} />
              Inference Time
            </div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.performance?.inferenceTime}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'} flex items-center justify-center`}>
              <Memory className="mr-1 text-cyan-500" size={16} />
              RAM Usage
            </div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.performance?.ramUsage}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'} flex items-center justify-center`}>
              <HardDrive className="mr-1 text-cyan-500" size={16} />
              Flash Usage
            </div>
            <div className={`font-semibold ${darkMode ? 'text-gray-600' : ''}`}>{modelMetrics.performance?.flashUsage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;

