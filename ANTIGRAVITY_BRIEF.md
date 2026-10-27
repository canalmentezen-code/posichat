# Brief for Google Antigravity — PosiChat improvements to apply

Goal: take the original project in this repository and apply, in a
professional, well-drawn, non-superficial way, the improvements already
explored in the Muse prototype, and fix the one point that is still not
right: the in-room character.

Read this whole brief before changing code. Do not reintroduce Google
login or the original Firebase backend/credentials into the Muse-style
prototype flow unless the owner explicitly asks for it. The Firebase
configuration in `src/firebase.js` here is a placeholder only.

## 1. Lobby — keep the original form

- Centred header "Salas de Bate-Papo" with the subtitle about navigating
  rooms from all Brazilian states and capitals, plus Portugal (Lisboa,
  Norte and Sul), or choosing thematic rooms.
- Centred category pills on two lines on desktop: Todas as Salas,
  Estados do Brasil & Capitais, Portugal (Lisboa, Norte e Sul),
  Temáticas & Paquera.
- Centred rounded search, with the placeholder about searching by state,
  capital or theme (for example São Paulo, Rio, Lisboa, Porto, Curitiba).
- One single grid of large room cards, each with:
  - its original illustration on top (see README.md for the image paths
    to copy from the original project folder; the lobby illustrations
    are the cute, detailed cartoon scenes, not generic banners),
  - a badge in the top-right corner (Principal, Romance, Cotidiano,
    SP, RJ, and so on),
  - emoji and room name, description, and the footer
    "🌸 Comunidade Acolhedora · Entrar na Sala →".
- State and Portugal cards keep their sub-room buttons inside the card
  (capital and interior).
- Filters and search must work: "Temáticas & Paquera" reduces the grid
  to the thematic rooms, and searching "Minas Gerais" reduces it to the
  Minas Gerais card, whose "Belo Horizonte (Capital)" button opens the
  Minas Gerais room.

Do NOT add a "msgs" badge to cards. Do NOT use a rigid UOL-style list
lobby.

## 2. Rooms — Habbo-style, but with original art

- Inside a room: an isometric room, seen at an angle from above, with
  small characters standing in the room, furniture and objects, and
  speech bubbles over avatars.
- Do NOT copy Habbo characters, furniture or images. Use original art
  inspired by that style.
- Keep the state rooms, so people can filter by where others are from,
  and keep Portugal rooms.
- Room scenes already explored in Muse, to keep as reference:
  São Paulo with a glass wall and skyscrapers, Rio with a beach terrace,
  café, Paquera with candles, Vivências with a cushion circle, Lisboa
  with the yellow tram and the castle, Minas Gerais historic cities,
  Bahia Pelourinho and Elevador Lacerda, Paraná Jardim Botânico.
- The user moves inside the room: click on the floor with the mouse on
  a computer, drag with a finger on a phone, arrow keys also work.
- First for computer, but responsive from the start: it must scale from
  a small phone and a large phone such as a Samsung S23 Ultra, through
  a 14–15 inch notebook and 27 inch monitors, up to 4K/8K TV. At the end
  it should work as a mobile app with buttons.
- Purple and dark-blue-black palette. No generic "vibe coding" look:
  no coloured blobs, little stars or decorative gradients.

## 3. Characters — the point still to fix (most important)

The in-room character must be identical in style and detail to the cute
little characters in the lobby card illustrations, for example the pink
outfit with a flower on the belly. It must look like a real character
with a face, not a sketch and not a generic symbol card.

Requirements:
- Detailed, finished illustration, not an outline sketch: dark outline,
  full face with eyebrows, eyes with shine, nose, smile and rosy cheeks,
  voluminous wavy hair with light, clothing with collar and shading,
  and the avatar motif embroidered as a medallion on the belly.
  For Florescer: pink dress/tunic with a flower on the belly.
- The same illustrated style must carry across the 10 avatar identities:
  Luz, Amor, Esperança, Aconchego, Brilho, Paz, Florescer, Alegria,
  Recomeço, Fortaleza. Keep each identity's colours and motif, but give
  every character a real body: head, hair, face, torso, arms and legs.
- Idle sway when standing still, legs and arms moving when walking,
  arm raised waving during social actions.
- The character is the single most important visual to get right. Do not
  ship a sketch version and call it finished. Compare the in-room
  character side by side with the lobby card characters before finishing.

## 4. Speech bubbles and privacy

