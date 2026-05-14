import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ExternalLink,
  Info, Cpu, History, PlayCircle, Globe, Star, Download, GitFork, ArrowRight
} from 'lucide-react';

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function StarRating({ rating }) {
  return (
    <div className="ext-rating">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          className={`ext-star ${i <= Math.round(rating) ? 'filled' : ''}`}
        />
      ))}
      <span className="ext-rating-text">{rating}</span>
    </div>
  );
}

export default function ExtensionMarketplace({ project }) {
  const [activeTab, setActiveTab] = useState('details');
  const [installState, setInstallState] = useState('installed'); // installed, installing, idle
  const [installProgress, setInstallProgress] = useState(100);

  if (!project) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: 16 }}>
      <div style={{ fontSize: 48, opacity: 0.3 }}>⚡</div>
      <div>Select an extension from the sidebar to view details</div>
    </div>
  );

  const handleInstall = () => {
    if (installState === 'installed') return;
    setInstallState('installing');
    setInstallProgress(0);
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstallState('installed');
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: <Info size={14} /> },
    { id: 'tech', label: 'Tech Stack', icon: <Cpu size={14} /> },
    { id: 'changelog', label: 'Changelog', icon: <History size={14} /> },
    { id: 'demo', label: 'Demo', icon: <PlayCircle size={14} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={project.name}
      className="ext-marketplace"
    >
      {/* Header */}
      <div className="ext-header">
        <div className="ext-icon" style={{ background: project.langColor }}>
          {project.name[0]}
        </div>

        <div className="ext-header-info">
          <div className="ext-title-row">
            <h1 className="ext-title">{project.name}</h1>
            <span className="ext-version">v{project.version}</span>
          </div>

          <div className="ext-publisher">{project.publisher}</div>

          <p className="ext-description">{project.description}</p>

          {/* Stats Row */}
          <div className="ext-stats-row">
            <StarRating rating={project.rating} />
            <span className="ext-stat">
              <Download size={13} /> {formatNumber(project.downloads)}
            </span>
            <span className="ext-stat">
              <GitFork size={13} /> {project.techStack.length} deps
            </span>
          </div>

          {/* Action Buttons */}
          <div className="ext-actions">
            <button
              className={`ext-install-btn ${installState}`}
              onClick={handleInstall}
            >
              {installState === 'installed' && <><Check size={15} /> Installed</>}
              {installState === 'installing' && (
                <div className="ext-install-progress">
                  <div className="ext-install-bar" style={{ width: `${installProgress}%` }} />
                  <span>Installing... {installProgress}%</span>
                </div>
              )}
              {installState === 'idle' && <><Download size={15} /> Install</>}
            </button>

            <div className="ext-link-group">
              <a href={project.github} target="_blank" rel="noreferrer" className="ext-link-btn" title="Source Code">
                <ExternalLink size={16} />
              </a>
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noreferrer" className="ext-link-btn">
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ext-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`ext-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div className="ext-tab-indicator" layoutId="extTabIndicator" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="ext-content">
        <AnimatePresence mode="wait">
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <div className="ext-readme">
                <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8 }}>
                  {project.fullDescription}
                </div>
              </div>

              {/* Architecture */}
              {project.architecture && (
                <div className="ext-architecture">
                  <h3 className="ext-section-title">🏗️ Architecture</h3>
                  <div className="ext-arch-flow">
                    {project.architecture.map((flow, i) => (
                      <div key={i} className="ext-arch-item">
                        <div className="ext-arch-number">{i + 1}</div>
                        <div className="ext-arch-text">{flow}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h3 className="ext-section-title">Dependencies & Stack</h3>
              <div className="ext-tech-grid">
                {project.techStack.map(tech => (
                  <div key={tech} className="ext-tech-item">
                    <div className="ext-tech-dot" style={{ background: project.langColor }} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'changelog' && (
            <motion.div
              key="changelog"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <div className="ext-changelog">
                {project.changelog.map(entry => (
                  <div key={entry.version} className="ext-changelog-entry">
                    <div className="ext-changelog-header">
                      <span className="ext-changelog-version">{entry.version}</span>
                      <div className="ext-changelog-line" />
                    </div>
                    <ul className="ext-changelog-list">
                      {entry.changes.map((change, i) => (
                        <li key={i}>
                          <ArrowRight size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'demo' && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h3 className="ext-section-title">
                <PlayCircle size={20} /> Demo Walkthrough
              </h3>
              {project.videoUrl ? (
                <div className="ext-video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.videoUrl}
                    title="Project Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="ext-no-demo">
                  <PlayCircle size={48} style={{ opacity: 0.2 }} />
                  <p>No demo video available for this project yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
