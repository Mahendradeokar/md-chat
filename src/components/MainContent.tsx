import { Button } from "@/components/ui/button";
import { Star, Compass, Code, GraduationCap } from "lucide-react";
import MessageInput from "./MessageInput";

const suggestedPrompts = [
  {
    id: 1,
    title: "How does AI work?",
    category: "Create",
    icon: Star,
    gradient: "from-[hsl(var(--neo-emerald))] to-[hsl(160,65%,40%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-emerald))]"
  },
  {
    id: 2,
    title: "Are black holes real?",
    category: "Explore",
    icon: Compass,
    gradient: "from-[hsl(var(--neo-blue))] to-[hsl(220,90%,55%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-blue))]"
  },
  {
    id: 3,
    title: "How many Rs are in 'strawberry'?",
    category: "Code",
    icon: Code,
    gradient: "from-[hsl(var(--neo-purple))] to-[hsl(270,70%,55%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-purple))]"
  },
  {
    id: 4,
    title: "What is the meaning of life?",
    category: "Learn",
    icon: GraduationCap,
    gradient: "from-[hsl(var(--neo-orange))] to-[hsl(25,85%,50%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-orange))]"
  }
];

export default function MainContent() {
  return (
    <main className="flex-1 flex flex-col bg-background h-full">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        {/* Welcome Greeting */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            How can I help you, <span className="text-[hsl(var(--neo-emerald))]">MD</span>?
          </h2>
        </div>

        {/* Suggested Prompts */}
        <div className="grid grid-cols-2 gap-4 mb-16 w-full max-w-4xl animate-slide-up">
          {suggestedPrompts.map((prompt) => {
            const IconComponent = prompt.icon;
            return (
              <Button
                key={prompt.id}
                variant="ghost"
                className="group p-6 bg-card dark:bg-card rounded-xl border-2 border-border neo-pop-shadow hover:neo-pop-shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] text-left h-auto justify-start"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${prompt.gradient} rounded-xl flex items-center justify-center text-black shadow-lg flex-shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-foreground transition-colors duration-150 ${prompt.hoverColor} break-words`}>
                      {prompt.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {prompt.category}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Message Input Area */}
      <MessageInput />
    </main>
  );
}
