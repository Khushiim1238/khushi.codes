import { motion } from 'framer-motion';
import { Terminal, MapPin, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AboutTab() {
  return (
    <motion.div className="tab-content" style={{ maxWidth: 800 }} variants={stagger} initial="hidden" animate="visible">
      
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 13, marginBottom: 16 }}>
          <Terminal size={14} />
          <span>visitor@khushi.codes:~$ cat about.md</span>
        </div>
        
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, color: 'var(--text-primary)', marginBottom: 24 }}>
          About Me
        </h1>
      </motion.div>

      <motion.div variants={fadeUp} className="about-prose" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        <p style={{ marginBottom: 16 }}>
          I am a software engineer focused on full-stack development and data engineering. I enjoy solving complex problems, whether that means optimizing a slow database query, orchestrating an ETL pipeline, or building a clean, responsive user interface.
        </p>
        <p style={{ marginBottom: 24 }}>
          My current work involves writing reliable backend services, managing data ingestion, and building front-end applications. I care deeply about writing testable, self-documenting code and building systems that are easy for other developers to maintain.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
         <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-editor)' }}>
           <MapPin size={16} style={{ color: 'var(--accent)', marginBottom: 8 }} />
           <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>Location</div>
           <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>India</div>
         </div>
         <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-editor)' }}>
           <Briefcase size={16} style={{ color: 'var(--accent)', marginBottom: 8 }} />
           <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>Experience</div>
           <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>3+ Years Professional</div>
         </div>
         <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-editor)' }}>
           <GraduationCap size={16} style={{ color: 'var(--accent)', marginBottom: 8 }} />
           <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>Education</div>
           <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>Computer Science</div>
         </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, color: 'var(--text-primary)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          Core Philosophy
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "Design systems that solve today's problems but are easy to change tomorrow.",
            "Write comprehensive tests and rely on strong typing to catch errors early.",
            "Great engineering includes the user experience. A system is only as good as its interface.",
            "Keep learning, stay adaptable, and share knowledge with the team."
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
               <ChevronRight size={16} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
               {item}
            </li>
          ))}
        </ul>
      </motion.div>

    </motion.div>
  );
}
