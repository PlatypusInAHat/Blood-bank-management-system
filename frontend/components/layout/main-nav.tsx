"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Droplet } from "lucide-react"

interface MainNavProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function MainNav({ isSidebarOpen, setIsSidebarOpen }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Droplet className="h-6 w-6 text-red-600" />
        <span className="hidden font-bold sm:inline-block">Hệ thống Quản lý Ngân hàng Máu</span>
      </Link>
    </div>
  )
}

