import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function OutputDisplay({ accuracy, confidenceScore, chartData }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map(item => item.name),
          datasets: [{
            label: 'Performance',
            data: chartData.map(item => item.value),
            backgroundColor: '#4785FF',
            borderColor: '#2C5282',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [chartData])

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Model Output</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold text-[#4785FF]">{accuracy}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Confidence Score</p>
              <p className="text-2xl font-bold text-[#4785FF]">{confidenceScore}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Performance Chart</h3>
          <div className="w-full h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

