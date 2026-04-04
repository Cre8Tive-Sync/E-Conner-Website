This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Prisma Schema & Local DB (for collaborators)**

- **Overview:** this repo uses Prisma 7 and a local Prisma dev server for development. The Prisma schema is in `prisma/schema.prisma` and the generated client is placed at `lib/generated/prisma`.

- **Prerequisites:** Node.js (>=18), npm/yarn/pnpm, and Git. No external Postgres is required if you use the local Prisma dev server.

- **Install dependencies:**

	```bash
	npm install
	# or pnpm install, yarn
	```

- **Environment:** create a `.env` file in the repository root containing `DATABASE_URL`. You can leave the value blank for now — when using `prisma dev` the dev server prints a direct `postgres://` URL you can copy into `.env`.

	Example `.env` (temporary when using `prisma dev`):

	```env
	# Replace with the postgres:// URL printed by `npx prisma dev`
	DATABASE_URL="postgres://postgres:postgres@localhost:51213/template1?sslmode=disable"
	```

- **Recommended workflow (local dev server):**

	1. Start the local Prisma dev server:

		 ```bash
		 npx prisma dev
		 ```

		 The command prints direct `postgres://` connection strings (use the `DATABASE_URL` it shows).

	2. (Optional) Copy the printed direct `postgres://` URL into your `.env` as `DATABASE_URL` so other Prisma commands pick it up.

	3. Push the schema to the database and generate the client:

		 ```bash
		 npx prisma db push
		 npx prisma generate
		 ```

	4. Open Prisma Studio to inspect tables and rows:

		 ```bash
		 npx prisma studio
		 ```

		 If Studio complains about Accelerate (`prisma://` or `prisma+postgres://`) use the direct `postgres://` URL (either via `--url` or set in `.env`). Example:

		 ```bash
		 npx prisma studio --url "postgres://postgres:postgres@localhost:51213/template1?sslmode=disable"
		 ```

- **Using a remote Postgres (Cloud/Container):** set `DATABASE_URL` in `.env` to a reachable Postgres URL (format `postgresql://user:pass@host:5432/dbname` or `postgres://...`) and run the same `db push`/`generate`/`studio` commands. You do not need `npx prisma dev` for remote DBs.

- **Common errors & fixes:**
	- P1012: connection URLs must not be placed inside `prisma/schema.prisma` in Prisma 7. Keep connection strings in `prisma.config.ts` or `.env` and remove `url = env("DATABASE_URL")` from the schema.
	- P1001: connection refused — ensure the host/port in `DATABASE_URL` is reachable; start `npx prisma dev` or a Postgres server, or point `DATABASE_URL` to a running DB.
	- Studio: if you see "no longer supports Accelerate URLs", launch Studio with a direct `postgres://` URL as shown above.

- **Useful commands:**

	```bash
	# Start local dev server
	npx prisma dev

	# Push schema, generate client
	npx prisma db push
	npx prisma generate

	# Open Studio
	npx prisma studio
	```

If you want, I can add a short CONTRIBUTING.md with these steps and troubleshooting tips as well.
