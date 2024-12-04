
import React from "react";
import { BarChart2, PieChart, Activity, Zap, Cpu, HardDrive, MemoryStickIcon as Memory } from 'lucide-react';

const ModelPerformance = ({ modelMetrics }) => {
  if (!modelMetrics) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <BarChart2 className="mr-2 text-cyan-500" />
        Model Performance
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
          <div className="text-gray-600 flex items-center justify-center">
            <Activity className="mr-2 text-cyan-500" />
            ACCURACY
          </div>
          <div className="text-3xl font-bold text-cyan-600">{modelMetrics.accuracy}%</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
          <div className="text-gray-600 flex items-center justify-center">
            <Zap className="mr-2 text-cyan-500" />
            LOSS
          </div>
          <div className="text-3xl font-bold text-blue-600">{modelMetrics.loss}</div>
        </div>
      </div>

      <h3 className="font-semibold mb-4 flex items-center">
        <PieChart className="mr-2 text-cyan-500" />
        Confusion Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-cyan-50"></th>
              <th className="px-4 py-2 bg-cyan-50">HELLO_GOOGLE</th>
              <th className="px-4 py-2 bg-cyan-50">NOISE</th>
              <th className="px-4 py-2 bg-cyan-50">UNKNOWN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {Object.entries(modelMetrics.confusionMatrix).map(([key, values]) => (
              <tr key={key}>
                <td className="px-4 py-2 font-medium">{key}</td>
                <td className="px-4 py-2">{values.hello_google || '0'}%</td>
                <td className="px-4 py-2">{values.noise || '0'}%</td>
                <td className="px-4 py-2">{values.unknown || '0'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4 flex items-center">
          <Activity className="mr-2 text-cyan-500" />
          Additional Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Area under ROC Curve</div>
            <div className="font-semibold">{modelMetrics.metrics?.rocCurve}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Precision</div>
            <div className="font-semibold">{modelMetrics.metrics?.precision}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Recall</div>
            <div className="font-semibold">{modelMetrics.metrics?.recall}</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">F1 Score</div>
            <div className="font-semibold">{modelMetrics.metrics?.f1Score}</div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4 flex items-center">
          <Cpu className="mr-2 text-cyan-500" />
          Device Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Zap className="mr-1 text-cyan-500" size={16} />
              Inference Time
            </div>
            <div className="font-semibold">{modelMetrics.performance?.inferenceTime}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Memory className="mr-1 text-cyan-500" size={16} />
              RAM Usage
            </div>
            <div className="font-semibold">{modelMetrics.performance?.ramUsage}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <HardDrive className="mr-1 text-cyan-500" size={16} />
              Flash Usage
            </div>
            <div className="font-semibold">{modelMetrics.performance?.flashUsage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;

