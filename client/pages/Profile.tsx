import {
  User,
  Settings,
  Shield,
  Edit,
  Camera,
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock user data
const mockUserData = {
  id: "user123",
  name: "Alex Johnson",
  username: "alexj_dev",
  email: "alex.johnson@psit.ac.in",
  phone: "+91 98765 43210",
  bio: "Full-stack developer passionate about creating innovative solutions. Active member of HackOrbit with a focus on React and Node.js development.",
  avatar: "AJ",
  joinDate: "January 2024",
  location: "Kanpur, India",
  year: "3rd Year",
  branch: "Computer Science Engineering",
  rollNumber: "2022CSE123",
  level: "Expert",
  points: 2580,
  rank: 1,
  streak: 15,
  projects: 12,
  contributions: 89,
  achievements: [
    {
      id: 1,
      title: "Top Contributor",
      icon: "🏆",
      description: "Ranked #1 in club contributions",
    },
    {
      id: 2,
      title: "Streak Master",
      icon: "🔥",
      description: "Maintained 15-day active streak",
    },
    {
      id: 3,
      title: "Code Ninja",
      icon: "💻",
      description: "Completed 50+ coding challenges",
    },
    {
      id: 4,
      title: "Project Leader",
      icon: "🎯",
      description: "Led 5 successful projects",
    },
    {
      id: 5,
      title: "Mentor",
      icon: "👨‍🏫",
      description: "Helped 20+ students learn coding",
    },
  ],
  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
  ],
  socialLinks: {
    github: "https://github.com/alexj_dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    website: "https://alexjohnson.dev",
  },
  recentActivity: [
    {
      id: 1,
      type: "project",
      title: "Completed E-commerce Platform",
      date: "2024-03-15",
      points: 100,
    },
    {
      id: 2,
      type: "contribution",
      title: "Fixed authentication bug",
      date: "2024-03-14",
      points: 25,
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 'Top Contributor' badge",
      date: "2024-03-13",
      points: 50,
    },
    {
      id: 4,
      type: "workshop",
      title: "Attended React Workshop",
      date: "2024-03-10",
      points: 20,
    },
    {
      id: 5,
      type: "challenge",
      title: "Won coding challenge #47",
      date: "2024-03-08",
      points: 30,
    },
  ],
  projectsCompleted: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Completed",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["React", "Socket.io", "Express"],
      status: "Completed",
      date: "2024-02-28",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather application with charts",
      tech: ["React", "Chart.js", "API"],
      status: "In Progress",
      date: "2024-03-01",
    },
  ],
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Code className="h-4 w-4 text-blue-500" />;
      case "contribution":
        return <GitBranch className="h-4 w-4 text-green-500" />;
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />;
      case "workshop":
        return <Book className="h-4 w-4 text-purple-500" />;
      case "challenge":
        return <Target className="h-4 w-4 text-red-500" />;
      default:
        return <Trophy className="h-4 w-4 text-primary" />;
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
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
                    {editedData.avatar}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={editedData.name}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                        placeholder="Full Name"
                      />
                      <Input
                        value={editedData.username}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            username: e.target.value,
                          })
                        }
                        placeholder="Username"
                      />
                      <Textarea
                        value={editedData.bio}
                        onChange={(e) =>
                          setEditedData({ ...editedData, bio: e.target.value })
                        }
                        placeholder="Bio"
                        rows={3}
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {editedData.name}
                      </h1>
                      <p className="text-muted-foreground mb-1">
                        @{editedData.username}
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-2xl">
                        {editedData.bio}
                      </p>
                    </>
                  )}

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        #{editedData.rank}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Rank
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {editedData.points}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Points
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {editedData.projects}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Projects
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        {editedData.streak}🔥
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Streak
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <Badge
                    className={`${getLevelColor(editedData.level)} justify-center md:justify-start`}
                  >
                    {editedData.level}
                  </Badge>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
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
              { id: "activity", label: "Activity", icon: TrendingUp },
              { id: "projects", label: "Projects", icon: Code },
              { id: "achievements", label: "Achievements", icon: Trophy },
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.email}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </label>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.phone}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Location
                        </label>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.location}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Member Since
                        </label>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.joinDate}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Year
                        </label>
                        <div className="flex items-center mt-1">
                          <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.year}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Branch
                        </label>
                        <div className="flex items-center mt-1">
                          <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{editedData.branch}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skills & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {editedData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
                    <a
                      href={editedData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="text-sm">GitHub Profile</span>
                    </a>
                    <a
                      href={editedData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                      href={editedData.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-sm">Personal Website</span>
                    </a>
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
                        Contributions
                      </span>
                      <span className="font-medium">
                        {editedData.contributions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Achievements
                      </span>
                      <span className="font-medium">
                        {editedData.achievements.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Skills
                      </span>
                      <span className="font-medium">
                        {editedData.skills.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {editedData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background/50"
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm md:text-base">
                          {activity.title}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editedData.projectsCompleted.map((project) => (
                <Card key={project.id} className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                      className="w-fit"
                    >
                      {project.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editedData.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="bg-card/50 backdrop-blur-sm text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </Card>
              ))}
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
                        <span className="text-sm">Achievement Alerts</span>
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
