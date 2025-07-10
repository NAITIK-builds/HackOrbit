import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useState, useEffect } from "react";
import { dbHelpers } from "@/lib/firebase";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";
import TodoList from "@/components/todos/TodoList";
import {
  User,
  Settings,
  Edit,
  Trophy,
  Code,
  Star,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Award,
  Target,
  TrendingUp,
  Clock,
  Book,
  Bell,
  BellRing,
  Save,
  X,
  Plus,
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
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await dbHelpers.profiles.get(user.uid);
      if (error && error.message !== 'Profile not found') {
        throw error;
      }
      
      if (data) {
        setProfile(data);
        setEditedData(data);
      } else {
        // Profile doesn't exist, create a basic one
        const newProfile = {
          id: user.uid,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || null,
          bio: '',
          username: '',
          phone: '',
          year: '',
          branch: '',
          roll_number: '',
          location: 'Kanpur, India',
          github_url: '',
          linkedin_url: '',
          website_url: '',
          skills: [],
          level: 'Beginner',
          points: 0,
          streak: 0,
        };
        
        const { data: createdProfile, error: createError } = await dbHelpers.profiles.update(user.uid, newProfile);
        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          setProfile(createdProfile || newProfile);
          setEditedData(createdProfile || newProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { data, error } = await dbHelpers.profiles.update(user.uid, editedData);
      if (error) throw error;
      
      setProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully!', {
        description: 'Your changes have been saved.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile', {
        description: 'Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedData(profile);
    setIsEditing(false);
    setNewSkill("");
  };

  const handleAvatarUpload = (url: string) => {
    setProfile({ ...profile, avatar_url: url });
    setEditedData({ ...editedData, avatar_url: url });
    toast.success('Profile picture updated!');
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedData.skills?.includes(newSkill.trim())) {
      setEditedData({
        ...editedData,
        skills: [...(editedData.skills || []), newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills?.filter((skill: string) => skill !== skillToRemove) || []
    });
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white";
      case "Advanced":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "Intermediate":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      case "Beginner":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <ProfileImageUpload
                    currentAvatarUrl={profile?.avatar_url}
                    onUploadComplete={handleAvatarUpload}
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={editedData.full_name || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, full_name: e.target.value })
                            }
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={editedData.username || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, username: e.target.value })
                            }
                            placeholder="Choose a username"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editedData.bio || ''}
                          onChange={(e) =>
                            setEditedData({ ...editedData, bio: e.target.value })
                          }
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {profile?.full_name || user?.email}
                      </h1>
                      {profile?.username && (
                        <p className="text-muted-foreground mb-1">
                          @{profile.username}
                        </p>
                      )}
                      <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-2xl">
                        {profile?.bio || 'Welcome to HackOrbit! Update your profile to tell others about yourself.'}
                      </p>
                    </>
                  )}

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {profile?.points || 0}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Points
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {profile?.streak || 0}🔥
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Streak
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {unreadCount}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Notifications
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <Badge
                    className={`${getLevelColor(profile?.level || 'Beginner')} justify-center md:justify-start`}
                  >
                    {profile?.level || 'Beginner'}
                  </Badge>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave} disabled={saving}>
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={saving}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "todos", label: "My Todos", icon: Target },
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
                {tab.id === "notifications" && unreadCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editedData.phone || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, phone: e.target.value })
                            }
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editedData.location || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, location: e.target.value })
                            }
                            placeholder="Your location"
                          />
                        </div>
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Select
                            value={editedData.year || ''}
                            onValueChange={(value) =>
                              setEditedData({ ...editedData, year: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1st Year">1st Year</SelectItem>
                              <SelectItem value="2nd Year">2nd Year</SelectItem>
                              <SelectItem value="3rd Year">3rd Year</SelectItem>
                              <SelectItem value="4th Year">4th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="branch">Branch</Label>
                          <Select
                            value={editedData.branch || ''}
                            onValueChange={(value) =>
                              setEditedData({ ...editedData, branch: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Computer Science Engineering">
                                Computer Science Engineering
                              </SelectItem>
                              <SelectItem value="Information Technology">
                                Information Technology
                              </SelectItem>
                              <SelectItem value="Electronics & Communication">
                                Electronics & Communication
                              </SelectItem>
                              <SelectItem value="Mechanical Engineering">
                                Mechanical Engineering
                              </SelectItem>
                              <SelectItem value="Civil Engineering">
                                Civil Engineering
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="roll_number">Roll Number</Label>
                          <Input
                            id="roll_number"
                            value={editedData.roll_number || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, roll_number: e.target.value })
                            }
                            placeholder="2022CSE123"
                          />
                        </div>
                        <div>
                          <Label htmlFor="github_url">GitHub URL</Label>
                          <Input
                            id="github_url"
                            value={editedData.github_url || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, github_url: e.target.value })
                            }
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                          <Input
                            id="linkedin_url"
                            value={editedData.linkedin_url || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, linkedin_url: e.target.value })
                            }
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website_url">Website URL</Label>
                          <Input
                            id="website_url"
                            value={editedData.website_url || ''}
                            onChange={(e) =>
                              setEditedData({ ...editedData, website_url: e.target.value })
                            }
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Email
                          </label>
                          <div className="flex items-center mt-1">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{user?.email}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Phone
                          </label>
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{profile?.phone || 'Not provided'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Location
                          </label>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{profile?.location || 'Not provided'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Member Since
                          </label>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recently'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Year
                          </label>
                          <div className="flex items-center mt-1">
                            <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{profile?.year || 'Not provided'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Branch
                          </label>
                          <div className="flex items-center mt-1">
                            <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{profile?.branch || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skills & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill..."
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button onClick={addSkill} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editedData.skills?.map((skill: string) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                              onClick={() => removeSkill(skill)}
                            >
                              {skill} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile?.skills && profile.skills.length > 0 ? (
                          profile.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No skills added yet. Edit your profile to add skills.
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Social Links */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile?.github_url ? (
                      <a
                        href={profile.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="text-sm">GitHub Profile</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-50">
                        <Github className="h-5 w-5" />
                        <span className="text-sm">GitHub not linked</span>
                      </div>
                    )}
                    {profile?.linkedin_url ? (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-50">
                        <Linkedin className="h-5 w-5" />
                        <span className="text-sm">LinkedIn not linked</span>
                      </div>
                    )}
                    {profile?.website_url ? (
                      <a
                        href={profile.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                        <span className="text-sm">Personal Website</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-50">
                        <Globe className="h-5 w-5" />
                        <span className="text-sm">Website not linked</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Level
                      </span>
                      <span className="font-medium">
                        {profile?.level || 'Beginner'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Points
                      </span>
                      <span className="font-medium">
                        {profile?.points || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Streak
                      </span>
                      <span className="font-medium">
                        {profile?.streak || 0} days
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "todos" && <TodoList />}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Your Notifications
                    </div>
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        {unreadCount} unread
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            notification.read ? 'bg-muted/30' : 'bg-background'
                          } ${
                            notification.type === 'event' ? 'border-l-blue-500' :
                            notification.type === 'success' ? 'border-l-green-500' :
                            notification.type === 'warning' ? 'border-l-yellow-500' :
                            notification.type === 'error' ? 'border-l-red-500' :
                            'border-l-gray-500'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(notification.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-4 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Profile Visibility</span>
                        <Button variant="outline" size="sm">
                          Public
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Show Email</span>
                        <Button variant="outline" size="sm">
                          Members Only
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Activity Tracking</span>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <Button variant="outline" size="sm">
                          Enabled
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

                  <div className="pt-6 border-t">
                    <Button variant="destructive" size="sm">
                      Delete Account
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