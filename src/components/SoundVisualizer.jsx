import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function SoundVisualizer({ audioUrl }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4785FF',
        progressColor: '#2C5282',
        cursorColor: '#718096',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 100,
        barGap: 3,
      })

      wavesurfer.current.load(audioUrl)
    }

    return () => wavesurfer.current && wavesurfer.current.destroy()
  }, [audioUrl])

  const handlePlayPause = () => {
    wavesurfer.current && wavesurfer.current.playPause()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sound Visualization</h2>
      <div ref={waveformRef} />
      <button
        onClick={handlePlayPause}
        className="mt-4 bg-[#4785FF] text-white px-4 py-2 rounded-md hover:bg-[#4785FF]/90 transition-colors"
      >
        Play/Pause
      </button>
    </div>
  )
}

