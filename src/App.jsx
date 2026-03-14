import React, { useEffect, useState } from 'react';
import './App.css';

// --- Data ---
const projects = [
  {
    id: 1,
    title: 'Routica',
    description: 'A comprehensive vehicle tracking application designed for schools. It connects parents, drivers, and school administration to ensure the safety of students traveling between home and campus.',
    icon: 'fa-bus',
    tags: ['GPS Tracking', 'EdTech'],
    link: 'https://routica.co.in',
    iconClass: 'icon-teal',
    features: [
      'Real-time bus location and route tracking',
      'Parent and driver dashboards',
      'Safe arrival notifications',
      'School admin oversight and reports',
    ],
  },
  {
    id: 2,
    title: 'Interview Prep Platform',
    description: 'A dedicated learning space for students to master the art of interviewing. Features include practice questions, expert tips, and mock-interview resources to help students land their dream jobs.',
    icon: 'fa-users-viewfinder',
    tags: ['E-Learning', 'Career Prep'],
    iconClass: 'icon-gold',
    features: [
      'Practice questions and mock interviews',
      'Expert tips and curated resources',
      'Progress tracking and feedback',
      'Structured learning paths',
    ],
  },
  {
    id: 3,
    title: 'Telemedicine Portal',
    description: 'A seamless healthcare platform bridging the gap between patients and doctors. Patients can easily book online appointments, consult with physicians, and receive secure online medical prescriptions.',
    icon: 'fa-stethoscope',
    tags: ['HealthTech', 'Online Booking'],
    link: 'https://patient-appointment-ten.vercel.app/login',
    iconClass: 'icon-green',
    features: [
      'Online appointment booking',
      'Video consultations with physicians',
      'Secure prescriptions and medical records',
      'Patient and doctor dashboards',
    ],
  },
];

const services = [
  {
    id: 1,
    title: 'Consultancy services',
    icon: 'fa-handshake',
    iconClass: 'icon-teal',
    items: [
      'We provide skilled IT resources',
      'Technological guidance to build the products',
      'AI Consultation',
      'Data Science Consultation',
      'IT Job Consultation',
      'Course Consultation',
      'Certificate Consultation',
    ],
  },
  {
    id: 2,
    title: 'Internship',
    icon: 'fa-briefcase',
    iconClass: 'icon-gold',
    items: [
      'IT project Internship with durations 2m, 4m, 6m, and 1y',
      'Testing Internship with durations 2m, 4m, 6m, and 1y',
      'Agentic AI Internship with durations 2m, 4m, 6m, and 1y',
      'Generic AI Internship with durations 2m, 4m, 6m, and 1y',
    ],
  },
  {
    id: 3,
    title: 'Courses',
    icon: 'fa-graduation-cap',
    iconClass: 'icon-green',
    items: [
      'Programming Languages',
      'Soft skill (ex: presentation, speaking)',
      'AI Prompt',
      'Local AI',
    ],
  },
];

const capabilities = [
  { icon: '🔐', title: 'Secure & Scalable', desc: 'Built with security and performance in mind for production workloads' },
  { icon: '📱', title: 'Mobile-First', desc: 'Responsive and intuitive experiences across all devices' },
  { icon: '⚡', title: 'Modern Stack', desc: 'React, Node, and cloud-native tools for fast delivery' },
  { icon: '🎯', title: 'User-Centered', desc: 'Research-driven design that solves real problems' },
  { icon: '🔗', title: 'Integrations', desc: 'APIs and third-party integrations where you need them' },
  { icon: '📊', title: 'Analytics Ready', desc: 'Insights and reporting built into your product' },
];

// --- Components ---

const Navbar = () => (
  <nav>
    <a href="#" className="nav-logo">
      <div className="logo-dot" aria-hidden="true" />
      Aamogh <span>Tech Solutions</span>
    </a>
    <div className="nav-links">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </div>
    <a href="#contact" className="nav-cta">
      Get in Touch →
    </a>
  </nav>
);

const Hero = () => (
  <div className="hero" id="home">
    <div className="hero-badge">✨ Building the future with technology</div>
    <h1>We build intuitive,<br /><em>impactful platforms</em></h1>
    <p>Aamogh Tech Solutions specializes in creating scalable, user-centered software that solves real-world problems. Explore our flagship projects below.</p>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">{projects.length}<span>+</span></div>
        <div className="stat-label">Projects</div>
      </div>
      <div className="stat">
        <div className="stat-num">1<span>×</span></div>
        <div className="stat-label">Unified Vision</div>
      </div>
    </div>
    <a href="#projects" className="btn">View Our Work →</a>
  </div>
);

