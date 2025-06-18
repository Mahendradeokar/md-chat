import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Download,
  Trash2,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "~/components/theme-provider";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [userName, setUserName] = useState("MD");
  const [email, setEmail] = useState("md@example.com");
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background min-h-screen w-screen">
      <main className="bg-background h-screen overflow-y-auto">
        {/* Header */}
        <div className="border-borderColor bg-card/50 border-b px-8 py-6">
          <div className="mb-4 flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="neo-pop-shadow-sm border-borderColor border-2 p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-foreground text-3xl font-bold">Settings</h1>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 px-8 py-8">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Profile Section */}
            <Card className="border-borderColor neo-pop-shadow bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <User className="text-primary-foreground h-4 w-4" />
                  </div>
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="neo-pop-shadow-sm border-2"
                    >
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-foreground mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="neo-pop-shadow-sm border-2"
                    />
                  </div>
                  <div>
                    <label className="text-foreground mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="neo-pop-shadow-sm border-2"
                    />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neo-pop-shadow border-primary border-2">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card className="border-borderColor neo-pop-shadow bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[hsl(var(--neo-blue))] to-[hsl(220,90%,55%)]">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground text-sm font-medium">
                      Push Notifications
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Receive notifications for new messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground text-sm font-medium">
                      Email Updates
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Get weekly summaries via email
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card className="border-borderColor neo-pop-shadow bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[hsl(var(--neo-purple))] to-[hsl(270,70%,55%)]">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground text-sm font-medium">
                      Theme
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Switch between light and dark mode
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Section */}
            <Card className="border-borderColor neo-pop-shadow bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[hsl(var(--neo-orange))] to-[hsl(25,85%,50%)]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground text-sm font-medium">
                      Data Collection
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Allow usage analytics
                    </p>
                  </div>
                  <Switch
                    checked={dataCollection}
                    onCheckedChange={setDataCollection}
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    variant="outline"
                    className="neo-pop-shadow-sm w-full justify-start border-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="neo-pop-shadow-sm w-full justify-start border-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Section */}
            <Card className="border-borderColor neo-pop-shadow bg-card border-2 md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Plan</CardTitle>
                  <span className="bg-secondary text-secondary-foreground rounded-full border px-3 py-1 text-sm">
                    Free
                  </span>
                </div>
                <CardDescription>
                  Upgrade to Pro for unlimited conversations and advanced
                  features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neo-pop-shadow border-primary border-2">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
