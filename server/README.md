# Invoice Management API

  ## Quick Start
  1. `docker-compose up -d`
  2. `cp .env.example .env`
  3. `npm install`
  4. `npx prisma migrate dev`
  5. `npm run seed`
  6. `npm run start:dev`

  ## Test Login Credentials
  - **Email**: johndoe@gmail.com  
  - **Password**: postgres

  ## API Endpoints
  - POST /api/auth/login - User authentication
  - GET /api/invoices?page=1&size=10 - List invoices (paginated)
  - GET /api/invoices/:id - Get specific invoice
  - 


