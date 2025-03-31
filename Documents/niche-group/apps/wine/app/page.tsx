import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-medium">Wine Enthusiasts</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="#about" className="text-sm hover:text-primary transition">About</Link>
            <Link href="#features" className="text-sm hover:text-primary transition">Features</Link>
            <Link href="#join" className="text-sm hover:text-primary transition">Join Us</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6">
                Discover the World of <span className="text-primary">Fine Wine</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join our exclusive community of wine enthusiasts to explore, learn, and 
                elevate your wine experience with like-minded connoisseurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/signup">Join the Waitlist</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-16">
              Why Join Our Community
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Exclusive Tastings",
                  description: "Access to member-only wine tastings with renowned sommeliers",
                  icon: "🍷"
                },
                {
                  title: "Expert Knowledge",
                  description: "Learn from seasoned wine experts through articles and webinars",
                  icon: "📚"
                },
                {
                  title: "Connect with Enthusiasts",
                  description: "Build relationships with fellow wine lovers from around the world",
                  icon: "🌎"
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-card rounded-lg p-8 shadow-sm">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-serif text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto bg-card rounded-lg p-8 md:p-10 shadow-md">
              <h2 className="text-3xl font-serif font-medium mb-6 text-center">
                Join Our Waitlist
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Be the first to know when we launch and receive exclusive offers.
              </p>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full" size="lg">
                    Join the Waitlist
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-serif font-medium">Wine Enthusiasts</h2>
              <p className="text-sm text-muted-foreground mt-1">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 