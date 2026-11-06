# Galeria 3D "desdobrando" na seção de depoimentos

## O que você vai ver
Ao rolar até "QUEM JÁ PASSOU por aqui", a seção fica fixa na tela: um quadro arredondado cresce até ocupar a tela inteira e, dentro dele, 4 colunas inclinadas em 3D com os prints reais de depoimentos se "desdobram" e se endireitam enquanto as colunas deslizam em sentidos opostos (parallax). Ao terminar, a página segue normalmente.

- Imagens: os 5 depoimentos atuais (repetidos para preencher as colunas) — nada das fotos de exemplo do documento.
- Título "04 / PALAVRAS DE QUEM VIVEU — QUEM JÁ PASSOU por aqui." sobreposto no centro, com sombra escura nas bordas para leitura.
- Clicar em um print abre a versão ampliada (como hoje).
- Cores GLOW: preto e branco, borda branca sutil (sem o roxo do exemplo).
- Quem prefere menos movimento vê uma grade simples, sem animação.
- No celular: colunas mais estreitas e altura menor, mesmo efeito.

## Detalhes técnicos
- Novo `src/components/glow/unfurl-gallery.tsx`, adaptado do componente enviado: usa a rolagem da página (`useScroll({target})`, sem container com scroll próprio), seção `h-[400vh]` com `sticky` interno; mesmas transformações (largura/raio do quadro em 0–0.15, rotateX/Y/Z + z em 0.15–1, y das 4 colunas).
- `Feedbacks` em `results.tsx` passa a renderizar essa galeria, mantendo `id="depoimentos"` e o Dialog de zoom; setas/contador removidos (a rolagem substitui o carrossel).
- Cores via tokens do tema; sem nova dependência (framer-motion já existe); sem novo loop rAF.
