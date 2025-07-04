import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  Users,
  TrendingUp,
  Filter,
  Search,
  Calendar,
  Code,
  GitBranch,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock data for the leaderboard
const mockLeaderboardData = [
  {
    rank: 1,
    name: "Alex Johnson",
    username: "alexj_dev",
    points: 2580,
    projects: 12,
    contributions: 89,
    streak: 15,
    achievements: ["🏆 Top Contributor", "🔥 Streak Master", "💻 Code Ninja"],
    avatar: "AJ",
    level: "Expert",
    joinedDate: "Jan 2024",
  },
  {
    rank: 2,
    name: "Sarah Chen",
    username: "sarah_codes",
    points: 2445,
    projects: 10,
    contributions: 76,
    streak: 12,
    achievements: ["🎯 Project Leader", "🚀 Innovation Star"],
    avatar: "SC",
    level: "Advanced",
    joinedDate: "Feb 2024",
  },
  {
    rank: 3,
    name: "Mike Rodriguez",
    username: "mike_r",
    points: 2390,
    projects: 11,
    contributions: 82,
    streak: 8,
    achievements: ["🏅 Team Player", "💡 Problem Solver"],
    avatar: "MR",
    level: "Advanced",
    joinedDate: "Jan 2024",
  },
  {
    rank: 4,
    name: "Emily Davis",
    username: "emily_dev",
    points: 2156,
    projects: 9,
    contributions: 65,
    streak: 22,
    achievements: ["🔥 Consistency Champion", "📚 Knowledge Seeker"],
    avatar: "ED",
    level: "Intermediate",
    joinedDate: "Mar 2024",
  },
  {
    rank: 5,
    name: "David Kim",
    username: "david_k",
    points: 1998,
    projects: 8,
    contributions: 58,
    streak: 5,
    achievements: ["🎨 UI Specialist", "⚡ Quick Learner"],
    avatar: "DK",
    level: "Intermediate",
    joinedDate: "Feb 2024",
  },
  {
    rank: 6,
    name: "Lisa Wang",
    username: "lisa_codes",
    points: 1876,
    projects: 7,
    contributions: 54,
    streak: 9,
    achievements: ["🌟 Rising Star"],
    avatar: "LW",
    level: "Intermediate",
    joinedDate: "Apr 2024",
  },
  {
    rank: 7,
    name: "James Wilson",
    username: "jwilson",
    points: 1743,
    projects: 6,
    contributions: 47,
    streak: 3,
    achievements: ["🔧 Bug Hunter"],
    avatar: "JW",
    level: "Beginner",
    joinedDate: "Mar 2024",
  },
  {
    rank: 8,
    name: "Anna Patel",
    username: "anna_p",
    points: 1654,
    projects: 5,
    contributions: 41,
    streak: 7,
    achievements: ["📖 Documentation Pro"],
    avatar: "AP",
    level: "Beginner",
    joinedDate: "Apr 2024",
  },
];

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const filteredData = mockLeaderboardData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-primary" />;
    }
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

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-lg" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
              Leaderboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your progress and compete with fellow HackOrbit members
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {mockLeaderboardData.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Members
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Code className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {mockLeaderboardData.reduce(
                    (sum, user) => sum + user.projects,
                    0,
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Projects
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <GitBranch className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {mockLeaderboardData.reduce(
                    (sum, user) => sum + user.contributions,
                    0,
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Contributions
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {Math.max(...mockLeaderboardData.map((user) => user.streak))}
                </div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterBy === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("all")}
              >
                All
              </Button>
              <Button
                variant={filterBy === "expert" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("expert")}
              >
                Expert
              </Button>
              <Button
                variant={filterBy === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {filteredData.slice(0, 3).map((user, index) => (
              <Card
                key={user.rank}
                className={`relative overflow-hidden bg-gradient-to-br ${
                  index === 0
                    ? "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800"
                    : index === 1
                      ? "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800"
                      : "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800"
                } ${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {user.avatar}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    @{user.username}
                  </p>
                  <Badge className={`${getLevelColor(user.level)} mb-3`}>
                    {user.level}
                  </Badge>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {user.points}
                  </div>
                  <div className="text-sm text-muted-foreground">points</div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                    <div>
                      <div className="font-semibold">{user.projects}</div>
                      <div className="text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="font-semibold">{user.contributions}</div>
                      <div className="text-muted-foreground">Commits</div>
                    </div>
                    <div>
                      <div className="font-semibold">{user.streak}</div>
                      <div className="text-muted-foreground">Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {user.rank <= 3 ? (
                          getRankIcon(user.rank)
                        ) : (
                          <span className="font-bold text-muted-foreground">
                            #{user.rank}
                          </span>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          @{user.username}
                        </div>
                      </div>
                      <Badge className={`${getLevelColor(user.level)}`}>
                        {user.level}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="font-bold text-primary text-lg">
                          {user.points}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{user.projects}</div>
                        <div className="text-xs text-muted-foreground">
                          projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">
                          {user.contributions}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          commits
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-500">
                          {user.streak}🔥
                        </div>
                        <div className="text-xs text-muted-foreground">
                          streak
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          Joined {user.joinedDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement System Info */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-blue-600/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                How Points Are Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Code className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-semibold">Project Completion</div>
                  <div className="text-2xl font-bold text-primary">100pts</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <GitBranch className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="font-semibold">Code Contribution</div>
                  <div className="text-2xl font-bold text-primary">25pts</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-semibold">Daily Streak</div>
                  <div className="text-2xl font-bold text-primary">10pts</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-semibold">Challenge Win</div>
                  <div className="text-2xl font-bold text-primary">200pts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
