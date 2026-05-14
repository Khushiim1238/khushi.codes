import { motion } from 'framer-motion';
import { Terminal, Database, Layout, Server, Cpu, ExternalLink, ChevronRight, GitBranch, Briefcase, Activity } from 'lucide-react';
import GitGraph from '../GitGraph';
import VisitorAnalytics from '../VisitorAnalytics';

export default function HomeTab({ onNavigate }) {
  return (
    <div className="tab-content" style={{ maxWidth: 900 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        
        {/* Formal Hero Section */}
        <header className="home-hero" style={{ marginBottom: 40, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700, boxShadow: '0 8px 16px var(--accent-glow)' }}>
              KJ
            </div>
            <div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Khushi Jain
              </h1>
              <div style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, marginTop: 4 }}>
                Software Engineer
              </div>
            </div>
          </div>
          
          <motion.p 
            style={{ 
              fontSize: 16, 
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 650,
              fontWeight: 400
            }}
          >
            I build backend services, data pipelines, and web applications. My work focuses on writing clean, maintainable code and building reliable infrastructure that solves real business needs without unnecessary complexity.
          </motion.p>
          
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
             <button onClick={() => onNavigate('projects.json')} className="home-primary-btn">
               Explore Projects <ChevronRight size={14} />
             </button>
             <button onClick={() => onNavigate('experience.log')} className="home-secondary-btn">
               View Experience
             </button>
          </div>
        </header>

        {/* Elegant Bento Grid */}
        <div className="home-bento">
          
          {/* Engineering Focus */}
          <div className="bento-card focus-card">
            <h3 className="bento-title"><Cpu size={16} /> Engineering Focus</h3>
            <div className="focus-list">
               <div className="focus-item">
                  <Server size={18} className="focus-icon" />
                  <div>
                    <div className="focus-name">Backend Architecture</div>
                    <div className="focus-desc">Node.js, Python, Java, Microservices</div>
                  </div>
               </div>
               <div className="focus-item">
                  <Database size={18} className="focus-icon" />
                  <div>
                    <div className="focus-name">Data Engineering</div>
                    <div className="focus-desc">AWS, PostgreSQL, Redis, Airflow</div>
                  </div>
               </div>
               <div className="focus-item">
                  <Layout size={18} className="focus-icon" />
                  <div>
                    <div className="focus-name">Frontend Systems</div>
                    <div className="focus-desc">React, Next.js, Modern CSS</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Key Achievement */}
          <div className="bento-card achievement-card">
            <div className="achievement-badge">Featured Project</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 12, marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
              FinTechCore Engine
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
              A high-performance financial management platform designed to process real-time transactions with sub-100ms latency using Node.js and Redis.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }} onClick={() => onNavigate('projects.json')}>
               View Architecture <ExternalLink size={12} />
            </div>
          </div>

          {/* Experience Card */}
          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
               <h3 className="bento-title" style={{ marginBottom: 0 }}><Briefcase size={16} /> Experience</h3>
               <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4 }}>2024 - Present</span>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontFamily: 'Space Grotesk, sans-serif' }}>Full Stack Intern</h4>
            <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>Bluestock Fintech</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
               <li style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, lineHeight: 1.5 }}>
                 <ChevronRight size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                 Developed real-time market data dashboards for high-concurrency environments.
               </li>
               <li style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, lineHeight: 1.5 }}>
                 <ChevronRight size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                 Optimized database queries, significantly improving data retrieval speeds.
               </li>
            </ul>
          </div>

          {/* System Telemetry Card */}
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column' }}>
             <h3 className="bento-title"><Activity size={16} /> Live Session</h3>
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-hover)', borderRadius: 8, padding: 16, border: '1px solid var(--border)' }}>
               <VisitorAnalytics />
             </div>
          </div>

          {/* Git Graph spanning full width */}
          <div className="bento-card graph-card" style={{ gridColumn: '1 / -1' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
               <h3 className="bento-title" style={{ marginBottom: 0 }}><Terminal size={16} /> Contribution Activity</h3>
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                 <GitBranch size={14} /> @Khushiim1238
               </div>
             </div>
             <GitGraph />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
