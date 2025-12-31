"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { API } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Search, Filter, AlertTriangle, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BloodRequest {
    id: number
    hospital_name: string
    blood_type: string
    quantity: number
    createdAt: string
    priority: "urgent" | "high" | "normal"
    status: "pending" | "approved" | "rejected" | "delivering" | "completed"
    requester_name: string
    reason: string
    reject_reason?: string
}

// Map Vietnamese labels
const priorityLabels: Record<string, string> = {
    urgent: "Khẩn cấp",
    high: "Cao",
    normal: "Bình thường",
}

const statusLabels: Record<string, string> = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    delivering: "Đang vận chuyển",
    completed: "Hoàn thành",
}

export default function ApprovalsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [rejectReason, setRejectReason] = useState("")
    const [requests, setRequests] = useState<BloodRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    // Fetch requests from API
    const fetchRequests = async () => {
        try {
            setLoading(true)
            const response = await API.requests.getAll()
            if (response.data.success) {
                setRequests(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching requests:", error)
            toast.error("Không thể tải danh sách yêu cầu")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const filteredRequests = requests.filter((request) => {
        const matchesSearch =
            request.id.toString().includes(searchQuery.toLowerCase()) ||
            request.hospital_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.requester_name?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || request.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const pendingCount = requests.filter(r => r.status === "pending").length
    const approvedCount = requests.filter(r => r.status === "approved" || r.status === "delivering").length
    const completedCount = requests.filter(r => r.status === "completed").length

    const handleApprove = async (request: BloodRequest) => {
        try {
            setActionLoading(true)
            const response = await API.requests.approve(request.id)
            if (response.data.success) {
                toast.success(`Đã phê duyệt yêu cầu #${request.id}`, {
                    description: `${request.hospital_name} - ${request.quantity} đơn vị ${request.blood_type}`,
                })
                // Refresh data
                fetchRequests()
            }
        } catch (error: any) {
            toast.error("Không thể phê duyệt yêu cầu", {
                description: error.response?.data?.message || "Đã xảy ra lỗi",
            })
        } finally {
            setActionLoading(false)
        }
    }

    const handleReject = (request: BloodRequest) => {
        setSelectedRequest(request)
        setDialogOpen(true)
    }

    const confirmReject = async () => {
        if (selectedRequest && rejectReason.trim()) {
            try {
                setActionLoading(true)
                const response = await API.requests.reject(selectedRequest.id, rejectReason)
                if (response.data.success) {
                    toast.error(`Đã từ chối yêu cầu #${selectedRequest.id}`, {
                        description: `Lý do: ${rejectReason}`,
                    })
                    setDialogOpen(false)
                    setRejectReason("")
                    setSelectedRequest(null)
                    // Refresh data
                    fetchRequests()
                }
            } catch (error: any) {
                toast.error("Không thể từ chối yêu cầu", {
                    description: error.response?.data?.message || "Đã xảy ra lỗi",
                })
            } finally {
                setActionLoading(false)
            }
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "bg-red-100 text-red-700 border-red-300"
            case "high":
                return "bg-orange-100 text-orange-700 border-orange-300"
            default:
                return "bg-blue-100 text-blue-700 border-blue-300"
        }
    }

    const getStatusBadge = (status: string) => {
        const label = statusLabels[status] || status
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300"><Clock className="w-3 h-3 mr-1" />{label}</Badge>
            case "approved":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><CheckCircle className="w-3 h-3 mr-1" />{label}</Badge>
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300"><XCircle className="w-3 h-3 mr-1" />{label}</Badge>
            case "delivering":
                return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">{label}</Badge>
            case "completed":
                return <Badge variant="default">{label}</Badge>
            default:
                return <Badge variant="secondary">{label}</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Phê duyệt yêu cầu máu</h1>
                <p className="text-muted-foreground">
                    Quản lý và phê duyệt các yêu cầu máu từ các bệnh viện
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            Chờ phê duyệt
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingCount}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Đã duyệt / Đang vận chuyển
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{approvedCount}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            Hoàn thành
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách yêu cầu</CardTitle>
                    <CardDescription>
                        Xem và xử lý các yêu cầu máu từ các cơ sở y tế
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Tìm kiếm yêu cầu..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Lọc trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="pending">Chờ duyệt</SelectItem>
                                <SelectItem value="approved">Đã duyệt</SelectItem>
                                <SelectItem value="delivering">Đang vận chuyển</SelectItem>
                                <SelectItem value="rejected">Từ chối</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead>Bệnh viện</TableHead>
                                    <TableHead className="w-[80px]">Nhóm máu</TableHead>
                                    <TableHead className="w-[80px]">Số lượng</TableHead>
                                    <TableHead className="w-[100px]">Ưu tiên</TableHead>
                                    <TableHead className="w-[130px]">Trạng thái</TableHead>
                                    <TableHead>Lý do</TableHead>
                                    <TableHead className="w-[140px] text-right">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                                            <span className="text-muted-foreground mt-2">Đang tải...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            Không tìm thấy yêu cầu nào
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium text-primary">#{request.id}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{request.hospital_name}</div>
                                                    <div className="text-xs text-muted-foreground">{request.requester_name || "—"}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-semibold">
                                                    {request.blood_type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{request.quantity} đơn vị</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                                    {request.priority === "urgent" && <AlertTriangle className="w-3 h-3 mr-1" />}
                                                    {priorityLabels[request.priority] || request.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                                {request.reject_reason || request.reason || "—"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {request.status === "pending" ? (
                                                    <div className="flex gap-1 justify-end">
                                                        <Button
                                                            size="sm"
                                                            variant="default"
                                                            className="h-7 px-2 bg-green-600 hover:bg-green-700"
                                                            onClick={() => handleApprove(request)}
                                                            disabled={actionLoading}
                                                        >
                                                            {actionLoading ? (
                                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                                    Duyệt
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="h-7 px-2"
                                                            onClick={() => handleReject(request)}
                                                            disabled={actionLoading}
                                                        >
                                                            <XCircle className="h-3 w-3 mr-1" />
                                                            Từ chối
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">—</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Reject Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Từ chối yêu cầu máu</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập lý do từ chối yêu cầu #{selectedRequest?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reason">Lý do từ chối</Label>
                            <Textarea
                                id="reason"
                                placeholder="Nhập lý do từ chối..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmReject}
                            disabled={!rejectReason.trim() || actionLoading}
                        >
                            {actionLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Xác nhận từ chối
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
