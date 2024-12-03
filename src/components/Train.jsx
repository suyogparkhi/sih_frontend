import React, { useState } from 'react';
import { Upload, Play, AlertCircle, CheckCircle } from 'lucide-react'; // Import CheckCircle for success
import LoadingPopup from './LoadingPopup'; // Import the LoadingPopup component

const Train = () => {
  const [files, setFiles] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrainingCompleted, setIsTrainingCompleted] = useState(false); // Track training completion

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleTrain = () => {
    setIsTraining(true);

    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      setIsTrainingCompleted(true); // Mark training as completed
    }, 3000); // Replace with actual training logic
  };

  const handleClosePopup = () => {
    setIsTrainingCompleted(false); // Close the success popup
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-black bg-gradient-to-r from-cyan-500 to-blue-400">
          Train Model
        </h1>

        {/* File Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg mb-8">
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
                <p className="text-lg font-semibold text-gray-700">
                  Drop your audio files here
                </p>
                <p className="text-sm text-gray-500">Supports MP3, WAV files</p>
              </div>
            </label>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-cyan-600" />
                    <span className="text-gray-700">{file.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Controls */}
        <div className="flex justify-center">
          <button
            onClick={handleTrain}
            disabled={files.length === 0 || isTraining}
            className={`
              bg-gradient-to-r from-cyan-400 to-blue-300 
              hover:from-cyan-500 hover:to-blue-400 
              text-white px-8 py-3 rounded-lg font-semibold 
              transition-all duration-300 flex items-center gap-2 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
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
      </div>

      {/* Show Loading Popup During Training */}
      {isTraining && (
        <LoadingPopup
          message="Training in progress..."
        />
      )}

      {/* Show Success Popup After Training */}
      {isTrainingCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-green-600">Training Completed!</h3>
            <p className="text-lg text-gray-700 mt-2">
              The training process has been successfully completed.
            </p>
            {/* Close Button */}
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
