import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Rocket,
  Code2,
  Users,
  Trophy,
  BookOpen,
  Camera,
  Terminal,
  Cpu,
  Database,
  GitBranch,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Calendar,
} from "lucide-react";

export default function Index() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Welcome Badge */}
          <div className="mb-8 animate-fade-in-up">
            <Badge
              variant="secondary"
              className="px-6 py-3 text-sm font-medium border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:border-primary/40"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              🚀 Innovation • Collaboration • Excellence
            </Badge>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight animate-fade-in-up animation-delay-200">
            <span className="block mb-2">Welcome to</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                HackOrbit
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            </span>
          </h1>

          {/* Enhanced Subheading */}
          <h2 className="text-xl md:text-2xl lg:text-4xl text-muted-foreground mb-10 font-medium animate-fade-in-up animation-delay-400">
            The Official Tech Club of{" "}
            <span className="text-foreground font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text">
              PSIT College of Higher Education
            </span>
          </h2>

          {/* Enhanced Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            Join a community of passionate developers, innovators, and tech
            enthusiasts. Build projects, compete in hackathons, learn
            cutting-edge technologies, and shape the future of technology
            together.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in-up animation-delay-800">
            <Button
              size="lg"
              className="text-lg px-10 py-8 h-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group border-0"
              asChild
            >
              <Link to="/join">
                <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Join HackOrbit
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-8 h-auto group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link to="/resources">
                <Code2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Explore Resources
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            What We Offer
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Discover opportunities to grow, learn, and excel in technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Enhanced Feature Cards */}
          {[
            {
              icon: Trophy,
              title: "Leaderboard",
              description:
                "Track your progress and compete with fellow members in coding challenges and projects.",
              link: "/leaderboard",
              linkText: "View Rankings",
              color: "from-yellow-400 to-orange-500",
              delay: "animation-delay-300",
            },
            {
              icon: BookOpen,
              title: "Resources",
              description:
                "Access curated learning materials, tutorials, and tools to enhance your skills.",
              link: "/resources",
              linkText: "Browse Resources",
              color: "from-green-400 to-blue-500",
              delay: "animation-delay-400",
            },
            {
              icon: Camera,
              title: "Gallery",
              description:
                "Explore moments from our events, workshops, and hackathons.",
              link: "/gallery",
              linkText: "View Gallery",
              color: "from-purple-400 to-pink-500",
              delay: "animation-delay-500",
            },
            {
              icon: Users,
              title: "Community",
              description:
                "Connect with like-minded peers and build lasting professional relationships.",
              link: "/profile",
              linkText: "Join Community",
              color: "from-blue-400 to-cyan-500",
              delay: "animation-delay-600",
            },
            {
              icon: GitBranch,
              title: "Projects",
              description:
                "Collaborate on real-world projects and build your portfolio.",
              link: "/resources",
              linkText: "Explore Projects",
              color: "from-indigo-400 to-purple-500",
              delay: "animation-delay-700",
            },
            {
              icon: Zap,
              title: "Events",
              description:
                "Participate in workshops, hackathons, and tech talks by industry experts.",
              link: "/gallery",
              linkText: "View Events",
              color: "from-pink-400 to-red-500",
              delay: "animation-delay-800",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up ${feature.delay} overflow-hidden`}
            >
              {/* Card background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Icon with enhanced styling */}
              <div
                className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              <h4 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h4>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              <Button
                variant="ghost"
                className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-2 transition-all duration-300"
                asChild
              >
                <Link
                  to={feature.link}
                  className="flex items-center font-semibold"
                >
                  {feature.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-4 border-background animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center mb-6">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Trusted by 500+ students
                </span>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-8 animate-fade-in-up">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Tech Journey?
              </span>
            </h3>

            <p className="text-xl text-muted-foreground mb-10 animate-fade-in-up animation-delay-200">
              Join HackOrbit today and be part of a thriving community of
              innovators and creators shaping tomorrow's technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
              <Button
                size="lg"
                className="px-12 py-8 h-auto text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-1 transition-all duration-300 group"
                asChild
              >
                <Link to="/join">
                  <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Join Now
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-12 py-8 h-auto text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                asChild
              >
                <Link to="/login">Already a member? Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
