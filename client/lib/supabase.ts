import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  // Sign in with OAuth provider
  signInWithProvider: async (provider: 'github' | 'google') => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get current session
  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}

// Database helpers
export const db = {
  // Profiles
  profiles: {
    get: async (userId: string) => {
      return await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    },

    update: async (userId: string, updates: any) => {
      return await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
    },

    getAll: async () => {
      return await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false })
    }
  },

  // Todos
  todos: {
    getAll: async (userId: string) => {
      return await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    },

    create: async (todo: any) => {
      return await supabase
        .from('todos')
        .insert(todo)
        .select()
        .single()
    },

    update: async (id: string, updates: any) => {
      return await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    },

    delete: async (id: string) => {
      return await supabase
        .from('todos')
        .delete()
        .eq('id', id)
    }
  },

  // Events
  events: {
    getAll: async () => {
      return await supabase
        .from('events')
        .select(`
          *,
          organizer:organizer_id(full_name, username),
          registrations:event_registrations(count)
        `)
        .order('date', { ascending: true })
    },

    getById: async (id: string) => {
      return await supabase
        .from('events')
        .select(`
          *,
          organizer:organizer_id(full_name, username),
          registrations:event_registrations(user_id, registered_at, user:user_id(full_name, username))
        `)
        .eq('id', id)
        .single()
    },

    create: async (event: any) => {
      return await supabase
        .from('events')
        .insert(event)
        .select()
        .single()
    },

    update: async (id: string, updates: any) => {
      return await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    },

    delete: async (id: string) => {
      return await supabase
        .from('events')
        .delete()
        .eq('id', id)
    },

    register: async (eventId: string, userId: string) => {
      return await supabase
        .from('event_registrations')
        .insert({ event_id: eventId, user_id: userId })
        .select()
        .single()
    },

    unregister: async (eventId: string, userId: string) => {
      return await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', userId)
    }
  },

  // Projects
  projects: {
    getAll: async () => {
      return await supabase
        .from('projects')
        .select(`
          *,
          user:user_id(full_name, username, avatar_url)
        `)
        .order('created_at', { ascending: false })
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    },

    create: async (project: any) => {
      return await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()
    },

    update: async (id: string, updates: any) => {
      return await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    },

    delete: async (id: string) => {
      return await supabase
        .from('projects')
        .delete()
        .eq('id', id)
    }
  },

  // Achievements
  achievements: {
    getByUser: async (userId: string) => {
      return await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false })
    },

    create: async (achievement: any) => {
      return await supabase
        .from('achievements')
        .insert(achievement)
        .select()
        .single()
    }
  }
}

// Storage helpers
export const storage = {
  // Upload avatar
  uploadAvatar: async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/avatar.${fileExt}`

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    return publicUrl
  },

  // Upload event image
  uploadEventImage: async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(fileName)

    return publicUrl
  },

  // Delete file
  deleteFile: async (bucket: string, path: string) => {
    return await supabase.storage
      .from(bucket)
      .remove([path])
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to todos changes
  subscribeTodos: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('todos')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to events changes
  subscribeEvents: (callback: (payload: any) => void) => {
    return supabase
      .channel('events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to profile changes
  subscribeProfile: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('profile')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to notifications
  subscribeNotifications: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}