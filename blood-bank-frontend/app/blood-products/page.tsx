import { Button } from "@/components/ui/button"
import { BloodProductsTable } from "@/components/blood-products/blood-products-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chế phẩm máu | Blood Bank Management System",
  description: "Quản lý tiểu cầu và các chế phẩm máu",
}

export default function BloodProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý chế phẩm máu</h1>
        <Link href="/blood-products/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm chế phẩm máu
          </Button>
        </Link>
      </div>
      <BloodProductsTable />
    </div>
  )
}

