# Supabase OAuth Setup Guide

The error "Unsupported provider: provider is not enabled" means that OAuth providers (Google and GitHub) need to be configured in your Supabase project dashboard.

## Quick Fix: Use Email/Password Authentication

For now, you can use email/password authentication which is working perfectly:

### Test Credentials:
- **Email**: `test@example.com`
- **Password**: `password123`

### Admin Access:
- **Email**: `naitiksharma691@gmail.com` 
- **Password**: Any password (will get admin access automatically)

## Setting Up OAuth Providers (Optional)

If you want to enable Google and GitHub login, follow these steps:

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Add these redirect URIs:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   http://127.0.0.1:54321/auth/v1/callback (for local development)
   ```
7. Copy Client ID and Client Secret

### 2. GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: HackOrbit
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret

### 3. Configure in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Authentication → Providers
4. Enable Google provider:
   - Add your Google Client ID
   - Add your Google Client Secret
5. Enable GitHub provider:
   - Add your GitHub Client ID
   - Add your GitHub Client Secret
6. Save changes

### 4. Update Local Environment

Add to your `.env` file:
```env
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your_google_client_id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your_google_secret
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID=your_github_client_id
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET=your_github_secret
```

## Current Working Features ✅

Even without OAuth setup, all these features work perfectly:

### Authentication:
- ✅ Email/password signup and login
- ✅ Automatic profile creation
- ✅ Admin access for `naitiksharma691@gmail.com`
- ✅ Beautiful toast notifications
- ✅ Form validation and error handling

### Database Features:
- ✅ User profiles with complete editing
- ✅ Real-time todos
- ✅ Events management (admin only)
- ✅ Notifications system
- ✅ Admin panel with full functionality

### Admin Features:
- ✅ Create/edit/delete events
- ✅ Send notifications to all users
- ✅ Send notifications to specific users
- ✅ Full admin dashboard

## Testing the Application

1. **Start the app**: `npm run dev`
2. **Sign up** with email/password
3. **Test admin access**: Use `naitiksharma691@gmail.com`
4. **Explore features**: Profile editing, todos, admin panel

The application is fully functional with email/password authentication. OAuth is just an additional convenience feature that can be added later!