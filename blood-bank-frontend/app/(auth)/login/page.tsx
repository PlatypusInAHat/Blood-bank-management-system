import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Đăng nhập | Hệ thống Quản lý Ngân hàng Máu",
  description: "Đăng nhập vào hệ thống quản lý ngân hàng máu",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex items-center justify-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Ngân hàng Máu</h1>
          </div>
          <p className="text-sm text-muted-foreground">Đăng nhập để truy cập hệ thống quản lý</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/forgot-password" className="hover:text-brand underline underline-offset-4">
            Quên mật khẩu?
          </Link>
        </p>
      </div>
    </div>
  )
}

