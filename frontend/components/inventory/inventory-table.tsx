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

export function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const inventory = [
    {
      id: "BU001",
      bloodType: "A+",
      donorId: "D001",
      collectionDate: "15/02/2025",
      expiryDate: "15/05/2025",
      status: "Sẵn sàng",
      location: "Kho A",
    },
    {
      id: "BU002",
      bloodType: "O-",
      donorId: "D002",
      collectionDate: "22/03/2025",
      expiryDate: "22/06/2025",
      status: "Đang kiểm tra",
      location: "Phòng xét nghiệm",
    },
    {
      id: "BU003",
      bloodType: "B+",
      donorId: "D003",
      collectionDate: "10/01/2025",
      expiryDate: "10/04/2025",
      status: "Sẵn sàng",
      location: "Kho B",
    },
    {
      id: "BU004",
      bloodType: "AB+",
      donorId: "D004",
      collectionDate: "05/03/2025",
      expiryDate: "05/06/2025",
      status: "Đang kiểm tra",
      location: "Phòng xét nghiệm",
    },
    {
      id: "BU005",
      bloodType: "A-",
      donorId: "D005",
      collectionDate: "20/12/2024",
      expiryDate: "20/03/2025",
      status: "Sắp hết hạn",
      location: "Kho A",
    },
  ]

  const filteredInventory = inventory.filter(
    (item) =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm đơn vị máu..."
            className="pl-8 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px]">Mã</TableHead>
              <TableHead className="w-[80px]">Nhóm máu</TableHead>
              <TableHead className="w-[100px]">Mã người hiến</TableHead>
              <TableHead className="w-[110px]">Ngày thu thập</TableHead>
              <TableHead className="w-[100px]">Ngày hết hạn</TableHead>
              <TableHead className="w-[110px]">Trạng thái</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead className="w-[70px] text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Không tìm thấy kết quả.
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-primary">{item.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-semibold ${item.bloodType.includes('O') ? 'border-red-500 text-red-600 bg-red-50' :
                          item.bloodType.includes('A') ? 'border-blue-500 text-blue-600 bg-blue-50' :
                            item.bloodType.includes('B') ? 'border-green-500 text-green-600 bg-green-50' :
                              'border-purple-500 text-purple-600 bg-purple-50'
                        }`}
                    >
                      {item.bloodType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.donorId}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{item.collectionDate}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{item.expiryDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Sẵn sàng"
                          ? "default"
                          : item.status === "Đang kiểm tra"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.location}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-7 w-7 p-0">
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

