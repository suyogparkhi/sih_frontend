import React, { useState ,useContext} from 'react';
import { Upload, Play, AlertCircle, CheckCircle } from 'lucide-react';
import ModelPerformance from './ModelPerformance';
import {ThemeContext} from "../context/ThemeProvider"
//import LoadingPopup from './LoadingPopup'; // Import your LoadingPopup component

const Train = () => {
  const [files, setFiles] = useState([]);
  const [trainingOutput, setTrainingOutput] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrainingCompleted, setIsTrainingCompleted] = useState(false);
  const [modelMetrics, setModelMetrics] = useState(null); // Store model metrics
  const {darkMode}=useContext(ThemeContext);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const simulateTrainingLogs = async () => {
    const logs = [
      'Initializing training...',
      'Loading dataset...',
      'Starting training process...',
      'Epoch 1/30: loss: 0.45 - accuracy: 0.85',
      'Epoch 15/30: loss: 0.25 - accuracy: 0.92',
      'Epoch 30/30: loss: 0.18 - accuracy: 0.976',
      'Training complete!',
    ];

    for (const log of logs) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate log generation delay
      setTrainingOutput((prev) => [...prev, log]);
    }
  };

  const handleTrain = async () => {
    setIsTraining(true);
    setTrainingOutput([]); // Clear logs before new training
    setModelMetrics(null); // Clear metrics

    // Simulate log output
    await simulateTrainingLogs();

    // Simulate model metrics (replace with actual logic)
    const simulatedMetrics = {
      accuracy: 97.6,
      loss: 0.18,
      confusionMatrix: {
        hello_google: { hello_google: 95, noise: 2, unknown: 3 },
        noise: { hello_google: 1, noise: 98, unknown: 1 },
        unknown: { hello_google: 0, noise: 3, unknown: 97 },
      },
      metrics: {
        rocCurve: 0.98,
        precision: 0.96,
        recall: 0.95,
        f1Score: 0.96,
      },
      performance: {
        inferenceTime: '0.5ms',
        ramUsage: '120MB',
        flashUsage: '1.5MB',
      },
    };

    setModelMetrics(simulatedMetrics);

    // Simulate slight delay before showing popup
    setTimeout(() => {
      setIsTraining(false);
      setIsTrainingCompleted(true); // Show success popup
    }, 1500);
  };

  const handleClosePopup = () => {
    setIsTrainingCompleted(false); // Close the success popup
  };

  return (
    <div className={`container mx-auto px-6 py-12`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8  ${darkMode ? 'text-white':'text-black'}`}>
          Train Model
        </h1>

        {/* File Upload Section */}
        <div className={`" backdrop-blur-sm p-8 rounded-xl shadow-lg mb-8" ${darkMode?'bg-gray-700':'bg-white/80'}`}>
          <div className="border-2 border-dashed border-cyan-200 rounded-lg p-8 text-center">
            <input
              type="file"
              id="audio-upload"
              multiple
              accept=".mp3,.wav"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <Upload className="h-12 w-12 text-cyan-500" />
              <div>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Drop your audio files here
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supports MP3, WAV files</p>
              </div>
            </label>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className={` mt-8 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 ${darkMode ? 'bg-gray-700' : 'bg-white/80'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Uploaded Files</h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-cyan-50 text-gray-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-cyan-600" />
                    <span className={`${darkMode ?'text-white':'text-gray-700'}`}>{file.name}</span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Controls */}
        <div className=" mt-8 flex justify-center">
          <button
            onClick={handleTrain}
            disabled={files.length === 0 || isTraining}
            className={`bg-gradient-to-r from-cyan-400 to-blue-300 
              hover:from-cyan-500 hover:to-blue-400 
              text-white px-8 py-3 rounded-lg font-semibold 
              transition-all duration-300 flex items-center gap-2 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTraining ? (
              <>
                <AlertCircle className="h-5 w-5 animate-pulse" />
                Training...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Train Model
              </>
            )}
          </button>
        </div>

        <div className="space-y-8 mt-8">
          {/* Training Output Console */}
          <div className={`${darkMode ?'bg-gray-700':'bg-white'} rounded-lg shadow p-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ?'text-white':'text-black'}`}>Training Output</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md h-48 overflow-y-auto font-mono text-sm">
              {trainingOutput.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>

          {/* Metrics Card */}

          {modelMetrics && <ModelPerformance modelMetrics={modelMetrics} darkMode={darkMode}/>}
          
        </div>
      </div>

      {/* Show Loading Popup After Training */}
      {isTrainingCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' :'bg-white'} p-8 rounded-lg shadow-lg text-center`}>
            <CheckCircle className="h-16 w-16 text-green-500 mb-4 mx-auto" />
            <h3 className={`text-xl font-semibold ${darkMode ?'text-green-400': 'text-green-600'}`}>
              Training Completed!
            </h3>
            <p className={`text-lg mt-2 ${
        darkMode ? "text-gray-300" : "text-gray-700"
      }`}>
              The training process has been successfully completed.
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Train;

