import { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  FaHome, FaUser, FaTools, FaBriefcase, FaEnvelope,
  FaSignOutAlt, FaSave, FaUndo, FaTimes, FaPlus, FaTrash,
  FaCog
} from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import './Admin.css';

const AdminDashboard = ({ onClose }) => {
  const { data, updateSection, logout, resetToDefault } = useData();
  const [activeTab, setActiveTab] = useState('hero');
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'hero', label: 'Hero', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'portfolio', label: 'Portfolio', icon: <FaBriefcase /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleSave = () => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
    setSaveMessage('Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      resetToDefault();
      setSaveMessage('Data reset to default!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      category: data.portfolio.categories[1] || 'UI/UX',
      description: 'Project description here',
      image: '🎨',
      tools: ['Figma'],
      color: '#ec4899'
    };
    updateSection('portfolio', {
      projects: [...data.portfolio.projects, newProject]
    });
  };

  const removeProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      updateSection('portfolio', {
        projects: data.portfolio.projects.filter(p => p.id !== id)
      });
    }
  };

  return (
    <div className="admin-dashboard-overlay">
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>

          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          <div className="content-header">
            <h2>{tabs.find(t => t.id === activeTab)?.label} Settings</h2>
            <div className="header-actions">
              {saveMessage && <span className="save-message">{saveMessage}</span>}
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="content-body">
            {/* Hero Editor */}
            {activeTab === 'hero' && (
              <div className="editor-section">
                <h3>Hero Section</h3>

                <ImageUpload
                  label="Profile Photo"
                  currentImage={data.images?.heroPhoto}
                  onImageChange={(imageData) => updateSection('images', { heroPhoto: imageData })}
                  aspectRatio="1/1"
                />

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={data.hero.name}
                    onChange={(e) => updateSection('hero', { name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Role / Title</label>
                  <input
                    type="text"
                    value={data.hero.role}
                    onChange={(e) => updateSection('hero', { role: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={data.hero.description}
                    onChange={(e) => updateSection('hero', { description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label>Badge Text</label>
                  <input
                    type="text"
                    value={data.hero.badge}
                    onChange={(e) => updateSection('hero', { badge: e.target.value })}
                  />
                </div>

                <h4>Statistics</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Projects Count</label>
                    <input
                      type="text"
                      value={data.hero.stats.projects}
                      onChange={(e) => updateSection('hero', {
                        stats: { ...data.hero.stats, projects: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Years Experience</label>
                    <input
                      type="text"
                      value={data.hero.stats.years}
                      onChange={(e) => updateSection('hero', {
                        stats: { ...data.hero.stats, years: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Clients Count</label>
                    <input
                      type="text"
                      value={data.hero.stats.clients}
                      onChange={(e) => updateSection('hero', {
                        stats: { ...data.hero.stats, clients: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* About Editor */}
            {activeTab === 'about' && (
              <div className="editor-section">
                <h3>About Section</h3>

                <ImageUpload
                  label="About Photo"
                  currentImage={data.images?.aboutPhoto}
                  onImageChange={(imageData) => updateSection('images', { aboutPhoto: imageData })}
                  aspectRatio="4/5"
                />

                <div className="form-group">
                  <label>Introduction Text</label>
                  <input
                    type="text"
                    value={data.about.intro}
                    onChange={(e) => updateSection('about', { intro: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={data.about.description}
                    onChange={(e) => updateSection('about', { description: e.target.value })}
                    rows={5}
                  />
                </div>

                <div className="form-group">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    value={data.about.experience}
                    onChange={(e) => updateSection('about', { experience: e.target.value })}
                  />
                </div>

                <h4>Highlights</h4>
                {data.about.highlights.map((highlight, index) => (
                  <div key={index} className="item-card">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Icon (emoji)</label>
                        <input
                          type="text"
                          value={highlight.icon}
                          onChange={(e) => {
                            const newHighlights = [...data.about.highlights];
                            newHighlights[index] = { ...newHighlights[index], icon: e.target.value };
                            updateSection('about', { highlights: newHighlights });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={highlight.title}
                          onChange={(e) => {
                            const newHighlights = [...data.about.highlights];
                            newHighlights[index] = { ...newHighlights[index], title: e.target.value };
                            updateSection('about', { highlights: newHighlights });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          value={highlight.desc}
                          onChange={(e) => {
                            const newHighlights = [...data.about.highlights];
                            newHighlights[index] = { ...newHighlights[index], desc: e.target.value };
                            updateSection('about', { highlights: newHighlights });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <h4>Statistics</h4>
                {data.about.stats.map((stat, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group">
                      <label>Number</label>
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => {
                          const newStats = [...data.about.stats];
                          newStats[index] = { ...newStats[index], number: e.target.value };
                          updateSection('about', { stats: newStats });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...data.about.stats];
                          newStats[index] = { ...newStats[index], label: e.target.value };
                          updateSection('about', { stats: newStats });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Editor */}
            {activeTab === 'skills' && (
              <div className="editor-section">
                <h3>Skills Section</h3>

                <div className="form-group">
                  <label>Section Description</label>
                  <textarea
                    value={data.skills.description}
                    onChange={(e) => updateSection('skills', { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <h4>Tools</h4>
                {data.skills.tools.map((tool, index) => (
                  <div key={index} className="item-card">
                    <div className="form-row">
                      <div className="form-group small">
                        <label>Icon</label>
                        <input
                          type="text"
                          value={tool.icon}
                          onChange={(e) => {
                            const newTools = [...data.skills.tools];
                            newTools[index] = { ...newTools[index], icon: e.target.value };
                            updateSection('skills', { tools: newTools });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          value={tool.name}
                          onChange={(e) => {
                            const newTools = [...data.skills.tools];
                            newTools[index] = { ...newTools[index], name: e.target.value };
                            updateSection('skills', { tools: newTools });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          value={tool.desc}
                          onChange={(e) => {
                            const newTools = [...data.skills.tools];
                            newTools[index] = { ...newTools[index], desc: e.target.value };
                            updateSection('skills', { tools: newTools });
                          }}
                        />
                      </div>
                      <div className="form-group small">
                        <label>Level %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={tool.level}
                          onChange={(e) => {
                            const newTools = [...data.skills.tools];
                            newTools[index] = { ...newTools[index], level: parseInt(e.target.value) || 0 };
                            updateSection('skills', { tools: newTools });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <h4>Skill Bars</h4>
                {data.skills.bars.map((bar, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group">
                      <label>Skill Name</label>
                      <input
                        type="text"
                        value={bar.name}
                        onChange={(e) => {
                          const newBars = [...data.skills.bars];
                          newBars[index] = { ...newBars[index], name: e.target.value };
                          updateSection('skills', { bars: newBars });
                        }}
                      />
                    </div>
                    <div className="form-group small">
                      <label>Percentage</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={bar.percentage}
                        onChange={(e) => {
                          const newBars = [...data.skills.bars];
                          newBars[index] = { ...newBars[index], percentage: parseInt(e.target.value) || 0 };
                          updateSection('skills', { bars: newBars });
                        }}
                      />
                    </div>
                  </div>
                ))}

                <h4>Services</h4>
                {data.skills.services.map((service, index) => (
                  <div key={index} className="item-card">
                    <div className="form-row">
                      <div className="form-group small">
                        <label>Icon</label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => {
                            const newServices = [...data.skills.services];
                            newServices[index] = { ...newServices[index], icon: e.target.value };
                            updateSection('skills', { services: newServices });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...data.skills.services];
                            newServices[index] = { ...newServices[index], title: e.target.value };
                            updateSection('skills', { services: newServices });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          value={service.desc}
                          onChange={(e) => {
                            const newServices = [...data.skills.services];
                            newServices[index] = { ...newServices[index], desc: e.target.value };
                            updateSection('skills', { services: newServices });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Editor */}
            {activeTab === 'portfolio' && (
              <div className="editor-section">
                <h3>Portfolio Section</h3>

                <div className="form-group">
                  <label>Categories (comma separated)</label>
                  <input
                    type="text"
                    value={data.portfolio.categories.join(', ')}
                    onChange={(e) => updateSection('portfolio', {
                      categories: e.target.value.split(',').map(c => c.trim())
                    })}
                  />
                </div>

                <div className="section-header">
                  <h4>Projects</h4>
                  <button className="add-btn" onClick={addProject}>
                    <FaPlus /> Add Project
                  </button>
                </div>

                {data.portfolio.projects.map((project, index) => (
                  <div key={project.id} className="item-card">
                    <div className="item-card-header">
                      <span className="item-number">#{index + 1}</span>
                      <button
                        className="delete-btn"
                        onClick={() => removeProject(project.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="form-row">
                      <div className="form-group small">
                        <label>Icon</label>
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) => {
                            const newProjects = [...data.portfolio.projects];
                            newProjects[index] = { ...newProjects[index], image: e.target.value };
                            updateSection('portfolio', { projects: newProjects });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...data.portfolio.projects];
                            newProjects[index] = { ...newProjects[index], title: e.target.value };
                            updateSection('portfolio', { projects: newProjects });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={project.category}
                          onChange={(e) => {
                            const newProjects = [...data.portfolio.projects];
                            newProjects[index] = { ...newProjects[index], category: e.target.value };
                            updateSection('portfolio', { projects: newProjects });
                          }}
                        >
                          {data.portfolio.categories.filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...data.portfolio.projects];
                          newProjects[index] = { ...newProjects[index], description: e.target.value };
                          updateSection('portfolio', { projects: newProjects });
                        }}
                        rows={2}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Tools (comma separated)</label>
                        <input
                          type="text"
                          value={project.tools.join(', ')}
                          onChange={(e) => {
                            const newProjects = [...data.portfolio.projects];
                            newProjects[index] = { ...newProjects[index], tools: e.target.value.split(',').map(t => t.trim()) };
                            updateSection('portfolio', { projects: newProjects });
                          }}
                        />
                      </div>
                      <div className="form-group small">
                        <label>Color</label>
                        <input
                          type="color"
                          value={project.color}
                          onChange={(e) => {
                            const newProjects = [...data.portfolio.projects];
                            newProjects[index] = { ...newProjects[index], color: e.target.value };
                            updateSection('portfolio', { projects: newProjects });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Editor */}
            {activeTab === 'contact' && (
              <div className="editor-section">
                <h3>Contact Section</h3>

                <div className="form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    value={data.contact.title}
                    onChange={(e) => updateSection('contact', { title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={data.contact.description}
                    onChange={(e) => updateSection('contact', { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={data.contact.email}
                      onChange={(e) => updateSection('contact', { email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={data.contact.phone}
                      onChange={(e) => updateSection('contact', { phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={data.contact.location}
                    onChange={(e) => updateSection('contact', { location: e.target.value })}
                  />
                </div>

                <h4>Social Media Links</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Behance URL</label>
                    <input
                      type="text"
                      value={data.contact.socials.behance}
                      onChange={(e) => updateSection('contact', {
                        socials: { ...data.contact.socials, behance: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dribbble URL</label>
                    <input
                      type="text"
                      value={data.contact.socials.dribbble}
                      onChange={(e) => updateSection('contact', {
                        socials: { ...data.contact.socials, dribbble: e.target.value }
                      })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Instagram URL</label>
                    <input
                      type="text"
                      value={data.contact.socials.instagram}
                      onChange={(e) => updateSection('contact', {
                        socials: { ...data.contact.socials, instagram: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                      type="text"
                      value={data.contact.socials.linkedin}
                      onChange={(e) => updateSection('contact', {
                        socials: { ...data.contact.socials, linkedin: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Settings Editor */}
            {activeTab === 'settings' && (
              <div className="editor-section">
                <h3>Settings</h3>

                <h4>Footer Content</h4>
                <div className="form-group">
                  <label>Tagline</label>
                  <textarea
                    value={data.footer.tagline}
                    onChange={(e) => updateSection('footer', { tagline: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="form-group">
                  <label>Copyright Text</label>
                  <input
                    type="text"
                    value={data.footer.copyright}
                    onChange={(e) => updateSection('footer', { copyright: e.target.value })}
                  />
                </div>

                <h4>Admin Credentials</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={data.admin.username}
                      onChange={(e) => updateSection('admin', { username: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="text"
                      value={data.admin.password}
                      onChange={(e) => updateSection('admin', { password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="danger-zone">
                  <h4>Danger Zone</h4>
                  <p>Reset all data to default values. This action cannot be undone.</p>
                  <button className="reset-btn" onClick={handleReset}>
                    <FaUndo /> Reset All Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
