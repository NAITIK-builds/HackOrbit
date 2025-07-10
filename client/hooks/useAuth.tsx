import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth, authHelpers } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, displayName?: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithProvider: (provider: 'github' | 'google') => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      
      if (user) {
        console.log('User signed in:', user.email)
      } else {
        console.log('User signed out')
      }
    })

    return () => unsubscribe()
  }, [])

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      const { user, error } = await authHelpers.signUp(email, password, displayName)

      if (error) {
        if (error.code === 'auth/email-already-in-use') {
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

      toast.success('Account created successfully!', {
        description: 'Welcome to HackOrbit!',
        duration: 3000,
      })

      return { data: { user }, error: null }
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
      const { user, error } = await authHelpers.signIn(email, password)

      if (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
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

      toast.success('Successfully logged in!', {
        description: `Welcome back, ${user?.email}`,
        duration: 3000,
      })

      return { data: { user }, error: null }
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
      let result
      if (provider === 'google') {
        result = await authHelpers.signInWithGoogle()
      } else {
        result = await authHelpers.signInWithGithub()
      }

      const { user, error } = result

      if (error) {
        toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`, {
          description: error.message
        })
        return { data: null, error }
      }

      toast.success('Successfully logged in!', {
        description: `Welcome, ${user?.displayName || user?.email}`,
        duration: 3000,
      })

      return { data: { user }, error: null }
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
      const { error } = await authHelpers.signOut()
      if (error) {
        toast.error('Logout failed', {
          description: error.message
        })
        return { error }
      }

      toast.success('Successfully logged out!', {
        duration: 2000,
      })

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