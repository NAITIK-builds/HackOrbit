import { useState } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Users, User } from 'lucide-react'

export default function AdminNotificationSender() {
  const { isAdmin, hasPermission, sendNotificationToAll, sendNotificationToUser } = useAdmin()
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    recipient: 'all',
    userId: ''
  })
  const [sending, setSending] = useState(false)

  const handleSendNotification = async () => {
    if (!notification.title || !notification.message) {
      alert('Please fill in all required fields')
      return
    }

    setSending(true)
    try {
      if (notification.recipient === 'all') {
        await sendNotificationToAll(notification.title, notification.message, notification.type)
      } else {
        if (!notification.userId) {
          alert('Please enter a user ID')
          return
        }
        await sendNotificationToUser(notification.userId, notification.title, notification.message, notification.type)
      }

      setNotification({
        title: '',
        message: '',
        type: 'info',
        recipient: 'all',
        userId: ''
      })
      alert('Notification sent successfully!')
    } catch (error) {
      console.error('Error sending notification:', error)
      alert('Failed to send notification')
    } finally {
      setSending(false)
    }
  }

  if (!isAdmin || !hasPermission('notifications:send')) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="h-5 w-5 mr-2" />
          Send Notification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={notification.title}
              onChange={(e) => setNotification({ ...notification, title: e.target.value })}
              placeholder="Notification title"
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={notification.type}
              onValueChange={(value) => setNotification({ ...notification, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={notification.message}
            onChange={(e) => setNotification({ ...notification, message: e.target.value })}
            placeholder="Notification message"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recipient">Recipients</Label>
            <Select
              value={notification.recipient}
              onValueChange={(value) => setNotification({ ...notification, recipient: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    All Users
                  </div>
                </SelectItem>
                <SelectItem value="specific">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Specific User
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {notification.recipient === 'specific' && (
            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={notification.userId}
                onChange={(e) => setNotification({ ...notification, userId: e.target.value })}
                placeholder="Enter user ID"
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleSendNotification}
          disabled={sending || !notification.title || !notification.message}
          className="w-full"
        >
          {sending ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Sending...
            </div>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}