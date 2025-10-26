import React, { useEffect, useRef, useState } from 'react'

// Import images
import azureIcon from '../assets/Azure.png'
import awsIcon from '../assets/AWS.png'
import linuxIcon from '../assets/Linux logo.png'
import windowsIcon from '../assets/Windows 11.png'
import jenkinsIcon from '../assets/Jenkins.png'
import ghaIcon from '../assets/GitHub Actions.png'
import dockerIcon from '../assets/Docker.png'
import k8sIcon from '../assets/Kubernetes.png'
import prometheusIcon from '../assets/Prometheus.png'
import grafanaIcon from '../assets/Grafana.png'
import githubIcon from '../assets/GitHub.png'
import gitlabIcon from '../assets/GitLab.png'


function Skills() {
  const skillCards = [
    {
      front: { title: 'Cloud Services', icon: azureIcon, items: ['Azure'] },
      back: { title: 'Cloud Services', icon: awsIcon, items: ['AWS'] },
    },
    {
      front: { title: 'System Administration', icon: linuxIcon, items: ['Ubuntu'] },
      back: { title: 'System Administration', icon: windowsIcon, items: ['Windows Server', 'Active Directory'] },
    },
    {
      front: { title: 'Version Control', icon: githubIcon, items: ['GitHub'] },
      back: { title: 'Version Control', icon: gitlabIcon, items: ['GitLab'] },
    },
    {
      front: { title: 'CI/CD', icon: jenkinsIcon, items: ['Jenkins'] },
      back: { title: 'CI/CD', icon: ghaIcon, items: ['GitHub Actions'] },
    },
    {
      front: { title: 'Containerization', icon: dockerIcon, items: ['Docker'] },
      back: { title: 'Orchestration', icon: k8sIcon, items: ['Kubernetes'] },
    },
    {
      front: { title: 'Monitoring', icon: prometheusIcon, items: ['Prometheus'] },
      back: { title: 'Monitoring', icon: grafanaIcon, items: ['Grafana'] },
    },
  ]

  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible ? 'animate-slideInLeft' : 'opacity-0 -translate-x-20'
            }`}
          >
            Skills & Technologies
          </h2>
          <div
            className={`h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
        </div>

        {/* Main Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCards.map((card, index) => (
            <div
              key={index}
              className={`group bg-black rounded-xl border border-gray-700 hover:border-white transition-all duration-500 overflow-hidden relative ${
                isVisible ? 'animate-slideIn' : 'opacity-0 translate-x-10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent)',
                }}
              ></div>
              <div className="p-6 flex flex-col items-center justify-between h-full relative z-10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={card.front.icon}
                      alt={card.front.title}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-125 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{card.front.title}</h3>
                  <ul className="space-y-1 text-center">
                    {card.front.items.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent my-4"></div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={card.back.icon}
                      alt={card.back.title}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-125 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(173,216,230,0.7)]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{card.back.title}</h3>
                  <ul className="space-y-1 text-center">
                    {card.back.items.map((item, i) => (
                      <li key={i} className="text-blue-200 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Networking & Hardware Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Networking Card */}
          <div
            className={`group bg-black rounded-xl border border-gray-700 hover:border-white transition-all duration-500 overflow-hidden relative ${
              isVisible ? 'animate-slideIn' : 'opacity-0 translate-x-10'
            }`}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent)',
              }}
            ></div>
            <div className="p-6 flex flex-col items-center justify-between h-full relative z-10">
              <h3 className="text-lg font-semibold text-white mb-3">Networking</h3>
            </div>
          </div>

          {/* Hardware Card */}
          <div
            className={`group bg-black rounded-xl border border-gray-700 hover:border-white transition-all duration-500 overflow-hidden relative ${
              isVisible ? 'animate-slideIn' : 'opacity-0 translate-x-10'
            }`}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent)',
              }}
            ></div>
            <div className="p-6 flex flex-col items-center justify-between h-full relative z-10">
              <h3 className="text-lg font-semibold text-white mb-3">Hardware</h3>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out both;
        }
      `}</style>
    </section>
  )
}

export default Skills
