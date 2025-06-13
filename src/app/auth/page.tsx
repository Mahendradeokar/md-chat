"use client";

import { GoogleIcon } from "~/components/shared";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";


export default function AuthPage() {
  const { signIn } = useAuthActions()
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Welcome to T3.chat</CardTitle>
            <CardDescription>
              Sign in with your Google account to start chatting with AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={() => signIn("google")}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground relative h-12 w-full overflow-hidden text-base font-medium"
              variant="outline"
            >
              <GoogleIcon className="mr-3 h-5 w-5 text-red-500" />
              Continue with Google
            </Button>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background text-muted-foreground px-3 text-sm">
                  Secure Authentication
                </span>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>By signing in, you agree to our</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <button className="text-primary hover:underline">
                    Terms of Service
                  </button>
                  <span>•</span>
                  <button className="text-primary hover:underline">
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-center">
          <p className="text-muted-foreground text-xs">T3.chat</p>
        </div>
    </div>
  );
}
