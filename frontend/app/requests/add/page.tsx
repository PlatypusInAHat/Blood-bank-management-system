"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { API } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Loader2, Send } from "lucide-react"
import Link from "next/link"

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
const priorities = [
    { value: "urgent", label: "Khẩn cấp" },
    { value: "high", label: "Cao" },
    { value: "normal", label: "Bình thường" },
]

export default function AddRequestPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        hospital_name: "",
        blood_type: "",
        quantity: "",
        priority: "normal",
        reason: "",
        requester_name: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.hospital_name || !formData.blood_type || !formData.quantity) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
            return
        }

        try {
            setLoading(true)
            const response = await API.requests.create({
                ...formData,
                quantity: parseInt(formData.quantity),
            })

            if (response.data.success) {
                toast.success("Tạo yêu cầu máu thành công!")
                router.push("/requests")
            }
        } catch (error: any) {
            toast.error("Không thể tạo yêu cầu", {
                description: error.response?.data?.message || "Đã xảy ra lỗi",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/requests">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tạo yêu cầu máu mới</h1>
                    <p className="text-muted-foreground">
                        Điền thông tin để tạo yêu cầu máu từ bệnh viện
                    </p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Thông tin yêu cầu</CardTitle>
                    <CardDescription>
                        Các trường có dấu (*) là bắt buộc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="hospital_name">Tên bệnh viện *</Label>
                                <Input
                                    id="hospital_name"
                                    placeholder="VD: Bệnh viện Bạch Mai"
                                    value={formData.hospital_name}
                                    onChange={(e) => handleChange("hospital_name", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requester_name">Người yêu cầu</Label>
                                <Input
                                    id="requester_name"
                                    placeholder="VD: BS. Nguyễn Văn A"
                                    value={formData.requester_name}
                                    onChange={(e) => handleChange("requester_name", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="blood_type">Nhóm máu *</Label>
                                <Select
                                    value={formData.blood_type}
                                    onValueChange={(v) => handleChange("blood_type", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn nhóm máu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bloodTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Số lượng (đơn vị) *</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    placeholder="VD: 5"
                                    value={formData.quantity}
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Mức độ ưu tiên</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(v) => handleChange("priority", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map(p => (
                                            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reason">Lý do yêu cầu</Label>
                            <Textarea
                                id="reason"
                                placeholder="VD: Phẫu thuật cấp cứu tim mạch..."
                                value={formData.reason}
                                onChange={(e) => handleChange("reason", e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Send className="h-4 w-4 mr-2" />
                                )}
                                Gửi yêu cầu
                            </Button>
                            <Link href="/requests">
                                <Button type="button" variant="outline">
                                    Hủy
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
