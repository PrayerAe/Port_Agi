import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaFigma, FaInstagram, FaBehance, FaDribbble, FaLinkedin } from 'react-icons/fa';
import { SiCanva, SiAdobexd } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi';
import { useData } from '../../context/DataContext';
import './Hero.css';

const Hero = () => {
  const { data } = useData();
  const { hero, contact, images } = data;

  const socialLinks = [
    { icon: <FaBehance />, url: contact.socials.behance, label: 'Behance' },
    { icon: <FaDribbble />, url: contact.socials.dribbble, label: 'Dribbble' },
    { icon: <FaInstagram />, url: contact.socials.instagram, label: 'Instagram' },
    { icon: <FaLinkedin />, url: contact.socials.linkedin, label: 'LinkedIn' },
  ];

  const floatingIcons = [
    { icon: <FaFigma />, color: '#f24e1e', size: 'large' },
    { icon: <SiCanva />, color: '#00c4cc', size: 'medium' },
    { icon: <SiAdobexd />, color: '#ff61f6', size: 'small' },
  ];

  return (
    <section className="hero" id="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-decorations">
        <div className="decor-circle decor-circle-1"></div>
        <div className="decor-circle decor-circle-2"></div>
        <div className="decor-circle decor-circle-3"></div>
        <div className="decor-dots-pattern"></div>
        <div className="decor-line-1"></div>
        <div className="decor-line-2"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="hero-content">
        {/* Left Content */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HiSparkles className="badge-icon" />
            <span>{hero.badge}</span>
            <span className="badge-dot"></span>
          </motion.div>

          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="line"></span>
            <span>Hello, I'm</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="name-line">
              <span className="name">{hero.name}</span>
              <span className="name-decoration"></span>
            </span>
            <span className="role">
              <span className="role-word">Creative</span>
              <span className="role-highlight">{hero.role}</span>
            </span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="portfolio" smooth={true} duration={500}>
              <button className="btn btn-primary">
                <span>View My Work</span>
                <span className="btn-arrow">→</span>
              </button>
            </Link>
            <Link to="contact" smooth={true} duration={500}>
              <button className="btn btn-secondary">
                <span>Let's Talk</span>
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="stat-item">
              <span className="stat-number">{hero.stats.projects}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{hero.stats.years}</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{hero.stats.clients}</span>
              <span className="stat-label">Clients</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="visual-container">
            {/* Main Image Frame */}
            <div className="image-frame">
              <div className="frame-border"></div>
              <div className="frame-glow"></div>
              {images?.heroPhoto ? (
                <img
                  src={images.heroPhoto}
                  alt={hero.name}
                  className="hero-photo"
                />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-text">Your</span>
                  <span className="placeholder-text-accent">Photo</span>
                </div>
              )}
            </div>

            {/* Rotating Rings */}
            <div className="orbit-ring ring-1">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit-ring ring-2">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit-ring ring-3"></div>

            {/* Floating Tool Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`floating-tool tool-${index + 1} tool-${item.size}`}
                style={{ color: item.color }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                <div className="tool-bg"></div>
                {item.icon}
              </motion.div>
            ))}

            {/* Decorative Elements */}
            <div className="visual-decor decor-plus">+</div>
            <div className="visual-decor decor-star">✦</div>
            <div className="visual-decor decor-circle-small"></div>
          </div>

          {/* Social Links - Vertical */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="social-label">Follow</span>
            <div className="social-line"></div>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                className="social-link"
                aria-label={link.label}
                whileHover={{ scale: 1.2, x: -5 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Link to="about" smooth={true} duration={500}>
          <motion.div
            className="scroll-mouse"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="scroll-wheel"></div>
          </motion.div>
          <span className="scroll-text">Scroll</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
