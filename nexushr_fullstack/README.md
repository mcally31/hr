# Nexus HR (Full Stack Demo)

This is a minimal full-stack Nexus HR starter built for you.

## Server

- Node + TypeScript + Express
- Simple in-memory auth and leave requests

### Run server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Server runs on http://localhost:4000

## Client

- React + Vite + Tailwind

### Run client

```bash
cd client
npm install
npm run dev
```

Client runs on http://localhost:5173 and proxies API calls to the server.