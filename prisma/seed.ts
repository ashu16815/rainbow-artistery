import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin users
  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'admin@rainbowartistery.in' },
    update: {},
    create: {
      email: 'admin@rainbowartistery.in',
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create products
  const products = [
    {
      title: 'Jiya — Personalized Ring Wall Hanging',
      slug: 'jiya-ring-wall-hanging',
      description: 'Pink center with mirror-work border and soft tassels. Perfect gift for newborns and birthdays. This beautiful handmade wall hanging features intricate mirror work and delicate tassels that add a touch of elegance to any room.',
      category: 'Wall Hanging',
      tags: ['personalized', 'birthday', 'nursery'],
      personalizable: true,
      priceINR: 899,
      isFeatured: true,
      featuredOrder: 1,
      coverUrl: '/seed/jiya-ring.jpg',
      mediaUrls: ['/seed/jiya-ring.jpg', '/seed/jiya-ring-2.jpg', '/seed/jiya-ring-3.jpg'],
      videoUrl: null,
      sizeNote: 'Approx. 8 inch ring',
      materials: 'Cotton threads, mirrors, beads',
      isPublished: true,
    },
    {
      title: 'Ankit & Divya — Name Ring',
      slug: 'ankit-divya-name-ring',
      description: 'Elegant blue gradient ring with white/blue tassels. Ideal for couples & housewarming. This stunning piece combines traditional craftsmanship with modern design, perfect for celebrating special moments.',
      category: 'Name Plate',
      tags: ['couple', 'housewarming'],
      personalizable: true,
      priceINR: 1299,
      isFeatured: true,
      featuredOrder: 2,
      coverUrl: '/seed/ankit-divya-blue.jpg',
      mediaUrls: ['/seed/ankit-divya-blue.jpg', '/seed/ankit-divya-blue-2.jpg'],
      videoUrl: null,
      sizeNote: 'Approx. 10 inch ring',
      materials: 'Cotton threads, beads',
      isPublished: true,
    },
    {
      title: 'Mini Animal Magnets Set',
      slug: 'mini-animal-magnets',
      description: 'Pastel square magnets with cute animals and custom names. Great return gifts. These adorable magnets are perfect for kids\' rooms and make excellent return gifts for birthday parties.',
      category: 'Fridge Magnet',
      tags: ['kids', 'birthday', 'return gifts'],
      personalizable: true,
      priceINR: 599,
      isFeatured: true,
      featuredOrder: 3,
      coverUrl: '/seed/animal-magnets.jpg',
      mediaUrls: ['/seed/animal-magnets.jpg'],
      videoUrl: null,
      sizeNote: 'Approx. 2.5 inch squares',
      materials: 'Wood, paint, magnets',
      isPublished: true,
    },
    {
      title: 'Krishna Motif Plate',
      slug: 'krishna-motif-plate',
      description: 'Serene blue-white plate inspired by Lord Krishna — perfect for pooja rooms and Janmashtami. This divine piece brings peace and spirituality to your sacred space.',
      category: 'Festival',
      tags: ['Krishna', 'festival', 'pooja'],
      personalizable: false,
      priceINR: 799,
      isFeatured: true,
      featuredOrder: 4,
      coverUrl: '/seed/krishna-plate.jpg',
      mediaUrls: ['/seed/krishna-plate.jpg'],
      videoUrl: null,
      sizeNote: 'Approx. 9 inch plate',
      materials: 'Hand-painted wood, embellishments',
      isPublished: true,
    },
    {
      title: 'Aarav — Custom Name Plate',
      slug: 'aarav-custom-name-plate',
      description: 'Beautiful wooden name plate with traditional motifs and golden accents. Perfect for housewarming gifts and personal spaces.',
      category: 'Name Plate',
      tags: ['personalized', 'wooden', 'traditional'],
      personalizable: true,
      priceINR: 699,
      isFeatured: false,
      coverUrl: '/seed/aarav-name-plate.jpg',
      mediaUrls: ['/seed/aarav-name-plate.jpg'],
      videoUrl: null,
      sizeNote: 'Approx. 12 inch length',
      materials: 'Wood, gold paint, varnish',
      isPublished: true,
    },
    {
      title: 'Diwali Décor Set',
      slug: 'diwali-decor-set',
      description: 'Festive wall hangings and decorative pieces for Diwali celebrations. Bring the joy of the festival of lights to your home.',
      category: 'Festival',
      tags: ['Diwali', 'festival', 'decor'],
      personalizable: true,
      priceINR: 1199,
      isFeatured: false,
      coverUrl: '/seed/diwali-decor.jpg',
      mediaUrls: ['/seed/diwali-decor.jpg'],
      videoUrl: null,
      sizeNote: 'Various sizes',
      materials: 'Fabric, mirrors, beads, tassels',
      isPublished: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log('✅ Created products')

  // Create testimonials
  const testimonials = [
    {
      name: 'Aarushi Sharma',
      city: 'Jaipur',
      quote: 'Absolutely loved the personalised name plate for my niece Jiya — the tassels are gorgeous!',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Rohan Mehta',
      city: 'Mumbai',
      quote: 'Ordered return-gift magnets for Mohit\'s birthday. Kids went crazy. Fab quality!',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Nandini Iyer',
      city: 'Chennai',
      quote: 'The Krishna wall hanging was perfect for our pooja room.',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Harshita Kulkarni',
      city: 'Pune',
      quote: 'Timely delivery and beautifully packed. Highly recommend.',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Kabir & Aanya Bansal',
      city: 'Gurugram',
      quote: 'Custom colours matched our nursery perfectly. Thank you!',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Farheen Khan',
      city: 'Hyderabad',
      quote: 'Great experience end-to-end — super responsive on Instagram.',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Vedant Trivedi',
      city: 'Ahmedabad',
      quote: 'Gifted a name ring for housewarming — instant hit with everyone.',
      rating: 5,
      avatarUrl: null,
    },
    {
      name: 'Simran Kaur',
      city: 'Ludhiana',
      quote: 'Loved the mirror-work detailing. It feels truly handmade.',
      rating: 5,
      avatarUrl: null,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  console.log('✅ Created testimonials')

  // Create announcements
  const announcements = [
    {
      title: 'Festive Launch',
      message: 'Now taking Janmashtami & Rakhi custom orders. DM us on Instagram!',
      active: true,
    },
    {
      title: 'New Collection',
      message: 'Check out our latest Diwali décor collection with traditional motifs.',
      active: false,
    },
  ]

  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: announcement,
    })
  }

  console.log('✅ Created announcements')

  // Create sample enquiries
  const enquiries = [
    {
      productId: products[0].slug,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      message: 'Interested in custom colors for my daughter\'s room. Can you make it in pink and purple?',
      fileUrl: null,
    },
    {
      productId: products[3].slug,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43211',
      message: 'Need this for Janmashtami celebration. Is it available in different sizes?',
      fileUrl: null,
    },
    {
      productId: null,
      name: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 98765 43212',
      message: 'Looking for a wooden name plate with traditional design for our new home.',
      fileUrl: null,
    },
  ]

  for (const enquiry of enquiries) {
    await prisma.enquiry.create({
      data: enquiry,
    })
  }

  console.log('✅ Created enquiries')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
