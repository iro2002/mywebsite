import React, { useEffect, useRef, useState } from 'react';

// Local assets (make sure these exist in src/assets)
import awsLogo from '../assets/amazon_web_services_logo.jpg';
import lfs101 from '../assets/lfs101-introduction-to-linux.png';
import lfs167 from '../assets/lfs167-introduction-to-jenkins.png';
import networking from '../assets/networking-basics.png';

function Certifications() {
  const certs = [
    { name: 'Microsoft Certified: Azure Fundamentals', code: 'AZ-900', provider: 'Microsoft', credentialId: 'AZ900-123456', badge: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg' },
    { name: 'AWS Cloud Practitioner Essentials', code: 'CLF-C01', provider: 'Amazon Web Services', credentialId: 'CLF01-789012', badge: awsLogo },
    { name: 'Introduction to Linux', code: 'LFS101', provider: 'Linux Foundation', credentialId: 'LFS101-345678', badge: lfs101 },
    { name: 'Introduction to Jenkins', code: 'LFS167', provider: 'Linux Foundation', credentialId: 'LFS167-901234', badge: lfs167 },
    { name: 'Networking Basic', code: 'NET101', provider: 'Cisco', credentialId: 'NET101-567890', badge: networking },
  ];

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.z = Math.random() * 1500;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 0.5 + 0.2;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= 2;
        if (this.z < 1) this.z = 1500;
        if (this.y > canvas.height + 10) this.reset();
        if (this.x < -10 || this.x > canvas.width + 10) this.reset();
      }
      draw() {
        const scale = 1000 / this.z;
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;
        if (x2d < -50 || x2d > canvas.width + 50 || y2d < -50 || y2d > canvas.height + 50) return;
        const opacity = Math.min(1, scale * 0.8);
        const hue = 200 + (this.z / 1500) * 60;
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 15 * scale;
        ctx.shadowColor = `hsla(${hue}, 80%, 70%, ${opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const scale1 = 1000 / p.z;
            const scale2 = 1000 / other.z;
            const x1 = (p.x - canvas.width / 2) * scale1 + canvas.width / 2;
            const y1 = (p.y - canvas.height / 2) * scale1 + canvas.height / 2;
            const x2 = (other.x - canvas.width / 2) * scale2 + canvas.width / 2;
            const y2 = (other.y - canvas.height / 2) * scale2 + canvas.height / 2;
            const opacity = (1 - dist / 150) * 0.3;
            ctx.strokeStyle = `rgba(100,150,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" style={{ mixBlendMode: 'screen' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>Certifications</h2>
          <div className={`h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {certs.map((cert, i) => (
            <div key={i} className={`group relative h-64 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 hover:border-white transition-all duration-300 overflow-hidden">
                <div className="flex flex-col items-center justify-center h-full p-5 space-y-3 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img src={cert.badge} alt={cert.name} className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <span className="text-xs font-bold text-white">{cert.code}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white text-center">{cert.name}</h3>
                  <p className="text-gray-400 text-sm">{cert.provider}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black p-5 flex flex-col items-center justify-center space-y-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img src={cert.badge} alt={cert.name} className="w-full h-full object-contain filter brightness-90" />
                  </div>
                  <h3 className="text-lg font-bold text-white text-center">{cert.name}</h3>
                  <p className="text-blue-200 text-sm text-center">Credential ID: {cert.credentialId}</p>
                  <div className="inline-flex items-center text-white group-hover:translate-x-1 transition-transform duration-300 cursor-pointer text-sm">
                    <span className="font-semibold">View Certificate</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent group-hover:from-transparent group-hover:via-blue-400 group-hover:to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
