# Correção para o Antigravity — juntar o melhor do Muse com o melhor do Antigravity

Lê primeiro o `ANTIGRAVITY_BRIEF.md` e este ficheiro, antes de mexer em
código. O dono já testou as duas versões e o veredicto foi claro:

- **Antigravity ficou melhor nas animações de viagem:** o autocarro a
  transportar para outra cidade e o avião a descolar ficaram muito
  melhores do que na versão do Muse. **Mantém essas animações.**
- **Antigravity ficou mau nas salas e nos personagens:** as salas
  ficaram muito pequenas e não têm nada a ver com as salas do Muse, e
  os personagens não têm nada a ver com os personagens que o Muse
  tinha criado. **Descarta as salas e os personagens do Antigravity.**

## O que manter do Muse, sem encolher

- Salas em ecrã inteiro, como no protótipo do Muse, nunca salas
  pequenas. A sala isométrica, vista de cima em ângulo, com personagens
  em pé lá dentro, móveis e objetos, tem de ocupar a cena toda.
- Lobby original com os cartões grandes e as ilustrações bonitinhas,
  como descrito no `ANTIGRAVITY_BRIEF.md`.
- Cores roxo e preto-azulado, capacidade de 25 por sala, balões
  privados com símbolo para quem está de fora, ações sociais com balão
  na cena para todos verem, durante cerca de 3,5 segundos.
- Movimento do personagem com o rato no computador e com o dedo no
  telemóvel, desenho responsivo do telefone pequeno até TV 4K/8K.

## Personagens — usar as fotografias como referência

O dono vai colocar nesta pasta, em `reference/`, as fotografias e
capturas de ecrã que ele próprio tirou e enviou no chat do Muse:
a captura de referência estilo Habbo e as capturas do lobby e das
salas do Muse, com os bonequinhos dos cartões.

Usa essas fotografias **apenas como referência visual** para desenhar
personagens parecidos, no mesmo estilo: bonequinhos fofos, com cara,
cabelo, roupa detalhada, por exemplo a roupinha rosa com a flor na
barriga, e o mesmo tipo de proporção e de desenho dos cartões.

Não copies exatamente os personagens, móveis ou imagens do Habbo.
Personagens parecidos, no mesmo estilo, são aceitáveis; uma cópia
exata dos bens do Habbo não é, e pode dar problema. Os personagens
do Habbo não têm uma identidade padronizada única que impeça um estilo
parecido, mas a arte deles é deles — inspira-te no estilo, desenha
arte original.

Se a pasta `reference/` estiver vazia, pede ao dono para carregar as
fotografias antes de redesenhar os personagens. Não inventes
personagens novos sem essa referência.

## Animações de viagem — manter as do Antigravity

- Dentro do mesmo estado/região: autocarro a viajar na cidade, com
  cenário detalhado ao fundo, cidades, torres e prédios, simples mas
  bem feito, nunca só um esboço, e sem passar demasiado rápido.
- Para outro estado/região: aeroporto completo e avião a descolar
  a apontar para a frente, nariz e cockpit no sentido do voo, nunca
  para trás.
- As viagens duram o tempo suficiente para se verem, cerca de 4,6
  segundos, e só se chega à sala de destino depois da animação completa.

## Verificação antes de entregar

- As salas voltaram ao tamanho inteiro do Muse, não ficaram pequenas.
- Os personagens parecem os dos cartões do Muse, detalhados e com
  cara, não esboços e não os personagens do Antigravity.
- O autocarro e o avião mantêm a qualidade das animações do
  Antigravity, com o avião sempre para a frente.
- Sem erros de consola, sem imagens partidas, sem overflow no telemóvel.
- Não repor login Google/e-mail nem credenciais do projeto original:
  o `src/firebase.js` aqui é só um modelo, sem credenciais.
