import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function InventoryStatus() {
  const bloodInventory = [
    { type: "A+", units: 120, capacity: 150, percentage: 80 },
    { type: "A-", units: 45, capacity: 100, percentage: 45 },
    { type: "B+", units: 85, capacity: 150, percentage: 57 },
    { type: "B-", units: 30, capacity: 100, percentage: 30 },
    { type: "AB+", units: 40, capacity: 100, percentage: 40 },
    { type: "AB-", units: 15, capacity: 50, percentage: 30 },
    { type: "O+", units: 150, capacity: 200, percentage: 75 },
    { type: "O-", units: 98, capacity: 150, percentage: 65 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tình trạng kho máu</CardTitle>
        <CardDescription>Tổng số đơn vị máu hiện có: 583 đơn vị</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bloodInventory.map((blood) => (
            <div key={blood.type} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">{blood.type}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {blood.units}/{blood.capacity}
                </span>
              </div>
              <Progress value={blood.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {blood.percentage < 30 ? "Cần bổ sung" : blood.percentage > 70 ? "Đủ dùng" : "Bình thường"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

