"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const forgotPasswordFormSchema = z.object({
  email: z.string().min(1, { message: "Email không được để trống" }).email({ message: "Email không hợp lệ" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)

    try {
      // Giả lập gửi email đặt lại mật khẩu
      // Trong thực tế, bạn sẽ gọi API ở đây
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Liên kết đặt lại mật khẩu đã được gửi",
        description: "Vui lòng kiểm tra hộp thư email của bạn",
      })
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi",
        description: "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@bloodbank.org" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Gửi liên kết đặt lại mật khẩu
        </Button>
      </form>
    </Form>
  )
}

