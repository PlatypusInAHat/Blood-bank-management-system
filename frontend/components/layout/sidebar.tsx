"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from "@/config/nav"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSidebarOpen: boolean
}

export function Sidebar({ className, isSidebarOpen }: SidebarProps) {
  const pathname = usePathname()

  if (!isSidebarOpen) {
    return null
  }

  return (
    <div className={cn("py-4", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "text-primary-foreground")} />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

