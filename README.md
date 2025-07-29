# Socket.IO Chat App

A real-time chat application built with Next.js, React, and Socket.IO.

## Features

- Join or create chat rooms with a custom name
- Real-time messaging with instant updates
- System messages when users join rooms
- Simple, modern UI with React and Tailwind CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Build the server

```bash
npm run build:socket
```

### 3. Start the Socket.IO server

```bash
npm run start:socket
```

The server will run on [http://localhost:3000](http://localhost:3000).

### 4. Start the Next.js frontend (in a separate terminal)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter your name and a room name to join or create a chat room.
- Send messages in real time with other users in the same room.
- System messages notify when users join a room.

## Project Structure

- `server.mts` — Socket.IO + Next.js custom server (TypeScript)
- `app/` — Next.js app directory (frontend)
- `components/` — React UI components (chat forms, messages, etc.)
- `lib/socketClient.tsx` — Socket.IO client setup for the frontend

## Scripts

- `npm run dev` — Start Next.js frontend in development mode
- `npm run build:socket` — Build the TypeScript server
- `npm run start:socket` — Start the compiled Socket.IO server

## Dependencies

- Next.js
- React
- Socket.IO
- TypeScript
- Tailwind CSS

---

Feel free to customize and extend this app for your own use!
