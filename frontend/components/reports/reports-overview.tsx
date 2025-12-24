"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsOverview() {
  const [period, setPeriod] = useState("month")

  return (
    <Tabs defaultValue="donations" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="donations">Hiến máu</TabsTrigger>
          <TabsTrigger value="inventory">Kho máu</TabsTrigger>
          <TabsTrigger value="requests">Yêu cầu</TabsTrigger>
        </TabsList>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
            <SelectItem value="quarter">Quý này</SelectItem>
            <SelectItem value="year">Năm nay</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TabsContent value="donations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thống kê hiến máu</CardTitle>
            <CardDescription>
              Tổng quan về hoạt động hiến máu trong{" "}
              {period === "week" ? "tuần" : period === "month" ? "tháng" : period === "quarter" ? "quý" : "năm"} này.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
              <p className="text-muted-foreground">Biểu đồ thống kê hiến máu</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt hiến máu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+18% so với kỳ trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Người hiến máu mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">+5% so với kỳ trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhóm máu phổ biến nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">O+</div>
              <p className="text-xs text-muted-foreground">42% tổng lượt hiến</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">+2% so với kỳ trước</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="inventory" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thống kê kho máu</CardTitle>
            <CardDescription>
              Tổng quan về tình trạng kho máu trong{" "}
              {period === "week" ? "tuần" : period === "month" ? "tháng" : period === "quarter" ? "quý" : "năm"} này.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
              <p className="text-muted-foreground">Biểu đồ thống kê kho máu</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="requests" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thống kê yêu cầu máu</CardTitle>
            <CardDescription>
              Tổng quan về yêu cầu máu trong{" "}
              {period === "week" ? "tuần" : period === "month" ? "tháng" : period === "quarter" ? "quý" : "năm"} này.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
              <p className="text-muted-foreground">Biểu đồ thống kê yêu cầu máu</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

