import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import './Portfolio.css';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const { data } = useData();
  const { portfolio } = data;

  const filteredProjects = activeFilter === 'All'
    ? portfolio.projects
    : portfolio.projects.filter(project => project.category === activeFilter);

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="portfolio-container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">My Works</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A selection of my recent design projects showcasing my skills
            in UI/UX, branding, and visual design
          </p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {portfolio.categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="project-image"
                  style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}
                >
                  <div className="project-placeholder" style={{ fontSize: '3.5rem' }}>
                    {project.image}
                  </div>
                  <div className="project-overlay">
                    <button className="overlay-btn">
                      <FaEye />
                    </button>
                    <button className="overlay-btn">
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tools">
                    {project.tools.map((tool) => (
                      <span key={tool} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  x
                </button>
                <div
                  className="modal-image"
                  style={{ background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}50)` }}
                >
                  <div className="modal-placeholder" style={{ fontSize: '4rem' }}>
                    {selectedProject.image}
                  </div>
                </div>
                <div className="modal-content">
                  <span className="project-category">{selectedProject.category}</span>
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.description}</p>
                  <div className="project-tools">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary">View Live</button>
                    <button className="btn btn-secondary">Case Study</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
