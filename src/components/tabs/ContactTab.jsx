import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Globe, Mail, ExternalLink } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ContactTab() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.div className="tab-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeUp}>
        <div className="code-line"><span className="code-comment">#!/bin/bash</span></div>
        <div className="code-line"><span className="code-comment"># Send a message to Khushi</span></div>
        <br />
        <div className="code-line">
          <span className="code-keyword">echo</span>
          <span className="code-string"> "Let's build something together"</span>
        </div>
      </motion.div>
      <br />
      <motion.form className="contact-form" onSubmit={handleSubmit} variants={fadeUp}>
        <div className="contact-field">
          <label className="contact-label">$ read -p "Name: " name</label>
          <input className="contact-input" type="text" placeholder="Your name" required />
        </div>
        <div className="contact-field">
          <label className="contact-label">$ read -p "Email: " email</label>
          <input className="contact-input" type="email" placeholder="you@example.com" required />
        </div>
        <div className="contact-field">
          <label className="contact-label">$ read -p "Message: " message</label>
          <textarea className="contact-input contact-textarea" placeholder="Your message..." required />
        </div>
        <button className="contact-submit" type="submit">
          {sent ? '>> Message sent! ✓' : '$ submit'}
        </button>
      </motion.form>

      <motion.div className="social-links" variants={fadeUp}>
        <a href="https://github.com/Khushiim1238" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
          <GitBranch size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
          <Globe size={18} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Portfolio">
          <ExternalLink size={18} />
        </a>
        <a href="mailto:khushi@example.com" className="social-link" title="Email">
          <Mail size={18} />
        </a>
      </motion.div>
    </motion.div>
  );
}
