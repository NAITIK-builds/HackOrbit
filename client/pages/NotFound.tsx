import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Code2, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-muted-foreground/10 animate-float">
        <Code2 size={60} />
      </div>
      <div className="absolute bottom-20 right-20 text-muted-foreground/10 animate-float-delayed">
        <Zap size={80} />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital void. Let's get you back to familiar territory.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">
              Looking for something specific?
            </h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Try exploring our main sections:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: "Leaderboard", href: "/leaderboard" },
              { name: "Resources", href: "/resources" },
              { name: "Gallery", href: "/gallery" },
              { name: "Profile", href: "/profile" },
            ].map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                asChild
              >
                <Link to={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
