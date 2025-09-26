# Invoice Management App

## Quick Start
1. `cp .env.example .env`
2. `npm install`
3. `npm run dev`

## Tech Stack
- **React 19** with TypeScript
- **Vite** for development and building
- **Redux Toolkit** for client state management
- **TanStack Query (React Query)** for server state management
- **Axios** for API requests
- **Zod** for validation and type safety
- **Tailwind CSS + shadcn/ui** for styling
- **React Router** for navigation

## Features
- Secure authentication with cookie-based sessions
- Invoice list with pagination
- Detailed invoice modal view
- Form validation with Zod
- UI with shadcn/ui components

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── Header.tsx      # App header with auth
├── features/           # Redux slices
│   └── auth/           # Authentication state
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── schemas/            # Zod validation schemas
└── services/           # API service layer
```


## Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```