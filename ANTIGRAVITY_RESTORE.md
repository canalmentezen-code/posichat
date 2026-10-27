# NÃO redesenhar tudo — voltar à forma do Muse

O dono enviou as capturas de localhost:5173 sem legenda para mostrar
isto: a versão do Antigravity MUDOU TUDO, já não está da mesma forma
que estava antes. Não foi só um detalhe. A página inicial, o lobby,
as salas e os personagens já não são os do Muse.

Isto é uma correção de direção, e tem prioridade sobre qualquer
melhoria nova.

## Regra principal

Não redesenhes o projeto. Volta à forma do Muse, descrita no
`ANTIGRAVITY_BRIEF.md` e no `ANTIGRAVITY_FIX.md`, e só depois faz
as correções pontuais abaixo. Se uma parte já estava boa no Muse,
não a mudes.

Mantém, exatamente como no Muse:
- Página inicial "Você não está só", com o Mural de Encontros
- Lobby original, com os cartões grandes e as ilustrações bonitinhas
- Salas temáticas, do Brasil por estado e de Portugal, como no Muse
- Ações sociais Mandar um Carinho, Oferecer um Café, Desejar um Dia
  Lindo e Abraço Coletivo, com balão na cena para todos verem
- Capacidade 25 por sala, balões privados com símbolo para quem está
  de fora, e o resto do comportamento já descrito no brief

## O que corrigir, e só isto

1. Salas em ecrã inteiro, sem as margens pretas que encolhem a sala
   nas capturas de localhost, como mostra
   `reference/REFERENCE_NEW_SCREENSHOTS.md`.
2. Personagens detalhados e com cara, parecidos com os dos cartões
   do lobby, não repetitivos, não minúsculos e não cortados, usando
   as fotografias de `reference/` só como referência de estilo.
   Não copies exatamente a arte do Habbo.
3. Mantém as tuas animações de autocarro e avião, que ficaram muito
   boas, com o avião sempre com o nariz e o cockpit para a frente.

## O que NÃO fazer

- Não mudar a página inicial, o lobby, o Mural, as cores roxo e
  preto-azulado, nem a estrutura das salas, só porque estás a
  corrigir os personagens.
- Não inventar salas novas, personagens novos sem referência, nem
  um desenho completamente diferente.
- Não mexer no login nem no `src/firebase.js`, que é só um modelo
  sem credenciais.

## Verificação final

Compara, lado a lado, com as capturas do Muse e com o brief: se a
página inicial, o lobby e as salas não voltaram à forma de antes,
com as correções acima, o trabalho não está pronto.
