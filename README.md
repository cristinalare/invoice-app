# Invoice App

Full-stack invoice app

## Structure
- `/client` - React frontend (Vite + TypeScript)
- `/server` - NestJS backend + PostgreSQL

## Quick Setup

1. Setup backend:
```bash
cd server
docker-compose up -d
cp .env.example .env
npm install
npx prisma migrate dev
npm run seed
npm run start:dev
```

3. Setup frontend (new terminal):
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3000

Test login: johndoe@gmail.com / postgres

Each folder has its own README with more details.