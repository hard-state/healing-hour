'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from './AdminLogin';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAdminAuthenticated');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      // Check if authenticated and session is not too old (24 hours)
      if (authStatus === 'true' && loginTime) {
        const sessionAge = Date.now() - parseInt(loginTime);
        const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge < maxSessionAge) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear auth
          localStorage.removeItem('isAdminAuthenticated');
          localStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-gold mx-auto mb-4"></div>
          <p className="text-matte-black">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <>
      {children}
    </>
  );
}
