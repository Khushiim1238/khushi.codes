import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MoonStar, Moon, User, Trash2 } from 'lucide-react';

export default function AIPanel({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Luna, your AI coding assistant. How can I help you today?" }
  ]);
  const [memory, setMemory] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = `I'm currently in 'Portfolio Mode'. You asked: "${input}". Since this is a static demonstration, I can tell you that Khushi is an expert in React, Node.js, and Data Engineering!`;
      
      // Memory logic
      if (input.toLowerCase().includes('my name is')) {
        const name = input.split('my name is')[1].trim();
        setMemory(prev => ({ ...prev, userName: name }));
        response = `Nice to meet you, ${name}! I've noted that down in my lunar memory.`;
      } else if (input.toLowerCase().includes('who am i') && memory.userName) {
        response = `You are ${memory.userName}! My memory is as clear as a full moon.`;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response 
      }]);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="ai-panel"
        >
          <div className="ai-panel-header">
            <div className="ai-panel-title">
              <MoonStar size={16} className="ai-icon-glow" />
              <span>Luna AI</span>
            </div>
            <button className="ai-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="ai-messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ${msg.role}`}>
                <div className="ai-avatar">
                  {msg.role === 'assistant' ? <Moon size={14} /> : <User size={14} />}
                </div>
                <div className="ai-content">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="ai-input-area">
            <form onSubmit={handleSend} className="ai-input-wrapper">
              <input 
                type="text" 
                placeholder="Ask Luna anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="ai-input"
              />
              <button type="submit" className="ai-send-btn">
                <Send size={14} />
              </button>
            </form>
            <div className="ai-panel-footer">
              <button className="ai-footer-btn" onClick={() => setMessages([messages[0]])}>
                <Trash2 size={12} /> Clear Chat
              </button>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Powered by Gemini</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
