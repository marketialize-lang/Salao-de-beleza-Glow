import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money, services, totals } from "@/data/glow";

type ServiceValueStackProps = {
  ids: string[];
  onOpen: () => void;
};

export function ServiceValueStack({ ids, onOpen }: ServiceValueStackProps) {
  const chosen = services.filter((service) => ids.includes(service.id));
  const { subtotal, discount, total } = totals(ids);
  const hasStartingPrice = chosen.some((service) => service.from);
  const stackCards = chosen.slice(-4).reverse();

  return (
    <aside className="service-value-stack" aria-label="Resumo do atendimento escolhido">
      <div className="service-value-stack__heading">
        <p className="eyebrow">PILHA DE CUIDADOS</p>
        <h3>
          Seu momento,
          <br />
          <span className="serif">do seu jeito.</span>
        </h3>
      </div>

      <div className="service-value-stack__stage" aria-hidden="true">
        <span className="service-value-stack__beam" />
        <span className="service-value-stack__subtotal">{money(subtotal)}</span>
        {stackCards.length > 0 ? (
          <div className="service-value-stack__cards">
            {stackCards.map((service, index) => (
              <div
                className="service-value-stack__card"
                key={service.id}
                style={{
                  "--stack-index": index,
                  "--stack-y": `${index * -12}px`,
                  "--stack-x": `${index * 3}px`,
                  "--stack-rotate": `${(index % 2 === 0 ? -1 : 1) * (index + 1) * 1.2}deg`,
                } as CSSProperties}
              >
                <small>GLOW · CUIDADO {chosen.length - index}</small>
                <strong>{service.name}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="service-value-stack__empty-card">
            <small>SEU PRÓXIMO MOMENTO</small>
            <strong>Escolha um cuidado para começar</strong>
          </div>
        )}
      </div>

      <div className="service-value-stack__summary" aria-live="polite">
        <div className="service-value-stack__summary-heading">
          <span>Seu atendimento</span>
          <span>{chosen.length.toString().padStart(2, "0")}</span>
        </div>

        {chosen.length > 0 ? (
          <ul className="service-value-stack__lines">
            {chosen.map((service) => (
              <li key={service.id}>
                <span>{service.name}</span>
                <strong>{money(service.price)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="service-value-stack__empty-copy">
            Os serviços que você selecionar aparecem aqui com o valor atualizado.
          </p>
        )}

        <div className="service-value-stack__totals">
          <div>
            <span>Subtotal{hasStartingPrice ? " inicial" : ""}</span>
            <strong>{money(subtotal)}</strong>
          </div>
          {discount > 0 ? (
            <div className="service-value-stack__saving">
              <span>Desconto GLOW · 15%</span>
              <strong>− {money(discount)}</strong>
            </div>
          ) : (
            <p>
              {chosen.length === 2
                ? "Mais 1 serviço libera 15% de desconto."
                : "Escolha 3 serviços para receber 15% de desconto."}
            </p>
          )}
          <div className="service-value-stack__total">
            <span>Total{hasStartingPrice ? " inicial" : ""}</span>
            <strong>{money(total)}</strong>
          </div>
        </div>

        {hasStartingPrice && (
          <p className="service-value-stack__notice">
            Valores “a partir de” são iniciais e podem variar após avaliação.
          </p>
        )}

        <Button
          className="service-value-stack__cta"
          onClick={onOpen}
          disabled={chosen.length === 0}
        >
          Revisar meu atendimento <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </aside>
  );
}
