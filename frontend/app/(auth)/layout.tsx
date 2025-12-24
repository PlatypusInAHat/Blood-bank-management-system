import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Xác thực | Hệ thống Quản lý Ngân hàng Máu",
  description: "Xác thực người dùng cho hệ thống quản lý ngân hàng máu",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