const ProjectsSection = () => {
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section id="projects" className="projects-tabs-section">
      <div className="section-label">Our Work</div>
      <h2 className="section-title reveal">Flagship projects</h2>
      <p className="section-desc reveal reveal-delay-1">From EdTech and healthcare to career platforms — click a tab to view the project and its features.</p>

      <div className="browser-tabs" role="tablist" aria-label="Projects">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={activeId === project.id}
            aria-controls={`project-panel-${project.id}`}
            id={`tab-${project.id}`}
            className={`browser-tab ${activeId === project.id ? 'browser-tab--active' : ''}`}
            onClick={() => setActiveId(project.id)}
          >
            <span className="browser-tab-icon">
              <i className={`fa-solid ${project.icon}`} aria-hidden="true" />
            </span>
            <span className="browser-tab-label">{project.title}</span>
          </button>
        ))}
      </div>

      <div
        id={`project-panel-${activeProject.id}`}
        className="browser-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeProject.id}`}
      >
        <div className="module-card module-card--panel">
          <div className={`module-icon ${activeProject.iconClass}`}>
            <i className={`fa-solid ${activeProject.icon}`} aria-hidden="true" />
            <span className="module-number">{projects.indexOf(activeProject) + 1}</span>
          </div>
          <div className="module-title">{activeProject.title}</div>
          <div className="module-desc">{activeProject.description}</div>
          {activeProject.link && (
            <a
              href={activeProject.link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              Visit {activeProject.title} →
            </a>
          )}
          <div className="project-tags">
            {activeProject.tags.map((tag, i) => (
              <span key={i} className="project-tag">{tag}</span>
            ))}
          </div>
          {activeProject.features && activeProject.features.length > 0 && (
            <div className="module-card-features">
              <h4 className="module-features-title">Features</h4>
              <ul className="feature-list">
                {activeProject.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="projects-tabs-section">
      <div className="section-label">What we offer</div>
      <h2 className="section-title reveal">Services</h2>
      <p className="section-desc reveal reveal-delay-1">Consultancy, internships, and courses — choose a tab to explore what we provide.</p>

      <div className="browser-tabs" role="tablist" aria-label="Services">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            aria-selected={activeId === service.id}
            aria-controls={`service-panel-${service.id}`}
            id={`service-tab-${service.id}`}
            className={`browser-tab ${activeId === service.id ? 'browser-tab--active' : ''}`}
            onClick={() => setActiveId(service.id)}
          >
            <span className="browser-tab-icon">
              <i className={`fa-solid ${service.icon}`} aria-hidden="true" />
            </span>
            <span className="browser-tab-label">{service.title}</span>
          </button>
        ))}
      </div>

      <div
        id={`service-panel-${activeService.id}`}
        className="browser-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${activeService.id}`}
      >
        <div className="module-card module-card--panel">
          <div className={`module-icon ${activeService.iconClass}`}>
            <i className={`fa-solid ${activeService.icon}`} aria-hidden="true" />
            <span className="module-number">{services.indexOf(activeService) + 1}</span>
          </div>
          <div className="module-title">{activeService.title}</div>
          <div className="module-card-features">
            <ul className="feature-list">
              {activeService.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const HighlightStrip = () => (
  <div className="highlight-strip">
    <div className="highlight-inner">
      <div className="highlight-text">
        <div className="section-label">What we offer</div>
        <h2 className="section-title">Secure, scalable & built for users</h2>
        <p className="section-desc">We combine modern tech, clear design, and solid engineering so your product is ready for real-world use.</p>
      </div>
      <div className="capabilities-grid">
        {capabilities.map((cap, i) => (
          <div key={i} className="cap-item">
            <div className="cap-icon">{cap.icon}</div>
            <div className="cap-title">{cap.title}</div>
            <div className="cap-desc">{cap.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CtaSection = () => (
  <div className="cta-section">
    <div className="cta-glow" aria-hidden="true" />
    <h2>Ready to build something great?</h2>
    <p>Let's talk about your next project — from idea to launch.</p>
    <div className="cta-buttons">
      <a href="mailto:support@aamoghtech.org" className="btn-primary">Get in Touch →</a>
      <a href="#projects" className="btn-outline">View Projects</a>
    </div>
  </div>
);

const Footer = () => (
  <footer id="contact">
    <span className="footer-brand">Aamogh <span>Tech Solutions</span></span>
    <div className="footer-contact">
      <a href="mailto:support@aamoghtech.org" className="footer-link">
        <i className="fa-solid fa-envelope" aria-hidden="true" /> support@aamoghtech.org
      </a>
      <a href="tel:+917411615129" className="footer-link">
        <i className="fa-solid fa-phone" aria-hidden="true" /> +91 74116 15129
      </a>
      <a href="tel:+919845899224" className="footer-link">
        <i className="fa-solid fa-phone" aria-hidden="true" /> +91 98458 99224
      </a>
    </div>
    <span>© {new Date().getFullYear()} Aamogh Tech Solutions. All rights reserved.</span>
  </footer>
);

// --- Main App Component ---
function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="app-wrap">
      <div className="grid-bg" aria-hidden="true" />
      <Navbar />
      <Hero />
      <div className="divider" aria-hidden="true" />
      <ProjectsSection />
      <ServicesSection />
      <HighlightStrip />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;
