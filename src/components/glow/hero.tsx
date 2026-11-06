import {motion} from 'framer-motion';
import {ArrowUpRight,ArrowDown} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function Hero(){
return <><div className="hero-track"><section className="hero-stage" aria-label="Conheça o salão GLOW">
<div className="hero-light-effect" aria-hidden="true">
<div className="hero-main-glow"/>
<motion.div className="hero-lamp" initial={{width:'8rem',opacity:.45}} animate={{width:'16rem',opacity:.9}} transition={{ease:'easeInOut',delay:.2,duration:.8}}/>
<motion.div className="hero-top-line" initial={{scaleX:.5,opacity:.4}} animate={{scaleX:1,opacity:.85}} transition={{ease:'easeInOut',delay:.2,duration:.8}}/>
<motion.div className="hero-cone hero-cone-left" initial={{scaleX:.62,opacity:.3}} animate={{scaleX:1,opacity:.72}} transition={{ease:'easeInOut',delay:.2,duration:.8}}/>
<motion.div className="hero-cone hero-cone-right" initial={{scaleX:.62,opacity:.3}} animate={{scaleX:1,opacity:.72}} transition={{ease:'easeInOut',delay:.2,duration:.8}}/>
</div>
<motion.h1 className="hero-heading" initial={{y:36,opacity:0}} animate={{y:0,opacity:1}} transition={{ease:'easeOut',delay:.25,duration:.8}}>
ACENDA{' '}<span className="serif">a sua</span><span className="light-word">LUZ</span>
</motion.h1>
<div className="hero-foot"><div className="caption">GLOW · JULIANA MATOS<br/>ITAPETININGA, SP</div><Button asChild variant="ghost" className="text-xs"><a href="#servicos">MONTAR MEU ATENDIMENTO <ArrowUpRight/></a></Button></div>
</section></div><div className="shell flex justify-between border-t border-border py-6 text-xs text-muted-foreground"><span>BELEZA NO SEU TEMPO.</span><ArrowDown size={15}/><span>CABELO · CUIDADO · GLOW</span></div></>}
