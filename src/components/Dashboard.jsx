

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Activity, FlaskConical } from 'lucide-react'
import TestModel from './TestModel'
import Train from './Train'

// Placeholder Train component


// Placeholder Dashboard component
const Welcome = () => (
  <div className="p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome to Dashboard
      </h1>
      <p className="text-gray-600">
        Select an option from the sidebar to get started.
      </p>
    </div>
  </div>
)

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeComponent, setActiveComponent] = useState('welcome') // Track the active component

  const renderContent = () => {
    switch (activeComponent) {
      case 'test':
        return <TestModel />
      case 'train':
        return <Train />

      default:
        return <Welcome />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-[#EFF8FF]">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 ease-in-out bg-white border-r border-gray-100 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <button
          className="absolute -right-3 top-6 z-10 rounded-full border shadow-sm bg-white p-1 hover:bg-gray-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        <div className="p-4">
          <div className="flex items-center justify-center h-12">
            {!isCollapsed && (
              <span className="text-xl font-semibold text-[#61DAFB]">Dashboard</span>
            )}
          </div>

          <nav className="mt-8 space-y-2">
            <button
              onClick={() => setActiveComponent('test')}
              className="w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]"
            >
                <img src="/assets/page-optimization.gif" className='w-[20%] text-left' ></img>
              {!isCollapsed && <span>Test Model</span>}
            </button>
            <button
              onClick={() => setActiveComponent('train')}
              className="w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]"
            >
              <img src="/assets/startup.gif" className='w-[20%] text-left' ></img>
              {!isCollapsed && <span>Train Model</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}
