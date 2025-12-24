import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function RecentRequests() {
  const recentRequests = [
    {
      id: "REQ-5678",
      hospital: "Bệnh viện Bạch Mai",
      bloodType: "O+",
      quantity: "3 đơn vị",
      date: "22/03/2025",
      status: "Khẩn cấp",
    },
    {
      id: "REQ-5679",
      hospital: "Bệnh viện Việt Đức",
      bloodType: "AB-",
      quantity: "2 đơn vị",
      date: "22/03/2025",
      status: "Đang xử lý",
    },
    {
      id: "REQ-5680",
      hospital: "Bệnh viện 108",
      bloodType: "B+",
      quantity: "5 đơn vị",
      date: "21/03/2025",
      status: "Hoàn thành",
    },
    {
      id: "REQ-5681",
      hospital: "Bệnh viện Nhi Trung ương",
      bloodType: "A+",
      quantity: "2 đơn vị",
      date: "21/03/2025",
      status: "Hoàn thành",
    },
    {
      id: "REQ-5682",
      hospital: "Bệnh viện Chợ Rẫy",
      bloodType: "O-",
      quantity: "4 đơn vị",
      date: "20/03/2025",
      status: "Hoàn thành",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yêu cầu máu gần đây</CardTitle>
        <CardDescription>Có 5 yêu cầu máu trong 3 ngày qua.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Bệnh viện</TableHead>
              <TableHead>Nhóm máu</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.hospital}</TableCell>
                <TableCell>{request.bloodType}</TableCell>
                <TableCell>{request.quantity}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

