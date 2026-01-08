# Vercel Deployment Guide: The C1rcle Monorepo

Follow these steps to deploy the three applications to Vercel. Each application will be a separate project on Vercel, all linked to the same repository.

## Prerequisites
- A Vercel account.
- Your repository pushed to GitHub/GitLab/Bitbucket.

## Deployment Steps

Repeat these steps for **each** of the following apps:
1.  **Guest Portal** (`apps/guest-portal`)
2.  **Partner Dashboard** (`apps/partner-dashboard`)
3.  **Admin Console** (`apps/admin-console`)

### 1. Create a New Project on Vercel
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** > **Project**.
3.  Import your repository.

### 2. Configure Project Settings
- **Project Name**: Give it a name like `c1rcle-guest-portal`, `c1rcle-partner-dashboard`, etc.
- **Framework Preset**: Select **Next.js**.
- **Root Directory**: Click **Edit** and select the folder for the app (e.g., `apps/guest-portal`). 
    - *Note: Leave "Include source files outside of the Root Directory in the Build Step" Checked (Standard for Turborepo).*

### 3. Environment Variables
Add the required environment variables. Since these apps use Firebase, you will likely need:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

> [!TIP]
> You can copy these from your local `.env` or `.env.local` files if you have them.

### 4. Build and Development Settings
- **Build Command**: Leave as default (`next build`). Vercel will automatically detect the Turborepo and use `turbo build --filter=...` if configured correctly, but `next build` inside the root directory also works.
- **Install Command**: Leave as default.

### 5. Ignored Build Step (Optimization)
To avoid unnecessary builds when only other apps change:
1.  Go to **Settings** > **Git**.
2.  Scroll to **Ignored Build Step**.
3.  Set the command to:
    ```bash
    ../../scripts/vercel-ignore-build-step.sh @c1rcle/guest-portal
    ```
    *(Replace `@c1rcle/guest-portal` with the appropriate package name for each app).*

## Troubleshooting
- **Build Failures**: If the build fails due to missing dependencies, ensure that all `packages/*` are correctly listed in the root `package.json` workspaces.
- **Firebase Issues**: Ensure all Firebase rules are deployed if you are using Firestore or Storage.
