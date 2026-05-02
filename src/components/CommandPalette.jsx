import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, FileText, User, Layout, MessageSquare } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onAction }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const ACTIONS = [
    { id: 'home', label: 'Go to Home', icon: <Layout size={16} />, shortcut: 'G H', category: 'Navigation', fileId: 'home.jsx' },
    { id: 'about', label: 'About Me', icon: <User size={16} />, shortcut: 'G A', category: 'Navigation', fileId: 'about.md' },
    { id: 'projects', label: 'View Projects', icon: <FileText size={16} />, shortcut: 'G P', category: 'Navigation', fileId: 'projects.json' },
    { id: 'contact', label: 'Contact', icon: <MessageSquare size={16} />, shortcut: 'G C', category: 'Navigation', fileId: 'contact.sh' },
    { id: 'theme', label: 'Toggle Theme', icon: <Zap size={16} />, shortcut: 'T T', category: 'System', action: 'toggleTheme' },
    { id: 'terminal', label: 'Toggle Terminal', icon: <Command size={16} />, shortcut: 'T R', category: 'System', action: 'toggleTerminal' },
  ];

  const filtered = ACTIONS.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) selectAction(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const selectAction = (action) => {
    if (action.fileId) onNavigate(action.fileId);
    if (action.action) onAction(action.action);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="command-overlay" onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="command-palette"
          >
            <div className="command-input-wrapper">
              <Search size={18} className="command-search-icon" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="command-input"
              />
              <div className="command-esc">ESC</div>
            </div>

            <div className="command-results">
              {filtered.map((action, i) => (
                <div 
                  key={action.id}
                  className={`command-item ${i === selectedIndex ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(i)}
                  onClick={() => selectAction(action)}
                >
                  <div className="command-item-left">
                    <span className="command-item-icon">{action.icon}</span>
                    <span className="command-item-label">{action.label}</span>
                    <span className="command-item-cat">{action.category}</span>
                  </div>
                  <div className="command-item-right">
                    {i === selectedIndex && <ArrowRight size={14} />}
                    <span className="command-item-shortcut">{action.shortcut}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="command-empty">No results found for "{query}"</div>
              )}
            </div>

            <div className="command-footer">
              <div className="command-tip">
                <span className="kbd">↑↓</span> to navigate <span className="kbd">Enter</span> to select
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
