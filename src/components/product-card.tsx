import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string
    title: string
    slug: string
    description: string
    coverUrl: string
    priceINR: number
    tags: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="group rounded-2xl bg-white shadow hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-50">
          <Image
            src={product.coverUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        
        {/* Info */}
        <div className="p-4 flex flex-col gap-1">
          <h3 className="font-semibold text-slate-900 line-clamp-2 text-sm sm:text-base">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
            {product.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Price */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              {product.priceINR > 0 ? `₹${product.priceINR}` : 'Made to order'}
            </span>
            <span className="text-xs text-slate-500">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
