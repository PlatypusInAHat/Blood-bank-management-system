import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');  // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (token) {
      // Nếu có token, chuyển hướng đến dashboard hoặc trang chủ
      router.push('/dashboard');
    } else {
      // Nếu không có token, chuyển hướng về trang đăng nhập
      router.push('/login');
    }
  }, [router]);

  return null;  // Không render gì trên trang này
}
