import React, { useEffect, useRef, useState } from "react";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";

function Projects() {
  const projects = [
    {
      title: "MERN Application Deployment with GitHub Actions",
      description:
        "Designed and implemented an automated deployment pipeline for a MERN stack application, containerized with Docker and hosted on AWS EC2. Integrated CI/CD automation using GitHub Actions and NGINX as a reverse proxy.",
      technologies: "GitHub Actions, Docker, AWS EC2, NGINX, React, Node.js",
      github: "https://www.linkedin.com/posts/chamindu-irosh-9b1844315_excited-to-share-my-latest-project-mern-activity-7375756709937528832-7lSR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAJVJUBdW6UyU7Hc7ymFawDNzvc3gDIE4c",
      tag: "project 1",
      image: project1,
    },
    {
      title: "Fully Automated MERN Stack Deployment with Jenkins",
      description:
        "Built a complete CI/CD pipeline using Jenkins, GitLab Webhooks, Docker, and AWS. Configured AWS SES for email notifications and Cloudflare for DNS management. Automated container builds, deployments, and HTTPS setup using NGINX and Let’s Encrypt.",
      technologies:
        "Jenkins, GitLab, Docker, AWS EC2, AWS SES, Cloudflare, NGINX, Certbot, React, Node.js",
      github: "https://lnkd.in/daEgEDBW",
      tag: "project 2",
      image: project2,
    },
  ];

  const titleRef = useRef(null);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateTitle(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <section id="projects" className="bg-black relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-20">
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            animateTitle ? "animate-slide-in" : "opacity-0 translate-x-24"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest work in DevOps, automation, and cloud deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-700 hover:border-white transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
              style={{ animation: `fadeIn 0.8s ease-out ${index * 0.2}s backwards` }}
            >
              {project.image && (
                <div className="overflow-hidden rounded-2xl border border-gray-800 mt-4">
                  <img
                    src={project.image}
                    alt={`${project.title} diagram`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mt-4">{project.title}</h3>
                <p className="text-gray-400 mt-2">{project.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  <span className="font-semibold text-white">Tech Stack: </span>
                  {project.technologies}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-white hover:text-gray-300 transition-colors font-semibold"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideInFromRight 0.8s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Projects;
