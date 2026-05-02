import { useState, useRef, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import StarField from './components/StarField';
import Terminal from './components/Terminal';
import HomeTab from './components/tabs/HomeTab';
import AboutTab from './components/tabs/AboutTab';
import ProjectsTab from './components/tabs/ProjectsTab';
import SkillsTab from './components/tabs/SkillsTab';
import ExperienceTab from './components/tabs/ExperienceTab';
import ContactTab from './components/tabs/ContactTab';
import AIPanel from './components/AIPanel';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import {
  Sun, Moon, Minus, Square, X, ChevronRight,
  FileCode2, FileText, FileJson, FileType, FileTerminal, ScrollText,
  GitBranch, CircleCheck, TriangleAlert, Rocket, Command,
} from 'lucide-react';

const FILES = [
  { id: 'home.jsx', label: 'home.jsx', icon: <FileCode2 size={14} />, breadcrumb: 'src > pages > home.jsx', ext: 'JSX' },
  { id: 'about.md', label: 'about.md', icon: <FileText size={14} />, breadcrumb: 'src > pages > about.md', ext: 'MD' },
  { id: 'projects.json', label: 'projects.json', icon: <FileJson size={14} />, breadcrumb: 'src > data > projects.json', ext: 'JSON' },
  { id: 'skills.ts', label: 'skills.ts', icon: <FileType size={14} />, breadcrumb: 'src > data > skills.ts', ext: 'TS' },
  { id: 'experience.log', label: 'experience.log', icon: <ScrollText size={14} />, breadcrumb: 'src > data > experience.log', ext: 'LOG' },
  { id: 'contact.sh', label: 'contact.sh', icon: <FileTerminal size={14} />, breadcrumb: 'src > pages > contact.sh', ext: 'SH' },
];

const MENUS = {
  File: ['Download Resume', '—', 'Close Tab'],
  View: ['Toggle Theme', 'Toggle Terminal', 'Toggle Sidebar'],
  Navigate: FILES.map(f => f.label),
  Help: ['About This Site', 'GitHub', 'LinkedIn'],
};

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home.jsx');
  const [openTabs, setOpenTabs] = useState(['home.jsx']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrollLine, setScrollLine] = useState(1);
  const editorRef = useRef(null);

  // Track scroll position for status bar line number
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const handler = () => {
      const line = Math.floor(el.scrollTop / 27) + 1;
      setScrollLine(line);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [activeTab]);

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) { /* ignore */ }
  };

  const navigate = (fileId) => {
    playClickSound();
    if (!openTabs.includes(fileId)) {
      setOpenTabs(t => [...t, fileId]);
    }
    setActiveTab(fileId);
    setActiveMenu(null);
  };

  const closeTab = (fileId, e) => {
    e?.stopPropagation();
    const next = openTabs.filter(t => t !== fileId);
    if (next.length === 0) {
      setOpenTabs(['home.jsx']);
      setActiveTab('home.jsx');
    } else {
      setOpenTabs(next);
      if (activeTab === fileId) setActiveTab(next[next.length - 1]);
    }
  };

  const handleMenu = (menu, item) => {
    setActiveMenu(null);
    if (menu === 'View') {
      if (item === 'Toggle Theme') toggleTheme();
      if (item === 'Toggle Terminal') setTerminalOpen(t => !t);
      if (item === 'Toggle Sidebar') setSidebarOpen(s => !s);
    } else if (menu === 'Navigate') {
      navigate(item);
    } else if (menu === 'Help') {
      if (item === 'GitHub') window.open('https://github.com/Khushiim1238', '_blank');
      if (item === 'LinkedIn') window.open('https://linkedin.com', '_blank');
    }
  };

  const activeFile = FILES.find(f => f.id === activeTab);
  const lineCount = 40;

  const renderTab = () => {
    switch (activeTab) {
      case 'home.jsx': return <HomeTab onNavigate={navigate} />;
      case 'about.md': return <AboutTab />;
      case 'projects.json': return <ProjectsTab />;
      case 'skills.ts': return <SkillsTab />;
      case 'experience.log': return <ExperienceTab />;
      case 'contact.sh': return <ContactTab />;
      default: return <HomeTab onNavigate={navigate} />;
    }
  };

  return (
    <>
      <StarField />
      <CustomCursor />
      <div className="ide">
        {/* Title Bar */}
        <div className="titlebar">
          <div className="titlebar-left">
            <div className="titlebar-logo">
              <span style={{ background: 'var(--accent)', color: '#fff', padding: '1px 5px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>K.C</span>
              khushi.codes
            </div>
            <div className="titlebar-menus">
              {Object.keys(MENUS).map(menu => (
                <div key={menu} style={{ position: 'relative' }}>
                  <button
                    className="titlebar-menu"
                    onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                    onMouseEnter={() => activeMenu && setActiveMenu(menu)}
                  >
                    {menu}
                  </button>
                  {activeMenu === menu && (
                    <div className="dropdown">
                      {MENUS[menu].map((item, i) =>
                        item === '—' ? <div className="dropdown-sep" key={i} /> : (
                          <button className="dropdown-item" key={item} onClick={() => handleMenu(menu, item)}>
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="titlebar-right">
            <button className="titlebar-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="window-controls">
              <button className="window-control"><Minus size={14} /></button>
              <button className="window-control"><Square size={12} /></button>
              <button className="window-control"><X size={14} /></button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
          <div className="sidebar-header">Explorer</div>
          <div className="sidebar-files">
            <div style={{ padding: '4px 16px 8px', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
              {sidebarOpen && <><ChevronRight size={10} style={{ transform: 'rotate(90deg)', marginRight: 4 }} /> Portfolio</>}
            </div>
            {FILES.map(f => (
              <button
                key={f.id}
                className={`sidebar-file${activeTab === f.id ? ' active' : ''}`}
                onClick={() => navigate(f.id)}
                title={f.label}
              >
                <span className="sidebar-file-icon" style={{ color: activeTab === f.id ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {f.icon}
                </span>
                {sidebarOpen && <span>{f.label}</span>}
              </button>
            ))}
          </div>
          {sidebarOpen && (
            <div className="sidebar-section">
              <button 
                className={`sidebar-file${aiOpen ? ' active' : ''}`} 
                style={{ color: 'var(--accent-teal)' }}
                onClick={() => setAiOpen(!aiOpen)}
              >
                <span className="sidebar-file-icon"><Moon size={14} /></span>
                <span>Luna AI</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Editor Area */}
        <div className="main-area">
          {/* Tab Bar */}
          <div className="tabbar">
            {openTabs.map(tabId => {
              const file = FILES.find(f => f.id === tabId);
              return (
                <div
                  key={tabId}
                  className={`tab${activeTab === tabId ? ' active' : ''}`}
                  onClick={() => setActiveTab(tabId)}
                >
                  <span className="tab-icon" style={{ color: activeTab === tabId ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {file?.icon}
                  </span>
                  {file?.label}
                  <button className="tab-close" onClick={(e) => closeTab(tabId, e)}>
                    <X size={11} />
                  </button>
                </div>
              );
            })}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: 8 }}>
              <button 
                className="titlebar-btn" 
                onClick={() => setCommandPaletteOpen(true)}
                title="Command Palette (Ctrl+K)"
              >
                <Command size={14} />
              </button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            {activeFile?.breadcrumb.split(' > ').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="breadcrumb-sep"> <ChevronRight size={10} /> </span>}
              </span>
            ))}
          </div>

          {/* Editor Content */}
          <div className="editor-area">
            <div className="line-numbers">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="editor-content" ref={editorRef}>
              {renderTab()}
            </div>
          </div>

            <Terminal
              isOpen={terminalOpen}
              onToggle={() => setTerminalOpen(t => !t)}
              onThemeToggle={toggleTheme}
            />
          </div>

          {/* AI Panel */}
          <AIPanel isOpen={aiOpen} onClose={() => setAiOpen(false)} />

          <CommandPalette 
            isOpen={commandPaletteOpen} 
            onClose={() => setCommandPaletteOpen(false)}
            onNavigate={navigate}
            onAction={(action) => {
              if (action === 'toggleTheme') toggleTheme();
              if (action === 'toggleTerminal') setTerminalOpen(t => !t);
            }}
          />

        {/* Status Bar */}
        <div className="statusbar">
          <div className="statusbar-left">
            <span className="statusbar-kc">K.C</span>
            <div className="status-health">
              <div className="health-item">Focus: <span className="health-val">React.js</span></div>
              <div className="health-item">Coffee: <span className="health-val">[|||||---] 60%</span></div>
              <div className="health-item">Brain: <span className="health-val">98%</span></div>
            </div>
            <span className="statusbar-item"><GitBranch size={14} /> main</span>
            <span className="statusbar-item"><CircleCheck size={14} /> 0</span>
          </div>
          <div className="statusbar-right">
            <button className="ship-it-btn" onClick={() => {
              setTerminalOpen(true);
              window.dispatchEvent(new CustomEvent('terminal-deploy'));
            }}>
              <Rocket size={12} /> Ship It
            </button>
            <span className="statusbar-item">Ln {scrollLine}, Col 1</span>
            <span className="statusbar-item">UTF-8</span>
            <span className="statusbar-item">{activeFile?.ext || 'JSX'}</span>
            <span className="statusbar-item" onClick={() => setSoundEnabled(!soundEnabled)} style={{ cursor: 'pointer' }}>
              {soundEnabled ? <Rocket size={14} className="terminal-green" /> : <Rocket size={14} style={{ opacity: 0.5 }} />}
              {soundEnabled ? 'SFX ON' : 'SFX OFF'}
            </span>
            <span className="statusbar-item"><Rocket size={14} /> Deployed</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
