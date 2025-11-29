import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function BloodProductsStatus() {
  const bloodProducts = [
    { type: "Tiểu cầu", units: 45, capacity: 60, percentage: 75 },
    { type: "Huyết tương", units: 120, capacity: 150, percentage: 80 },
    { type: "Hồng cầu", units: 85, capacity: 100, percentage: 85 },
    { type: "Bạch cầu", units: 30, capacity: 50, percentage: 60 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tình trạng chế phẩm máu</CardTitle>
        <CardDescription>Tổng số đơn vị chế phẩm máu hiện có: 280 đơn vị</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bloodProducts.map((product) => (
            <div key={product.type} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">{product.type}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.units}/{product.capacity}
                </span>
              </div>
              <Progress value={product.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {product.percentage < 30 ? "Cần bổ sung" : product.percentage > 70 ? "Đủ dùng" : "Bình thường"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

