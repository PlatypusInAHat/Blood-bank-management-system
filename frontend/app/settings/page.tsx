import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Cài đặt | Blood Bank Management System",
    description: "Quản lý cài đặt hệ thống",
}

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
                <p className="text-muted-foreground">
                    Quản lý cài đặt tài khoản và hệ thống
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin tài khoản</CardTitle>
                        <CardDescription>
                            Cập nhật thông tin cá nhân của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input id="name" placeholder="Nhập họ và tên" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Nhập email" />
                        </div>
                        <Button>Lưu thay đổi</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông báo</CardTitle>
                        <CardDescription>
                            Cấu hình thông báo hệ thống
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thông báo email</Label>
                                <p className="text-sm text-muted-foreground">
                                    Nhận thông báo qua email
                                </p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thông báo kho máu</Label>
                                <p className="text-sm text-muted-foreground">
                                    Cảnh báo khi máu sắp hết hạn
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thông báo yêu cầu mới</Label>
                                <p className="text-sm text-muted-foreground">
                                    Cảnh báo khi có yêu cầu máu mới
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bảo mật</CardTitle>
                        <CardDescription>
                            Cập nhật mật khẩu và bảo mật tài khoản
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new-password">Mật khẩu mới</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Đổi mật khẩu</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
