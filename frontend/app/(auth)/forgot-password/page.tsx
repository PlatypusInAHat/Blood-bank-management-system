import type { Metadata } from "next"
import Link from "next/link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Quên mật khẩu | Hệ thống Quản lý Ngân hàng Máu",
  description: "Khôi phục mật khẩu cho tài khoản của bạn",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">Nhập email của bạn để nhận liên kết đặt lại mật khẩu</p>
        </div>
        <ForgotPasswordForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}

