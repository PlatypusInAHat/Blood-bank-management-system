import { Button } from "@/components/ui/button"
import { UsersTable } from "@/components/users/users-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Users | Blood Bank Management System",
  description: "Manage system users",
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <Link href="/users/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </Button>
        </Link>
      </div>
      <UsersTable />
    </div>
  )
}

