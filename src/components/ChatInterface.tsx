import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, MessageCircle, Target, Lightbulb, Send, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PRESET_PROMPTS = [
  {
    icon: Brain,
    label: "Explain Concept",
    prompt: "Explain this concept in simple terms with examples:",
    color: "text-primary"
  },
  {
    icon: Target,
    label: "Create Quiz",
    prompt: "Create 5 multiple choice questions to test understanding of:",
    color: "text-accent"
  },
  {
    icon: Lightbulb,
    label: "Study Tips",
    prompt: "Give me effective study strategies and tips for learning:",
    color: "text-secondary"
  },
  {
    icon: MessageCircle,
    label: "Solve Doubt",
    prompt: "Help me understand and solve this problem:",
    color: "text-muted-foreground"
  }
];

const ChatInterface = () => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
  const [showSettings, setShowSettings] = useState(!localStorage.getItem("gemini_api_key"));
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setShowSettings(false);
      toast({ title: "API Key saved successfully!" });
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!apiKey.trim()) {
      toast({ title: "Please set your Gemini API key first", variant: "destructive" });
      setShowSettings(true);
      return;
    }

    const userMessage = { role: "user" as const, content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: messageText }] }]
          })
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response";
      
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      toast({ title: "Error communicating with AI", variant: "destructive" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (prompt: string) => {
    setInput(prompt + " ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Learning Assistant
          </h1>
          <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {showSettings && (
          <Card className="p-4 space-y-3 animate-in slide-in-from-top">
            <label className="text-sm font-medium">Gemini API Key</label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
              />
              <Button onClick={saveApiKey}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a href="https://aistudio.google.com/apikey" target="_blank" className="underline">
                Google AI Studio
              </a>
            </p>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRESET_PROMPTS.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:shadow-md transition-all"
              onClick={() => handlePresetClick(preset.prompt)}
            >
              <preset.icon className={`h-6 w-6 ${preset.color}`} />
              <span className="text-xs font-medium">{preset.label}</span>
            </Button>
          ))}
        </div>

        <Card className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Select a preset prompt or type your question below</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) sendMessage(input);
                  }
                }}
              />
              <Button
                onClick={() => input.trim() && sendMessage(input)}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
