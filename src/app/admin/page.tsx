import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MessageSquare, Star, Megaphone, TrendingUp, Users } from 'lucide-react'

// Mock data - in real app, this would come from database
const stats = [
  {
    title: 'Total Products',
    value: '24',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Package
  },
  {
    title: 'Published Products',
    value: '18',
    change: '+8%',
    changeType: 'positive' as const,
    icon: TrendingUp
  },
  {
    title: 'Total Enquiries',
    value: '47',
    change: '+23%',
    changeType: 'positive' as const,
    icon: MessageSquare
  },
  {
    title: 'Testimonials',
    value: '12',
    change: '+4',
    changeType: 'positive' as const,
    icon: Star
  }
]

const recentEnquiries = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    product: 'Jiya — Personalized Ring Wall Hanging',
    message: 'Interested in custom colors for my daughter\'s room',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    product: 'Krishna Motif Plate',
    message: 'Need this for Janmashtami celebration',
    createdAt: '4 hours ago'
  },
  {
    id: '3',
    name: 'Anita Patel',
    email: 'anita@example.com',
    product: 'Custom Name Plate',
    message: 'Looking for a wooden name plate with traditional design',
    createdAt: '1 day ago'
  }
]

const recentProducts = [
  {
    id: '1',
    title: 'Jiya — Personalized Ring Wall Hanging',
    status: 'Published',
    views: 156,
    enquiries: 8
  },
  {
    id: '2',
    title: 'Krishna Motif Plate',
    status: 'Published',
    views: 89,
    enquiries: 5
  },
  {
    id: '3',
    title: 'Custom Wedding Décor Set',
    status: 'Draft',
    views: 0,
    enquiries: 0
  }
]

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Recent Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{enquiry.name}</h4>
                      <p className="text-sm text-slate-600">{enquiry.product}</p>
                      <p className="text-sm text-slate-500 mt-1">{enquiry.message}</p>
                    </div>
                    <span className="text-xs text-slate-400">{enquiry.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button className="text-sm text-primary hover:underline">
                View all enquiries →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{product.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status}
                      </span>
                      <span>{product.views} views</span>
                      <span>{product.enquiries} enquiries</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button className="text-sm text-primary hover:underline">
                Manage products →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <Package className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Add New Product</h3>
              <p className="text-sm text-slate-600">Create a new product listing</p>
            </button>
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <Star className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Add Testimonial</h3>
              <p className="text-sm text-slate-600">Add customer feedback</p>
            </button>
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <Megaphone className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Create Announcement</h3>
              <p className="text-sm text-slate-600">Share updates with customers</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
