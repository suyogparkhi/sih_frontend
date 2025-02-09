import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function OutputDisplay({ accuracy, confidenceScore, detectedKeyword, status, darkMode }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      
      // Create simple bar chart for confidence scores
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Confidence Score'],
          datasets: [{
            label: 'Detection Confidence',
            data: [confidenceScore * 100],
            backgroundColor: darkMode ? '#66B3FF' : '#4A90E2',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: darkMode ? '#333' : '#f0f0f0'
              },
              ticks: {
                color: darkMode ? '#fff' : '#000'
              }
            },
            x: {
              grid: {
                color: darkMode ? '#333' : '#f0f0f0'
              },
              ticks: {
                color: darkMode ? '#fff' : '#000'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: darkMode ? '#fff' : '#000'
              }
            }
          }
        }
      })
    }
  }, [confidenceScore, darkMode])

  return (
    <div className={`rounded-lg shadow-sm p-8 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#201f6b]'}`}>
      <h2 className="text-2xl font-semibold mb-6">Detection Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm">Status</p>
              <p className={`text-2xl font-bold ${status === 'detected' ? 'text-green-500' : 'text-yellow-500'}`}>
                {status === 'detected' ? 'Keyword Detected' : 'No Match'}
              </p>
            </div>
            {detectedKeyword && (
              <div>
                <p className="text-sm">Detected Keyword</p>
                <p className="text-2xl font-bold text-[#4785FF]">{detectedKeyword}</p>
              </div>
            )}
            <div>
              <p className="text-sm">Confidence Score</p>
              <p className="text-2xl font-bold text-[#4785FF]">{(confidenceScore * 100).toFixed(2)}%</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Confidence Visualization</h3>
          <div className="w-full h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
