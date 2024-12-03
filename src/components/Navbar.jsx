import React from 'react';
import { AudioWaveform } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 z-10 relative">
           <Link 
          to="/" 
          className="px-4 py-2 rounded-lg  transition-colors"
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
          className="px-4 py-2 rounded-lg hover:bg-cyan-100 transition-colors"
        >
          Dashboard
        </Link>
       
        <button className="hover:text-cyan-600 transition-colors">Documentation</button>
        <button className="hover:text-cyan-600 transition-colors">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;

