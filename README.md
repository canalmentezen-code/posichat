# PosiChat

Private test chat community for people living with HIV: share ideas and
experiences, meet new people, flirt and develop affective relationships.
Tagline: "Você não está só".

This repository contains the original Vite + Firebase project, cleaned
version, plus a brief for Google Antigravity in `ANTIGRAVITY_BRIEF.md`
describing the improvements already made in the Muse prototype.

## Run locally

Requires Node.js.

```sh
npm install
npm run dev
```

Then open the address shown by Vite, normally `http://localhost:5173`.

## Firebase configuration — placeholder only

`src/firebase.js` in this repository is a placeholder template only. It
contains no credentials. Do not commit real credentials to this repository.
To run the original project with Firebase, restore your own original
`src/firebase.js` locally only, from your own Antigravity project folder.
Never share that file publicly.

## Images — not included in this push

The GitHub connector used for this push only handles UTF-8 text files, so
the JPG images are not in this commit. Before running the lobby with its
original illustrations, copy the images from the original project folder
into this repository, keeping the same paths:

- `public/hero-happy.jpg`
- `public/rooms/banner_global.jpg`
- `public/rooms/banner_paquera.jpg`
- `public/rooms/banner_cafe.jpg`
- `public/rooms/banner_vivencias.jpg`
- `public/rooms/banner_sp.jpg`
- `public/rooms/banner_rio.jpg`
- `public/rooms/art_bar.jpg`
- `public/rooms/art_friends.jpg`
- `public/rooms/art_sunset.jpg`

Other room illustrations from the original project live in its
`public/rooms/` folder. Do not commit `node_modules/` or `dist/`.

## Rooms

- Thematic rooms: Sala Geral — Ponto de Encontro, Paquera / Flerte &
  Afinidades, Papo do Dia a Dia, Vivências.
- Brazil: all states, with capitals and interior sub-rooms.
- Portugal: Lisboa, Norte, Sul, with sub-rooms.

Chat features in the original code: real-time messages, social actions
(Mandar um Carinho, Oferecer um Café, Desejar um Dia Lindo, Abraço
Coletivo), reactions, and whisper commands `/sussurro` / `/w`.

## Privacy

This is a private test prototype. Do not present it as a real multi-person
public chat, and do not publish other people's likenesses or credentials.
Entry in the Muse prototype is by nickname only, without Google login and
without reusing the original backend or credentials.
