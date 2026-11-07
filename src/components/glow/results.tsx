import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { media } from "@/data/glow";
import { featuredVideo } from "@/data/glow-videos";
import { UnfurlGallery } from "./unfurl-gallery";

const resultPhotos = [
  {
    src: "/results/unhas-claro-01.jpg",
    alt: "Unhas com esmalte claro e acabamento brilhante",
  },
  {
    src: "/results/cilios.jpg",
    alt: "Detalhe de extensão de cílios",
  },
  {
    src: "/results/unhas-rosa-01.jpg",
    alt: "Unhas em tom rosa claro",
  },
  {
    src: "/results/unhas-rosa-02.jpg",
    alt: "Manicure em tom rosa claro",
  },
];

export function Results() {
  return (
    <section id="resultados" className="result-section shell section-anchor">
      <div className="section-top results-heading">
        <p className="eyebrow">RESULTADOS REAIS</p>
        <h2 className="editorial-title">
          O TRABALHO
          <br />
          <span className="serif">de perto.</span>
        </h2>
      </div>

      <div className="results-feature">
        <div className="results-feature-video">
          <video
            src={featuredVideo.url}
            controls
            playsInline
            preload="metadata"
            aria-label="Vídeo em destaque dos trabalhos da GLOW"
          />
        </div>

        <div className="results-gallery">
          <p className="eyebrow results-gallery-title">MAIS RESULTADOS</p>
          <div
            className="results-gallery-track"
            role="list"
            aria-label="Fotos dos trabalhos da GLOW. Deslize para o lado para ver mais."
            tabIndex={0}
          >
            {resultPhotos.map((photo) => (
              <figure className="results-photo" role="listitem" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>

      <Button asChild className="mt-8" variant="ghost">
        <a href="#servicos">
          MONTAR MEU ATENDIMENTO <ArrowUpRight />
        </a>
      </Button>
    </section>
  );
}

export function Feedbacks() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <section id="depoimentos" className="testimonials section-anchor" style={{ paddingBlock: 0 }}>
      <UnfurlGallery
        images={media.feedbacks}
        onOpen={(i) => {
          setIndex(i);
          setZoom(true);
        }}
      >
        <p className="eyebrow mb-6">PALAVRAS DE QUEM VIVEU</p>
        <h2 className="editorial-title">
          QUEM JÁ
          <br />
          PASSOU
          <br />
          <span className="serif">por aqui.</span>
        </h2>
      </UnfurlGallery>
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">Depoimento GLOW</DialogTitle>
          <DialogDescription className="sr-only">
            Conversa enviada por uma cliente.
          </DialogDescription>
          <img
            src={media.feedbacks[index]}
            alt="Depoimento ampliado"
            className="max-h-[80dvh] w-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
