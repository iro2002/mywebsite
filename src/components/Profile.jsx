import React, { useState, useEffect, useRef } from 'react';
import { FaAws, FaDocker, FaLinux, FaNetworkWired, FaJenkins, FaGithub } from 'react-icons/fa';


function Profile() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // --- Text Animation State & Logic ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const wordsToAnimate = ["Cloud｜Linux｜DevOps Enthusiast"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % wordsToAnimate.length;
      const fullText = wordsToAnimate[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // --- Canvas Background Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Ensure containerRef is available before resizing
    if (!containerRef.current) return;

    const resizeCanvas = () => {
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };

    class Particle3D {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speedZ = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
      }
      update() {
        this.z -= this.speedZ;
        if (this.z <= 0) {
          this.reset();
          this.z = 1000;
        }
      }
      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size2d = this.size * scale;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = scale * 0.8;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle3D());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // --- 3D Tilt Effect Logic ---
  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      const rotateY = x * 20;
      const rotateX = -y * 20;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="profile" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-20 px-4 sm:px-6" ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ display: 'block' }} />

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-60"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 transform-gpu scale-105 blur-sm" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <style>{`
        @keyframes fadeInSmooth {
          0% { opacity: 0; transform: scale(0.95) translateY(30px); }
          60% { opacity: 0.7; transform: scale(1.02) translateY(0px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: #60a5fa; }
        }
        .blinking-cursor {
          border-right: 0.15em solid #60a5fa;
          animation: blink 1s step-end infinite;
          padding-left: 0.2em;
        }
      `}</style>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        {/* Profile Image with 3D Tilt Effect */}
        <div 
          ref={imageRef} 
          className="relative group transition-transform duration-300 ease-out" 
          style={{ animation: 'fadeInSmooth 1.2s ease-out', transformStyle: 'preserve-3d' }}
        >
          <img 
            src="https://media.licdn.com/dms/image/v2/D4D03AQEg3pElcnq2xw/profile-displayphoto-scale_400_400/B4DZkfdUl7JEAg-/0/1757169407780?e=1762992000&v=beta&t=Y_UqAG0YqeQYhcbTp0q39JohCut0ZV7KLXcl1JgYPh8" 
            alt="Chamindu Irosh" 
            // UPDATED: Responsive image sizes
            className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full border-8 border-white/20 object-cover shadow-2xl transition-all duration-700"
          />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left space-y-6 max-w-2xl" style={{ animation: 'fadeInSmooth 1.2s ease-out 0.3s both' }}>
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Chamindu Irosh
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-white to-transparent mx-auto lg:mx-0"></div>
          </div>
          
          {/* UPDATED: Responsive heading size and min-height for text stability */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 leading-tight" style={{ minHeight: '90px' }}>
            <span className="text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="blinking-cursor"></span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            Passionate about infrastructure and streamlining development workflows.
          </p>
          <p className="text-base sm:text-lg text-gray-500 italic">
            Currently studying Information and Communication Technology (Honours) at the University of Colombo.
          </p>

          {/* Tech Icons Section */}
          <div className="flex justify-center lg:justify-start items-center gap-4 sm:gap-6 pt-4 text-gray-400 flex-wrap">
            <span className="text-sm font-semibold tracking-wider w-full lg:w-auto mb-2 lg:mb-0">Skills:</span>
            <FaAws size={32} className="hover:text-white transition-colors duration-300" title="Amazon Web Services" />
            <FaDocker size={32} className="hover:text-white transition-colors duration-300" title="Docker" />
            <FaLinux size={32} className="hover:text-white transition-colors duration-300" title="Linux" />
            <FaJenkins size={32} className="hover:text-white transition-colors duration-300" title="Jenkins" />
            <FaGithub size={32} className="hover:text-white transition-colors duration-300" title="GitHub" />
            <FaNetworkWired size={32} className="hover:text-white transition-colors duration-300" title="Networking" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
            <a href="https://github.com/iro2002" target="_blank" rel="noopener noreferrer" className="group px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden font-semibold">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">GitHub</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </a>
            <a href="https://gitlab.com/irosh2002" target="_blank" rel="noopener noreferrer" className="group px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden font-semibold">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">GitLab</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </a>
            <a href="https://www.linkedin.com/in/chamindu-irosh-9b1844315/" target="_blank" rel="noopener noreferrer" className="group px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden font-semibold">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">LinkedIn</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </a>
            <a href="mailto:chaminduirosh927@gmail.com" className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;