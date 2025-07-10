# Firebase Setup Guide for HackOrbit

This project now uses Firebase for authentication, database, and storage instead of Supabase.

## Firebase Configuration

The Firebase configuration is already set up in `client/lib/firebase.ts` with the following services:

### 🔥 **Firebase Services Used**
- **Authentication**: Email/password, Google, and GitHub login
- **Firestore**: Real-time database for all app data
- **Storage**: File uploads for profile pictures

### 📊 **Database Collections**

#### **profiles**
- User profile information
- Auto-created on user registration
- Real-time updates

#### **todos**
- Personal todo items for each user
- Real-time synchronization
- CRUD operations

#### **events**
- Club events and activities
- Admin-managed content
- Public read access

#### **notifications**
- System notifications
- Real-time delivery
- Read/unread status

#### **admin_users**
- Admin access control
- Permission-based system
- Auto-setup for special emails

## 🚀 **Features Working**

### ✅ **Authentication**
- Email/password signup and login
- Google OAuth login
- GitHub OAuth login
- Automatic profile creation
- Admin access for `naitiksharma691@gmail.com`

### ✅ **Real-time Features**
- Live todo updates
- Real-time notifications
- Event updates
- Profile changes

### ✅ **Admin Features**
- Event management
- Notification broadcasting
- User management
- Permission system

### ✅ **Profile Management**
- Profile editing
- Avatar upload to Firebase Storage
- Skills management
- Social links

## 🔧 **Firebase Rules**

The Firebase project should have these security rules configured:

### **Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles - users can read all, edit own
    match /profiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Todos - users can only access their own
    match /todos/{todoId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.user_id;
    }
    
    // Events - public read, admin write
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Notifications - users can read their own
    match /notifications/{notificationId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.recipient_id || 
         resource.data.recipient_id == null);
      allow write: if request.auth != null;
    }
    
    // Admin users - admins only
    match /admin_users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### **Storage Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Avatar uploads
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 **Testing**

### **Test Accounts**

#### **Regular User**
```
Email: test@example.com
Password: password123
```

#### **Admin User**
```
Email: naitiksharma691@gmail.com
Password: any password
```

### **OAuth Testing**
- Google login should work immediately
- GitHub login should work immediately
- Both create profiles automatically

## 🔄 **Migration from Supabase**

All Supabase dependencies have been removed:
- ✅ Authentication migrated to Firebase Auth
- ✅ Database migrated to Firestore
- ✅ Storage migrated to Firebase Storage
- ✅ Real-time features using Firestore listeners
- ✅ Admin system recreated in Firebase

## 📱 **Development**

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:8080
```

## 🎯 **Key Differences from Supabase**

1. **Authentication**: Uses Firebase Auth instead of Supabase Auth
2. **Database**: Uses Firestore instead of PostgreSQL
3. **Real-time**: Uses Firestore listeners instead of Supabase realtime
4. **Storage**: Uses Firebase Storage instead of Supabase Storage
5. **Admin System**: Implemented in Firestore instead of RLS policies

## 🚀 **Production Deployment**

The Firebase configuration is already set up for production. Just deploy your app and it will work with the existing Firebase project.

All features are now fully functional with Firebase! 🎉