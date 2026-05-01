import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TypeWriter({ text, speed = 60, onDone }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); onDone?.(); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}</>;
}

export default function HomeTab({ onNavigate }) {
  const [typeDone, setTypeDone] = useState(false);

  return (
    <div className="tab-content">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="code-line">
          <span className="code-keyword">import</span>
          <span className="code-bracket">{' { '}</span>
          <span className="code-fn">Developer</span>
          <span className="code-bracket">{' } '}</span>
          <span className="code-keyword">from</span>
          <span className="code-string"> '@khushi/core'</span>
          <span className="code-bracket">;</span>
        </div>
        <br />
        <div className="code-line">
          <span className="code-comment">{'// Welcome to my space'}</span>
        </div>
        <br />

        <h1 className="hero-title">
          <TypeWriter text="Hi, I'm Khushi" speed={70} onDone={() => setTypeDone(true)} />
          <span className="hero-cursor" />
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={typeDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Full Stack Developer & Data Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={typeDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="neofetch">
            <div className="neofetch-logo">K.C</div>
            <div className="neofetch-info">
              <div className="code-line" style={{ marginBottom: 4 }}>
                <span className="code-comment">$ neofetch</span>
              </div>
              <div><span className="neofetch-label">OS:</span> <span className="neofetch-value">Developer v2.0</span></div>
              <div><span className="neofetch-label">Shell:</span> <span className="neofetch-value">React + Node.js + Python</span></div>
              <div><span className="neofetch-label">Uptime:</span> <span className="neofetch-value">3+ years coding</span></div>
              <div><span className="neofetch-label">Packages:</span> <span className="neofetch-value">18+ repositories</span></div>
              <div><span className="neofetch-label">Resolution:</span> <span className="neofetch-value">Problem Solver</span></div>
              <div><span className="neofetch-label">Status:</span> <span style={{ color: 'var(--terminal-green)' }}>Open to opportunities</span></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={typeDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="cta-btn cta-primary" onClick={() => onNavigate('projects.json')}>
            View Projects
          </button>
          <button className="cta-btn cta-secondary" onClick={() => onNavigate('contact.sh')}>
            Get In Touch
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
