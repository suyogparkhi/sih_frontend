import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeProvider';

const Footer = () => {
  const{darkMode}=useContext(ThemeContext);
  return (
    <div div className='flex flex-col'>
    <footer className="flex flex-col items-center justify-center py-8 bg-transparent mt-40">
      {/* Container for the text */}
      <div className='max-w-[800px] text-center'>
        <h2 className="text-5xl font-bold mb-6">
            Empowering seamless keyword spotting ,
             the future of audio <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
              {' '}Intelligence!
            </span>
            </h2>

      </div>
      
      {/* Button */}
      <button className="bg-gradient-to-r from-cyan-400 to-blue-300 hover:from-cyan-500 hover:to-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
     
              Get Started
            </button>
      <div className="bottom-div flex gap-[200px] mt-[20px] text-2xl w-full justify-self-center ">
        <span className='flex-start ml-[350px] text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400 '>FSLKWS</span>
        <div className='footer-nav flex gap-10 text-xl'>
        <Link to="/">
          
          </Link>
          <a></a>
        <Link to="/Dashboard">
         
          </Link>
       
          
          
        </div>
        <div className="social-div flex  gap-5">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl hover:text-blue-500 transition-colors" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-xl hover:text-blue-700 transition-colors" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl hover:text-pink-500 transition-colors" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-xl hover:text-gray-800 transition-colors" />
        </a>
      </div>
    

      </div>
      
    </footer>
    <hr className={`w-[900px] mx-auto mb-5 border-t-1 border-black ${darkMode?"border-white text-white":"border-black text-black "}`} />
        <div className="rights-bottom flex m-auto w-[700px] gap-40 mb-10">
          <p className="text-md justify-start">© 2024 FSLKWS. All rights reserved</p>
          <div className="flex privacy-div justify-end gap-[20px]">
            <a href="#" className="text-md ">Privacy Policy</a>
            <a href="#" className="text-md ">Terms & Conditions</a>
          </div>
        </div>
  </div>
  );
};

export default Footer;