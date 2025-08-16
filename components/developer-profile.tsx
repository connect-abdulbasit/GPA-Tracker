"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

  const handleEmailClick = () => {
    window.open("mailto:contact.abdulbasit.cs@gmail.com", "_blank")
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
            <div className="flex gap-2">
              <Button 
                onClick={handleEmailClick}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 transition-all duration-200"
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}