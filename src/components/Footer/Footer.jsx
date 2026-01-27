import { Link } from 'react-scroll';
import { FaLinkedin, FaInstagram, FaBehance, FaDribbble, FaHeart } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useData();
  const { footer, contact, hero } = data;

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Portfolio', to: 'portfolio' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, url: contact.socials.linkedin, label: 'LinkedIn' },
    { icon: <FaInstagram />, url: contact.socials.instagram, label: 'Instagram' },
    { icon: <FaBehance />, url: contact.socials.behance, label: 'Behance' },
    { icon: <FaDribbble />, url: contact.socials.dribbble, label: 'Dribbble' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="hero" smooth={true} duration={500} className="footer-logo">
              <span className="logo-text">Design</span>
              <span className="logo-accent">Studio</span>
            </Link>
            <p className="footer-tagline">
              {footer.tagline}
            </p>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} smooth={true} duration={500}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-services">
            <h4>Services</h4>
            <ul>
              <li>UI/UX Design</li>
              <li>Brand Identity</li>
              <li>Social Media Design</li>
              <li>Print Design</li>
              <li>Web Design</li>
            </ul>
          </div>

          <div className="footer-social-section">
            <h4>Follow Me</h4>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="footer-social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="footer-cta">Let's work together!</p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} {footer.copyright}
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> by {hero.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
