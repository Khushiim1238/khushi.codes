import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const COMMANDS = {
  help: () => `Available commands:
  help        Show this message
  whoami      About Khushi
  skills      List tech stack
  projects    List projects
  contact     Contact info
  theme       Toggle dark/light
  clear       Clear terminal
  sudo hire khushi   Easter egg`,
  whoami: () => `Khushi Jain — Full Stack Developer & Data Engineer
  Location: India
  Status: Open to opportunities`,
  skills: () => `Frontend:  React, Next.js, JavaScript, TypeScript
Backend:   Node.js, Express, Python, Java
Data:      Airflow, S3, Redshift, Spark
Tools:     Git, Docker, Linux, AWS`,
  projects: () => `1. FinTechCore       — Fintech solution (JS)
2. PlayZone          — Gaming platform (TS)
3. Live Polling      — Real-time polls (JS)
4. IntraChat         — Intranet chat (Java)
5. Music Analytics   — Data pipeline (Python)
6. Timing Predictor  — AI algorithm (Python)
7. Airline System    — Booking app (Java)
8. MotionDetector    — CV project (Python)`,
  contact: () => `GitHub:   github.com/Khushiim1238
Email:    khushi@example.com
LinkedIn: linkedin.com/in/khushi`,
  'sudo hire khushi': () => `
  Permission granted!
  Deploying offer letter... done.
  Starting onboarding... done.
  Welcome aboard! 🎉`,
};

export default function Terminal({ isOpen, onToggle, onThemeToggle }) {
  const [lines, setLines] = useState([
    { type: 'output', text: 'Welcome to khushi.codes terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines = [...lines, { type: 'prompt', text: `visitor@khushi.codes:~$ ${cmd}` }];

    if (trimmed === 'clear') {
      setLines([]);
    } else if (trimmed === 'theme') {
      onThemeToggle?.();
      setLines([...newLines, { type: 'output', text: 'Theme toggled.' }]);
    } else if (COMMANDS[trimmed]) {
      setLines([...newLines, { type: 'output', text: COMMANDS[trimmed]() }]);
    } else {
      setLines([...newLines, { type: 'output', text: `Command not found: ${cmd}. Type "help" for available commands.` }]);
    }
    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        const i = histIdx + 1;
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        const i = histIdx - 1;
        setHistIdx(i);
        setInput(history[i]);
      } else {
        setHistIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div className={`terminal-panel${isOpen ? '' : ' collapsed'}`}>
      <div className="terminal-header">
        <span>Terminal</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="titlebar-btn" onClick={onToggle} title={isOpen ? 'Minimize' : 'Restore'}>
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <button className="titlebar-btn" onClick={onToggle} title="Close">
            <X size={14} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className={l.type === 'prompt' ? 'terminal-line' : 'terminal-output'}>
              {l.type === 'prompt' ? <span className="terminal-prompt">{l.text}</span> : l.text}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="terminal-prompt">visitor@khushi.codes:~$&nbsp;</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      )}
    </div>
  );
}
