import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeStart: number;
  fadingOut: boolean;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = !document.hidden;
    let particles: Particle[] = [];

    const reset = (particle: Particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.speed = Math.random() / 5 + 0.1;
      particle.opacity = 1;
      particle.fadeStart = Date.now() + Math.random() * 600 + 100;
      particle.fadingOut = false;
    };

    const draw = (time: number) => {
      if (!visible) return;
      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!motionPreference.matches) {
          particle.y -= particle.speed * delta;
          if (particle.y < 0) reset(particle);
          if (!particle.fadingOut && Date.now() > particle.fadeStart) particle.fadingOut = true;
          if (particle.fadingOut) {
            particle.opacity -= 0.008 * delta;
            if (particle.opacity <= 0) reset(particle);
          }
        }
        const red = 255 - Math.random() * 22;
        const green = 235 - Math.random() * 22;
        const blue = 210 - Math.random() * 18;
        context.fillStyle = `rgba(${red},${green},${blue},${particle.opacity})`;
        context.fillRect(particle.x, particle.y, 0.4, Math.random() * 2 + 1);
      });

      if (!motionPreference.matches) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = Array.from({ length: Math.floor((width * height) / 6000) }, () => {
        const particle: Particle = {
          x: 0,
          y: 0,
          speed: 0,
          opacity: 1,
          fadeStart: 0,
          fadingOut: false,
        };
        reset(particle);
        return particle;
      });
      start();
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (visible) start();
      else cancelAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", start);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