- Normal room messages appear in the history panel ("Conversa completa").
- In the scene, a bubble shows the last message only, with a maximum
  size and tap-to-expand, so the scene does not get polluted. The full
  conversation stays in the history panel. This is a known open point:
  the owner originally asked for a bubble large enough for the whole
  conversation; the last-message-plus-panel compromise was proposed to
  avoid polluting the scene and has not yet been finally confirmed.
- Private conversations: outsiders see only a symbol (💬, or 🔒 for a
  private conversation), never the text. Only the two people in the
  conversation see the bubble text. A third person can ask to join;
  once accepted, all three see the conversation.
- Whisper commands `/sussurro` / `/w` stay private, with a dashed
  private balloon.

## 5. Social actions — visible in the scene, 3–4 seconds

Actions: Mandar um Carinho, Oferecer um Café, Desejar um Dia Lindo,
Abraço Coletivo, Bom Dia.

- When clicked, the action must rise as a large purple bubble in the
  room scene, visible to everyone in the room, with floating emojis,
  AND be recorded in the conversation panel. It must not appear only
  in the right-hand panel.
- The waving animation lasts about 3.5 seconds (3–4 seconds total),
  then the bubble collapses to a symbol. Do not let it run much longer.
- The room scene must be deeper 2.5D, not heavy full 3D: soft parallax
  with the mouse, depth vignette, a rug on the floor, and foreground
  furniture (sofa, plant) in front of characters walking behind it.

## 6. Room capacity

- Capacity is 25 people per room by default.
- Show it in the room, for example "n/25 na sala", with 24 floor places
  plus the user's character, and show the limit in the lobby.
- Real enforcement at entry only matters with a real multi-user
  backend. Recommended backend for a future multi-user version:
  PostgreSQL, preferably with Supabase, for users, rooms, messages and
  moderation, with real-time features. Firebase is fastest for a
  prototype but costs more as it scales and makes moderation and
  complex queries harder. MySQL is solid but less good than PostgreSQL
  for varied queries. Firebird is not recommended for a new web app.

## 7. Room-change travel animations — detailed, slower, correct direction

Do not use a 2-second sketch. Travel animations last about 4.6 seconds,
are simple but well drawn and detailed, with a real background.

- Within the same state/region (for example Rio de Janeiro (Capital)
  to Niterói): a purple bus travelling through a city, with a
  two-layer background — far tower silhouettes plus near buildings with
  lit-window grids, antennas with red beacons, street lamps and a road
  with moving dashes. The bus enters front-first, windshield and
  headlights leading, with passenger silhouettes and the user's avatar
  at a window. Show the route caption, for example
  "Rio de Janeiro (Capital) → Niterói, Baixada & Região dos Lagos".
- To another state/region (for example Niterói to São Paulo (Capital)):
  a complete airport — terminal with lit facade and doors, control
  tower, jet bridge, parked tail, city silhouette, runway with green
  edge lights — and a plane that rolls on the runway, lifts its nose
  and takes off pointing FORWARD, nose and cockpit in the direction
  of travel, tail behind. Never fly the plane backwards. Show the route
  caption. Only arrive in the destination room after the full animation.
- Keep the travel animations professional and finished, not sketches.

## 8. Scroll and rendering quality

- The main page scrollbar must be visible (purple), room and
  conversation panels must have their own thin visible scrollbar, and
  the conversation panel must not drag the whole page when it updates.
- Do not stretch small images large: that makes them pixelated and
  blocky. Use scenes at a large native resolution and show them below
  that resolution, so pixel art stays crisp.
- Desktop and mobile must both pass with no console errors, no broken
  images and no overflow at 390px width.

## 9. What to verify before finishing

- Lobby first row matches the original screenshot: Sala Geral café
  with characters and speech balloons, Paquera dancing couple, Papo
  Leve people at a café table.
- Search "Minas Gerais" isolates the Minas Gerais card; "Belo Horizonte
  (Capital)" opens the Minas Gerais room.
- In-room character, side by side with a lobby card character, looks
  like the same character family, detailed and finished.
- Offer a coffee: waving lasts about 3.5 seconds, purple bubble in the
  scene, then collapses to a symbol, text stays in the panel.
- Room change within a state shows the bus, slower, through a city;
  room change to another state shows the airport and a plane flying
  forward, never backwards; arrival only after the full animation.
- No console errors, no broken images, no mobile overflow.
