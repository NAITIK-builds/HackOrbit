import { useState, useEffect } from 'react'
import { dbHelpers } from '@/lib/firebase'
import { useAuth } from './useAuth'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'event' | 'system'
  recipient_id: string | null
  sender_id: string | null
  read: boolean
  created_at: any
  expires_at?: any
}

export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setNotifications([])
      setLoading(false)
      return
    }

    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const { data, error } = await dbHelpers.notifications.getAll(user.uid)
        if (error) {
          console.error('Error fetching notifications:', error)
          setError(error.message)
        } else {
          setNotifications(data || [])
        }
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()

    // Subscribe to real-time updates
    const unsubscribe = dbHelpers.notifications.subscribe(user.uid, (updatedNotifications) => {
      setNotifications(updatedNotifications)
    })

    return () => unsubscribe()
  }, [user])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await dbHelpers.notifications.update(notificationId, { read: true })
      if (error) {
        console.error('Error marking notification as read:', error)
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read')
      throw err
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    try {
      const unreadNotifications = notifications.filter(n => !n.read)
      
      for (const notification of unreadNotifications) {
        await dbHelpers.notifications.update(notification.id, { read: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read')
      throw err
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await dbHelpers.notifications.delete(notificationId)
      if (error) {
        console.error('Error deleting notification:', error)
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete notification')
      throw err
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  }
}