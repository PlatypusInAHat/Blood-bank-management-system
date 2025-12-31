"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { API } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import Link from "next/link"

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
const genders = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
]

export default function AddDonorPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        blood_type: "",
        last_donation: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.age || !formData.gender || !formData.blood_type) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
            return
        }

        const age = parseInt(formData.age)
        if (age < 18 || age > 65) {
            toast.error("Tuổi người hiến máu phải từ 18 đến 65")
            return
        }

        try {
            setLoading(true)
            const response = await API.donors.create({
                ...formData,
                age: parseInt(formData.age),
                last_donation: formData.last_donation || null,
            })

            if (response.data.success) {
                toast.success("Thêm người hiến máu thành công!")
                router.push("/donors")
            }
        } catch (error: any) {
            toast.error("Không thể thêm người hiến máu", {
                description: error.response?.data?.message || "Đã xảy ra lỗi",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/donors">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Thêm người hiến máu</h1>
                    <p className="text-muted-foreground">
                        Đăng ký thông tin người hiến máu mới
                    </p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>
                        Các trường có dấu (*) là bắt buộc. Người hiến máu cần từ 18-65 tuổi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Họ và tên *</Label>
                                <Input
                                    id="name"
                                    placeholder="VD: Nguyễn Văn A"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Tuổi *</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    min="18"
                                    max="65"
                                    placeholder="VD: 25"
                                    value={formData.age}
                                    onChange={(e) => handleChange("age", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="gender">Giới tính *</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(v) => handleChange("gender", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn giới tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genders.map(g => (
                                            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_donation">Lần hiến máu gần nhất</Label>
                            <Input
                                id="last_donation"
                                type="date"
                                value={formData.last_donation}
                                onChange={(e) => handleChange("last_donation", e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <p className="text-xs text-muted-foreground">
                                Để trống nếu chưa từng hiến máu
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <UserPlus className="h-4 w-4 mr-2" />
                                )}
                                Đăng ký
                            </Button>
                            <Link href="/donors">
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
