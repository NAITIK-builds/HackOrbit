import { useState } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Trash2,
  X,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Settings
} from 'lucide-react'

export default function NotificationCenter() {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'event':
        return <Calendar className="h-4 w-4 text-blue-500" />
      case 'system':
        return <Settings className="h-4 w-4 text-purple-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500'
      case 'warning':
        return 'border-l-yellow-500'
      case 'error':
        return 'border-l-red-500'
      case 'event':
        return 'border-l-blue-500'
      case 'system':
        return 'border-l-purple-500'
      default:
        return 'border-l-gray-500'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = dateString?.toDate ? dateString.toDate() : new Date(dateString);
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const handleMarkAsRead = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await markAsRead(notificationId)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleDelete = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await deleteNotification(notificationId)
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5 text-primary animate-pulse" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="h-6 px-2 text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-l-4 ${getNotificationColor(notification.type)} ${
                  notification.read ? 'bg-muted/30' : 'bg-background'
                } hover:bg-muted/50 transition-colors cursor-pointer`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        className="h-6 w-6 p-0"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(notification.id, e)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full ml-auto mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}