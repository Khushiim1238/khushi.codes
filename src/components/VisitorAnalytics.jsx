import { useState, useEffect } from 'react';

export default function VisitorAnalytics() {
  const [stats, setStats] = useState({
    timeOnSite: 0,
    pagesViewed: new Set(['home.jsx']),
    scrollDepth: 0,
    commandsRun: 0,
    clicks: 0,
  });

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      setStats(prev => ({ ...prev, timeOnSite: Math.floor((Date.now() - startTime) / 1000) }));
    }, 1000);

    const handleClick = () => {
      setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const handleScroll = () => {
      const depth = Math.min(100, Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0);
      setStats(prev => ({ ...prev, scrollDepth: Math.max(prev.scrollDepth, depth) }));
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      clearInterval(timer);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  const engagementScore = Math.min(100, Math.round(
    (stats.timeOnSite / 3) + (stats.clicks * 2) + (stats.pagesViewed.size * 10)
  ));

  const progressBar = (value, max = 100) => {
    const filled = Math.round((value / max) * 8);
    return '█'.repeat(filled) + '░'.repeat(8 - filled);
  };

  return (
    <div className="visitor-analytics">
      <div className="va-header">📊 Session Telemetry</div>
      <div className="va-stats">
        <div className="va-row">
          <span className="va-label">Time:</span>
          <span className="va-value">{formatTime(stats.timeOnSite)}</span>
        </div>
        <div className="va-row">
          <span className="va-label">Interactions:</span>
          <span className="va-value">{stats.clicks}</span>
        </div>
        <div className="va-row">
          <span className="va-label">Engagement:</span>
          <span className="va-value va-score">{progressBar(engagementScore)} {engagementScore}%</span>
        </div>
      </div>
    </div>
  );
}
