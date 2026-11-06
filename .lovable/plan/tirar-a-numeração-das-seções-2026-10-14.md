# Tirar a numeração das seções

## O que muda

Os números que aparecem antes do nome de cada seção somem. Os nomes continuam exatamente como estão, só perdem o "01 /", "02 /" etc. na frente.

| Onde | Hoje | Depois |
|---|---|---|
| Abertura | 01 / O SEU MOMENTO GLOW | O SEU MOMENTO GLOW |
| Serviços | 02 / ESCOLHA O SEU CUIDADO | ESCOLHA O SEU CUIDADO |
| Resultados | 03 / RESULTADOS REAIS | RESULTADOS REAIS |
| Depoimentos | 04 / PALAVRAS DE QUEM VIVEU | PALAVRAS DE QUEM VIVEU |
| Perguntas | 05 / ANTES DO SEU GLOW | ANTES DO SEU GLOW |

Nada mais é mexido: títulos, textos, botões, cores, efeitos e o horário do carrinho ficam como estão.

## Como fica a verificação

Abrir a página e conferir que nenhum número aparece antes dos nomes das seções, e que os nomes continuam no mesmo lugar e com a mesma aparência.

## Detalhes técnicos

- `src/routes/index.tsx`: remover o prefixo `01 / `, `02 / ` e `05 / ` dos três `<p className="eyebrow">`.
- `src/components/glow/results.tsx`: remover o prefixo `03 / ` e `04 / ` dos dois rótulos `eyebrow`.
- Só o texto dos rótulos muda — nenhuma classe, estilo ou regra de negócio é tocada.
- Conferir no navegador (desktop e celular) que os cinco rótulos aparecem sem número e que a compilação continua sem erros.
