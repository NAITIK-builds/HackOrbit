import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface AdminUser {
  id: string
  user_id: string
  email: string
  role: 'admin' | 'super_admin' | 'moderator'
  permissions: string[]
  created_at: string
}

export function useAdmin() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminData, setAdminData] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      setAdminData(null)
      setLoading(false)
      return
    }

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data) {
          setIsAdmin(true)
          setAdminData(data)
        } else {
          setIsAdmin(false)
          setAdminData(null)
        }
      } catch (err) {
        console.error('Error checking admin status:', err)
        setIsAdmin(false)
        setAdminData(null)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [user])

  const hasPermission = (permission: string): boolean => {
    return adminData?.permissions.includes(permission) || false
  }

  const sendNotificationToAll = async (title: string, message: string, type: string = 'info') => {
    if (!isAdmin || !hasPermission('notifications:send')) {
      throw new Error('Insufficient permissions')
    }

    try {
      const { error } = await supabase.rpc('send_notification_to_all', {
        notification_title: title,
        notification_message: message,
        notification_type: type
      })

      if (error) throw error
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to send notification')
    }
  }

  const sendNotificationToUser = async (
    userId: string, 
    title: string, 
    message: string, 
    type: string = 'info'
  ) => {
    if (!isAdmin || !hasPermission('notifications:send')) {
      throw new Error('Insufficient permissions')
    }

    try {
      const { error } = await supabase.rpc('send_notification_to_user', {
        user_id: userId,
        notification_title: title,
        notification_message: message,
        notification_type: type
      })

      if (error) throw error
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to send notification')
    }
  }

  return {
    isAdmin,
    adminData,
    loading,
    hasPermission,
    sendNotificationToAll,
    sendNotificationToUser
  }
}