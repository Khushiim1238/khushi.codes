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
import {
  Sun, Moon, Minus, Square, X, ChevronRight,
  FileCode2, FileText, FileJson, FileType, FileTerminal, ScrollText,
  GitBranch, CircleCheck, TriangleAlert, Rocket, Bot,
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

  const navigate = (fileId) => {
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
              <button className="sidebar-file" style={{ color: 'var(--accent-teal)' }}>
                <span className="sidebar-file-icon"><Bot size={14} /></span>
                <span>Ask AI</span>
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

          {/* Terminal */}
          <Terminal
            isOpen={terminalOpen}
            onToggle={() => setTerminalOpen(t => !t)}
            onThemeToggle={toggleTheme}
          />
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <div className="statusbar-left">
            <span className="statusbar-kc">K.C</span>
            <span className="statusbar-item"><GitBranch size={14} /> main</span>
            <span className="statusbar-item"><CircleCheck size={14} /> 0</span>
            <span className="statusbar-item"><TriangleAlert size={14} /> 0</span>
          </div>
          <div className="statusbar-right">
            <span className="statusbar-item">Ln {scrollLine}, Col 1</span>
            <span className="statusbar-item">UTF-8</span>
            <span className="statusbar-item">{activeFile?.ext || 'JSX'}</span>
            <span className="statusbar-item"><Rocket size={14} /> Deployed</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
