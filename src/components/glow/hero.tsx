import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/glow/particle-field";

function TitleLetters() {
  return (
    <>
      <span className="hero-title-line">
        ACENDA <span className="serif">a sua</span>
      </span>
      <span className="light-word">LUZ</span>
    </>
  );
}

export function Hero() {
  return (
    <>
      <div className="hero-track">
        <section className="hero-stage" aria-label="Conheça o salão GLOW">
          <div className="hero-light-effect" aria-hidden="true">
            <div className="hero-spotlight hero-spotlight-left" />
            <div className="hero-spotlight hero-spotlight-right" />
            <div className="hero-spotlight hero-spotlight-center" />
            <ParticleField />
          </div>
          <div className="hero-title-wrap">
            <h1 aria-label="Acenda a sua luz" className="hero-heading">
              <TitleLetters />
            </h1>
            <div aria-hidden="true" className="hero-heading hero-heading-glow">
              <TitleLetters />
            </div>
          </div>
          <div className="hero-foot">
            <Button asChild variant="ghost" className="text-xs">
              <a href="#servicos">
                MONTAR MEU ATENDIMENTO <ArrowUpRight />
              </a>
            </Button>
          </div>
        </section>
      </div>
      <div className="shell flex justify-between border-t border-border py-6 text-xs text-muted-foreground">
        <span>BELEZA NO SEU TEMPO.</span>
        <ArrowDown size={15} />
        <span>CABELO · CUIDADO · GLOW</span>
      </div>
    </>
  );
}
