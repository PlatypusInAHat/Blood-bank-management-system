"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeft, Loader2, Plus, Calendar } from "lucide-react"
import Link from "next/link"

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

export default function AddInventoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [donors, setDonors] = useState<any[]>([])
    const [formData, setFormData] = useState({
        blood_type: "",
        quantity: "",
        expiry_date: "",
        donorId: "",
    })

    useEffect(() => {
        // Fetch donors for dropdown
        const fetchDonors = async () => {
            try {
                const response = await API.donors.getAll()
                if (response.data.success) {
                    setDonors(response.data.data)
                }
            } catch (error) {
                console.error("Error fetching donors:", error)
            }
        }
        fetchDonors()
    }, [])

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.blood_type || !formData.quantity || !formData.expiry_date || !formData.donorId) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
            return
        }

        try {
            setLoading(true)
            const response = await API.blood.create({
                ...formData,
                quantity: parseInt(formData.quantity),
                donorId: parseInt(formData.donorId),
            })

            if (response.data.success) {
                toast.success("Thêm đơn vị máu thành công!")
                router.push("/inventory")
            }
        } catch (error: any) {
            toast.error("Không thể thêm đơn vị máu", {
                description: error.response?.data?.message || "Đã xảy ra lỗi",
            })
        } finally {
            setLoading(false)
        }
    }

    // Set default expiry date to 42 days from now (typical blood shelf life)
    const getDefaultExpiryDate = () => {
        const date = new Date()
        date.setDate(date.getDate() + 42)
        return date.toISOString().split('T')[0]
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/inventory">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Thêm đơn vị máu mới</h1>
                    <p className="text-muted-foreground">
                        Thêm đơn vị máu mới vào kho
                    </p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Thông tin đơn vị máu</CardTitle>
                    <CardDescription>
                        Các trường có dấu (*) là bắt buộc
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
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
                                    placeholder="VD: 1"
                                    value={formData.quantity}
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="donorId">Người hiến máu *</Label>
                                <Select
                                    value={formData.donorId}
                                    onValueChange={(v) => handleChange("donorId", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn người hiến máu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {donors.map(donor => (
                                            <SelectItem key={donor.id} value={donor.id.toString()}>
                                                {donor.name} ({donor.blood_type})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expiry_date">Ngày hết hạn *</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="expiry_date"
                                        type="date"
                                        className="pl-9"
                                        value={formData.expiry_date}
                                        onChange={(e) => handleChange("expiry_date", e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Thời hạn bảo quản máu thường là 42 ngày
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Plus className="h-4 w-4 mr-2" />
                                )}
                                Thêm vào kho
                            </Button>
                            <Link href="/inventory">
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
