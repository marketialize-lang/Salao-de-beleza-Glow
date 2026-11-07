import {Fragment, useEffect, useRef} from 'react';

const lines = ['AQUI, QUEM MONTA', 'O ATENDIMENTO', 'é você.'];

type Letter = {
  element: HTMLSpanElement;
  cx: number;
  cy: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: number;
  vx: number;
  vy: number;
  vr: number;
  vs: number;
  release: number;
  ready: boolean;
};

export function ManifestoMagneticTitle() {
  const stageRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Letter[]>([]);
  const pointerRef = useRef<{x: number; y: number; on: boolean; down: boolean; mouse: boolean; time: number}>({x: 0, y: 0, on: false, down: false, mouse: false, time: 0});

  useEffect(() => {
    const stage = stageRef.current;
    const field = fieldRef.current;
    const letters = lettersRef.current;
    if (!stage || !letters.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const section = stage.closest('.manifesto') ?? stage;
    let visible = false;
    let started = false;
    let frame = 0;
    let last = 0;
    let autoUntil = 0;
    let lastUser = -Infinity;
    let autoProgress = 0;
    let magnetX = 0;
    let magnetY = 0;
    let amplitude = 0;
    let fontSize = 80;
    let radius = 150;
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    const put = (letter: Letter) => {
      letter.element.style.transform = `translate(${letter.x.toFixed(1)}px,${letter.y.toFixed(1)}px) rotate(${letter.rotation.toFixed(2)}deg) scale(${letter.scale.toFixed(3)})`;
      letter.element.style.setProperty('--magnetic-strength', letter.color.toFixed(3));
    };

    const measure = () => {
      stage.style.setProperty('--magnetic-fit', '1');
      const widestLine = Math.max(...Array.from(stage.querySelectorAll<HTMLElement>('.manifesto-magnetic-row'), line => line.scrollWidth), 0);
      const fit = widestLine > 0 ? Math.min(1, (stage.clientWidth - 4) / widestLine) : 1;
      stage.style.setProperty('--magnetic-fit', fit.toFixed(4));
      fontSize = parseFloat(getComputedStyle(stage).fontSize) || 80;
      radius = Math.max(fontSize * 1.5, 130);
      minX = minY = Infinity;
      maxX = maxY = -Infinity;
      letters.forEach(letter => {
        letter.cx = letter.element.offsetLeft + letter.element.offsetWidth / 2;
        letter.cy = letter.element.offsetTop + letter.element.offsetHeight / 2;
        minX = Math.min(minX, letter.cx);
        maxX = Math.max(maxX, letter.cx);
        minY = Math.min(minY, letter.cy);
        maxY = Math.max(maxY, letter.cy);
      });
    };

    const wake = () => {
      if (!frame && visible && started && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const tick = (now: number) => {
      frame = 0;
      let dt = (now - last) / 1000;
      last = now;
      if (!(dt > 0)) dt = 0.016;
      dt = Math.min(dt, 0.25);
      const steps = Math.ceil(dt * 60);
      const step = dt / steps;
      const stageRect = stage.getBoundingClientRect();
      const pointer = pointerRef.current;
      let desired = 0;
      let targetX = magnetX;
      let targetY = magnetY;
      let near = false;

      if (pointer.on && !(pointer.mouse && now - pointer.time > 2600)) {
        const px = pointer.x - stageRect.left;
        const py = pointer.y - stageRect.top;
        if (px >= 0 && py >= 0 && px <= stageRect.width && py <= stageRect.height) {
          const outsideX = Math.max(minX - fontSize * 0.4 - px, 0, px - maxX - fontSize * 0.4);
          const outsideY = Math.max(minY - fontSize * 0.5 - py, 0, py - maxY - fontSize * 0.5);
          desired = Math.max(0, 1 - Math.hypot(outsideX, outsideY) / (radius * 0.7));
          if (desired > 0) {
            near = true;
            targetX = px;
            targetY = py;
            lastUser = now;
            autoUntil = now + 24000;
          }
        }
      }

      const autopilot = !near && now < autoUntil && now - lastUser > 1500;
      if (autopilot) {
        autoProgress += dt * 2.8;
        desired = 0.92;
        const span = Math.max(1, 2 * letters.length - 2);
        const position = autoProgress % span;
        const forward = position < letters.length - 1;
        const index = Math.max(0, Math.min(letters.length - 2, Math.floor(forward ? position : span - position)));
        const fraction = (forward ? position : span - position) - index;
        const first = letters[index];
        const second = letters[index + 1] ?? first;
        targetX = first.cx + (second.cx - first.cx) * fraction;
        targetY = first.cy + (second.cy - first.cy) * fraction + Math.sin(autoProgress * 0.75) * fontSize * 0.3;
      }

      if (amplitude < 0.02) {
        magnetX = targetX;
        magnetY = targetY;
      } else {
        const follow = 1 - Math.exp(-dt * (near ? 18 : 6));
        magnetX += (targetX - magnetX) * follow;
        magnetY += (targetY - magnetY) * follow;
      }
      amplitude += (desired - amplitude) * (1 - Math.exp(-dt * (desired > amplitude ? 5 : 2.6)));
      if (!desired && amplitude < 0.004) amplitude = 0;

      const push = fontSize * 0.2;
      const colorEase = 1 - Math.exp(-dt * 8);
      let busy = amplitude > 0 || desired > 0 || autopilot;
      letters.forEach(letter => {
        if (now < letter.release) {
          busy = true;
          return;
        }
        let goalX = 0;
        let goalY = 0;
        let goalRotation = 0;
        let goalScale = 1;
        let goalColor = 0;
        if (amplitude > 0) {
          const dx = letter.cx - magnetX;
          const dy = letter.cy - magnetY;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radius * radius) {
            const distance = Math.sqrt(distanceSquared) || 1;
            let force = 1 - distance / radius;
            force = force * force * (3 - 2 * force) * amplitude;
            goalX = dx / distance * push * force;
            goalY = dy / distance * push * force * 0.85;
            goalRotation = dx / radius * 30 * force;
            goalScale = 1 + 0.34 * force;
            goalColor = Math.min(1, Math.max(0, (force - 0.3) * 3.2));
          }
        }
        const damping = now < letter.release + 700 ? 22 : 15;
        for (let i = 0; i < steps; i++) {
          letter.vx += ((goalX - letter.x) * 190 - letter.vx * damping) * step;
          letter.x += letter.vx * step;
          letter.vy += ((goalY - letter.y) * 190 - letter.vy * damping) * step;
          letter.y += letter.vy * step;
          letter.vr += ((goalRotation - letter.rotation) * 190 - letter.vr * damping) * step;
          letter.rotation += letter.vr * step;
          letter.vs += ((goalScale - letter.scale) * 190 - letter.vs * damping) * step;
          letter.scale += letter.vs * step;
        }
        letter.color += (goalColor - letter.color) * colorEase;
        letter.ready = !(Math.abs(goalX - letter.x) + Math.abs(goalY - letter.y) + Math.abs(letter.vx) + Math.abs(letter.vy) > 0.03 || Math.abs(goalRotation - letter.rotation) + Math.abs(letter.vr) > 0.03 || Math.abs(goalScale - letter.scale) + Math.abs(letter.vs) > 0.001 || Math.abs(goalColor - letter.color) > 0.004);
        if (letter.ready) {
          letter.x = goalX;
          letter.y = goalY;
          letter.rotation = goalRotation;
          letter.scale = goalScale;
          letter.color = goalColor;
          letter.vx = letter.vy = letter.vr = letter.vs = 0;
        } else busy = true;
        put(letter);
      });
      if (field) {
        field.style.opacity = amplitude.toFixed(2);
        field.style.width = field.style.height = `${Math.round(radius * 2)}px`;
        field.style.margin = `-${Math.round(radius)}px 0 0 -${Math.round(radius)}px`;
        field.style.transform = `translate(${magnetX.toFixed(1)}px,${magnetY.toFixed(1)}px) scale(${(0.6 + amplitude * 0.4).toFixed(3)})`;
      }
      if (busy) frame = requestAnimationFrame(tick);
    };

    const burst = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      autoUntil = performance.now() + 24000;
      const reach = fontSize * 4.2;
      letters.forEach(letter => {
        const dx = letter.cx - x;
        const dy = letter.cy - y;
        const distance = Math.hypot(dx, dy) || 1;
        const force = Math.max(0.25, 1 - distance / reach);
        const jitter = 0.7 + Math.random() * 0.6;
        letter.vx += dx / distance * fontSize * 11 * force * jitter;
        letter.vy += (dy / distance * 11 * jitter - 3) * fontSize * force;
        letter.vr += (Math.random() - 0.5) * 1500 * force;
        letter.vs += 3 * force;
        letter.color = Math.min(1, Math.max(letter.color, (force - 0.4) * 2.5));
        letter.ready = false;
      });
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !pointerRef.current.down) return;
      pointerRef.current = {x: event.clientX, y: event.clientY, on: true, down: pointerRef.current.down, mouse: event.pointerType !== 'touch', time: performance.now()};
      wake();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') {
        pointerRef.current.on = false;
        wake();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      pointerRef.current = {x: event.clientX, y: event.clientY, on: true, down: true, mouse: false, time: performance.now()};
      wake();
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        pointerRef.current.on = false;
        pointerRef.current.down = false;
        wake();
      }
    };
    const onClick = (event: MouseEvent) => burst(event.clientX, event.clientY);
    const onVisibility = () => document.hidden ? (frame && cancelAnimationFrame(frame), frame = 0) : wake();
    const onResize = () => { measure(); wake(); };

    measure();
    stage.addEventListener('pointermove', onPointerMove, {passive:true});
    stage.addEventListener('pointerleave', onPointerLeave, {passive:true});
    stage.addEventListener('pointerdown', onPointerDown, {passive:true});
    stage.addEventListener('pointerup', onPointerUp, {passive:true});
    stage.addEventListener('pointercancel', onPointerUp, {passive:true});
    stage.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(stage);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visible = entry.isIntersecting;
        if (!visible) {
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
          return;
        }
        if (!started) {
          started = true;
          const now = performance.now();
          let delay = 60;
          letters.forEach((letter, index) => {
            letter.x = 0;
            letter.y = fontSize * 1.25;
            letter.rotation = 8;
            letter.scale = 1;
            letter.release = now + delay;
            letter.ready = false;
            put(letter);
            delay += 30;
          });
          autoUntil = now + 24000;
          lastUser = now - 300;
          wake();
        } else {
          autoUntil = Math.max(autoUntil, performance.now() + 12000);
          wake();
        }
      });
    }, {threshold:[0, 0.1]});
    observer.observe(section);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerUp);
      stage.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  let letterIndex = 0;
  return <div ref={stageRef} className="manifesto-magnetic-stage">
    <div ref={fieldRef} className="manifesto-magnetic-field" aria-hidden="true"><i/><i/><i/><i/></div>
    <h2 className="editorial-title manifesto-magnetic-title" aria-label="AQUI, QUEM MONTA O ATENDIMENTO é você.">
      {lines.map((line, lineIndex) => <span key={line} className={`manifesto-magnetic-row${lineIndex === 2 ? ' serif' : ''}`} aria-hidden="true">
        {line.split(' ').map((word, wordIndex) => <Fragment key={`${lineIndex}-${wordIndex}`}>
          {wordIndex > 0 && '\u00a0'}<span className="manifesto-magnetic-word">{Array.from(word).map((character, characterIndex) => {
            const index = letterIndex++;
            return <span key={`${wordIndex}-${characterIndex}`} ref={element => {
              if (element) lettersRef.current[index] = {element,cx:0,cy:0,x:0,y:0,rotation:0,scale:1,color:0,vx:0,vy:0,vr:0,vs:0,release:0,ready:true};
            }} className="manifesto-magnetic-letter">{character}</span>;
          })}</span>
        </Fragment>)}
      </span>)}
    </h2>
  </div>;
}
