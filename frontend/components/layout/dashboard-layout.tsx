"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { UserNav } from "@/components/layout/user-nav"
import { MobileNav } from "@/components/layout/mobile-nav"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <MainNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <MobileNav />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        {isSidebarOpen && (
          <aside className="hidden md:flex w-[220px] lg:w-[260px] flex-col border-r bg-muted/30">
            <Sidebar isSidebarOpen={isSidebarOpen} className="flex-1" />
          </aside>
        )}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

