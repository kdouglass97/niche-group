import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-medium">Wine Enthusiasts</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8 text-center">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-3xl font-serif font-medium mb-4">Thank You for Joining</h1>
          <p className="text-muted-foreground mb-8">
            We're thrilled to have you join our waitlist. We'll notify you once we launch with exclusive offers for our early supporters.
          </p>
          <div className="bg-secondary/30 p-6 rounded-lg mb-8">
            <h2 className="font-medium mb-2">What's Next?</h2>
            <p className="text-sm text-muted-foreground">
              Keep an eye on your inbox for updates about our launch and exclusive early access opportunities.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Wine Enthusiasts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 