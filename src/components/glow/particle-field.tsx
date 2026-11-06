import {useEffect,useRef} from 'react';

interface Particle {
  x:number;
  y:number;
  speed:number;
  length:number;
  phase:number;
  tint:'accent'|'paper';
}

export function ParticleField(){
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=canvasRef.current;
    const stage=canvas?.parentElement;
    const context=canvas?.getContext('2d');
    if(!canvas||!stage||!context)return;

    const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
    let width=0;
    let height=0;
    let frame=0;
    let previousTime=0;
    let isVisible=!document.hidden;
    let particles:Particle[]=[];
    const styles=getComputedStyle(stage);
    const accent=styles.getPropertyValue('--glow-champagne').trim();
    const paper=styles.getPropertyValue('--glow-paper').trim();

    const createParticle=():Particle=>({
      x:Math.random()*width,
      y:Math.random()*height,
      speed:.12+Math.random()*.4,
      length:1+Math.random()*2.5,
      phase:Math.random()*Math.PI*2,
      tint:Math.random()>.84?'paper':'accent',
    });

    const draw=(time:number)=>{
      if(!isVisible)return;
      const delta=previousTime?Math.min((time-previousTime)/16.67,2):1;
      previousTime=time;
      context.clearRect(0,0,width,height);

      for(const particle of particles){
        if(!motionPreference.matches){
          particle.y-=particle.speed*delta;
          particle.phase+=.018*delta;
          if(particle.y < -particle.length){
            particle.y=height+particle.length;
            particle.x=Math.random()*width;
          }
        }
        context.fillStyle=particle.tint==='paper'?paper:accent;
        context.globalAlpha=(particle.tint==='paper'?.16:.12)+(.28+.22*Math.sin(particle.phase));
        context.fillRect(particle.x,particle.y,1,particle.length);
      }
      context.globalAlpha=1;
      if(!motionPreference.matches)frame=requestAnimationFrame(draw);
    };

    const start=()=>{
      cancelAnimationFrame(frame);
      previousTime=0;
      frame=requestAnimationFrame(draw);
    };

    const resize=()=>{
      const bounds=stage.getBoundingClientRect();
      width=bounds.width;
      height=bounds.height;
      const pixelRatio=Math.min(window.devicePixelRatio||1,1.5);
      canvas.width=Math.round(width*pixelRatio);
      canvas.height=Math.round(height*pixelRatio);
      context.setTransform(pixelRatio,0,0,pixelRatio,0,0);
      const count=Math.min(680,Math.max(110,Math.floor(width*height/12000)));
      particles=Array.from({length:count},createParticle);
      start();
    };

    const onVisibilityChange=()=>{
      isVisible=!document.hidden;
      if(isVisible)start();
      else cancelAnimationFrame(frame);
    };

    const resizeObserver=new ResizeObserver(resize);
    resizeObserver.observe(stage);
    document.addEventListener('visibilitychange',onVisibilityChange);
    motionPreference.addEventListener('change',start);
    resize();

    return()=>{
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange',onVisibilityChange);
      motionPreference.removeEventListener('change',start);
    };
  },[]);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true"/>;
}
