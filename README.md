# Rainbow Artistery 🌈

A beautiful, production-ready handmade crafts website built with modern web technologies. Features a protected admin portal, image/video uploads to blob storage, product gallery, testimonials, and social media integration.

## ✨ Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Prisma, Tailwind CSS
- **Beautiful UI**: shadcn/ui components with custom design system
- **Admin Portal**: Protected admin area for managing products, testimonials, and enquiries
- **Product Gallery**: Filterable product grid with search functionality
- **Personalization**: Custom name and color options for products
- **Social Integration**: Instagram and WhatsApp contact options
- **Responsive Design**: Mobile-first approach with accessibility features
- **SEO Optimized**: Proper metadata, sitemap, and structured data

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, Server Actions)
- **UI**: Tailwind CSS, shadcn/ui, Embla carousel
- **Authentication**: NextAuth (email magic link) with admin allowlist
- **Database**: Prisma ORM — SQLite for dev, Postgres (Neon) for prod
- **Storage**: S3-compatible blob (Cloudflare R2 or AWS S3) via signed URLs
- **Email**: Resend for enquiry notifications
- **Analytics**: Vercel Analytics + Speed Insights
- **Deployment**: Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashu16815/rainbow-artistery.git
   cd rainbow-artistery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Database (Supabase PostgreSQL)
   
   DATABASE_URL="postgresql://username:password@localhost:5432/rainbow_artistery"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Admin Configuration
   ADMIN_EMAILS="owner@rainbowartistery.in,admin@rainbowartistery.in"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   
   # Social Links
   INSTAGRAM_URL="https://www.instagram.com/rainbow_artistery/"
   WHATSAPP_LINK="https://wa.me/919999999999"
   
   # Email Service (Optional)
   RESEND_API_KEY="your-resend-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
rainbow-artistery/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Protected admin portal
│   │   ├── api/               # API routes
│   │   ├── gallery/           # Product gallery
│   │   ├── product/           # Product detail pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Header, Footer
│   │   └── admin/            # Admin-specific components
│   └── lib/                  # Utility functions
│       ├── auth.ts           # NextAuth configuration
│       ├── db.ts             # Prisma client
│       └── storage.ts        # S3 storage utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Seed data
└── public/                   # Static assets
```

## 🎨 Design System

The project follows Don Norman's Design of Everyday Things principles:

- **Discoverability**: Clear navigation and intuitive user flows
- **Constraints**: Guided user interactions with form validation
- **Feedback**: Toast notifications and loading states
- **Consistency**: Unified design language across all pages
- **Affordances**: Clear visual cues for interactive elements

### Color Palette
- **Primary**: Indigo-600 (#4f46e5)
- **Accent 1**: Fuchsia-500 (#d946ef)
- **Accent 2**: Emerald-500 (#10b981)
- **Background**: White
- **Text**: Slate-800 (#1e293b)

## 🔐 Admin Portal

Access the admin portal at `/admin` (requires authentication):

- **Products Management**: CRUD operations for products
- **Media Upload**: Drag-drop upload to S3 with previews
- **Testimonials**: Manage customer reviews
- **Enquiries**: View and manage customer enquiries
- **Announcements**: Create site-wide announcements

## 📱 Pages

- **Home** (`/`): Hero section, USP cards, featured products, testimonials
- **Gallery** (`/gallery`): Filterable product grid with search
- **Product Detail** (`/product/[slug]`): Product details with personalization
- **About** (`/about`): Company story and process information
- **Contact** (`/contact`): Contact form and information
- **Admin** (`/admin`): Protected admin dashboard

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NEXTAUTH_URL` | NextAuth callback URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `ADMIN_EMAILS` | Comma-separated admin emails | Yes |
| `S3_ENDPOINT` | S3-compatible storage endpoint | Yes |
| `S3_REGION` | Storage region | Yes |
| `S3_ACCESS_KEY_ID` | Storage access key | Yes |
| `S3_SECRET_ACCESS_KEY` | Storage secret key | Yes |
| `S3_BUCKET` | Storage bucket name | Yes |
| `INSTAGRAM_URL` | Instagram profile URL | No |
| `WHATSAPP_LINK` | WhatsApp contact link | No |
| `RESEND_API_KEY` | Resend email API key | No |

## 📊 Database Schema

The application uses Prisma with the following main models:

- **Product**: Product information, media, pricing
- **Testimonial**: Customer reviews and ratings
- **Enquiry**: Customer contact form submissions
- **AdminUser**: Admin user management
- **Announcement**: Site-wide announcements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Prisma](https://prisma.io/) for the database toolkit
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

For support, email hello@rainbowartistery.in or create an issue in this repository.

---

Made with ❤️ in India 🇮🇳