"use client";

import { Button } from "~/components/ui/button";
import { Star, Compass, Code, GraduationCap } from "lucide-react";
import { useUser } from "~/hooks/use-user";
import { EventService } from "~/lib/modules/EventService";

const suggestedPrompts = [
  {
    id: 1,
    title: "How does AI work?",
    category: "Create",
    icon: Star,
    gradient: "from-[hsl(var(--neo-emerald))] to-[hsl(160,65%,40%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-emerald))]",
  },
  {
    id: 2,
    title: "Are black holes real?",
    category: "Explore",
    icon: Compass,
    gradient: "from-[hsl(var(--neo-blue))] to-[hsl(220,90%,55%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-blue))]",
  },
  {
    id: 3,
    title: "How many Rs are in 'strawberry'?",
    category: "Code",
    icon: Code,
    gradient: "from-[hsl(var(--neo-purple))] to-[hsl(270,70%,55%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-purple))]",
  },
  {
    id: 4,
    title: "What is the meaning of life?",
    category: "Learn",
    icon: GraduationCap,
    gradient: "from-[hsl(var(--neo-orange))] to-[hsl(25,85%,50%)]",
    hoverColor: "group-hover:text-[hsl(var(--neo-orange))]",
  },
];

export default function MainContent() {
  const { user } = useUser();
  return (
    <>
      {/* Chat Area */}
      <div className="flex flex-1 flex-col items-center justify-end px-8 py-8">
        {/* Welcome Greeting */}
        <div className="animate-fade-in mb-12 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-bold">
            How can I help you,{" "}
            <span className="text-[hsl(var(--neo-emerald))]">
              {user.firstName}
            </span>
            ?
          </h2>
        </div>

        {/* Suggested Prompts */}
        <div className="animate-slide-up mb-16 grid w-full max-w-4xl grid-cols-2 gap-4">
          {suggestedPrompts.map((prompt) => {
            const IconComponent = prompt.icon;
            return (
              <Button
                key={prompt.id}
                variant="ghost"
                className="group bg-card dark:bg-card border-borderColor neo-pop-shadow hover:neo-pop-shadow-lg h-auto justify-start rounded-xl border-2 p-6 text-left transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() =>
                  EventService.broadcast(
                    EventService.EVENTS.SUGGESTED_PROMPT_CLICKED,
                    prompt.title,
                  )
                }
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`h-12 w-12 bg-linear-to-br ${prompt.gradient} flex shrink-0 items-center justify-center rounded-xl text-black shadow-lg`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-foreground font-medium transition-colors duration-150 ${prompt.hoverColor} break-words`}
                    >
                      {prompt.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {prompt.category}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}
