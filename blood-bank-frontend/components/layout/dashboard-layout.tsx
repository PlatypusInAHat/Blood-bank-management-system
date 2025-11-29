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
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <MobileNav />
          <UserNav />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar isSidebarOpen={isSidebarOpen} className="hidden md:block" />
        <main className="flex w-full flex-col overflow-hidden p-6">{children}</main>
      </div>
    </div>
  )
}

