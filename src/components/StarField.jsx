import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.2 + 0.05,
          parallax: Math.random() * 0.05 + 0.02, // Depth factor
          opacity: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      
      const mouseOffset = {
        x: (mouseRef.current.x - window.innerWidth / 2) * 0.1,
        y: (mouseRef.current.y - window.innerHeight / 2) * 0.1
      };

      // Draw Cursor Aura (Nebula Glow)
      const auraSize = 400;
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, auraSize
      );
      
      if (isDark) {
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
        gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.4 + 0.6;
        
        // Calculate position with parallax shift
        const posX = s.x - (mouseOffset.x * s.parallax);
        const posY = s.y - (mouseOffset.y * s.parallax);

        ctx.beginPath();
        ctx.arc(posX, posY, s.r, 0, Math.PI * 2);
        
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${s.opacity * twinkle})`
          : `rgba(124, 58, 237, ${s.opacity * twinkle * 0.4})`;
        
        if (isDark && s.r > 1.2) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'var(--accent)';
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();

        // Move stars slowly for ambient life
        s.y -= s.speed;
        if (s.y < -10) s.y = canvas.height + 10;
      });

      animId = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    createStars();
    animId = requestAnimationFrame(draw);

    window.addEventListener('resize', () => { resize(); createStars(); });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
