import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground border border-primary-foreground/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Start Learning Smarter Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Get Started with ClassGeine Today!
          </h2>
          
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their learning experience with AI-powered personalized education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
