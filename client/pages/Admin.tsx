import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import AdminEventManager from "@/components/admin/AdminEventManager";
import AdminNotificationSender from "@/components/admin/AdminNotificationSender";
import {
  Shield,
  Users,
  Calendar,
  Bell,
  Settings,
  BarChart3,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { dbHelpers } from "@/lib/firebase";

export default function Admin() {
  const { user } = useAuth();
  const { isAdmin, adminData, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalNotifications: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const [profilesResult, eventsResult] = await Promise.all([
        dbHelpers.profiles.getAll(),
        dbHelpers.events.getAll(),
      ]);

      setStats({
        totalUsers: profilesResult.data?.length || 0,
        totalEvents: eventsResult.data?.length || 0,
        totalNotifications: 0, // This would need a separate query
        activeUsers: profilesResult.data?.filter(p => p.points > 0).length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You don't have admin privileges to access this page.
            </p>
            <p className="text-sm text-muted-foreground">
              Contact an administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge variant="secondary">
                Welcome, {user.email}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                {adminData?.role || 'Admin'}
              </Badge>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
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
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {stats.totalUsers}
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
                      {stats.totalEvents}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Events
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Activity className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {stats.activeUsers}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Active Users
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6 text-center">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      +23%
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Growth
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Info */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Admin Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Your Permissions</h3>
                      <div className="flex flex-wrap gap-2">
                        {adminData?.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Admin Since</h3>
                      <p className="text-sm text-muted-foreground">
                        {adminData?.created_at ? new Date(adminData.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "events" && <AdminEventManager />}

          {activeTab === "notifications" && <AdminNotificationSender />}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Admin Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">System Settings</h3>
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
                          Admins Only
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Real-time Notifications</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Admin Permissions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage Events</span>
                        <Badge variant="secondary">
                          {adminData?.permissions.includes('events:edit') ? 'Granted' : 'Denied'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Send Notifications</span>
                        <Badge variant="secondary">
                          {adminData?.permissions.includes('notifications:send') ? 'Granted' : 'Denied'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage Users</span>
                        <Badge variant="secondary">
                          {adminData?.permissions.includes('users:manage') ? 'Granted' : 'Denied'}
                        </Badge>
                      </div>
                    </div>
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