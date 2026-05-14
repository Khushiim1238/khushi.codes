import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const FORTUNES = [
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
];

const NEOFETCH = `
  ██╗  ██╗ ██████╗
  ██║ ██╔╝██╔════╝     visitor@khushi.codes
  █████╔╝ ██║          ─────────────────────
  ██╔═██╗ ██║          OS:      Portfolio OS v2.0
  ██║  ██╗╚██████╗     Shell:   zsh 5.9
  ╚═╝  ╚═╝ ╚═════╝     Editor:  khushi.codes IDE
                        Theme:   Midnight Indigo
                        Stack:   React + Vite
                        Uptime:  Always shipping
                        CPU:     Brain @ 98%
                        Memory:  Coffee-powered
`;

const COMMANDS = {
  help: () => `Available commands:
  help          Show this message
  whoami        About Khushi
  skills        Technical stack
  experience    Professional background
  projects      Key contributions
  contact       Contact details
  ls            List available files
  cat [file]    Read file content
  neofetch      System information
  fortune       Random programming quote
  git log       Show recent commits
  sudo hire     Try it ;)
  matrix        Enter the matrix
  clear         Clear screen`,

  ls: () => `about.md  experience.json  resume.pdf  .env  node_modules/`,

  cat: (args) => {
    if (!args[0]) return 'Usage: cat [filename]';
    const file = args[0].toLowerCase();
    if (file === 'about.md') return 'Full-Stack Engineer specialized in building high-performance data systems and distributed architectures.';
    if (file === 'experience.json') return '{ "role": "Full Stack Intern", "company": "Bluestock Fintech" }';
    if (file === '.env') return 'Nice try! 🔒 Environment variables are not exposed in production.';
    if (file === 'resume.pdf') return '[Binary file — use File > Download Resume to get it]';
    return `File not found: ${args[0]}`;
  },

  whoami: () => `Khushi Jain — Software Engineer & Data Specialist
  Focus: Scalable backend architectures & performant frontend systems.
  Location: India
  Status: Open to opportunities`,

  experience: () => `Bluestock Fintech — Full Stack Intern
  - Developed real-time market data dashboard.
  - Optimized database queries for high-concurrency environments.`,

  skills: () => `Languages:  JavaScript (ES6+), TypeScript, Python, Java, SQL
  Backend:    Node.js, Express, FastAPI, PostgreSQL, MongoDB
  Frontend:   React, Next.js, Redux, Tailwind CSS
  Data/Ops:   AWS, Docker, Git, CI/CD, Apache Airflow`,

  projects: () => `1. FinTechCore (JS) — Scalable transaction engine.
  2. Music Analytics (Python) — Real-time data processing pipeline.
  3. Timing Predictor (Python) — ML-based execution forecasting.
  4. IntraChat (Java) — High-concurrency enterprise chat system.`,

  contact: () => `GitHub:   github.com/Khushiim1238
  LinkedIn: linkedin.com/in/khushi
  Email:    khushi@example.com`,

  neofetch: () => NEOFETCH,

  fortune: () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)],

  'git': (args) => {
    if (args[0] === 'log') {
      return `commit a3f8d2e (HEAD -> main, origin/main)
Author: Khushi <khushi@example.com>
Date:   2 days ago
    feat: add Redis caching layer to FinTechCore

commit 7b2c1f4
Author: Khushi <khushi@example.com>
Date:   5 days ago
    fix: optimize Redshift distribution keys for MAP

commit 1e9a4b8
Author: Khushi <khushi@example.com>
Date:   1 week ago
    feat: implement AES-256 encryption for IntraChat

commit d4f6e3c
Author: Khushi <khushi@example.com>
Date:   2 weeks ago
    refactor: modularize timing prediction engine`;
    }
    if (args[0] === 'status') {
      return `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`;
    }
    return `git: '${args[0]}' is not a git command. Try 'git log' or 'git status'.`;
  },

  sudo: (args) => {
    if (args.join(' ').toLowerCase().includes('hire')) {
      return `[sudo] password for visitor: ********
✅ Permission granted.

🚀 Deploying offer letter...
📧 Sending to: khushi@example.com
📋 Position: Full-Stack Engineer
💰 Salary: Competitive++

Deployment successful! Khushi will review your offer shortly. 🎉`;
    }
    return `sudo: command not found: ${args.join(' ')}`;
  },
};

export default function Terminal({ isOpen, onToggle, onThemeToggle }) {
  const [lines, setLines] = useState([
    { type: 'output', text: 'Welcome to khushi.codes terminal v2.0. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const handleDeploy = () => {
      const deployLogs = [
        '▶ Starting deployment...',
        '✓ Checking system health... OK',
        '✓ Linting source files... 0 errors',
        '✓ Running test suite... 42 passed',
        '✓ Building optimized bundle... 248KB gzipped',
        '✓ Uploading to edge network...',
        '🚀 Deployment successful! Portfolio updated.'
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLines(prev => [...prev, { type: 'output', text: deployLogs[i] }]);
        i++;
        if (i >= deployLogs.length) clearInterval(interval);
      }, 350);
    };
    window.addEventListener('terminal-deploy', handleDeploy);
    return () => window.removeEventListener('terminal-deploy', handleDeploy);
  }, []);

  const commandNames = Object.keys(COMMANDS);

  const run = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines = [...lines, { type: 'prompt', text: `visitor@khushi.codes:~$ ${cmd}` }];

    const parts = trimmed.toLowerCase().split(' ');
    const base = parts[0];
    const args = parts.slice(1);

    if (base === 'clear') {
      setLines([]);
    } else if (base === 'theme') {
      onThemeToggle?.();
      setLines([...newLines, { type: 'output', text: '✓ Theme toggled.' }]);
    } else if (base === 'matrix') {
      setMatrixActive(true);
      setLines([...newLines, { type: 'output', text: 'Entering the Matrix... (press any key to exit)' }]);
      setTimeout(() => setMatrixActive(false), 5000);
    } else if (base === 'cat') {
      setLines([...newLines, { type: 'output', text: COMMANDS.cat(args) }]);
    } else if (base === 'git') {
      setLines([...newLines, { type: 'output', text: COMMANDS.git(args) }]);
    } else if (base === 'sudo') {
      setLines([...newLines, { type: 'output', text: COMMANDS.sudo(args) }]);
    } else if (COMMANDS[base]) {
      setLines([...newLines, { type: 'output', text: COMMANDS[base]() }]);
    } else {
      setLines([...newLines, { type: 'output', text: `Command not found: ${cmd}. Type "help" for available commands.` }]);
    }
    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');
    setSuggestions([]);
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = commandNames.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      }
    }
  };

  return (
    <div className={`terminal-panel${isOpen ? '' : ' collapsed'}`}>
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Terminal</span>
          {matrixActive && <span className="terminal-matrix-badge">MATRIX</span>}
        </div>
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
        <div
          className={`terminal-body ${matrixActive ? 'matrix-mode' : ''}`}
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div key={i} className={l.type === 'prompt' ? 'terminal-line' : 'terminal-output'}>
              {l.type === 'prompt' ? <span className="terminal-prompt">{l.text}</span> : l.text}
            </div>
          ))}
          {suggestions.length > 1 && (
            <div className="terminal-suggestions">
              {suggestions.map(s => <span key={s}>{s}</span>)}
            </div>
          )}
          <div className="terminal-input-line">
            <span className="terminal-prompt">visitor@khushi.codes:~$&nbsp;</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={e => {
                setInput(e.target.value);
                setSuggestions([]);
              }}
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
