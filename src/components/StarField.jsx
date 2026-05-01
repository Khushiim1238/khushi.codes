import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

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
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.15 + 0.03,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      
      stars.forEach(s => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(200, 210, 230, ${s.opacity * twinkle})`
          : `rgba(100, 116, 139, ${s.opacity * twinkle * 0.3})`;
        ctx.fill();

        s.y -= s.speed;
        if (s.y < -2) {
          s.y = canvas.height + 2;
          s.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    createStars();
    animId = requestAnimationFrame(draw);

    window.addEventListener('resize', () => { resize(); createStars(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" />;
}
