import {
  Shield,
  Users,
  Database,
  Settings,
  BarChart3,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Activity,
  TrendingUp,
  Calendar,
  Eye,
  AlertTriangle,
  Bell,
  BellRing,
  Save,
  Send,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Mock admin data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@psit.ac.in",
    role: "Member",
    status: "Active",
    joinDate: "2024-01-15",
    points: 2580,
    projects: 12,
    lastActive: "2024-03-15",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@psit.ac.in",
    role: "Moderator",
    status: "Active",
    joinDate: "2024-02-01",
    points: 2445,
    projects: 10,
    lastActive: "2024-03-14",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike@psit.ac.in",
    role: "Member",
    status: "Inactive",
    joinDate: "2024-01-20",
    points: 2390,
    projects: 11,
    lastActive: "2024-03-01",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@psit.ac.in",
    role: "Member",
    status: "Active",
    joinDate: "2024-03-01",
    points: 2156,
    projects: 9,
    lastActive: "2024-03-15",
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Annual Hackathon 2024",
    date: "2024-04-15",
    location: "PSIT Main Auditorium",
    status: "Upcoming",
    participants: 156,
    maxParticipants: 200,
    organizer: "HackOrbit Team",
  },
  {
    id: 2,
    title: "React Workshop",
    date: "2024-03-28",
    location: "Computer Lab 2",
    status: "Open",
    participants: 45,
    maxParticipants: 60,
    organizer: "Sarah Chen",
  },
  {
    id: 3,
    title: "AI & ML Seminar",
    date: "2024-03-30",
    location: "Seminar Hall",
    status: "Open",
    participants: 89,
    maxParticipants: 150,
    organizer: "Dr. Alex Johnson",
  },
];

const mockNotifications = [
  {
    id: 1,
    title: "New Event: React Workshop",
    message:
      "Registration is now open for the React Advanced Patterns workshop",
    type: "event",
    status: "Sent",
    sentDate: "2024-03-20",
    recipients: 156,
  },
  {
    id: 2,
    title: "Hackathon Reminder",
    message: "Don't forget to register for the Annual Hackathon 2024",
    type: "reminder",
    status: "Scheduled",
    sentDate: "2024-03-22",
    recipients: 200,
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "The platform will be under maintenance on Sunday from 2-4 AM",
    type: "system",
    status: "Draft",
    sentDate: "",
    recipients: 0,
  },
];

