# Supabase Setup Guide for HackOrbit

This guide will help you set up Supabase for the HackOrbit project with authentication, database, and storage.

## Prerequisites

1. Install Supabase CLI:
```bash
npm install -g @supabase/cli
```

2. Create a Supabase account at [supabase.com](https://supabase.com)

## Local Development Setup

### 1. Initialize Supabase Project

```bash
# Initialize Supabase in your project
supabase init

# Start local Supabase services
supabase start
```

This will start:
- PostgreSQL Database on `localhost:54322`
- API Gateway on `localhost:54321`
- Supabase Studio on `localhost:54323`
- Inbucket (Email testing) on `localhost:54324`

### 2. Apply Database Migrations

```bash
# Apply the initial schema migration
supabase db reset

# Or apply migrations individually
supabase migration up
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

For local development, use these values (from `supabase start` output):
```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your_local_anon_key
```

## Production Setup

### 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization and fill in project details
4. Wait for the project to be created

### 2. Link Local Project to Remote

```bash
# Link your local project to the remote Supabase project
supabase link --project-ref your-project-ref

# Push local migrations to remote database
supabase db push
```

### 3. Configure Authentication Providers

#### GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create a new OAuth App with:
   - Application name: `HackOrbit`
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`

3. In Supabase Dashboard → Authentication → Providers:
   - Enable GitHub provider
   - Add your GitHub Client ID and Client Secret

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Authorized redirect URIs: `https://your-project-ref.supabase.co/auth/v1/callback`

5. In Supabase Dashboard → Authentication → Providers:
   - Enable Google provider
   - Add your Google Client ID and Client Secret

### 4. Configure Storage

Storage buckets are automatically created via migrations, but you can also create them manually:

1. Go to Supabase Dashboard → Storage
2. Buckets `avatars` and `event-images` should already exist
3. Verify the RLS policies are in place

### 5. Deploy Edge Functions (Optional)

```bash
# Deploy the create-sample-data function
supabase functions deploy create-sample-data

# Deploy all functions
supabase functions deploy
```

## Environment Variables for Production

Update your production environment variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key

# OAuth secrets (set in Supabase Dashboard)
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID=your_github_client_id
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET=your_github_secret
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your_google_client_id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your_google_secret
```

## Useful Commands

```bash
# Generate TypeScript types from your database
supabase gen types typescript --local > client/lib/database.types.ts

# Create a new migration
supabase migration new migration_name

# Reset local database
supabase db reset

# View logs
supabase logs

# Stop local services
supabase stop
```

## Security Best Practices

### 1. Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Public read access for events and profiles
- Authenticated users can create events and projects

### 2. Environment Variables

- Never commit secrets to version control
- Use environment variables for all sensitive data
- The anon key is safe to use in frontend code
- Keep the service role key secret and server-side only

### 3. Storage Security

- File uploads are restricted by user authentication
- File size limits are enforced (50MB max)
- Only image files allowed for avatars
- Public read access for uploaded files

## Testing

### 1. Test Authentication

```bash
# Test email signup
curl -X POST 'http://localhost:54321/auth/v1/signup' \
-H "apikey: your_anon_key" \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123"
}'
```

### 2. Test Database Access

```bash
# Test getting profiles
curl 'http://localhost:54321/rest/v1/profiles' \
-H "apikey: your_anon_key" \
-H "Authorization: Bearer your_access_token"
```

### 3. Test Storage

Upload a file through the Supabase Studio interface or use the frontend components.

## Troubleshooting

### Common Issues

1. **Migration errors**: Check PostgreSQL logs with `supabase logs`
2. **Auth not working**: Verify environment variables and OAuth configuration
3. **RLS blocking queries**: Check policies in Supabase Studio
4. **Storage upload fails**: Verify bucket policies and file size limits

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Next Steps

1. Integrate the authentication components into your existing pages
2. Replace the existing Firebase configuration with Supabase
3. Update the existing components to use the new Supabase hooks
4. Test all functionality thoroughly
5. Deploy to production

The setup provides a complete backend with:
- ✅ Email/password authentication
- ✅ Social login (GitHub, Google)
- ✅ Real-time database updates
- ✅ File storage with image uploads
- ✅ Row-level security
- ✅ TypeScript support
- ✅ Sample data and edge functions