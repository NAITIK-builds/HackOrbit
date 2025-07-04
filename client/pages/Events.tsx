import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Star,
  BookOpen,
  Code,
  Trophy,
  Zap,
  Camera,
  Rocket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Annual Hackathon 2024",
    description:
      "Join us for the biggest coding competition of the year! Build innovative solutions in 48 hours.",
    date: "2024-04-15",
    time: "09:00 AM",
    duration: "48 hours",
    location: "PSIT Main Auditorium",
    category: "Competition",
    status: "Upcoming",
    participants: 156,
    maxParticipants: 200,
    organizer: "HackOrbit Team",
    tags: ["hackathon", "coding", "innovation", "prizes"],
    image: "🏆",
    registrationDeadline: "2024-04-10",
    requirements: [
      "Laptop",
      "Team of 2-4 members",
      "Basic programming knowledge",
    ],
    prizes: [
      "₹50,000 First Prize",
      "₹25,000 Second Prize",
      "₹10,000 Third Prize",
    ],
  },
  {
    id: 2,
    title: "React Workshop: Advanced Patterns",
    description:
      "Deep dive into advanced React patterns including hooks, context, and performance optimization.",
    date: "2024-03-28",
    time: "02:00 PM",
    duration: "3 hours",
    location: "Computer Lab 2",
    category: "Workshop",
    status: "Open",
    participants: 45,
    maxParticipants: 60,
    organizer: "Sarah Chen",
    tags: ["react", "javascript", "frontend", "workshop"],
    image: "⚛️",
    registrationDeadline: "2024-03-25",
    requirements: ["Basic React knowledge", "Laptop with Node.js installed"],
    prizes: [],
  },
  {
    id: 3,
    title: "AI & Machine Learning Seminar",
    description:
      "Industry experts discuss the latest trends in AI and ML. Q&A session included.",
    date: "2024-03-30",
    time: "11:00 AM",
    duration: "2 hours",
    location: "Seminar Hall",
    category: "Seminar",
    status: "Open",
    participants: 89,
    maxParticipants: 150,
    organizer: "Dr. Alex Johnson",
    tags: ["AI", "machine learning", "seminar", "career"],
    image: "🤖",
    registrationDeadline: "2024-03-28",
    requirements: ["Interest in AI/ML"],
    prizes: [],
  },
  {
    id: 4,
    title: "Open Source Contribution Drive",
    description:
      "Learn how to contribute to open source projects and make your first contribution!",
    date: "2024-04-05",
    time: "10:00 AM",
    duration: "4 hours",
    location: "Computer Lab 1",
    category: "Workshop",
    status: "Upcoming",
    participants: 32,
    maxParticipants: 40,
    organizer: "Mike Rodriguez",
    tags: ["open source", "github", "collaboration", "beginner"],
    image: "🌟",
    registrationDeadline: "2024-04-02",
    requirements: ["GitHub account", "Basic Git knowledge"],
    prizes: [],
  },
  {
    id: 5,
    title: "Mobile App Development Bootcamp",
    description:
      "Build your first mobile app using React Native. From setup to deployment.",
    date: "2024-04-12",
    time: "09:00 AM",
    duration: "6 hours",
    location: "Tech Hub",
    category: "Bootcamp",
    status: "Upcoming",
    participants: 28,
    maxParticipants: 35,
    organizer: "Emily Davis",
    tags: ["mobile", "react native", "bootcamp", "app development"],
    image: "📱",
    registrationDeadline: "2024-04-08",
    requirements: ["React knowledge", "Android/iOS device for testing"],
    prizes: [],
  },
  {
    id: 6,
    title: "Tech Talk: Future of Web Development",
    description:
      "Industry leader shares insights on emerging web technologies and career opportunities.",
    date: "2024-03-25",
    time: "04:00 PM",
    duration: "1.5 hours",
    location: "Main Auditorium",
    category: "Tech Talk",
    status: "Completed",
    participants: 120,
    maxParticipants: 120,
    organizer: "Industry Expert",
    tags: ["web development", "career", "industry insights"],
    image: "💡",
    registrationDeadline: "2024-03-22",
    requirements: [],
    prizes: [],
  },
];

const categories = [
  "All",
  "Competition",
  "Workshop",
  "Seminar",
  "Bootcamp",
  "Tech Talk",
];
const statuses = ["All", "Upcoming", "Open", "Closed", "Completed"];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" || event.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Competition:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Seminar:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Bootcamp:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "Tech Talk":
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isRegistrationOpen = (event: any) => {
    const today = new Date();
    const registrationDeadline = new Date(event.registrationDeadline);
    const eventDate = new Date(event.date);
    return (
      today <= registrationDeadline &&
      today <= eventDate &&
      event.status !== "Completed"
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-10 w-10 md:h-12 md:w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
              Events
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join exciting events, workshops, and competitions to enhance your
              tech skills
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {mockEvents.length}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Total Events
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-green-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {mockEvents.reduce(
                    (sum, event) => sum + event.participants,
                    0,
                  )}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Participants
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {
                    mockEvents.filter(
                      (e) => e.status === "Upcoming" || e.status === "Open",
                    ).length
                  }
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Upcoming
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {
                    mockEvents.filter((e) => e.category === "Competition")
                      .length
                  }
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Competitions
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Add Event Button */}
                <Button className="bg-gradient-to-r from-primary to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {/* Category Filter */}
                <div className="flex gap-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs md:text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {/* Status Filter */}
                <div className="flex gap-1">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={
                        selectedStatus === status ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className="text-xs md:text-sm"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{event.image}</div>
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {event.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time} ({event.duration})
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants}/{event.maxParticipants} participants
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Registration</span>
                      <span>
                        {Math.round(
                          (event.participants / event.maxParticipants) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(event.participants / event.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {event.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{event.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {isRegistrationOpen(event) ? (
                      <Button className="flex-1 bg-gradient-to-r from-primary to-blue-600">
                        <Rocket className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1" disabled>
                        Registration Closed
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No events found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or create a new event!
              </p>
            </div>
          )}

          {/* Create Event CTA */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-purple-600/5">
            <CardContent className="p-8 text-center">
              <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Organize an Event
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have an idea for a workshop, competition, or tech talk? Create
                an event and share your knowledge with the HackOrbit community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" size="lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Event Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
