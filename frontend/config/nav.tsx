import { BarChart3, Droplet, LayoutDashboard, Users, ClipboardList, Settings, Layers, CheckCircle } from "lucide-react"

export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Người hiến máu",
    href: "/donors",
    icon: Users,
  },
  {
    title: "Kho máu",
    href: "/inventory",
    icon: Droplet,
  },
  {
    title: "Chế phẩm máu",
    href: "/blood-products",
    icon: Layers,
  },
  {
    title: "Yêu cầu máu",
    href: "/requests",
    icon: ClipboardList,
  },
  {
    title: "Phê duyệt máu",
    href: "/approvals",
    icon: CheckCircle,
  },
  {
    title: "Báo cáo & Thống kê",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Người dùng",
    href: "/users",
    icon: Users,
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
]

