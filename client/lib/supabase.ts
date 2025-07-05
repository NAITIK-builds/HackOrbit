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
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {}
        }
      })
      return result
    } catch (error) {
      console.error('Auth signup error:', error)
      return { data: { user: null, session: null }, error }
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return result
    } catch (error) {
      console.error('Auth signin error:', error)
      return { data: { user: null, session: null }, error }
    }
  },

  // Sign in with OAuth provider
  signInWithProvider: async (provider: 'github' | 'google') => {
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return result
    } catch (error) {
      console.error('Auth OAuth error:', error)
      return { data: { url: null, provider }, error }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const result = await supabase.auth.signOut()
      return result
    } catch (error) {
      console.error('Auth signout error:', error)
      return { error }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Get current session error:', error)
      return null
    }
  }
}

// Database helpers
export const db = {
  // Profiles
  profiles: {
    get: async (userId: string) => {
      try {
        const result = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        return result
      } catch (error) {
        console.error('Database profiles get error:', error)
        return { data: null, error }
      }
    },

    update: async (userId: string, updates: any) => {
      try {
        const result = await supabase
          .from('profiles')
          .upsert({ id: userId, ...updates })
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database profiles update error:', error)
        return { data: null, error }
      }
    },

    getAll: async () => {
      try {
        const result = await supabase
          .from('profiles')
          .select('*')
          .order('points', { ascending: false })
        return result
      } catch (error) {
        console.error('Database profiles getAll error:', error)
        return { data: [], error }
      }
    }
  },

  // Todos
  todos: {
    getAll: async (userId: string) => {
      try {
        const result = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        return result
      } catch (error) {
        console.error('Database todos getAll error:', error)
        return { data: [], error }
      }
    },

    create: async (todo: any) => {
      try {
        const result = await supabase
          .from('todos')
          .insert(todo)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database todos create error:', error)
        return { data: null, error }
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const result = await supabase
          .from('todos')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database todos update error:', error)
        return { data: null, error }
      }
    },

    delete: async (id: string) => {
      try {
        const result = await supabase
          .from('todos')
          .delete()
          .eq('id', id)
        return result
      } catch (error) {
        console.error('Database todos delete error:', error)
        return { error }
      }
    }
  },

  // Events
  events: {
    getAll: async () => {
      try {
        const result = await supabase
          .from('events')
          .select(`
            *,
            organizer:organizer_id(full_name, username),
            registrations:event_registrations(count)
          `)
          .order('date', { ascending: true })
        return result
      } catch (error) {
        console.error('Database events getAll error:', error)
        return { data: [], error }
      }
    },

    getById: async (id: string) => {
      try {
        const result = await supabase
          .from('events')
          .select(`
            *,
            organizer:organizer_id(full_name, username),
            registrations:event_registrations(user_id, registered_at, user:user_id(full_name, username))
          `)
          .eq('id', id)
          .single()
        return result
      } catch (error) {
        console.error('Database events getById error:', error)
        return { data: null, error }
      }
    },

    create: async (event: any) => {
      try {
        const result = await supabase
          .from('events')
          .insert(event)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database events create error:', error)
        return { data: null, error }
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const result = await supabase
          .from('events')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database events update error:', error)
        return { data: null, error }
      }
    },

    delete: async (id: string) => {
      try {
        const result = await supabase
          .from('events')
          .delete()
          .eq('id', id)
        return result
      } catch (error) {
        console.error('Database events delete error:', error)
        return { error }
      }
    },

    register: async (eventId: string, userId: string) => {
      try {
        const result = await supabase
          .from('event_registrations')
          .insert({ event_id: eventId, user_id: userId })
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database events register error:', error)
        return { data: null, error }
      }
    },

    unregister: async (eventId: string, userId: string) => {
      try {
        const result = await supabase
          .from('event_registrations')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', userId)
        return result
      } catch (error) {
        console.error('Database events unregister error:', error)
        return { error }
      }
    }
  },

  // Projects
  projects: {
    getAll: async () => {
      try {
        const result = await supabase
          .from('projects')
          .select(`
            *,
            user:user_id(full_name, username, avatar_url)
          `)
          .order('created_at', { ascending: false })
        return result
      } catch (error) {
        console.error('Database projects getAll error:', error)
        return { data: [], error }
      }
    },

    getByUser: async (userId: string) => {
      try {
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        return result
      } catch (error) {
        console.error('Database projects getByUser error:', error)
        return { data: [], error }
      }
    },

    create: async (project: any) => {
      try {
        const result = await supabase
          .from('projects')
          .insert(project)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database projects create error:', error)
        return { data: null, error }
      }
    },

    update: async (id: string, updates: any) => {
      try {
        const result = await supabase
          .from('projects')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database projects update error:', error)
        return { data: null, error }
      }
    },

    delete: async (id: string) => {
      try {
        const result = await supabase
          .from('projects')
          .delete()
          .eq('id', id)
        return result
      } catch (error) {
        console.error('Database projects delete error:', error)
        return { error }
      }
    }
  },

  // Achievements
  achievements: {
    getByUser: async (userId: string) => {
      try {
        const result = await supabase
          .from('achievements')
          .select('*')
          .eq('user_id', userId)
          .order('earned_at', { ascending: false })
        return result
      } catch (error) {
        console.error('Database achievements getByUser error:', error)
        return { data: [], error }
      }
    },

    create: async (achievement: any) => {
      try {
        const result = await supabase
          .from('achievements')
          .insert(achievement)
          .select()
          .single()
        return result
      } catch (error) {
        console.error('Database achievements create error:', error)
        return { data: null, error }
      }
    }
  }
}

// Storage helpers
export const storage = {
  // Upload avatar
  uploadAvatar: async (userId: string, file: File) => {
    try {
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
    } catch (error) {
      console.error('Storage uploadAvatar error:', error)
      throw error
    }
  },

  // Upload event image
  uploadEventImage: async (userId: string, file: File) => {
    try {
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
    } catch (error) {
      console.error('Storage uploadEventImage error:', error)
      throw error
    }
  },

  // Delete file
  deleteFile: async (bucket: string, path: string) => {
    try {
      const result = await supabase.storage
        .from(bucket)
        .remove([path])
      return result
    } catch (error) {
      console.error('Storage deleteFile error:', error)
      return { error }
    }
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