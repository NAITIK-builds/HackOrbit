import {
  BookOpen,
  Code2,
  Download,
  Filter,
  Search,
  ExternalLink,
  Star,
  Clock,
  Users,
  Play,
  FileText,
  Video,
  Link as LinkIcon,
  Github,
  Globe,
  Bookmark,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "React Complete Guide 2024",
    description:
      "Master React from basics to advanced concepts including hooks, context, and performance optimization.",
    category: "Frontend",
    type: "Course",
    difficulty: "Beginner",
    duration: "12 hours",
    rating: 4.8,
    students: 1250,
    author: "Sarah Johnson",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    link: "https://example.com/react-guide",
    isPremium: false,
    addedDate: "2024-01-15",
    thumbnail: "📚",
  },
  {
    id: 2,
    title: "Python Data Science Toolkit",
    description:
      "Complete collection of Python libraries and tools for data science including NumPy, Pandas, and Matplotlib.",
    category: "Data Science",
    type: "Resource",
    difficulty: "Intermediate",
    duration: "Self-paced",
    rating: 4.9,
    students: 890,
    author: "Dr. Alex Chen",
    tags: ["Python", "Data Science", "Machine Learning", "Analytics"],
    link: "https://example.com/python-ds",
    isPremium: true,
    addedDate: "2024-01-20",
    thumbnail: "🐍",
  },
  {
    id: 3,
    title: "Full Stack Web Development Bootcamp",
    description:
      "Learn to build complete web applications using React, Node.js, Express, and MongoDB.",
    category: "Full Stack",
    type: "Course",
    difficulty: "Intermediate",
    duration: "24 hours",
    rating: 4.7,
    students: 2100,
    author: "Mike Rodriguez",
    tags: ["React", "Node.js", "MongoDB", "Express", "Full Stack"],
    link: "https://example.com/fullstack-bootcamp",
    isPremium: false,
    addedDate: "2024-01-10",
    thumbnail: "🌐",
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description:
      "Build native mobile apps for iOS and Android using React Native and JavaScript.",
    category: "Mobile",
    type: "Course",
    difficulty: "Advanced",
    duration: "18 hours",
    rating: 4.6,
    students: 750,
    author: "Emily Davis",
    tags: ["React Native", "Mobile", "iOS", "Android", "JavaScript"],
    link: "https://example.com/react-native",
    isPremium: true,
    addedDate: "2024-01-25",
    thumbnail: "📱",
  },
  {
    id: 5,
    title: "Git & GitHub Mastery",
    description:
      "Master version control with Git and collaborative development with GitHub.",
    category: "DevOps",
    type: "Tutorial",
    difficulty: "Beginner",
    duration: "4 hours",
    rating: 4.9,
    students: 1800,
    author: "David Kim",
    tags: ["Git", "GitHub", "Version Control", "DevOps"],
    link: "https://example.com/git-github",
    isPremium: false,
    addedDate: "2024-02-01",
    thumbnail: "🔧",
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    description:
      "Learn design principles, user research, wireframing, and prototyping for modern interfaces.",
    category: "Design",
    type: "Course",
    difficulty: "Beginner",
    duration: "8 hours",
    rating: 4.8,
    students: 920,
    author: "Lisa Wang",
    tags: ["UI/UX", "Design", "Figma", "Prototyping"],
    link: "https://example.com/uiux-design",
    isPremium: false,
    addedDate: "2024-02-05",
    thumbnail: "🎨",
  },
  {
    id: 7,
    title: "JavaScript ES6+ Modern Features",
    description:
      "Deep dive into modern JavaScript features including async/await, destructuring, and modules.",
    category: "Frontend",
    type: "Tutorial",
    difficulty: "Intermediate",
    duration: "6 hours",
    rating: 4.7,
    students: 1500,
    author: "James Wilson",
    tags: ["JavaScript", "ES6", "Modern JS", "Frontend"],
    link: "https://example.com/js-es6",
    isPremium: false,
    addedDate: "2024-02-10",
    thumbnail: "⚡",
  },
  {
    id: 8,
    title: "Docker & Kubernetes for Developers",
    description:
      "Learn containerization with Docker and orchestration with Kubernetes for modern deployments.",
    category: "DevOps",
    type: "Course",
    difficulty: "Advanced",
    duration: "16 hours",
    rating: 4.8,
    students: 680,
    author: "Anna Patel",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
    link: "https://example.com/docker-k8s",
    isPremium: true,
    addedDate: "2024-02-15",
    thumbnail: "🐳",
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "Data Science",
  "DevOps",
  "Design",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const types = ["All", "Course", "Tutorial", "Resource", "Documentation"];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      resource.difficulty === selectedDifficulty;
    const matchesType =
      selectedType === "All" || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Course":
        return <Play className="h-4 w-4" />;
      case "Tutorial":
        return <Video className="h-4 w-4" />;
      case "Resource":
        return <Download className="h-4 w-4" />;
      case "Documentation":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Backend:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Full Stack":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      Mobile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Data Science":
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      DevOps: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
      Design: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
              Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated learning materials and tools for your tech journey
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {mockResources.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Resources
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {mockResources
                    .reduce((sum, resource) => sum + resource.students, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Enrolled
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {(
                    mockResources.reduce(
                      (sum, resource) => sum + resource.rating,
                      0,
                    ) / mockResources.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">
                  Hours of Content
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
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
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {/* Difficulty Filter */}
                <div className="flex gap-1">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={
                        selectedDifficulty === difficulty
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>

                {/* Type Filter */}
                <div className="flex gap-1">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                    >
                      {getTypeIcon(type)}
                      <span className="ml-1">{type}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{resource.thumbnail}</div>
                    <div className="flex gap-2">
                      {resource.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Premium
                        </Badge>
                      )}
                      <Badge
                        className={getDifficultyColor(resource.difficulty)}
                      >
                        {resource.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {resource.duration}
                    </div>
                  </div>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {resource.rating}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {resource.students.toLocaleString()} students
                    </div>
                  </div>

                  {/* Category and Author */}
                  <div className="space-y-2">
                    <Badge className={getCategoryColor(resource.category)}>
                      {resource.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      By {resource.author}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" asChild>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Access
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No resources found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}

          {/* Submit Resource */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-blue-600/5">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Share Your Knowledge
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have a great resource to share with the HackOrbit community?
                Submit your favorite learning materials, tools, or tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-blue-600"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Submit Resource
                </Button>
                <Button variant="outline" size="lg">
                  <Github className="h-5 w-5 mr-2" />
                  Contribute on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
