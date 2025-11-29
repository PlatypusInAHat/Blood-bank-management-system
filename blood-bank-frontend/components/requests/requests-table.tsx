"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"

export function RequestsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const requests = [
    {
      id: "REQ-5678",
      hospital: "Bệnh viện Bạch Mai",
      bloodType: "O+",
      quantity: "3 đơn vị",
      requestDate: "22/03/2025",
      requiredDate: "23/03/2025",
      status: "Khẩn cấp",
      contact: "Bs. Nguyễn",
    },
    {
      id: "REQ-5679",
      hospital: "Bệnh viện Việt Đức",
      bloodType: "AB-",
      quantity: "2 đơn vị",
      requestDate: "22/03/2025",
      requiredDate: "25/03/2025",
      status: "Đang xử lý",
      contact: "Bs. Trần",
    },
    {
      id: "REQ-5680",
      hospital: "Bệnh viện 108",
      bloodType: "B+",
      quantity: "5 đơn vị",
      requestDate: "21/03/2025",
      requiredDate: "22/03/2025",
      status: "Hoàn thành",
      contact: "Bs. Lê",
    },
    {
      id: "REQ-5681",
      hospital: "Bệnh viện Nhi Trung ương",
      bloodType: "A+",
      quantity: "2 đơn vị",
      requestDate: "21/03/2025",
      requiredDate: "24/03/2025",
      status: "Hoàn thành",
      contact: "Bs. Phạm",
    },
    {
      id: "REQ-5682",
      hospital: "Bệnh viện Chợ Rẫy",
      bloodType: "O-",
      quantity: "4 đơn vị",
      requestDate: "20/03/2025",
      requiredDate: "21/03/2025",
      status: "Hoàn thành",
      contact: "Bs. Hoàng",
    },
  ]

  const filteredRequests = requests.filter(
    (request) =>
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.contact.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm yêu cầu máu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Bệnh viện</TableHead>
              <TableHead>Nhóm máu</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Ngày yêu cầu</TableHead>
              <TableHead>Ngày cần</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Liên hệ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Không tìm thấy kết quả.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>{request.bloodType}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.requiredDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Khẩn cấp"
                          ? "destructive"
                          : request.status === "Đang xử lý"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.contact}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

