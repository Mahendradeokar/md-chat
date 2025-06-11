"use client";

import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";
import { Checkbox } from "~/components/ui/checkbox";
import { Slider } from "~/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import {
  Settings,
  MessageSquare,
  User,
  Bell,
  Palette,
  Volume2,
  Moon,
  Sun,
  Zap,
  Heart,
  Star,
} from "lucide-react";

export default function ComponentShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [selectedModel, setSelectedModel] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="min-h-screen overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            T3.chat Neo-Pop Components
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive showcase of our minimalist design system
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="default">Neo-Pop Design</Badge>
            <Badge variant="secondary">Shadcn/UI</Badge>
            <Badge variant="outline">Modern Interface</Badge>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Buttons Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Buttons & Actions
              </CardTitle>
              <CardDescription>
                Interactive button components with neo-pop styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <Button variant="destructive" className="w-full">
                Destructive Action
              </Button>
              <Button size="sm" className="w-full">
                Small Button
              </Button>
              <Button size="lg" className="w-full">
                Large Button
              </Button>
            </CardContent>
          </Card>

          {/* Form Inputs Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Form Elements
              </CardTitle>
              <CardDescription>Input fields and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude">Claude 3</SelectItem>
                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>
                Avatar and user information display
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Premium User</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Pro
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-semibold">127</p>
                  <p className="text-xs text-muted-foreground">Chats</p>
                </div>
                <div>
                  <p className="font-semibold">8.9k</p>
                  <p className="text-xs text-muted-foreground">Messages</p>
                </div>
                <div>
                  <p className="font-semibold">94%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings & Controls
              </CardTitle>
              <CardDescription>
                Toggle switches and preference controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    {darkMode ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark theme
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Volume ({volume[0]}%)
                </Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked: CheckedState) =>
                    setAgreedToTerms(checked === true)
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Theme Customization Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Showcase
              </CardTitle>
              <CardDescription>
                Neo-pop design elements in action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-primary border-2 border-borderColor rounded-lg neo-pop-shadow-sm hover:neo-pop-shadow transition-all duration-200 flex items-center justify-center text-primary-foreground font-semibold cursor-pointer">
                  Primary
                </div>
                <div className="h-12 bg-secondary border-2 border-borderColor rounded-lg neo-pop-shadow-sm hover:neo-pop-shadow transition-all duration-200 flex items-center justify-center text-secondary-foreground font-semibold cursor-pointer">
                  Secondary
                </div>
                <div className="h-12 bg-accent border-2 border-borderColor rounded-lg neo-pop-shadow-sm hover:neo-pop-shadow transition-all duration-200 flex items-center justify-center text-accent-foreground font-semibold cursor-pointer">
                  Accent
                </div>
                <div className="h-12 bg-muted border-2 border-borderColor rounded-lg neo-pop-shadow-sm hover:neo-pop-shadow transition-all duration-200 flex items-center justify-center text-muted-foreground font-semibold cursor-pointer">
                  Muted
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect rating showcase
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Open Dialog Example
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neo-Pop Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog demonstrates our refined neo-pop styling with
                      clean borders and subtle shadows.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Enter something..." />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Interactive Features Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Interactive Elements
              </CardTitle>
              <CardDescription>
                Hover effects and micro-interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-16 hover:scale-105 transition-transform duration-200"
                >
                  Hover Me
                </Button>
                <Button
                  variant="secondary"
                  className="h-16 hover:rotate-3 transition-transform duration-200"
                >
                  Tilt Effect
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Interaction States:</p>
                <div className="flex gap-2">
                  <Badge className="cursor-pointer hover:scale-110 transition-transform">
                    Active
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    Hover
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    Focus
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  All components feature consistent neo-pop styling with:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 2px borders for definition</li>
                  <li>• Subtle shadow effects</li>
                  <li>• Smooth hover transitions</li>
                  <li>• Rounded corner consistency</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            T3.chat Neo-Pop Design System • Built with shadcn/ui • Inspired by
            Jony Ive & Dieter Rams
          </p>
        </div>
      </div>
    </div>
  );
}
