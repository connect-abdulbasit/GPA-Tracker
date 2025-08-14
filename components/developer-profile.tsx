"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Linkedin, Mail, Code, Heart } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface DeveloperProfileProps {
  variant?: "desktop" | "mobile"
  className?: string
}

export function DeveloperProfile({ variant = "desktop", className }: DeveloperProfileProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/connect-abdulbasit/", "_blank")
    setIsOpen(false)
  }

  const handleGithubClick = () => {
    window.open("https://github.com/connect-abdulbasit", "_blank")
    setIsOpen(false)
  }

  const isMobile = variant === "mobile"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isMobile ? (
          <Button 
            variant="ghost" 
            className={cn(
              "block w-full text-left rounded-md px-3 py-2 text-base font-medium text-foreground/60 hover:bg-primary/10 hover:text-foreground",
              className
            )}
          >
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Developer
            </div>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 text-foreground/70 hover:text-foreground",
              className
            )}
          >
            <Code className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline font-medium">Developer</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            Made with ❤️ by
          </DialogTitle>
          <DialogDescription className="text-sm">
            Connect with the developer behind GPA Tracker
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Developer Info */}
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg border border-primary/10">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarImage src="/developer.jpeg" alt="Abdul Basit" />
              <AvatarFallback className="text-lg font-semibold bg-primary/10">AB</AvatarFallback>
            </Avatar>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Abdul Basit
              </h3>
              <p className="text-sm text-muted-foreground font-medium">Full-Stack Developer & AI Enthusiast</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">React</Badge>
                <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">Next.js</Badge>
                <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">TypeScript</Badge>
                <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">Node.js</Badge>
                <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/20">Supabase</Badge>
                <Badge variant="secondary" className="text-xs bg-pink-500/10 text-pink-600 border-pink-500/20">tRPC</Badge>
                <Badge variant="secondary" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Python</Badge>
                <Badge variant="secondary" className="text-xs bg-indigo-500/10 text-indigo-600 border-indigo-500/20">JavaScript</Badge>
              </div>
            </div>
          </div>

                    {/* About */}
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg border">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              About
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Passionate Full-Stack Developer with a strong focus on backend development and modern web technologies. 
              Currently pursuing a Bachelor's in Computer Science. I love turning ideas into real-world web applications, 
              building scalable systems, and solving complex problems using cutting-edge technologies. 
              This GPA Tracker is built with React, Next.js, TypeScript, Supabase, tRPC, Python, and Better Auth, 
              providing students with powerful tools to track and improve their academic performance.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2 p-3 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg border border-green-500/10">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded-md border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">GPA Tracking & Analytics</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded-md border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Semester Management</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-md border border-purple-500/20">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-400">Course & Assessment Tracking</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded-md border border-orange-500/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-400">Study Resources</span>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="space-y-2 p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-blue-500/10">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Connect
            </h4>
            <div className="flex gap-2">
              <Button 
                onClick={handleLinkedInClick}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 transition-all duration-200"
                size="sm"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              <Button 
                onClick={handleGithubClick}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white border-gray-900 hover:border-gray-800 transition-all duration-200"
                size="sm"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-primary/10">
            <p className="text-xs text-center text-muted-foreground font-medium">
              GPA Tracker v1.0 • Built with Next.js & Better Auth
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Built with Modern Web Technologies & Best Practices
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
