import React, { useEffect, useRef, useState } from 'react'
import uocLogo from '../assets/uoc.png'
import vocationalLogo from '../assets/vocational.png'
import advancedLogo from '../assets/advanced.png'

function Education() {
  const sectionRef = useRef(null)
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [visibleIndexes, setVisibleIndexes] = useState([])

  const educationData = [
    {
      institution: 'University of Colombo',
      degree: 'Bachelor of Information and Communication Technology (BICT Honours)',
      period: '2021 - Present',
      logo: uocLogo,
    },
    {
      institution: 'Dehiwala Vocational Training Center',
      degree: 'Diploma in Computer Hardware and Networking',
      period: 'Completed',
      logo: vocationalLogo,
    },
    {
      institution: 'G/Karandeniya Central College',
      degree: 'Technology Stream AL',
      period: '2019-2021',
      logo: advancedLogo,
    },
  ]

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsTitleVisible(true)
      },
      { threshold: 0.2 }
    )

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            )
          }
        })
      },
      { threshold: 0.2 }
    )

    const section = sectionRef.current
    const cards = document.querySelectorAll('.edu-card')

    if (section) titleObserver.observe(section.querySelector('#edu-title'))
    cards.forEach((card) => cardObserver.observe(card))

    return () => {
      titleObserver.disconnect()
      cardObserver.disconnect()
    }
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 md:py-24 min-h-screen bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="edu-title"
            className={`text-4xl md:text-5xl font-extrabold text-white transition-all duration-1000 ease-out ${
              isTitleVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-32'
            }`}
          >
            Academic Journey
          </h2>
          <p
            className={`mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed transition-opacity duration-1000 ${
              isTitleVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            A timeline of my educational milestones
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-700 h-full rounded-full hidden md:block"></div>

          {educationData.map((edu, index) => {
            const isVisible = visibleIndexes.includes(index)
            const direction = index % 2 === 0 ? 'left' : 'right'

            return (
              <div
                key={index}
                data-index={index}
                className={`edu-card relative mb-12 flex flex-col md:flex-row items-center ${
                  direction === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                } transition-all duration-1000 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : direction === 'left'
                    ? 'opacity-0 -translate-x-32'
                    : 'opacity-0 translate-x-32'
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full border-4 border-black shadow-lg hidden md:block"></div>

                <div
                  className={`w-full md:w-5/12 p-8 rounded-2xl bg-black border border-gray-700 shadow-xl transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_#162f79] hover:-translate-y-2 hover:rotate-1 ${
                    direction === 'left' ? 'md:mr-12' : 'md:ml-12'
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-400 text-sm">{edu.period}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {edu.degree}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        
      </div>
    </section>
  )
}

export default Education
