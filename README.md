# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/153afdbe-684e-419e-a6e3-9aad59f987cf

## Environment Setup

The application requires an **OpenRouter API key** to enable AI features. Provide this key in a `.env` file using either of the following variables:

```bash
VITE_OPENROUTER_API_KEY=<your_api_key>
# or
OPENROUTER_API_KEY=<your_api_key>
```

The app will throw an error on startup if neither variable is defined. See `.env.example` for all available options.

## Deployment

For a quick review before merging to `main`, deploy the `staging` branch to Vercel.
When you're ready for production, deploy `main` to your production domain first,
then update the official domain's DNS.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/153afdbe-684e-419e-a6e3-9aad59f987cf) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment variables

Create a `.env` file in the project root and add your Supabase credentials:

```bash
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-anon-key>
```

These variables are required for the Supabase client in `src/integrations/supabase/client.ts`.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Environment configuration

1. Copy `.env.example` to `.env` and fill in the values:

   ```sh
   cp .env.example .env
   ```

   - `VITE_OPENROUTER_API_KEY` / `OPENROUTER_API_KEY` – OpenRouter API key
   - `VITE_TWELVEDATA_API_KEY` / `TWELVEDATA_API_KEY` – TwelveData API key
   - `VITE_SUPABASE_URL` / `SUPABASE_URL` – URL of your Supabase project
   - `VITE_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` – Supabase anon/public key

2. Add these environment variables to your deployment provider as well (Lovable → Project → Settings → Secrets).

### Connect to your Supabase project

Run the Supabase CLI to link your project (replace `<project-id>` with your Supabase project ref):

```sh
supabase link --project-ref <project-id>
```

The project ref is also stored in `supabase/config.toml`.

### Run database migrations

Use the Supabase CLI to apply migrations located in `supabase/migrations`:

```sh
supabase db push
```

This will run all SQL files against the linked Supabase database.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/153afdbe-684e-419e-a6e3-9aad59f987cf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes! After publishing the project you can point your own domain to it.

1. In the Lovable dashboard go to **Project → Settings → Domains** and click **Connect Domain**.
2. Enter the domain name you want to use.
3. Follow the displayed DNS instructions (usually adding a CNAME record) and wait for propagation.
4. Once the record is validated Lovable will issue an SSL certificate automatically.

See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide) for more details.
