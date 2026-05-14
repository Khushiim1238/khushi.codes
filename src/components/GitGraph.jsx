import { useState, useEffect } from 'react';

export default function GitGraph() {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    // Generate a realistic-looking contribution graph
    const weeks = 20;
    const days = 7;
    const data = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        // Weighted random: more activity on weekdays
        const isWeekday = d > 0 && d < 6;
        const rand = Math.random();
        let level = 0;
        if (isWeekday) {
          if (rand > 0.3) level = 1;
          if (rand > 0.5) level = 2;
          if (rand > 0.7) level = 3;
          if (rand > 0.88) level = 4;
        } else {
          if (rand > 0.6) level = 1;
          if (rand > 0.8) level = 2;
          if (rand > 0.95) level = 3;
        }
        data.push({ week: w, day: d, level });
      }
    }
    setCells(data);
  }, []);

  const totalContributions = cells.filter(c => c.level > 0).length;

  return (
    <div className="git-graph-container">
      <div className="git-graph-header">
        <span className="git-graph-count">{totalContributions} contributions</span>
        <span className="git-graph-period">in the last 20 weeks</span>
      </div>
      <div className="git-graph">
        {Array.from({ length: 20 }, (_, w) => (
          <div key={w} className="git-graph-week">
            {cells.filter(c => c.week === w).map((c, i) => (
              <div
                key={i}
                className={`git-graph-cell level-${c.level}`}
                title={`${c.level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="git-graph-legend">
        <span>Less</span>
        <div className="git-graph-cell level-0" />
        <div className="git-graph-cell level-1" />
        <div className="git-graph-cell level-2" />
        <div className="git-graph-cell level-3" />
        <div className="git-graph-cell level-4" />
        <span>More</span>
      </div>
    </div>
  );
}
