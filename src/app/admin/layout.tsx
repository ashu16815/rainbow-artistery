'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Skip authentication check for login page
    if (window.location.pathname === '/admin/login') {
      setLoading(false)
      return
    }

    // Check if user is authenticated
    const adminAuth = localStorage.getItem('adminAuth')
    const adminUser = localStorage.getItem('adminUser')
    
    if (adminAuth === 'true' && adminUser === 'admin') {
      setIsAuthenticated(true)
      // If we're on the root admin page, redirect to dashboard
      if (window.location.pathname === '/admin') {
        router.push('/admin/dashboard')
      }
    } else {
      router.push('/admin/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If we're on the login page, render it without authentication check
  if (window.location.pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
