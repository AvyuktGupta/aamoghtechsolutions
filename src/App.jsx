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
  { title: 'Secure & Scalable', desc: 'Built with security and performance in mind for production workloads', bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
  { title: 'Mobile-First', desc: 'Responsive and intuitive experiences across all devices', bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { title: 'Modern Stack', desc: 'React, Node, and cloud-native tools for fast delivery', bgImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80' },
  { title: 'User-Centered', desc: 'Research-driven design that solves real problems', bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
  { title: 'Integrations', desc: 'APIs and third-party integrations where you need them', bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
  { title: 'Analytics Ready', desc: 'Insights and reporting built into your product', bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
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
    <h1><span className="hero-line1">Engineering Scalable</span><br /><span className="hero-accent">Solutions</span></h1>
    <p>Specializing in intuitive design and scalable architecture, we deliver software that makes a measurable difference.</p>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">3<span>+</span></div>
        <div className="stat-label">Flagship Projects</div>
      </div>
      <div className="stat">
        <div className="stat-num">1</div>
        <div className="stat-label">Shared Vision</div>
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
        {projects.map((project) => (
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
            <div
              className="cap-item-bg"
              style={{ backgroundImage: `url(${cap.bgImage})` }}
              aria-hidden="true"
            />
            <div className="cap-item-overlay" aria-hidden="true" />
            <div className="cap-item-hover-overlay" aria-hidden="true" />
            <div className="cap-item-content">
              <div className="cap-title">{cap.title}</div>
              <div className="cap-desc">{cap.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CtaSection = () => (
  <div className="cta-section">
    <div className="cta-glow" aria-hidden="true" />
    <h2>Let's Bring Your Vision to Life.</h2>
    <p>Collaborate with our experts to launch impactful solutions.</p>
    <div className="cta-buttons">
      <a href="#contact" className="btn-primary">Let's Connect →</a>
      <a href="#projects" className="btn-outline">Discover Our Solutions</a>
    </div>
  </div>
);

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Please enter your name';
    if (!email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email';
    if (!message.trim()) next.message = 'Please enter a message';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setStatus('sending');
    const subject = encodeURIComponent(`Contact from ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n---\nFrom: ${name.trim()} <${email.trim()}>`
    );
    const mailtoUrl = `mailto:support@aamoghtech.org?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-header">
          <div className="section-label">Get in touch</div>
          <h2 className="section-title">Contact us</h2>
          <p className="section-desc">Reach out via the form below or use the contact details.</p>
        </div>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="contact-name" className="form-label">Name</label>
              <input
                id="contact-name"
                type="text"
                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                placeholder="Your name"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <span id="contact-name-error" className="form-error" role="alert">{errors.name}</span>
              )}
            </div>
            <div className="form-row">
              <label htmlFor="contact-email" className="form-label">Email</label>
              <input
                id="contact-email"
                type="email"
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                placeholder="your@email.com"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <span id="contact-email-error" className="form-error" role="alert">{errors.email}</span>
              )}
            </div>
            <div className="form-row">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                placeholder="Your message..."
                rows={4}
                aria-label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <span id="contact-message-error" className="form-error" role="alert">{errors.message}</span>
              )}
            </div>
            {status === 'success' && (
              <p className="form-status form-status--success" role="status">
                Your email client will open with the message. Send it from there to reach us.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status form-status--error" role="alert">
                Something went wrong. You can email us directly at support@aamoghtech.org.
              </p>
            )}
            <button
              type="submit"
              className="contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Opening email…' : 'Send message'}
            </button>
          </form>
          <div className="contact-details">
            <a href="mailto:support@aamoghtech.org" className="contact-link">
              <i className="fa-solid fa-envelope contact-icon" aria-hidden="true" />
              <span>support@aamoghtech.org</span>
            </a>
            <a href="tel:+917411615129" className="contact-link">
              <i className="fa-solid fa-phone contact-icon" aria-hidden="true" />
              <span>+91 74116 15129</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <span className="footer-brand">Aamogh <span>Tech Solutions</span></span>
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
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
