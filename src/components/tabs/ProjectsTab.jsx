import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { ExternalLink, GitBranch, Star } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ProjectsTab() {
  return (
    <motion.div className="tab-content" variants={stagger} initial="hidden" animate="visible">
      <motion.div variants={fadeUp}>
        <div className="code-line">
          <span className="code-bracket">{'{'}</span>
          <span className="code-string"> "featured_projects"</span>
          <span className="code-bracket">: [</span>
          <span className="code-comment"> // {projects.length} repositories</span>
        </div>
      </motion.div>
      <br />
      <motion.div className="projects-grid" variants={stagger}>
        {projects.map(p => (
          <motion.div className="project-card" key={p.name} variants={fadeUp}>
            <div className="project-name">
              <GitBranch size={16} style={{ color: 'var(--accent)' }} />
              {p.name}
            </div>
            <div className="project-desc">{p.description}</div>
            <div className="project-meta">
              <span className="project-lang">
                <span className="project-lang-dot" style={{ background: p.langColor }} />
                {p.language}
              </span>
              {p.stars > 0 && (
                <span className="project-lang">
                  <Star size={12} /> {p.stars}
                </span>
              )}
            </div>
            <div className="project-links">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                <GitBranch size={12} /> Code
              </a>
              {p.homepage && (
                <a href={p.homepage} target="_blank" rel="noopener noreferrer" className="project-link">
                  <ExternalLink size={12} /> Live
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
