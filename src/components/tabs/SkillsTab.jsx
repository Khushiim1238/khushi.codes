import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function SkillsTab() {
  return (
    <motion.div className="tab-content" variants={stagger} initial="hidden" animate="visible">
      <motion.div variants={fadeUp}>
        <div className="code-line">
          <span className="code-keyword">interface</span>
          <span className="code-fn"> Skills</span>
          <span className="code-bracket">{' {'}</span>
        </div>
        {skills.map(s => (
          <div className="code-line" key={s.category} style={{ paddingLeft: 20 }}>
            <span className="code-fn">{s.category}</span>
            <span className="code-bracket">: </span>
            <span className="code-keyword">Technology</span>
            <span className="code-bracket">[];</span>
          </div>
        ))}
        <div className="code-line"><span className="code-bracket">{'}'}</span></div>
      </motion.div>
      <br />
      {skills.map(s => (
        <motion.div className="skills-category" key={s.category} variants={fadeUp}>
          <div className="skills-category-title">{s.title}</div>
          <div className="skills-grid">
            {s.items.map(item => (
              <span className="skill-tag" key={item.name}>
                <img 
                  src={`https://cdn.simpleicons.org/${item.slug}`} 
                  alt={item.name} 
                  className="skill-icon"
                />
                {item.name}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
