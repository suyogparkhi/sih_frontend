import { useState, useContext } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestModel from './TestModel'
import Train from './Train'
import { ThemeContext } from '../context/ThemeProvider'

// Placeholder Train component

// Placeholder Dashboard component
const Welcome = ({darkMode}) => (
  <div className="p-8">
    <div className={`max-w-7xl mx-auto`}>
      <h1 className={`text-3xl font-bold  ${darkMode ? 'text-white':'text-gray-900'} mb-8`}>
        Welcome to Dashboard
      </h1>
      <p className={`${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
        Select an option from the sidebar to get started.
      </p>
    </div>
  </div>
)

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeComponent, setActiveComponent] = useState('welcome') // Track the active component
  const { darkMode } = useContext(ThemeContext);

  const renderContent = () => {
    switch (activeComponent) {
      case 'test':
        return <TestModel />
      case 'train':
        return <Train />
      default:
        return <Welcome darkMode={darkMode} />
    }
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white to-[#EFF8FF]'}`}>
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 ease-in-out border-r ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <button
          className={`absolute -right-3 top-6 z-10 rounded-full border shadow-sm p-1 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          ) : (
            <ChevronLeft className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          )}
        </button>

        <div className="p-4">
          <div className="flex items-center justify-center h-12">
            {!isCollapsed && (
              <span className={`text-xl font-semibold ${darkMode ? 'text-[#61DAFB]' : 'text-[#61DAFB]'}`}>Dashboard</span>
            )}
          </div>

          <nav className="mt-8 space-y-2">
            <button
              onClick={() => setActiveComponent('train')}
              className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${darkMode ? 'text-white hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]' : 'text-gray-700 hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]'}`}
            >
              <img src="/assets/train.gif" className="w-[20%] text-left" alt="" />
              {!isCollapsed && <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Train Model</span>}
            </button>
            <button
              onClick={() => setActiveComponent('test')}
              className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${darkMode ? 'text-white hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]' : 'text-gray-700 hover:bg-[#61DAFB]/10 hover:text-[#61DAFB]'}`}
            >
              <img src="/assets/test-model.gif" className="w-[20%] text-left" alt="" />
              {!isCollapsed && <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Test Model</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {renderContent()}
      </div>
    </div>
  )
}
