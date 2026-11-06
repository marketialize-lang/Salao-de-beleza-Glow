# Desfazer a última mudança e só tirar a espera depois do último vídeo

## O que muda
- A seção "O TRABALHO de perto" volta exatamente como estava antes da minha última mudança: mesma altura, mesmos vídeos, sem sumir nem desfocar e sem o trecho preto. A parte do café com pão de queijo e uva volta ao normal, sem nada por cima e sem ficar colada na seção anterior.
- A única mudança: assim que o último vídeo chega ao lugar, a página já segue para a seção do café, sem a rolagem "morta" de antes.
- Nenhuma outra seção muda.

## Detalhes técnicos (`results.tsx`)
- Restaurar o arquivo para a versão anterior ao último commit: `PIN=1`, troca de vídeos entre 2% e 96%, saída original e `Feedbacks` sem alterações.
- Ajuste único: a troca de vídeos passa a ir até 100% da rolagem, para que o último encaixe aconteça perto do fim. A saída curta de 96% a 100% fica igual, com escala .97 e opacidade 1.
- Testar no tamanho de celular, conferindo a passagem para a seção do café.
