# Passagem mais rápida de "Resultados" para "Depoimentos"

## O que muda
- A seção "O TRABALHO de perto" fica presa na tela por menos tempo. Os vídeos passam com menos rolagem.
- Quando o penúltimo vídeo chega ao centro, a seção começa a sair: encolhe um pouco, sobe e escurece até sumir. Ao mesmo tempo, o quadro de "QUEM JÁ PASSOU por aqui" já aparece por baixo, sem um trecho vazio entre as duas.
- O resto da página não muda.

## Detalhes técnicos (`results.tsx`)
- O `PIN` cai de 1 para cerca de 0.6, o que reduz a altura da seção.
- A troca de vídeos acontece entre 2% e 82% da rolagem, no lugar de 2% a 96%.
- A saída usa a faixa de 82% a 100%: escala 1 → 0.9, y 0 → -60, opacidade 1 → 0 e um leve desfoque, tudo com as transformações do framer-motion que já existem.
- `Feedbacks` ganha uma margem negativa no topo (cerca de -40vh, só com animação ligada) para que a galeria entre durante essa saída.
- Com "reduzir movimento" ligado, nada muda.
