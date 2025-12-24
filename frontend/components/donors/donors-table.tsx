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

export function DonorsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const donors = [
    {
      id: "D001",
      name: "Nguyễn Văn A",
      bloodType: "A+",
      phone: "0912345678",
      lastDonation: "15/02/2025",
      status: "Đủ điều kiện",
      donationCount: 5,
    },
    {
      id: "D002",
      name: "Trần Thị B",
      bloodType: "O-",
      phone: "0923456789",
      lastDonation: "22/03/2025",
      status: "Chưa đủ thời gian",
      donationCount: 8,
    },
    {
      id: "D003",
      name: "Lê Văn C",
      bloodType: "B+",
      phone: "0934567890",
      lastDonation: "10/01/2025",
      status: "Đủ điều kiện",
      donationCount: 3,
    },
    {
      id: "D004",
      name: "Phạm Thị D",
      bloodType: "AB+",
      phone: "0945678901",
      lastDonation: "05/03/2025",
      status: "Chưa đủ thời gian",
      donationCount: 2,
    },
    {
      id: "D005",
      name: "Hoàng Văn E",
      bloodType: "A-",
      phone: "0956789012",
      lastDonation: "20/12/2024",
      status: "Đủ điều kiện",
      donationCount: 6,
    },
  ]

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm người hiến máu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-20">Mã</TableHead>
              <TableHead className="min-w-32">Tên</TableHead>
              <TableHead className="min-w-24">Nhóm máu</TableHead>
              <TableHead className="min-w-32">Số điện thoại</TableHead>
              <TableHead className="min-w-32">Lần hiến gần nhất</TableHead>
              <TableHead className="min-w-28">Trạng thái</TableHead>
              <TableHead className="min-w-20">Số lần hiến</TableHead>
              <TableHead className="text-right min-w-20">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Không tìm thấy kết quả.
                </TableCell>
              </TableRow>
            ) : (
              filteredDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">{donor.id}</TableCell>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.bloodType}</TableCell>
                  <TableCell>{donor.phone}</TableCell>
                  <TableCell>{donor.lastDonation}</TableCell>
                  <TableCell>
                    <Badge variant={donor.status === "Đủ điều kiện" ? "default" : "secondary"}>{donor.status}</Badge>
                  </TableCell>
                  <TableCell>{donor.donationCount}</TableCell>
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

