import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_6ra1ztLgHmnTVGuQP7uwzqzGebCrRw0",
  authDomain: "hackorbit-8a3e4.firebaseapp.com",
  projectId: "hackorbit-8a3e4",
  storageBucket: "hackorbit-8a3e4.firebasestorage.app",
  messagingSenderId: "729997646460",
  appId: "1:729997646460:web:5c188f68b62a117d3d07f9",
  measurementId: "G-8P3XYQ3QKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Auth helpers
export const authHelpers = {
  // Sign up with email and password
  signUp: async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'profiles', user.uid), {
        id: user.uid,
        email: user.email,
        full_name: displayName || '',
        avatar_url: null,
        bio: '',
        username: '',
        phone: '',
        year: '',
        branch: '',
        roll_number: '',
        location: 'Kanpur, India',
        github_url: '',
        linkedin_url: '',
        website_url: '',
        skills: [],
        level: 'Beginner',
        points: 0,
        streak: 0,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Check if user should be admin
      if (user.email === 'naitiksharma691@gmail.com') {
        await setDoc(doc(db, 'admin_users', user.uid), {
          user_id: user.uid,
          email: user.email,
          role: 'super_admin',
          permissions: ['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage'],
          created_at: new Date()
        });
      }

      return { user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if profile exists, if not create it
      const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
      if (!profileDoc.exists()) {
        await setDoc(doc(db, 'profiles', user.uid), {
          id: user.uid,
          email: user.email,
          full_name: user.displayName || '',
          avatar_url: user.photoURL || null,
          bio: '',
          username: '',
          phone: '',
          year: '',
          branch: '',
          roll_number: '',
          location: 'Kanpur, India',
          github_url: '',
          linkedin_url: '',
          website_url: '',
          skills: [],
          level: 'Beginner',
          points: 0,
          streak: 0,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      return { user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  },

  // Sign in with GitHub
  signInWithGithub: async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      
      // Check if profile exists, if not create it
      const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
      if (!profileDoc.exists()) {
        await setDoc(doc(db, 'profiles', user.uid), {
          id: user.uid,
          email: user.email,
          full_name: user.displayName || '',
          avatar_url: user.photoURL || null,
          bio: '',
          username: '',
          phone: '',
          year: '',
          branch: '',
          roll_number: '',
          location: 'Kanpur, India',
          github_url: '',
          linkedin_url: '',
          website_url: '',
          skills: [],
          level: 'Beginner',
          points: 0,
          streak: 0,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      return { user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  }
};

// Database helpers
export const dbHelpers = {
  // Profiles
  profiles: {
    get: async (userId: string) => {
      try {
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
        } else {
          return { data: null, error: { message: 'Profile not found' } };
        }
      } catch (error: any) {
        return { data: null, error };
      }
    },

    update: async (userId: string, updates: any) => {
      try {
        const docRef = doc(db, 'profiles', userId);
        
        // Check if document exists first
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          // Create the document if it doesn't exist
          await setDoc(docRef, {
            id: userId,
            ...updates,
            created_at: new Date(),
            updated_at: new Date()
          });
        } else {
          // Update existing document
          await updateDoc(docRef, {
            ...updates,
            updated_at: new Date()
          });
        }
        
        const updatedDoc = await getDoc(docRef);
        return { data: { id: updatedDoc.id, ...updatedDoc.data() }, error: null };
      } catch (error: any) {
        console.error('Profile update error:', error);
        return { data: null, error };
      }
    },

    getAll: async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const profiles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return { data: profiles, error: null };
      } catch (error: any) {
        return { data: [], error };
      }
    }
  },

  // Todos
  todos: {
    getAll: async (userId: string) => {
      try {
        const q = query(
          collection(db, 'todos'),
          where('user_id', '==', userId),
          orderBy('created_at', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const todos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return { data: todos, error: null };
      } catch (error: any) {
        return { data: [], error };
      }
    },

    create: async (todo: any) => {
      try {
        const docRef = await addDoc(collection(db, 'todos'), {
          ...todo,
          created_at: new Date(),
          updated_at: new Date()
        });
        const newDoc = await getDoc(docRef);
        return { data: { id: newDoc.id, ...newDoc.data() }, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const docRef = doc(db, 'todos', id);
        await updateDoc(docRef, {
          ...updates,
          updated_at: new Date()
        });
        const updatedDoc = await getDoc(docRef);
        return { data: { id: updatedDoc.id, ...updatedDoc.data() }, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },

    delete: async (id: string) => {
      try {
        await deleteDoc(doc(db, 'todos', id));
        return { error: null };
      } catch (error: any) {
        return { error };
      }
    },

    subscribe: (userId: string, callback: (todos: any[]) => void) => {
      const q = query(
        collection(db, 'todos'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const todos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(todos);
      });
    }
  },

  // Events
  events: {
    getAll: async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return { data: events, error: null };
      } catch (error: any) {
        return { data: [], error };
      }
    },

    create: async (event: any) => {
      try {
        const docRef = await addDoc(collection(db, 'events'), {
          ...event,
          created_at: new Date(),
          updated_at: new Date()
        });
        const newDoc = await getDoc(docRef);
        return { data: { id: newDoc.id, ...newDoc.data() }, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const docRef = doc(db, 'events', id);
        await updateDoc(docRef, {
          ...updates,
          updated_at: new Date()
        });
        const updatedDoc = await getDoc(docRef);
        return { data: { id: updatedDoc.id, ...updatedDoc.data() }, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },

    delete: async (id: string) => {
      try {
        await deleteDoc(doc(db, 'events', id));
        return { error: null };
      } catch (error: any) {
        return { error };
      }
    }
  },

  // Notifications
  notifications: {
    getAll: async (userId: string) => {
      try {
        // Get user-specific notifications
        const userQuery = query(
          collection(db, 'notifications'),
          where('recipient_id', '==', userId),
          orderBy('created_at', 'desc')
        );
        
        // Get global notifications (recipient_id is null)
        const globalQuery = query(
          collection(db, 'notifications'),
          where('recipient_id', '==', null),
          orderBy('created_at', 'desc')
        );
        
        const [userSnapshot, globalSnapshot] = await Promise.all([
          getDocs(userQuery),
          getDocs(globalQuery)
        ]);
        
        const userNotifications = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const globalNotifications = globalSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Combine and sort by created_at
        const allNotifications = [...userNotifications, ...globalNotifications]
          .sort((a, b) => {
            const aTime = a.created_at?.toDate?.() || new Date(a.created_at);
            const bTime = b.created_at?.toDate?.() || new Date(b.created_at);
            return bTime.getTime() - aTime.getTime();
          });
        
        return { data: allNotifications, error: null };
      } catch (error: any) {
        console.error('Error fetching notifications:', error);
        return { data: [], error };
      }
    },

    subscribe: (userId: string, callback: (notifications: any[]) => void) => {
      // Subscribe to user-specific notifications
      const userQuery = query(
        collection(db, 'notifications'),
        where('recipient_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      // Subscribe to global notifications
      const globalQuery = query(
        collection(db, 'notifications'),
        where('recipient_id', '==', null),
        orderBy('created_at', 'desc')
      );
      
      let userNotifications: any[] = [];
      let globalNotifications: any[] = [];
      
      const updateCallback = () => {
        const allNotifications = [...userNotifications, ...globalNotifications]
          .sort((a, b) => {
            const aTime = a.created_at?.toDate?.() || new Date(a.created_at);
            const bTime = b.created_at?.toDate?.() || new Date(b.created_at);
            return bTime.getTime() - aTime.getTime();
          });
        callback(allNotifications);
      };
      
      const unsubscribeUser = onSnapshot(userQuery, (querySnapshot) => {
        userNotifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        updateCallback();
      });
      
      const unsubscribeGlobal = onSnapshot(globalQuery, (querySnapshot) => {
        globalNotifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        updateCallback();
      });
      
      // Return combined unsubscribe function
      return () => {
        unsubscribeUser();
        unsubscribeGlobal();
      };
    }
  },
        const querySnapshot = await getDocs(q);
        const notifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return { data: notifications, error: null };
      } catch (error: any) {
        return { data: [], error };
      }
    },

    create: async (notification: any) => {
      try {
        const docRef = await addDoc(collection(db, 'notifications'), {
          ...notification,
          created_at: new Date()
        });
        return { data: { id: docRef.id }, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const docRef = doc(db, 'notifications', id);
        await updateDoc(docRef, updates);
        return { error: null };
      } catch (error: any) {
        return { error };
      }
    },

    delete: async (id: string) => {
      try {
        await deleteDoc(doc(db, 'notifications', id));
        return { error: null };
      } catch (error: any) {
        return { error };
      }
    },

    subscribe: (userId: string, callback: (notifications: any[]) => void) => {
      const q = query(
        collection(db, 'notifications'),
        where('recipient_id', 'in', [userId, null]),
        orderBy('created_at', 'desc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const notifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(notifications);
      });
    }
  },

  // Admin
  admin: {
    isAdmin: async (userId: string) => {
      try {
        const docRef = doc(db, 'admin_users', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
      } catch (error) {
        return false;
      }
    },

    getAdminData: async (userId: string) => {
      try {
        const docRef = doc(db, 'admin_users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
        } else {
          return { data: null, error: { message: 'Admin data not found' } };
        }
      } catch (error: any) {
        return { data: null, error };
      }
    }
  }
};

// Storage helpers
export const storageHelpers = {
  uploadAvatar: async (userId: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatars/${userId}/avatar.${fileExt}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      throw error;
    }
  }
};

export default app;