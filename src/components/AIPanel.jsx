import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2 } from 'lucide-react';
import { contextResponses, greetings, fallbackResponses, easterEggs } from '../data/nova-responses';

export default function AIPanel({ isOpen, onClose, activeTab }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: greetings[Math.floor(Math.random() * greetings.length)].replace(/Nova/g, 'LUNA.AI') }
  ]);
  const [memory, setMemory] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [botMood, setBotMood] = useState('idle'); // idle, thinking, talking, happy, waving, observing
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setBotMood('waving');
      const timer = setTimeout(() => setBotMood('idle'), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0 && botMood === 'idle') {
      setBotMood('observing');
    } else if (e.target.value.length === 0 && botMood === 'observing') {
      setBotMood('idle');
    }
  };

  const getResponse = (userInput) => {
    const lower = userInput.toLowerCase().trim();

    // Check easter eggs
    for (const [key, val] of Object.entries(easterEggs)) {
      if (lower.includes(key)) return val.replace(/Nova/g, 'LUNA.AI');
    }

    // Memory logic
    if (lower.includes('my name is')) {
      const name = userInput.split(/my name is/i)[1].trim();
      setMemory(prev => ({ ...prev, userName: name }));
      return `Nice to meet you, ${name}! I've stored that in my memory banks. 🧠`;
    }
    if ((lower.includes('who am i') || lower.includes('my name')) && memory.userName) {
      return `You're ${memory.userName}! My memory circuits are working perfectly.`;
    }

    // Context-aware responses based on active tab
    const tabResponses = contextResponses[activeTab];
    if (tabResponses && Math.random() > 0.3) {
      return tabResponses[Math.floor(Math.random() * tabResponses.length)].replace(/Nova/g, 'LUNA.AI');
    }

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)].replace(/Nova/g, 'LUNA.AI');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setBotMood('thinking');

    setTimeout(() => {
      setBotMood('talking');
      setTimeout(() => {
        const response = getResponse(input);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsTyping(false);
        setBotMood('happy');
        setTimeout(() => setBotMood('idle'), 2000);
      }, 400);
    }, 600);
  };

  const quickActions = [
    { label: '📄 Resume', action: () => setMessages(prev => [...prev, { role: 'assistant', content: "Khushi's resume covers Full-Stack Engineering & Data Specialist roles. Download it from File > Download Resume!" }]) },
    { label: '💬 About', action: () => setMessages(prev => [...prev, { role: 'assistant', content: "Khushi is a Full-Stack Engineer specializing in distributed systems, real-time data processing, and scalable web architectures." }]) },
    { label: '📊 Skills', action: () => setMessages(prev => [...prev, { role: 'assistant', content: "Top skills: React, Node.js, Python, PostgreSQL, AWS, Docker, Apache Airflow. Check the skills.ts tab for the full breakdown!" }]) },
    { label: '🔗 GitHub', action: () => window.open('https://github.com/Khushiim1238', '_blank') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 360 }}
          animate={{ x: 0 }}
          exit={{ x: 360 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="ai-panel"
        >
          <div className="ai-panel-header">
            <div className="ai-panel-title">
              <span className="luna-mini-icon">🤖</span>
              <span>LUNA.AI</span>
              <span className="luna-status-dot" />
            </div>
            <button className="ai-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          {/* LUNA 3D Character Area */}
          <div className="luna-character-area">
            <div className={`luna-body ${botMood}`}>
              <div className="luna-head">
                <div className="luna-screen">
                  <div className="luna-eye left"></div>
                  <div className="luna-eye right"></div>
                </div>
              </div>
              <div className="luna-torso">
                <span className="luna-code">&lt;/&gt;</span>
              </div>
              <div className="luna-arm left"></div>
              <div className="luna-arm right"></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="nova-quick-actions">
            {quickActions.map((qa) => (
              <button key={qa.label} className="nova-quick-btn" onClick={qa.action}>
                {qa.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="ai-messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ${msg.role}`}>
                <div className="ai-avatar">
                  {msg.role === 'assistant' ? (
                    <span className="nova-avatar-icon">L</span>
                  ) : (
                    <span className="user-avatar-icon">U</span>
                  )}
                </div>
                <div className="ai-content">{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message assistant">
                <div className="ai-avatar">
                  <span className="nova-avatar-icon">L</span>
                </div>
                <div className="ai-content">
                  <span className="typing-dots">
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="ai-input-area">
            <form onSubmit={handleSend} className="ai-input-wrapper">
              <input
                type="text"
                placeholder="Ask LUNA.AI anything..."
                value={input}
                onChange={handleInputChange}
                className="ai-input"
              />
              <button type="submit" className="ai-send-btn">
                <Send size={14} />
              </button>
            </form>
            <div className="ai-panel-footer">
              <button className="ai-footer-btn" onClick={() => setMessages([messages[0]])}>
                <Trash2 size={12} /> Clear
              </button>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>LUNA Engine v2.0</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
