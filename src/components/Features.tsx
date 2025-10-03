import { Card } from "@/components/ui/card";
import { Brain, MessageCircle, Target, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Personalized Study Plans",
    description: "Custom study plans tailored to each student's performance and pace.",
    color: "text-primary",
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot Help",
    description: "Instant doubt-solving with AI-powered interactive chatbot support.",
    color: "text-secondary",
  },
  {
    icon: Target,
    title: "Micro-Quizzes",
    description: "Quick quizzes to reinforce learning and track progress in real-time.",
    color: "text-accent",
  },
  {
    icon: Lightbulb,
    title: "Resource Suggestions",
    description: "AI-curated study materials: YouTube videos, PDFs, and notes.",
    color: "text-primary",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to excel in your studies, powered by artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card shadow-md hover:shadow-lg transition-smooth group hover:-translate-y-2 border-border"
            >
              <div className="space-y-4">
                <div className={`${feature.color} w-12 h-12 flex items-center justify-center rounded-lg bg-muted group-hover:scale-110 transition-bounce`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
