import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useData } from '../../context/DataContext';
import './Skills.css';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useData();
  const { skills } = data;

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">What I Use</span>
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-description">
            {skills.description}
          </p>
        </motion.div>

        <div className="skills-content">
          <motion.div
            className="tools-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="subsection-title">Design Tools</h3>
            <div className="tools-grid">
              {skills.tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="tool-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="tool-icon">
                    {tool.icon}
                  </div>
                  <div className="tool-info">
                    <h4>{tool.name}</h4>
                    <p>{tool.desc}</p>
                  </div>
                  <div className="tool-level">
                    <div className="level-bar">
                      <motion.div
                        className="level-fill"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tool.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <span className="level-text">{tool.level}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="expertise-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="subsection-title">Core Skills</h3>
            <div className="skills-bars">
              {skills.bars.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-bar-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <div className="skill-bar-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1, delay: 0.6 + index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="services-section"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="subsection-title centered">Services I Offer</h3>
          <div className="services-grid">
            {skills.services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <span className="service-icon">{service.icon}</span>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
