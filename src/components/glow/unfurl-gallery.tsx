import {useMemo,useRef} from 'react';
import {motion,useScroll,useSpring,useTransform} from 'framer-motion';

type Props={images:string[];onOpen:(i:number)=>void;children?:React.ReactNode};

function Card({src,i,onOpen}:{src:string;i:number;onOpen:(i:number)=>void}){
  return <button type="button" onClick={()=>onOpen(i)} aria-label={`Ampliar depoimento ${i+1}`} className="block w-full flex-shrink-0 overflow-hidden rounded-xl border border-border bg-card cursor-zoom-in">
    <img src={src} alt={`Depoimento real enviado à GLOW ${i+1}`} loading="lazy" decoding="async" className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover object-top opacity-80 hover:opacity-100 transition-opacity duration-300"/>
  </button>;
}

export function UnfurlGallery({images,onOpen,children}:Props){
  const ref=useRef<HTMLDivElement>(null);
  const cols=useMemo(()=>[0,1,2,3].map(c=>{const list=images.map((src,i)=>({src,i}));const rot=[...list.slice(c%list.length),...list.slice(0,c%list.length)];return [...rot,...rot];}),[images]);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
  const p=useSpring(scrollYProgress,{stiffness:100,damping:20,mass:.5});
  const w=useTransform(p,[0,.15],['90vw','100vw']);
  const h=useTransform(p,[0,.15],['80svh','100svh']);
  const r=useTransform(p,[0,.15],['48px','0px']);
  const rotateY=useTransform(p,[.15,1],[-45,-8]);
  const rotateX=useTransform(p,[.15,1],[25,4]);
  const rotateZ=useTransform(p,[.15,1],[15,2]);
  const z=useTransform(p,[.15,1],[-800,0]);
  const ys=[useTransform(p,[.15,1],['0%','-40%']),useTransform(p,[.15,1],['-40%','10%']),useTransform(p,[.15,1],['0%','-40%']),useTransform(p,[.15,1],['-30%','20%'])];

  return <div ref={ref} className="relative h-[400svh]">
    <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{width:w,height:h,borderRadius:r}} className="unfurl-frame relative overflow-hidden bg-background border border-border flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center" style={{perspective:'1000px'}}>
          <motion.div style={{rotateX,rotateY,rotateZ,z,transformStyle:'preserve-3d',WebkitTransformStyle:'preserve-3d'}} className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150svh]">
            {cols.map((col,c)=><motion.div key={c} style={{y:ys[c]!}} className="flex flex-col gap-4 md:gap-6 w-[24vw] min-w-[140px]">
              {col.map((it,k)=><Card key={k} src={it.src} i={it.i} onOpen={onOpen}/>)}
            </motion.div>)}
          </motion.div>
        </div>
        <div className="unfurl-vignette pointer-events-none absolute inset-0 z-10"/>
        <div className="pointer-events-none relative z-20 text-center px-8 py-6 rounded-2xl text-foreground bg-background/70 backdrop-blur-sm">{children}</div>
      </motion.div>
    </div>
  </div>;
}
