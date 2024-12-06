import React, { useRef, useEffect,useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AudioWaveform, Play, PauseCircle, Settings2 } from 'lucide-react';
import Footer from './Footer';
import WaveVisualization from './WaveVisualisation';
import { ThemeContext } from '../context/ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const glowRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(mainRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        })
        .from(textRef.current.querySelector('h1'), {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out'
        })
        .from(textRef.current.querySelector('p'), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons', {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out'
        }, '-=0.5');

      // if (featuresRef.current) {
      //   gsap.from(featuresRef.current.querySelectorAll('.feature'), {
      //     opacity: 0,
      //     y: 50,
      //     duration: 0.8,
      //     stagger: 0.2,
      //     scrollTrigger: {
      //       trigger: featuresRef.current,
      //       start: 'top 80%',
      //       end: 'bottom 20%',
      //       toggleActions: 'play none none reverse',
      //     },
      //   });
      // }

      const glowElements = glowRef.current.querySelectorAll('.glow-circle');

      glowElements.forEach((glow) => {
        gsap.fromTo(
          glow,
          {
            opacity: 0.2,
            scale: 1,
            filter: "blur(120px)",
          },
          {
            opacity: 1,
            scale: 1.3,
            filter: "blur(80px)",
            duration: 1.5,
            scrollTrigger: {
              trigger: glowRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      });

      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className={`min-h-screen  overflow-hidden relative ${darkMode?" bg-[#1F2937] text-white":"bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-50 text-gray-900"}`}
      style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
    >
      <div className="container mx-auto pt-20 pb-24 relative z-10">
        <div className="text-center" ref={textRef}>
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            Experience Sound
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
              {' '}Innovation
            </span>
          </h1>
          <p className={` mb-12 max-w-2xl mx-auto ${darkMode?"text-xl text-gray-100":"text-xl text-gray-600"}`}>
            Transform your audio experience with cutting-edge wave technology.
            Discover the next generation of sound processing.
          </p>
          <div ref={ctaRef} className="hero-buttons flex justify-center gap-6">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-300 hover:from-cyan-500 hover:to-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Play className="h-5 w-5" />
              Get Started
            </button>
            <button className="border border-cyan-400 hover:bg-cyan-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Settings2 className="h-5 w-5" />
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="wave-wrapper relative mb-20 mr-30 w-screen">
          <WaveVisualization featuresRef={featuresRef}/>
          <br /><br /><br /><br /><br />
        </div>

        <div className="container mx-auto px-6 py-20">
     <div
       ref={featuresRef}
       className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
     >
       <div className={`feature backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-10 ${darkMode ? " bg-[#1D2A38] text-white" : "bg-white/80"}`}
       >
         <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
           <AudioWaveform className="h-6 w-6 text-cyan-600" />
         </div>
         <h3 className="text-xl font-semibold mb-3">Advanced Processing</h3>
         <p className={`${darkMode?"text-white":"text-gray-600"}`}>State-of-the-art algorithms for perfect sound wave analysis and manipulation.</p>
       </div>
       
       <div className={`feature backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-10 ${darkMode ? " bg-[#1D2A38] text-white" : "bg-white/80"}`}>
         <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
           <Play className="h-6 w-6 text-cyan-600" />
         </div>
         <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
         <p className={`${darkMode?"text-white":"text-gray-600"}`}>Instant feedback and visualization of your audio waves in real-time.</p>
       </div>
       
       <div className={`feature backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-10 ${darkMode ? " bg-[#1D2A38] text-white" : "bg-white/80"}`}>
         <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
           <PauseCircle className="h-6 w-6 text-cyan-600" />
         </div>
         <h3 className="text-xl font-semibold mb-3">Precision Control</h3>
         <p className={`${darkMode?"text-white":"text-gray-600"}`}>Fine-tune every aspect of your sound with intuitive controls.</p>
       </div>
     </div>
   </div>

      </div>

      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[0]"
      >
        <div className="glow-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/20 rounded-full blur-[120px]"></div>
        <div className="glow-circle absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px]"></div>
        <div className="glow-circle absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[80px]"></div>
      </div>
      <div className='relative mt-90'>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

