# E-Conner Website

This project is a Next.js 14 App Router site with server-side API routes backed by Prisma. For production, the app is configured for Vercel plus a managed PostgreSQL database.

## Production Stack

- Frontend: Next.js on Vercel
- Backend: Next.js App Router API routes on Vercel serverless functions
- Database: PostgreSQL via Prisma

Use a managed Postgres provider for production and future growth. Good options are Vercel Postgres, Neon, Supabase, or Railway Postgres.

## Environment Variables

Create a local `.env` or `.env.local` file from `.env.example`.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

You must also add the same `DATABASE_URL` value in the Vercel project settings for `Production`, and usually `Preview` too.

## Local Setup

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

If you change the Prisma schema during development, create a new migration locally and commit it:

```bash
npx prisma migrate dev --name your_change_name
```

## Deployment Workflow

The repository includes a Vercel-specific production build command that:

1. Generates the Prisma client
2. Applies committed Prisma migrations
3. Builds the Next.js app

That command is wired in `vercel.json`, so Vercel can deploy both the frontend and backend from the same project.

### First-time Vercel setup

```bash
npm install
npx vercel login
npx vercel link
```

Then set the environment variable in Vercel:

```bash
npx vercel env add DATABASE_URL production
npx vercel env add DATABASE_URL preview
```

### Deploy to production

```bash
npm run deploy:vercel
```

That helper script will:

1. Verify `DATABASE_URL` is available
2. Validate Prisma
3. Generate the Prisma client
4. Run a local production build
5. Trigger `vercel deploy --prod`

If you only want the local preflight checks without deploying, run:

```bash
node scripts/deploy-vercel.mjs --no-deploy
```

## Core Scripts

```bash
npm run dev
npm run build
npm run build:vercel
npm run db:generate
npm run db:migrate:deploy
npm run db:seed
npm run deploy:check
npm run deploy:vercel
```

## Scaling Notes

- Keep using managed PostgreSQL instead of file-based SQLite in production.
- Treat Prisma migrations as the single source of truth for schema changes.
- Add new backend features through App Router API routes or server actions and keep them on the Node.js runtime when they need database access.
- For heavy background work later, move long-running jobs to a queue or worker service instead of keeping them inside Vercel request handlers.
