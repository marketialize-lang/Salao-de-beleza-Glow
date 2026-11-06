# Efeitos funcionando no iPhone

## O que eu encontrei

Testei o site num simulador com o mesmo motor do Safari do iPhone, na tela do 14 Pro Max:
- Os botões andam para o lado, o feixe de luz corre na borda, o título acende, as fotos do início trocam ao rolar e os depoimentos se desdobram. Ou seja, no simulador os efeitos rodam.
- Mesmo assim, há pontos que costumam falhar num iPhone de verdade e que explicam o que você viu:
  1. **Botões param depois de um toque.** No iPhone, depois que você toca num botão, o telefone age como se o dedo continuasse em cima dele. Como a fila foi feita para pausar nessa hora, ela fica parada.
  2. **A barra do Safari mexe no tamanho da tela.** Quando a barra de endereço some ou volta durante a rolagem, as seções que ficam paradas na tela (início, vídeos e depoimentos) mudam de tamanho no meio do caminho. Por isso elas pulam ou travam.
  3. **Vídeos.** O iPhone só deixa o vídeo tocar sozinho se ele estiver garantidamente sem som. Hoje isso não fica garantido. E com o Modo de Pouca Energia ligado, o iPhone não deixa nenhum vídeo tocar sozinho.
  4. **Depoimentos em 3D.** O Safari às vezes não corta direito as bordas arredondadas e pesa com tantas imagens inclinadas.
  5. **Brilho no título.** O jeito de pintar o texto precisa de ajustes próprios do Safari.
- Sobre "nada funcionou": o site ainda não foi publicado. No iPhone você pode ter aberto uma versão antiga ou a prévia dentro do app. Depois dos ajustes, o teste certo é no site publicado.

## O que vou fazer

1. **Botões para o lado (Monte o seu atendimento):** a fila passa a andar sem parar no iPhone. Ela pausa só enquanto o dedo estiver encostado e volta a andar ao soltar. Tocar continua escolhendo a categoria.
2. **Feixe de luz e brilho no título:** ajustes específicos do Safari para o brilho aparecer certinho no título inteiro, inclusive em "o seu".
3. **Rolagem do início, dos vídeos e dos depoimentos:** as seções passam a usar uma altura de tela fixa, que não muda quando a barra do Safari some ou aparece. Assim nada pula durante a rolagem.
4. **Vídeos:** ficam garantidamente sem som para tocar sozinhos. Se o iPhone bloquear (Pouca Energia), aparece a capa e um toque faz o vídeo tocar.
5. **Depoimentos:** bordas cortadas certinho no Safari, imagens carregando de forma mais leve e o efeito 3D mais estável.
6. **Reduzir Movimento:** como você escolheu, todos os efeitos aparecem mesmo para quem tem esse ajuste ligado.
7. Nada mais muda: textos, cores, preços e o layout continuam iguais.

## Como vou conferir

- Simulador do Safari do iPhone, nas telas do 14 Pro Max e dos Pro Max mais novos. Em cada efeito vou conferir que ele se mexe ao rolar ou sozinho, que os botões continuam andando depois de um toque e que nada pula.
- Também no computador, para garantir que nada piorou.
- Limite: aqui no simulador os vídeos não tocam, então a confirmação final dos vídeos precisa ser no seu iPhone, com o site publicado.

## Detalhes técnicos

- Marquee: `:hover`/`:focus-within` pause only under `@media (hover:hover)`. On touch, a class toggled on pointerdown/pointerup/pointercancel handles the pause. Add `translate3d`, `will-change`, `-webkit-mask-image`.
- Wave: `-webkit-background-clip:text` + `-webkit-text-fill-color:transparent` on `.wave-text *`, `-webkit-box-decoration-break:clone`, and the beam uses translate3d.
- Viewport: `dvh` → `svh` in hero-track/stage, result-pin and results height, unfurl sticky/frame (vh → svh). Results remeasures only when the width changes, ignoring height-only resizes from the iOS toolbar.
- Video: set `muted`/`defaultMuted` imperatively before `play()`, add the `webkit-playsinline` attribute, and fall back on a rejected promise.
- Unfurl: `isolation:isolate` + `translateZ(0)` on the rounded frame, `-webkit-transform-style`, and `decoding="async"` on the images.
- Remove the `useReducedMotion` gates and the `prefers-reduced-motion` CSS blocks (hero, marquee, beam, gallery, reveals). Save a memory rule that effects ignore reduced-motion.
