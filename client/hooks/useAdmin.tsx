import { useState, useEffect } from 'react'
import { dbHelpers } from '@/lib/firebase'
import { useAuth } from './useAuth'
import { toast } from 'sonner'

export interface AdminUser {
  id: string
  user_id: string
  email: string
  role: 'admin' | 'super_admin' | 'moderator'
  permissions: string[]
  created_at: any
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
        const isUserAdmin = await dbHelpers.admin.isAdmin(user.uid)
        setIsAdmin(isUserAdmin)

        if (isUserAdmin) {
          const { data, error } = await dbHelpers.admin.getAdminData(user.uid)
          if (data) {
            setAdminData(data as AdminUser)
          }
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
      // Get all users and send notification to each
      const { data: profiles } = await dbHelpers.profiles.getAll()
      
      const notifications = profiles.map(profile => ({
        title,
        message,
        type,
        recipient_id: profile.id,
        sender_id: user?.uid,
        read: false
      }))

      // Create notifications for all users
      for (const notification of notifications) {
        await dbHelpers.notifications.create(notification)
      }
      
      toast.success('Notification sent to all users!', {
        description: `"${title}" has been delivered to all members.`
      })
    } catch (err) {
      console.error('Error sending notification to all:', err)
      toast.error('Failed to send notification', {
        description: err instanceof Error ? err.message : 'Please try again'
      })
      throw err
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
      await dbHelpers.notifications.create({
        title,
        message,
        type,
        recipient_id: userId,
        sender_id: user?.uid,
        read: false
      })
      
      toast.success('Notification sent!', {
        description: `"${title}" has been delivered to the user.`
      })
    } catch (err) {
      console.error('Error sending notification to user:', err)
      toast.error('Failed to send notification', {
        description: err instanceof Error ? err.message : 'Please try again'
      })
      throw err
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