import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'event' | 'system'
  recipient_id: string | null
  sender_id: string | null
  read: boolean
  created_at: string
  expires_at: string | null
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
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .or(`recipient_id.eq.${user.id},recipient_id.is.null`)
          .order('created_at', { ascending: false })
          .limit(50)

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
    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${user.id}`
        },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload

          setNotifications(current => {
            switch (eventType) {
              case 'INSERT':
                return [newRecord as Notification, ...current]
              case 'UPDATE':
                return current.map(notification => 
                  notification.id === newRecord.id ? newRecord as Notification : notification
                )
              case 'DELETE':
                return current.filter(notification => notification.id !== oldRecord.id)
              default:
                return current
            }
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: 'recipient_id=is.null'
        },
        (payload) => {
          // Handle global notifications
          const newNotification = payload.new as Notification
          setNotifications(current => [newNotification, ...current])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

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
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .or(`recipient_id.eq.${user.id},recipient_id.is.null`)
        .eq('read', false)

      if (error) {
        console.error('Error marking all notifications as read:', error)
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read')
      throw err
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)

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