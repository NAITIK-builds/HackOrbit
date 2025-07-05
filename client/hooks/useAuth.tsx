import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, auth } from '@/lib/supabase'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, metadata?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithProvider: (provider: 'github' | 'google') => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
          toast.error('Authentication error')
        } else {
          setSession(session)
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error)
        toast.error('Authentication error')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle auth events with notifications
        if (event === 'SIGNED_IN') {
          toast.success('Successfully logged in!', {
            description: `Welcome back, ${session?.user?.email}`,
            duration: 3000,
          })
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully logged out!', {
            duration: 2000,
          })
        } else if (event === 'SIGNED_UP') {
          toast.success('Account created successfully!', {
            description: 'Welcome to HackOrbit!',
            duration: 3000,
          })
        }

        // Create profile for new users
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            // Check if profile exists
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', session.user.id)
              .single()

            if (profileError && profileError.code === 'PGRST116') {
              // Profile doesn't exist, create it
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  full_name: session.user.user_metadata?.full_name || '',
                  avatar_url: session.user.user_metadata?.avatar_url || null,
                })

              if (insertError) {
                console.error('Error creating profile:', insertError)
              }
            }
          } catch (error) {
            console.error('Error handling profile creation:', error)
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {}
        }
      })

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('User already exists!', {
            description: 'Please login instead.',
            action: {
              label: 'Login',
              onClick: () => window.location.href = '/login'
            }
          })
        } else {
          toast.error('Signup failed', {
            description: error.message
          })
        }
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Signup failed', {
        description: 'An unexpected error occurred'
      })
      return { data: null, error }
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid credentials', {
            description: 'Please check your email and password'
          })
        } else {
          toast.error('Login failed', {
            description: error.message
          })
        }
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed', {
        description: 'An unexpected error occurred'
      })
      return { data: null, error }
    }
  }

  const signInWithOAuth = async (provider: 'github' | 'google') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        toast.error(`${provider} login failed`, {
          description: error.message
        })
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('OAuth error:', error)
      toast.error(`${provider} login failed`, {
        description: 'An unexpected error occurred'
      })
      return { data: null, error }
    }
  }

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('Logout failed', {
          description: error.message
        })
        return { error }
      }
      return { error: null }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed', {
        description: 'An unexpected error occurred'
      })
      return { error }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp: signUpWithEmail,
    signIn: signInWithEmail,
    signInWithProvider: signInWithOAuth,
    signOut: signOutUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}