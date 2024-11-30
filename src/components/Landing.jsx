import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AudioWaveform, Play, PauseCircle, Settings2 } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainRef = useRef(null);
  const textRef = useRef(null);
  const waveRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Create a GSAP context for proper cleanup
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      // Initial page load animations
      timeline
        .from(mainRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        })
        // Animate heading and text
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


      const wavePath = waveRef.current.querySelector('path');
      timeline.from(wavePath,{
        opacity:0,
        duration:1,
        stagger:0.1,
        ease: 'power3.out'
      })
      if (wavePath) {
        gsap.to(wavePath, {
          attr: { d: "M0,100 C200,200 300,0 500,100 C700,200 800,0 1000,100" },
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    
     
      if (featuresRef.current) {
        const features = featuresRef.current.querySelectorAll('.feature-item');
  
        gsap.from('.feature', {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 90%',
            end: 'bottom 30%',
            toggleActions: 'play none none none', 
    
            
          },
        });
      } else {
        console.error("featuresRef is not properly assigned.");
      }


      const glowElements = glowRef.current.querySelectorAll('.glow-circle');

    // Animate each glow element
    glowElements.forEach((glow, index) => {
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
              scrub: true, // Sync animation with scroll
            //   markers: true, // Debug markers
            },
          }
        );
      });
      // Interactive hover animations for buttons
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
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-50 text-gray-900 overflow-hidden relative"
      style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
    >

      <nav className="flex justify-between items-center p-6 z-10 relative">
        <div className="flex items-center space-x-2">
          <AudioWaveform className="h-8 w-8 text-cyan-600" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
            FSLKWS
          </span>
        </div>
        <div className="flex space-x-6">
          <button className="hover:text-cyan-600 transition-colors">Features</button>
          <button className="hover:text-cyan-600 transition-colors">Documentation</button>
          <button className="hover:text-cyan-600 transition-colors">Contact</button>
        </div>
      </nav>


      <div className="container mx-auto px-6 pt-20 pb-24 relative z-10">
        <div className="text-center" ref={textRef}>
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            Experience Sound
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">
              {' '}Innovation
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform your audio experience with cutting-edge wave technology.
            Discover the next generation of sound processing.
          </p>
          <div ref={ctaRef} className="hero-buttons flex justify-center gap-6">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-300 hover:from-cyan-500 hover:to-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Play className="h-5 w-5" />
              Get Started
            </button>
            <button className=" border border-cyan-400 hover:bg-cyan-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Settings2 className="h-5 w-5" />
              Learn More
            </button>
          </div>
        </div>

        {/* Animated Wave */}
        <div className="mt-16 flex justify-center">
          <svg
            ref={waveRef}
            className="w-full max-w-4xl"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C150,150 300,50 500,100 C700,150 850,50 1000,100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Features Section */}
        <div
          ref={featuresRef}
          className=" feature grid grid-cols-1 md:grid-cols-3 gap-8 mt-40"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
              <AudioWaveform className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Processing</h3>
            <p className="text-gray-600">State-of-the-art algorithms for perfect sound wave analysis and manipulation.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
              <Play className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
            <p className="text-gray-600">Instant feedback and visualization of your audio waves in real-time.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-cyan-100 p-3 rounded-lg w-fit mb-4">
              <PauseCircle className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Precision Control</h3>
            <p className="text-gray-600">Fine-tune every aspect of your sound with intuitive controls.</p>
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div
      ref={glowRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div className="glow-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/20 rounded-full blur-[120px]"></div>
      <div className="glow-circle absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px]"></div>
      <div className="glow-circle absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[80px]"></div>
    </div>
    </div>
  );
};

export default LandingPage;