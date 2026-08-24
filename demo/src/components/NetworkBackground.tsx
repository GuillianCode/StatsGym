import {useEffect, useRef} from 'react';

type Point = {x: number; y: number; vx: number; vy: number; radius: number; opacity: number};

export function NetworkBackground({active}: {active: boolean}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let points: Point[] = [];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = reduced ? 0 : Math.max(24, Math.round(140 * innerWidth * innerHeight / 800_000));
      points = Array.from({length: count}, () => ({
        x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, radius: Math.random() * 2 + 1, opacity: .3 + Math.random() * .4,
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      context.fillStyle = '#0a85ff';
      context.strokeStyle = 'rgba(10,133,255,.4)';
      context.lineWidth = 1.2;
      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        if (!reduced) {
          point.x += point.vx; point.y += point.vy;
          if (point.x < 0 || point.x > innerWidth) point.vx *= -1;
          if (point.y < 0 || point.y > innerHeight) point.vy *= -1;
        }
        context.globalAlpha = point.opacity;
        context.beginPath(); context.arc(point.x, point.y, point.radius, 0, Math.PI * 2); context.fill();
        for (let j = i + 1; j < points.length; j += 1) {
          const other = points[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance > 160) continue;
          context.globalAlpha = .4;
          context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke();
        }
      }
      context.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize(); draw();
    addEventListener('resize', resize);
    return () => {removeEventListener('resize', resize); cancelAnimationFrame(frame);};
  }, [active]);
  return <canvas className={`network-background${active ? '' : ' hidden'}`} ref={ref} aria-hidden="true" />;
}
