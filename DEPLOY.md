# Deploy Guide - Backroad Adventures

This guide walks you through deploying the Backroad Adventures app to Vercel.

## Prerequisites

- GitHub account
- GitHub repository with the code: https://github.com/rdwoody/backroad-adventures

---

## Option 1: Quick Deploy (Recommended)

### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import the Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. Under "Import Git Repository", search for `backroad-adventures`
3. Click **"Import"** on the `rdwoody/backroad-adventures` repo

### Step 3: Configure Project

1. **Project Name**: `backroad-adventures` (or your preferred name)
2. **Framework Preset**: Should auto-detect **Next.js** ✓
3. **Build Command**: Leave as `npm run build`
4. **Output Directory**: Leave as `.next`

### Step 4: Add Environment Variables (Optional)

Click **"Environment Variables"** and add:

| Variable | Value | Required? |
|----------|-------|-----------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Your Mapbox token | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase key | No |

> **Note:** The app works with mock data without these variables!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait ~1-2 minutes for the build
3. You'll get a live URL like `https://backroad-adventures.vercel.app`

**That's it!** 🎉 Your site is live!

---

## Option 2: Deploy from CLI

If you prefer the command line:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd backroad-adventures
vercel
```

Follow the prompts - it'll walk you through the same config steps.

---

## Updating Your Live Site

Any time you push changes to GitHub, Vercel automatically redeploys!

```bash
# Make changes, then:
cd backroad-adventures
git add -A
git commit -m "Your changes"
git push origin main
```

---

## Adding Mapbox (Optional)

To enable the interactive map:

1. Go to [mapbox.com](https://mapbox.com)
2. Sign up / Sign in
3. Go to **Account** → **Tokens**
4. Copy your **Default Public Token**
5. In Vercel: **Settings** → **Environment Variables**
6. Add: `NEXT_PUBLIC_MAPBOX_TOKEN` = your token
7. Redeploy (or flip the variable's "Automatic" toggle)

---

## Adding Supabase (Optional)

To add a real database and user auth:

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** → Sign in with GitHub
3. Click **"New project"**
4. Fill in:
   - Organization: (your GitHub org or personal)
   - Name: `backroad-adventures`
   - Database password: (choose a strong password, save it!)
   - Region: `US East` (or closest to you)
5. Click **"Create new project"**
6. Wait 2-3 minutes for it to provision

### Step 2: Get Credentials

1. In Supabase dashboard, click **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** (something like `https://xyzabc.supabase.co`)
   - **anon public** key (under "Project API keys")

### Step 3: Set Up Database

1. Go to **SQL Editor** in Supabase
2. Copy the schema from `docs/supabase-schema.sql` (we'll create this)
3. Click **"Run"**

### Step 4: Add Variables to Vercel

In Vercel, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key |

---

## Custom Domain (Optional)

Want your own domain (e.g., `backroad.adventures`)?

1. In Vercel: **Settings** → **Domains**
2. Enter your domain
3. Follow the DNS instructions they give you
4. Wait for propagation (usually minutes to hours)

---

## Troubleshooting

### Build Fails

- Check the build log in Vercel dashboard
- Common issues: missing dependencies → try `npm install` locally first

### Map Shows "Configure Mapbox token"

- That's expected without a token - it'll show place names only
- Add token per the "Adding Mapbox" section above

### 500 Error on Page Load

- Check Vercel function logs in **Functions** → **Logs**
- Usually missing env vars - add them or remove the references

---

## Next Steps After Deploy

1. **Share the URL** with friends/family!
2. **Start adding places** - visit the `/admin` page
3. **Get video content** - film your antique store visits
4. **Consider paid features** later: Stripe for featured listings

---

## Need Help?

- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Open an issue on GitHub: https://github.com/rdwoody/backroad-adventures/issues