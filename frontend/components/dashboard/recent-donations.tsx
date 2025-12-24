import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function RecentDonations() {
  const recentDonations = [
    {
      id: "DON-1234",
      donor: "Nguyễn Văn A",
      bloodType: "A+",
      date: "22/03/2025",
      status: "Hoàn thành",
    },
    {
      id: "DON-1235",
      donor: "Trần Thị B",
      bloodType: "O-",
      date: "22/03/2025",
      status: "Hoàn thành",
    },
    {
      id: "DON-1236",
      donor: "Lê Văn C",
      bloodType: "B+",
      date: "21/03/2025",
      status: "Hoàn thành",
    },
    {
      id: "DON-1237",
      donor: "Phạm Thị D",
      bloodType: "AB+",
      date: "21/03/2025",
      status: "Đang xử lý",
    },
    {
      id: "DON-1238",
      donor: "Hoàng Văn E",
      bloodType: "A-",
      date: "20/03/2025",
      status: "Hoàn thành",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiến máu gần đây</CardTitle>
        <CardDescription>Có 5 lượt hiến máu trong 3 ngày qua.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Người hiến</TableHead>
              <TableHead>Nhóm máu</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.id}</TableCell>
                <TableCell>{donation.donor}</TableCell>
                <TableCell>{donation.bloodType}</TableCell>
                <TableCell>{donation.date}</TableCell>
                <TableCell>
                  <Badge variant={donation.status === "Hoàn thành" ? "default" : "secondary"}>{donation.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

