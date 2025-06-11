import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Bell, Shield, Palette, Download, Trash2, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [userName, setUserName] = useState("MD");
  const [email, setEmail] = useState("md@example.com");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-screen bg-background">
      <main className="h-screen overflow-y-auto bg-background">
        {/* Header */}
        <div className="px-8 py-6 border-b border-borderColor bg-card/50">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 neo-pop-shadow-sm border-2 border-borderColor">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Profile Section */}
            <Card className="border-2 border-borderColor neo-pop-shadow bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" size="sm" className="neo-pop-shadow-sm border-2">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border-2 neo-pop-shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-2 neo-pop-shadow-sm"
                    />
                  </div>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neo-pop-shadow border-2 border-primary">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card className="border-2 border-borderColor neo-pop-shadow bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--neo-blue))] to-[hsl(220,90%,55%)] rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Push Notifications</h3>
                    <p className="text-xs text-muted-foreground">Receive notifications for new messages</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Email Updates</h3>
                    <p className="text-xs text-muted-foreground">Get weekly summaries via email</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card className="border-2 border-borderColor neo-pop-shadow bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--neo-purple))] to-[hsl(270,70%,55%)] rounded-lg flex items-center justify-center">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Theme</h3>
                    <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Section */}
            <Card className="border-2 border-borderColor neo-pop-shadow bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--neo-orange))] to-[hsl(25,85%,50%)] rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Data Collection</h3>
                    <p className="text-xs text-muted-foreground">Allow usage analytics</p>
                  </div>
                  <Switch
                    checked={dataCollection}
                    onCheckedChange={setDataCollection}
                  />
                </div>
                
                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full justify-start border-2 neo-pop-shadow-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 border-2 neo-pop-shadow-sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Section */}
            <Card className="border-2 border-borderColor neo-pop-shadow bg-card md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Plan</CardTitle>
                  <span className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full border">
                    Free
                  </span>
                </div>
                <CardDescription>
                  Upgrade to Pro for unlimited conversations and advanced features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neo-pop-shadow border-2 border-primary">
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