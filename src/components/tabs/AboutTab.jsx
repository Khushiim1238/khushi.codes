import { motion } from 'framer-motion';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AboutTab() {
  return (
    <motion.div className="tab-content" variants={stagger} initial="hidden" animate="visible">
      <motion.div variants={fadeUp}>
        <div className="code-line"><span className="code-comment"># About Me</span></div>
        <div className="code-line"><span className="code-comment">## {'>'} whoami</span></div>
      </motion.div>
      <br />
      <motion.p className="about-text" variants={fadeUp}>
        I'm a passionate full-stack developer and data engineer who loves crafting
        elegant solutions — from interactive web apps to robust data pipelines.
        I blend clean code with creative design, always learning and building
        things that make a difference.
      </motion.p>
      <br />
      <motion.p className="about-text" variants={fadeUp}>
        When I'm not coding, you'll find me exploring open-source projects,
        diving into data engineering challenges, or experimenting with new
        frameworks. I believe great software is built at the intersection of
        curiosity and craftsmanship.
      </motion.p>

      <motion.div className="about-stats" variants={fadeUp}>
        <div className="about-stat">
          <div className="about-stat-value">18+</div>
          <div className="about-stat-label">Repositories</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-value">3+</div>
          <div className="about-stat-label">Years Coding</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-value">5+</div>
          <div className="about-stat-label">Deployed Apps</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-value">4</div>
          <div className="about-stat-label">Languages</div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="editor-section-title">Interests</div>
        <div className="about-interests">
          {['Web Development', 'Data Engineering', 'UI/UX Design', 'Open Source', 'IoT', 'Machine Learning', 'Linux'].map(i => (
            <span className="skill-tag" key={i}>{i}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
