"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const bloodProductFormSchema = z.object({
  donorId: z.string().min(1, { message: "Vui lòng nhập mã người hiến máu" }),
  productType: z.string().min(1, { message: "Vui lòng chọn loại chế phẩm" }),
  bloodType: z.string().min(1, { message: "Vui lòng chọn nhóm máu" }),
  volume: z.string().min(1, { message: "Vui lòng nhập thể tích" }),
  processingDate: z.string().min(1, { message: "Vui lòng nhập ngày chế biến" }),
  expiryDate: z.string().min(1, { message: "Vui lòng nhập ngày hết hạn" }),
  location: z.string().min(1, { message: "Vui lòng nhập vị trí lưu trữ" }),
  notes: z.string().optional(),
})

type BloodProductFormValues = z.infer<typeof bloodProductFormSchema>

export function BloodProductForm() {
  const router = useRouter()

  const defaultValues: Partial<BloodProductFormValues> = {
    processingDate: new Date().toISOString().split("T")[0],
    notes: "",
  }

  const form = useForm<BloodProductFormValues>({
    resolver: zodResolver(bloodProductFormSchema),
    defaultValues,
  })

  function onSubmit(data: BloodProductFormValues) {
    console.log(data)
    // Trong thực tế, đây là nơi bạn sẽ gửi dữ liệu đến API
    router.push("/blood-products")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="donorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã người hiến máu</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã người hiến máu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại chế phẩm</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại chế phẩm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tiểu cầu">Tiểu cầu</SelectItem>
                        <SelectItem value="Huyết tương">Huyết tương</SelectItem>
                        <SelectItem value="Hồng cầu">Hồng cầu</SelectItem>
                        <SelectItem value="Bạch cầu">Bạch cầu</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhóm máu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhóm máu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thể tích</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: 250ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="processingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày chế biến</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày hết hạn</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Tiểu cầu có thời hạn sử dụng ngắn (5-7 ngày)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vị trí lưu trữ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vị trí lưu trữ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kho A">Kho A</SelectItem>
                        <SelectItem value="Kho B">Kho B</SelectItem>
                        <SelectItem value="Kho C">Kho C</SelectItem>
                        <SelectItem value="Phòng xét nghiệm">Phòng xét nghiệm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập thông tin bổ sung về chế phẩm máu này"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/blood-products")}>
                Hủy
              </Button>
              <Button type="submit">Lưu chế phẩm máu</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

