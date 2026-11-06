# Botões do rodapé: "Como chegar", WhatsApp e Instagram

## O que muda

Na seção "ENCONTRE A GLOW" (rodapé), os três itens de contato viram botões brancos no formato pílula, todos iguais:

- **Como chegar** — pílula branca com borda fina e sombra leve. Mantém o ícone de localização (pino) à esquerda e a seta à direita, para deixar claro que dá para apertar e ir.
- **WhatsApp** — mesma pílula branca, mas só com a logo do WhatsApp. O número sai do botão. O destino continua sendo a mesma conversa: quem aperta vai direto para o WhatsApp, sem precisar decorar o telefone.
- **Instagram** — hoje é só um texto com a logo. Vira a mesma pílula branca, com a logo e o @glowjulianamatos.

Endereço, horários, "Segunda-feira fechado", a frase do agendamento prévio, a logo grande e a linha de baixo do rodapé ficam exatamente como estão.

## Como vai ficar

```text
ENCONTRE A GLOW
R. Pedro Moreira, 200 - Vila Rio Branco...

( pino  COMO CHEGAR  -> )      <- pílula branca, borda fina

Terça a domingo · 09:00 às 22:00
Segunda-feira fechado.
Exclusivamente com agendamento prévio.

VAMOS CONVERSAR
(  logo WhatsApp  )            <- pílula branca, só a logo
(  logo  @glowjulianamatos )   <- pílula branca
```

## Detalhes técnicos

- `src/routes/index.tsx`, bloco `#contato > div:nth-of-type(1)`:
  - "Como chegar": trocar `variant="ghost"` por `variant="outline"` e a classe `mt-3 -ml-4` por uma classe única dos botões do rodapé (`footer-btn`), mantendo `MapPin`, o texto e `ArrowUpRight`.
  - WhatsApp: remover o texto `+55 15 99679-3100` de dentro do botão, deixando só o `WhatsAppIcon`. Como o botão passa a não ter texto, adicionar `aria-label="WhatsApp"` no link, para leitores de tela ainda anunciarem o que é. O `href` com `contacts.whatsapp` não muda.
  - Instagram: envolver o `<a>` solto num `Button asChild` com a mesma classe `footer-btn`, mantendo o ícone e o @handle.
- `src/styles.css`: a regra atual `.footer-grid .footer-wa` (linha 180) passa a ser uma regra compartilhada `.footer-btn`, aplicada aos três: fundo `var(--background)` (branco), borda `1px solid var(--border)`, sombra leve, altura e espaçamento iguais, e `hover` com a pílula subindo um pouco. O ponto decorativo que `.pill::before` desenha antes do texto é desligado nesses botões (hoje já é desligado só no do WhatsApp).
- Os três usam as mesmas classes, então se ficarem desalinhados ou com tamanhos diferentes, a correção é num lugar só.
- Nenhum texto de endereço, horário ou nota é editado; `src/data/glow.ts` fica intacto.

## Verificação

- Conferir que a compilação passa e que os testes de rotas continuam passando.
- Abrir o rodapé no tamanho de celular e no de computador, e confirmar: as três pílulas brancas alinhadas, o WhatsApp mostrando só a logo, o Instagram mostrando logo + @glowjulianamatos.
- Conferir que cada botão continua apontando para o lugar certo (mapa, conversa no WhatsApp, perfil do Instagram).
