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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"

export function BloodProductsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [productTypeFilter, setProductTypeFilter] = useState("all")

  const bloodProducts = [
    {
      id: "BP001",
      productType: "Tiểu cầu",
      bloodType: "A+",
      donorId: "D001",
      processingDate: "15/02/2025",
      expiryDate: "22/02/2025",
      status: "Sẵn sàng",
      location: "Kho A",
      volume: "250ml",
    },
    {
      id: "BP002",
      productType: "Huyết tương",
      bloodType: "O-",
      donorId: "D002",
      processingDate: "22/03/2025",
      expiryDate: "22/06/2025",
      status: "Đang kiểm tra",
      location: "Phòng xét nghiệm",
      volume: "300ml",
    },
    {
      id: "BP003",
      productType: "Hồng cầu",
      bloodType: "B+",
      donorId: "D003",
      processingDate: "10/01/2025",
      expiryDate: "10/04/2025",
      status: "Sẵn sàng",
      location: "Kho B",
      volume: "280ml",
    },
    {
      id: "BP004",
      productType: "Tiểu cầu",
      bloodType: "AB+",
      donorId: "D004",
      processingDate: "20/03/2025",
      expiryDate: "27/03/2025",
      status: "Đang kiểm tra",
      location: "Phòng xét nghiệm",
      volume: "250ml",
    },
    {
      id: "BP005",
      productType: "Bạch cầu",
      bloodType: "A-",
      donorId: "D005",
      processingDate: "18/03/2025",
      expiryDate: "25/03/2025",
      status: "Sắp hết hạn",
      location: "Kho A",
      volume: "200ml",
    },
    {
      id: "BP006",
      productType: "Huyết tương",
      bloodType: "O+",
      donorId: "D006",
      processingDate: "15/03/2025",
      expiryDate: "15/06/2025",
      status: "Sẵn sàng",
      location: "Kho C",
      volume: "300ml",
    },
    {
      id: "BP007",
      productType: "Tiểu cầu",
      bloodType: "B-",
      donorId: "D007",
      processingDate: "21/03/2025",
      expiryDate: "28/03/2025",
      status: "Sẵn sàng",
      location: "Kho A",
      volume: "250ml",
    },
  ]

  const filteredProducts = bloodProducts.filter(
    (product) =>
      (productTypeFilter === "all" || product.productType === productTypeFilter) &&
      (product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.donorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productType.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm chế phẩm máu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={productTypeFilter} onValueChange={setProductTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại chế phẩm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="Tiểu cầu">Tiểu cầu</SelectItem>
            <SelectItem value="Huyết tương">Huyết tương</SelectItem>
            <SelectItem value="Hồng cầu">Hồng cầu</SelectItem>
            <SelectItem value="Bạch cầu">Bạch cầu</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Loại chế phẩm</TableHead>
              <TableHead>Nhóm máu</TableHead>
              <TableHead>Mã người hiến</TableHead>
              <TableHead>Ngày chế biến</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Thể tích</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  Không tìm thấy kết quả.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.productType}</TableCell>
                  <TableCell>{product.bloodType}</TableCell>
                  <TableCell>{product.donorId}</TableCell>
                  <TableCell>{product.processingDate}</TableCell>
                  <TableCell>{product.expiryDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Sẵn sàng"
                          ? "default"
                          : product.status === "Đang kiểm tra"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>{product.volume}</TableCell>
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

