# Feixe de luz no bloco de categorias + onda no título "MONTE o seu ATENDIMENTO"

## Objetivo

Recriar, na seção de serviços da home, o efeito do componente de referência enviado:

1. **Feixe de luz (border beam)** — um brilho que percorre continuamente a borda de um quadro envolvendo as 4 categorias (Combos, Cabelo, Tratamentos, Unhas).
2. **Onda no texto** — o título "MONTE o seu ATENDIMENTO" fica levemente apagado e "acende" (varredura de gradiente claro) no momento em que o feixe passa por trás dele, sincronizado com o feixe.

Cores em tons do GLOW (branco sobre o fundo preto), sem laranja/roxo. O efeito de carrossel de logos do demo **não entra** — não há logos para exibir no site; apenas os dois efeitos acima.

## Como o efeito funciona

- O quadro das categorias recebe um contorno discreto (1px) e, por cima, um feixe luminoso que orbita o perímetro (mesma geometria do BorderBeam do Magic UI: começa no canto superior esquerdo, percorre no sentido horário, movimento linear).
- O título recebe um gradiente horizontal com faixa branca estreita (corte de fundo no texto). Um `useAnimationFrame` calcula a posição do feixe a cada quadro e desloca o `backgroundPosition` da faixa: antes de o feixe chegar, o título fica na cor base (cinza suave); enquanto o feixe cruza a faixa do topo alinhada ao título, a varredura branca atravessa o texto da esquerda para a direita; depois, volta a ficar apagado.
- Relógio compartilhado: componente e título derivam a posição do feixe do mesmo relógio de animação e da mesma duração (~8s), sem necessidade de estado compartilhado.
- `prefers-reduced-motion`: o feixe e a onda ficam estáticos (o site já usa `useReducedMotion`).

## Arquivos

- `src/components/glow/border-beam.tsx` (novo) — componente do feixe, adaptado da referência para `framer-motion` (já instalado; o demo usa `motion`, que é a mesma biblioteca — nenhuma dependência nova).
- `src/routes/index.tsx` (editar) — envolver a fileira de categorias (`.category-rail`) num quadro com contorno + feixe; aplicar a onda no título da seção 02, com a lógica de sincronização (mede retângulo do título e do quadro a cada quadro, como no demo).
- `src/styles.css` (editar) — estilos do quadro (`.beam-card`) e da onda (`.wave-text`), com as cores vindo das variáveis do tema (`--foreground` para o brilho, cor base mais suave para o texto em repouso). Ajustes de espaçamento no mobile (≤640px).

## Detalhes técnicos

- A onda usa `background-clip: text` / `-webkit-text-fill-color: transparent`, com gradiente de 250% de largura e faixa clara entre 47–53%, exatamente como na referência; as posições de "estacionamento" (0% / 100%) mostram só a cor base, sem tranco visual.
- O título permanece no lugar atual (acima do quadro); não há sobreposição de layout.
- No mobile a fileira de categorias continua rolando horizontalmente dentro do quadro; o feixe acompanha a borda do quadro, não o conteúdo rolado.
- Sem mudança de dados, rotas ou backend.

## Verificação

- Build sem erros.
- Screenshot Playwright da seção de serviços: quadro com feixe visível e onda no título durante a passagem.
- Checagem em viewport mobile (393px) para o quadro com rolagem horizontal.