const mockSystemStats = {
  totalUsers: 156,
  activeUsers: 142,
  totalEvents: 8,
  totalNotifications: 12,
  monthlyGrowth: 23,
  avgSessionTime: "45 min",
  eventAttendance: "87%",
  notificationOpenRate: "65%",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "event",
    recipients: "all",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    category: "Workshop",
  });

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Upcoming":
      case "Open":
      case "Sent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive":
      case "Closed":
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Moderator":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Member":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleSendNotification = () => {
    console.log("Sending notification:", newNotification);
    // In a real app, this would send the notification
    setNewNotification({
      title: "",
      message: "",
      type: "event",
      recipients: "all",
    });
  };

  const handleCreateEvent = () => {
    console.log("Creating event:", newEvent);
    // In a real app, this would create the event
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxParticipants: "",
      category: "Workshop",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-red-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
              Admin Dashboard
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage HackOrbit club operations, events, and notifications
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "users", label: "Users", icon: Users },
              { id: "events", label: "Events", icon: Calendar },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="text-xs md:text-sm"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {mockSystemStats.totalUsers}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Total Users
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Calendar className="h-6 w-6 md:h-8 md:w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {mockSystemStats.totalEvents}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Events
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Bell className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {mockSystemStats.totalNotifications}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Notifications
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      +{mockSystemStats.monthlyGrowth}%
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Growth
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      className="h-auto p-4 flex-col gap-2"
                      onClick={() => setActiveTab("events")}
                    >
                      <Plus className="h-6 w-6" />
                      <span className="text-sm">Add Event</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex-col gap-2"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Send className="h-6 w-6" />
                      <span className="text-sm">Send Notification</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex-col gap-2"
                      onClick={() => setActiveTab("users")}
                    >
                      <UserCheck className="h-6 w-6" />
                      <span className="text-sm">Manage Users</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <Download className="h-6 w-6" />
                      <span className="text-sm">Export Data</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Recent Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                        >
                          <Calendar className="h-4 w-4 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.participants}/{event.maxParticipants}{" "}
                              participants
                            </p>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockNotifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                        >
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.recipients} recipients
                            </p>
                          </div>
                          <Badge
                            className={getStatusColor(notification.status)}
                          >
                            {notification.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-6">
              {/* Create Event Form */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventTitle">Event Title</Label>
                      <Input
                        id="eventTitle"
                        placeholder="Enter event title"
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventCategory">Category</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) =>
                          setNewEvent({ ...newEvent, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Competition">
                            Competition
                          </SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                          <SelectItem value="Tech Talk">Tech Talk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventTime">Time</Label>
                      <Input
                        id="eventTime"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventLocation">Location</Label>
                      <Input
                        id="eventLocation"
                        placeholder="Event location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="100"
                        value={newEvent.maxParticipants}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            maxParticipants: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="eventDescription">Description</Label>
                    <Textarea
                      id="eventDescription"
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button
                      onClick={handleCreateEvent}
                      disabled={!newEvent.title || !newEvent.date}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setNewEvent({
                          title: "",
                          description: "",
                          date: "",
                          time: "",
                          location: "",
                          maxParticipants: "",
                          category: "Workshop",
                        })
                      }
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Events List */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Manage Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-background/50"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.location} •{" "}
                            {event.participants}/{event.maxParticipants}{" "}
                            participants
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              {/* Send Notification Form */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Send New Notification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="notificationTitle">Title</Label>
                        <Input
                          id="notificationTitle"
                          placeholder="Notification title"
                          value={newNotification.title}
                          onChange={(e) =>
                            setNewNotification({
                              ...newNotification,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notificationType">Type</Label>
                        <Select
                          value={newNotification.type}
                          onValueChange={(value) =>
                            setNewNotification({
                              ...newNotification,
                              type: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="announcement">
                              Announcement
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notificationMessage">Message</Label>
                      <Textarea
                        id="notificationMessage"
                        placeholder="Notification message"
                        value={newNotification.message}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            message: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipients">Recipients</Label>
                      <Select
                        value={newNotification.recipients}
                        onValueChange={(value) =>
                          setNewNotification({
                            ...newNotification,
                            recipients: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Members</SelectItem>
                          <SelectItem value="active">
                            Active Members Only
                          </SelectItem>
                          <SelectItem value="moderators">
                            Moderators Only
                          </SelectItem>
                          <SelectItem value="admins">Admins Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSendNotification}
                        disabled={
                          !newNotification.title || !newNotification.message
                        }
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Now
                      </Button>
                      <Button variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setNewNotification({
                            title: "",
                            message: "",
                            type: "event",
                            recipients: "all",
                          })
                        }
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications History */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-background/50"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.recipients} recipients •{" "}
                            {notification.sentDate || "Not sent"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getStatusColor(notification.status)}
                          >
                            {notification.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-background/50"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>

                        <div className="hidden md:block text-right text-xs text-muted-foreground">
                          <div>{user.points} points</div>
                          <div>{user.projects} projects</div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User Registration</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Event Creation</span>
                        <Button variant="outline" size="sm">
                          Moderators+
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Public Gallery</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-notify new events</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly digest</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Event reminders</span>
                        <Button variant="outline" size="sm">
                          24h before
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Auth</span>
                        <Button variant="outline" size="sm">
                          Optional
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Password Complexity</span>
                        <Button variant="outline" size="sm">
                          Medium
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout</span>
                        <Button variant="outline" size="sm">
                          2 hours
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex gap-4">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                      <Button variant="outline">Reset to Default</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backup & Maintenance */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Backup & Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Database Backup</p>
                      <p className="text-sm text-muted-foreground">
                        Last backup: 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Maintenance</p>
                      <p className="text-sm text-muted-foreground">
                        Schedule maintenance window
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
