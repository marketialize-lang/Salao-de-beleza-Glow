import {useAnimationFrame} from 'framer-motion';
import {useRef,type ReactNode,type RefObject} from 'react';

// Shared clock: the beam position and the title wave derive from the same
// linear perimeter model (2*(W+H), starting at the top-left corner, clockwise),
// so they stay in sync without shared state.
export const BEAM_DURATION=8;

export function BeamCard({size=100,titleRef,className,children}:{size?:number;titleRef:RefObject<HTMLSpanElement|null>;className?:string;children:ReactNode}){
  const cardRef=useRef<HTMLDivElement>(null);
  const beamRef=useRef<HTMLDivElement>(null);
  useAnimationFrame((time)=>{
    const card=cardRef.current;const beam=beamRef.current;const title=titleRef.current;
    if(!card||!beam)return;
    const progress=((time/1000)%BEAM_DURATION)/BEAM_DURATION;
    const rect=card.getBoundingClientRect();
    const W=rect.width;const H=rect.height;
    const perimeter=2*(W+H);
    const d=progress*perimeter;
    let x:number,y:number;
    if(d<W){x=d;y=0}
    else if(d<W+H){x=W;y=d-W}
    else if(d<2*W+H){x=2*W+H-d;y=H}
    else{x=0;y=perimeter-d}
    beam.style.transform=`translate3d(${x-size/2}px,${y-size/2}px,0)`;
    if(!title)return;
    const textRect=title.getBoundingClientRect();
    const textLeft=Math.max(0,textRect.left-rect.left);
    const textRight=Math.min(W,textRect.right-rect.left);
    const startP=(textLeft/perimeter)*100;
    const endP=(textRight/perimeter)*100;
    const offset=progress*100;
    if(endP<=startP)return;
    if(offset>=startP&&offset<=endP){const t=(offset-startP)/(endP-startP);title.style.backgroundPosition=`${95-t*90}% center`}
    else if(offset<startP){title.style.backgroundPosition='0% center'}
    else{title.style.backgroundPosition='100% center'}
  });
  return <div ref={cardRef} className={className??'beam-card'}><div ref={beamRef} className="beam" style={{width:size,height:size}} aria-hidden/>{children}</div>;
}
