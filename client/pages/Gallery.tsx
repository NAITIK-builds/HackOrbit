import {
  Camera,
  Upload,
  Calendar,
  Filter,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Eye,
  User,
  MapPin,
  Clock,
  Image as ImageIcon,
  Video,
  Grid3x3,
  List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock data for gallery items
const mockGalleryItems = [
  {
    id: 1,
    title: "Hackathon 2024 Winner Announcement",
    description: "Team Alpha celebrating their victory in the annual hackathon",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    category: "Hackathons",
    event: "Annual Hackathon 2024",
    date: "2024-03-15",
    photographer: "Sarah Chen",
    likes: 124,
    comments: 18,
    views: 1250,
    tags: ["hackathon", "winners", "coding", "teamwork"],
    type: "image",
  },
  {
    id: 2,
    title: "React Workshop Session",
    description: "Intensive React workshop for club members",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    category: "Workshops",
    event: "React Masterclass",
    date: "2024-03-10",
    photographer: "Mike Rodriguez",
    likes: 89,
    comments: 12,
    views: 890,
    tags: ["react", "workshop", "learning", "javascript"],
    type: "image",
  },
  {
    id: 3,
    title: "Tech Talk: AI & Machine Learning",
    description: "Guest speaker discussing the future of AI",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    category: "Tech Talks",
    event: "AI Future Summit",
    date: "2024-03-08",
    photographer: "Emily Davis",
    likes: 156,
    comments: 24,
    views: 1680,
    tags: ["AI", "machine learning", "tech talk", "innovation"],
    type: "image",
  },
  {
    id: 4,
    title: "Code Review Session",
    description: "Collaborative code review and learning session",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Study Groups",
    event: "Weekly Code Review",
    date: "2024-03-05",
    photographer: "David Kim",
    likes: 67,
    comments: 8,
    views: 540,
    tags: ["code review", "collaboration", "learning"],
    type: "image",
  },
  {
    id: 5,
    title: "Mobile App Development Workshop",
    description: "Building cross-platform mobile apps with React Native",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Workshops",
    event: "Mobile Dev Workshop",
    date: "2024-02-28",
    photographer: "Lisa Wang",
    likes: 93,
    comments: 15,
    views: 720,
    tags: ["mobile", "react native", "app development"],
    type: "image",
  },
  {
    id: 6,
    title: "Open Source Contribution Drive",
    description: "Club members contributing to open source projects",
    imageUrl:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
    category: "Events",
    event: "Open Source Week",
    date: "2024-02-25",
    photographer: "James Wilson",
    likes: 112,
    comments: 19,
    views: 980,
    tags: ["open source", "contribution", "github", "collaboration"],
    type: "image",
  },
  {
    id: 7,
    title: "Database Design Workshop",
    description: "Learning advanced database design patterns",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "Workshops",
    event: "Database Masterclass",
    date: "2024-02-20",
    photographer: "Anna Patel",
    likes: 78,
    comments: 11,
    views: 645,
    tags: ["database", "SQL", "design patterns"],
    type: "image",
  },
  {
    id: 8,
    title: "Club Inauguration Ceremony",
    description: "Official launch of HackOrbit at PSIT College",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    category: "Events",
    event: "HackOrbit Launch",
    date: "2024-01-15",
    photographer: "Alex Johnson",
    likes: 245,
    comments: 45,
    views: 2150,
    tags: ["inauguration", "launch", "ceremony", "celebration"],
    type: "image",
  },
];

const categories = [
  "All",
  "Hackathons",
  "Workshops",
  "Tech Talks",
  "Study Groups",
  "Events",
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = mockGalleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              <Camera className="h-10 w-10 md:h-12 md:w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
              Gallery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore memories from our events, workshops, and hackathons
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <ImageIcon className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {mockGalleryItems.length}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Photos
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Eye className="h-6 w-6 md:h-8 md:w-8 text-green-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {mockGalleryItems
                    .reduce((sum, item) => sum + item.views, 0)
                    .toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Views
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {mockGalleryItems.reduce((sum, item) => sum + item.likes, 0)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Likes
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 text-center">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {categories.length - 1}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Events
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
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
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
            </CardContent>
          </Card>

          {/* Upload Section */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-purple-600/5">
            <CardContent className="p-6 md:p-8 text-center">
              <Upload className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg md:text-2xl font-bold text-foreground mb-4">
                Share Your Memories
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Upload photos from club events, workshops, or your projects to
                share with the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Upload Photos
                </Button>
                <Button variant="outline" size="lg">
                  <Video className="h-5 w-5 mr-2" />
                  Upload Videos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Actions */}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {item.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {item.comments}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {item.views}
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {item.photographer}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(item.date)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 h-32 md:h-24 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-xs w-fit mt-1 md:mt-0"
                          >
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm md:text-base">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {item.photographer}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(item.date)}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.event}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {item.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {item.comments}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.views}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No photos found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or upload some photos!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
