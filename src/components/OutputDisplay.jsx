import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function OutputDisplay({ accuracy, confidenceScore, chartData, darkMode }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')

      chartInstance.current = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'hello_google',
              data: chartData.filter(d => d.class === 'hello_google'),
              backgroundColor: darkMode ? '#66B3FF' : '#4A90E2', // Dark mode color
              pointRadius: 6
            },
            {
              label: 'noise',
              data: chartData.filter(d => d.class === 'noise'),
              backgroundColor: darkMode ? '#FF6A4D' : '#E25B4A', // Dark mode color
              pointRadius: 6
            },
            {
              label: 'unknown',
              data: chartData.filter(d => d.class === 'unknown'),
              backgroundColor: darkMode ? '#7EFF8B' : '#50C878', // Dark mode color
              pointRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: darkMode ? '#333' : '#f0f0f0'
              }
            },
            y: {
              grid: {
                color: darkMode ? '#333' : '#f0f0f0'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: darkMode ? '#fff' : '#000' // Adjusting legend text color for dark mode
              }
            }
          }
        }
      })
    }
  }, [chartData, darkMode])

  return (
    <div className={`rounded-lg shadow-sm p-8 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#201f6b]'}`}>
      <h2 className="text-2xl font-semibold mb-6">Model Output</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm">Accuracy</p>
              <p className="text-2xl font-bold text-[#4785FF]">{accuracy}%</p>
            </div>
            <div>
              <p className="text-sm">Confidence Score</p>
              <p className="text-2xl font-bold text-[#4785FF]">{confidenceScore}</p>
            </div>
            <div>
              <p className="text-sm">Confusion Metrics</p>
              <p className="text-2xl font-bold text-[#4785FF]">{confidenceScore}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Performance Visualiser</h3>
          <div className="w-full h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
