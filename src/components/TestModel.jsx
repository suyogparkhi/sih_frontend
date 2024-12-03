'use client'

import React, { useState, useRef } from 'react'
import { Upload, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import LoadingPopup from './LoadingPopup'
import OutputDisplay from './OutputDisplay'
import SoundVisualizer from './SoundVisualizer'

export default function TestModel() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('upload')
  const [currentAudio, setCurrentAudio] = useState(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modelOutput, setModelOutput] = useState(null)

  const handleFileChange = (event) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: Math.random() > 0.5 ? 'training' : 'testing',
        url: URL.createObjectURL(file)
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: Math.random() > 0.5 ? 'training' : 'testing',
        url: URL.createObjectURL(file)
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleUpload = () => {
    setIsLoading(true)
    let uploadProgress = 0
    const interval = setInterval(() => {
      uploadProgress += 10
      setProgress(uploadProgress)
      if (uploadProgress >= 100) {
        clearInterval(interval)
        setIsLoading(false)
        setModelOutput({
          accuracy: 85,
          confidenceScore: 0.92,
          chartData: [
            { name: 'Category A', value: 400 },
            { name: 'Category B', value: 300 },
            { name: 'Category C', value: 200 },
            { name: 'Category D', value: 100 },
          ]
        })
        setActiveTab('results')
      }
    }, 500)
  }

  const handleAudioPlay = (file) => {
    setCurrentAudio(file)
    if (audioRef.current) {
      audioRef.current.src = file.url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkip = (direction) => {
    if (currentAudio) {
      const currentIndex = files.findIndex((file) => file.id === currentAudio.id)
      let newIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1
      if (newIndex < 0) newIndex = files.length - 1
      if (newIndex >= files.length) newIndex = 0
      handleAudioPlay(files[newIndex])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Testing</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'upload'
              ? 'bg-[#000000] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'datasets'
              ? 'bg-[#000000] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Datasets
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'results'
              ? 'bg-[#000000] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Results
        </button>
      </div>

      {/* Upload Section */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Audio Files</h2>
          
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 mb-6 text-center"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".wav,.mp3,.ogg"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">Click to upload</p>
                <p className="text-gray-500">or drag and drop</p>
                <p className="text-sm text-gray-400 mt-2">
                  WAV, MP3 or OGG (MAX. 10MB per file)
                </p>
              </div>
            </label>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                {files.length} file(s) selected
              </p>
              <button
                onClick={handleUpload}
                className="bg-[#4785FF] text-white px-6 py-2 rounded-md hover:bg-[#4785FF]/90 transition-colors"
              >
                Upload
              </button>
            </div>
          )}

          {/* Upload Progress */}
          {progress > 0 && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#4785FF] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{progress}% complete</p>
            </div>
          )}
        </div>
      )}

      {/* Datasets Section */}
      {activeTab === 'datasets' && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Datasets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Training Dataset</h3>
              <ul className="space-y-2">
                {files.filter((file) => file.type === 'training').map((file) => (
                  <li key={file.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="text-gray-700">{file.name}</span>
                    <button onClick={() => handleAudioPlay(file)} className="text-[#4785FF] hover:text-[#4785FF]/80">
                      <Play className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Testing Dataset</h3>
              <ul className="space-y-2">
                {files.filter((file) => file.type === 'testing').map((file) => (
                  <li key={file.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="text-gray-700">{file.name}</span>
                    <button onClick={() => handleAudioPlay(file)} className="text-[#4785FF] hover:text-[#4785FF]/80">
                      <Play className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {activeTab === 'results' && (
        <>
          {modelOutput && (
            <>
              <OutputDisplay
                accuracy={modelOutput.accuracy}
                confidenceScore={modelOutput.confidenceScore}
                chartData={modelOutput.chartData}
              />
              {currentAudio && (
                <SoundVisualizer audioUrl={currentAudio.url} />
              )}
            </>
          )}
        </>
      )}

      {isLoading &&  <LoadingPopup
          message="Testing in progress..."

        />}

      <audio ref={audioRef} className="hidden" />

      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center">
              <button onClick={() => handleSkip('backward')} className="p-2 text-gray-600 hover:text-[#4785FF]">
                <SkipBack className="w-6 h-6" />
              </button>
              <button onClick={togglePlayPause} className="p-2 text-gray-600 hover:text-[#4785FF] mx-2">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={() => handleSkip('forward')} className="p-2 text-gray-600 hover:text-[#4785FF]">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
            <div className="text-gray-700">{currentAudio.name}</div>
          </div>
        </div>
      )}
    </div>
  )
}
