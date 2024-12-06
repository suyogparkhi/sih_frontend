import React, { useContext } from 'react';
import { AudioWaveform ,Sun, Moon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeProvider'; // Adjust the import path as needed

const Navbar = () => {
  const { darkMode, toggle } = useContext(ThemeContext);

  return (
    <nav
      className={`flex justify-between items-center p-6 z-10 relative ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-transparent text-gray-800'
      }`}
    >
      <Link 
        to="/" 
        className="px-4 py-2 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <AudioWaveform className="h-8 w-8 text-cyan-600" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
            FSLKWS
          </span>
        </div>
      </Link>
      <div className="flex space-x-6">
        <Link 
          to="/Dashboard" 
          className="px-4 py-2 rounded-lg hover:text-cyan-600 transition-colors"
        >
          Dashboard
        </Link>
        <button className="hover:text-cyan-600 transition-colors">
          Documentation
        </button>
        <button className="hover:text-cyan-600 transition-colors">
          Contact
        </button>
        {/* Toggle button */}
        <button
          onClick={toggle}
          className="px-4 py-2  transition-colors "
        >
          {darkMode ?<Sun className='hover:text-cyan-600'/>  :<Moon className='hover:text-cyan-600' /> }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
