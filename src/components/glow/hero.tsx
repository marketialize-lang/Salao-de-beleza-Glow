import {motion} from 'framer-motion';
import {ArrowUpRight,ArrowDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ParticleField} from '@/components/glow/particle-field';

export function Hero(){
return <><div className="hero-track"><section className="hero-stage" aria-label="Conheça o salão GLOW">
<div className="hero-light-effect" aria-hidden="true">
<div className="hero-spotlight hero-spotlight-left"/>
<div className="hero-spotlight hero-spotlight-right"/>
<div className="hero-spotlight hero-spotlight-center"/>
<div className="hero-accent-lines"/>
<ParticleField/>
</div>
<motion.h1 aria-label="Acenda a sua luz" className="hero-heading" initial={false} animate={{y:0,opacity:1}} transition={{ease:'easeOut',duration:.8}}>
<span className="hero-title-line hero-sheen">ACENDA <span className="serif">a sua</span></span><span className="light-word hero-sheen">LUZ</span>
</motion.h1>
<div className="hero-foot"><div className="caption">GLOW · JULIANA MATOS<br/>ITAPETININGA, SP</div><Button asChild variant="ghost" className="text-xs"><a href="#servicos">MONTAR MEU ATENDIMENTO <ArrowUpRight/></a></Button></div>
</section></div><div className="shell flex justify-between border-t border-border py-6 text-xs text-muted-foreground"><span>BELEZA NO SEU TEMPO.</span><ArrowDown size={15}/><span>CABELO · CUIDADO · GLOW</span></div></>}
