import {useEffect, useRef} from 'react';

const rows = [
  {text: 'AQUI, QUEM MONTA', style: 'sans'},
  {text: 'O ATENDIMENTO', style: 'sans'},
  {text: 'é você.', style: 'serif'},
] as const;

type Letter = {element: HTMLSpanElement; x: number; y: number};

export function ManifestoMagneticTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<Letter[]>([]);
  const pointerRef = useRef<{x: number; y: number} | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const letters = lettersRef.current;
    const started = performance.now();
    let frame = 0;
    let bounds: DOMRect[] = [];

    const measure = () => {
      bounds = letters.map(({element}) => element.getBoundingClientRect());
    };
    measure();

    const animate = (now: number) => {
      const elapsed = now - started;
      const pointer = pointerRef.current;
      let magnetX = 0;
      let magnetY = 0;
      let active = false;

      if (pointer) {
        magnetX = pointer.x;
        magnetY = pointer.y;
        active = true;
      } else if (!reduceMotion && elapsed < 24000 && letters.length > 1) {
        const progress = (elapsed / 24000) * (letters.length - 1);
        const index = Math.min(letters.length - 2, Math.floor(progress));
        const fraction = progress - index;
        const first = bounds[index];
        const second = bounds[index + 1];
        magnetX = first.left + first.width / 2 + (second.left + second.width / 2 - first.left - first.width / 2) * fraction;
        magnetY = first.top + first.height / 2 + (second.top + second.height / 2 - first.top - first.height / 2) * fraction + Math.sin(elapsed / 360) * 18;
        active = true;
      }

      letters.forEach(({element}, index) => {
        const rect = bounds[index];
        if (!active || !rect) {
          element.style.transform = '';
          element.style.setProperty('--magnetic-strength', '0');
          return;
        }
        const dx = rect.left + rect.width / 2 - magnetX;
        const dy = rect.top + rect.height / 2 - magnetY;
        const distance = Math.hypot(dx, dy);
        const reach = Math.max(110, title.clientWidth * 0.16);
        const force = Math.max(0, 1 - distance / reach);
        const eased = force * force * (3 - 2 * force);
        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * 22 * eased;
        const y = Math.sin(angle) * 17 * eased;
        const rotation = Math.cos(angle) * 9 * eased;
        element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotation.toFixed(1)}deg) scale(${(1 + eased * 0.22).toFixed(3)})`;
        element.style.setProperty('--magnetic-strength', eased.toFixed(3));
      });

      if (!pointer && !reduceMotion && elapsed < 24000) frame = requestAnimationFrame(animate);
      else frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      pointerRef.current = {x: event.clientX, y: event.clientY};
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const onLeave = () => {
      pointerRef.current = null;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const onResize = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(animate);
    };

    title.addEventListener('pointermove', onMove);
    title.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    if (!reduceMotion) frame = requestAnimationFrame(animate);

    return () => {
      title.removeEventListener('pointermove', onMove);
      title.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <h2 ref={titleRef} className="editorial-title manifesto-magnetic-title" aria-label="AQUI, QUEM MONTA O ATENDIMENTO é você.">
    {(() => {
      let letterIndex = 0;
      return rows.map((row, rowIndex) => <span key={row.text} className={`manifesto-magnetic-row${row.style === 'serif' ? ' serif' : ''}`} aria-hidden="true">
      {Array.from(row.text).map((character, characterIndex) => {
        const index = letterIndex++;
        return <span key={`${rowIndex}-${characterIndex}`} ref={element => {
          if (element) lettersRef.current[index] = {element, x: 0, y: 0};
        }} className="manifesto-magnetic-letter">{character === ' ' ? '\u00a0' : character}</span>;
      })}
      </span>);
    })()}
  </h2>;
}
