import { BloodProductForm } from "@/components/blood-products/blood-product-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thêm chế phẩm máu | Blood Bank Management System",
  description: "Thêm tiểu cầu và các chế phẩm máu mới",
}

export default function AddBloodProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thêm chế phẩm máu mới</h1>
      </div>
      <BloodProductForm />
    </div>
  )
}

