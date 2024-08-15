"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { useState } from "react"
import { useEffect } from "react"


export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme,theme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
        <Button variant="unstyled" size="icon" onClick={() => setTheme(theme == "dark"?'light':'dark')}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#27282a]" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#27282a]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  )
}
