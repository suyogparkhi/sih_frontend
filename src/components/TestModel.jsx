import React, { useState, useRef, useContext, useEffect } from 'react'
import { Upload, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import LoadingPopup from './LoadingPopup'
import OutputDisplay from './OutputDisplay'
import SoundVisualizer from './SoundVisualizer'
import { ThemeContext } from '../context/ThemeProvider'
import { api } from '../services/api'

export default function TestModel() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('upload')
  const [currentAudio, setCurrentAudio] = useState(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modelOutput, setModelOutput] = useState(null)
  const {darkMode}=useContext(ThemeContext)

  const generateDummyData = () => {
    const data = []
    for (let i = 0; i < 200; i++) {
      data.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        class: ['hello_google', 'noise', 'unknown'][Math.floor(Math.random() * 3)]
      })
    }
    return data
  }

  const handleFileChange = (event) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type || 'audio/wav',
        url: URL.createObjectURL(file),
        file: file  // Store the actual File object
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
        type: file.type || 'audio/wav',
        url: URL.createObjectURL(file),
        file: file  // Store the actual File object
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    setIsLoading(true)
    try {
      for (const file of files) {
        const audioFile = file.file;  // This is the actual File object
        
        const result = await api.detectKeyword(audioFile)
        console.log('Detection result:', result);  // Debug log
        
        setModelOutput({
          accuracy: 100,  // Not used currently
          confidenceScore: result.confidence,
          detectedKeyword: result.detected_keyword,
          status: result.status
        })
      }
    } catch (error) {
      console.error('Error testing audio:', error)
    } finally {
      setIsLoading(false)
      setActiveTab('results')
    }
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

  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const { keywords } = await api.listKeywords()
        localStorage.setItem('keywords', JSON.stringify(keywords))
      } catch (error) {
        console.error('Error loading keywords:', error)
      }
    }

    loadKeywords()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Testing
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'upload'
              ? 'bg-[#3D9CBF]/20 text-[#3D9CBF]'
              : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} 
                 hover:bg-[#3D9CBF]/20 hover:text-[#3D9CBF]`
          }`}
        >
          Upload
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'results'
              ? 'bg-[#3D9CBF]/20 text-[#3D9CBF]'
              : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} 
                 hover:bg-[#3D9CBF]/20 hover:text-[#3D9CBF]`
          }`}
        >
          Results
        </button>
      </div>

      {/* Upload Section */}
      {activeTab === 'upload' && (
        <div className={`rounded-lg shadow-md p-8 ${
          darkMode ? 'bg-gray-700' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Upload Audio Files
          </h2>

          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
              darkMode 
                ? 'border-cyan-200 bg-gray-900' 
                : 'border-cyan-300 bg-gray-50 hover:border-cyan-400'
            }`}
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
              <Upload className={`h-12 w-12 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <div>
                <p className={`text-lg font-medium ${
                  darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  Click to upload
                </p>
                <p className={
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }>
                  or drag and drop
                </p>
                <p className={`text-sm mt-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  WAV, MP3 or OGG (MAX. 10MB per file)
                </p>
              </div>
            </label>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mb-6">
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {files.length} file(s) selected
              </p>
              <button
                onClick={handleUpload}
                className={`bg-gradient-to-r from-cyan-400 to-blue-300 
              hover:from-cyan-500 hover:to-blue-400 
              text-white px-8 py-3 rounded-lg font-semibold 
              transition-all duration-300 flex items-center gap-2 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Upload
              </button>
            </div>
          )}

          {/* Upload Progress */}
          {progress > 0 && (
            <div className="space-y-2">
              <div className={`w-full rounded-full h-2 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {progress}% complete
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results Section */}
      {activeTab === 'results' && modelOutput && (
        <>
          <OutputDisplay
            accuracy={modelOutput.accuracy}
            confidenceScore={modelOutput.confidenceScore}
            detectedKeyword={modelOutput.detectedKeyword}
            status={modelOutput.status}
            darkMode={darkMode}
          />
          {currentAudio && <SoundVisualizer audioUrl={currentAudio.url} />}
        </>
      )}

      {isLoading && <LoadingPopup message="Testing in progress..." />}

      <audio ref={audioRef} className="hidden" />

      {/* Audio Player Controls */}
      {currentAudio && (
        <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${
          darkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <button
              onClick={() => handleSkip('backward')}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <SkipBack className="h-6 w-6" />
            </button>
            <button
              onClick={togglePlayPause}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() => handleSkip('forward')}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <SkipForward className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
