import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ExperienceTab() {
  return (
    <motion.div className="tab-content" variants={stagger} initial="hidden" animate="visible">
      <motion.div variants={fadeUp}>
        <div className="code-line"><span className="code-comment">{'// experience.log — career timeline'}</span></div>
        {experience.map((e, i) => (
          <div className="code-line" key={i}>
            <span className="code-bracket">[</span>
            <span className="code-string">{e.date}</span>
            <span className="code-bracket">]</span>
            <span className="code-keyword"> {i === 0 ? 'ACTIVE' : 'INFO'}</span>
            <span className="code-fn"> {e.role}</span>
          </div>
        ))}
      </motion.div>
      <br />
      <motion.div className="timeline" variants={stagger}>
        {experience.map((e, i) => (
          <motion.div className="timeline-item" key={i} variants={fadeUp}>
            <div className="timeline-dot" />
            <div className="timeline-role">{e.role}</div>
            <div className="timeline-date">{e.date} — {e.company}</div>
            <div className="timeline-desc">{e.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
