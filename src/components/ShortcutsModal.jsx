import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], action: 'Command Palette', category: 'General' },
  { keys: ['Ctrl', 'B'], action: 'Toggle Sidebar', category: 'General' },
  { keys: ['Ctrl', 'J'], action: 'Toggle Terminal', category: 'General' },
  { keys: ['Ctrl', '/'], action: 'Toggle Theme', category: 'General' },
  { keys: ['Ctrl', 'Shift', 'E'], action: 'Explorer View', category: 'Navigation' },
  { keys: ['Ctrl', 'Shift', 'X'], action: 'Extensions View', category: 'Navigation' },
  { keys: ['?'], action: 'Show Shortcuts', category: 'Help' },
  { keys: ['Esc'], action: 'Close Panel / Modal', category: 'General' },
];

export default function ShortcutsModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="shortcuts-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="shortcuts-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="shortcuts-header">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <button className="shortcuts-close" onClick={onClose}>
                <X size={16} />
              </button>
            </div>
            <div className="shortcuts-body">
              {['General', 'Navigation', 'Help'].map(cat => (
                <div key={cat} className="shortcuts-category">
                  <div className="shortcuts-cat-title">{cat}</div>
                  {SHORTCUTS.filter(s => s.category === cat).map(s => (
                    <div key={s.action} className="shortcut-row">
                      <span className="shortcut-action">{s.action}</span>
                      <div className="shortcut-keys">
                        {s.keys.map((k, i) => (
                          <span key={i}>
                            <kbd className="kbd">{k}</kbd>
                            {i < s.keys.length - 1 && <span className="shortcut-plus">+</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
