'use client'

import { useRouter } from 'next/navigation'

export default function BlogPage() {
  const router = useRouter()

  const blogPosts = [
    {
      id: 1,
      title: 'Commercial Invoice vs Proforma Invoice: Key Differences Explained',
      excerpt: 'Understanding the crucial differences between commercial and proforma invoices is essential for international trade. Learn when to use each type and how they affect your shipping process.',
      date: 'January 2025',
      readTime: '5 min read',
      category: 'Export Documentation'
    },
    {
      id: 2,
      title: 'HS Code Lookup Guide: How to Find the Right Classification',
      excerpt: 'Harmonized System codes are critical for customs clearance. This comprehensive guide shows you exactly how to find and verify the correct HS code for your products.',
      date: 'January 2025',
      readTime: '7 min read',
      category: 'Customs & Compliance'
    },
    {
      id: 3,
      title: 'Incoterms 2020: Complete Guide to International Trade Terms',
      excerpt: 'Master the 11 Incoterms rules that define responsibilities between buyers and sellers. From EXW to DDP, understand which terms work best for your shipments.',
      date: 'January 2025',
      readTime: '10 min read',
      category: 'Shipping Terms'
    },
    {
      id: 4,
      title: 'Letter of Credit vs Telegraphic Transfer: Which Payment Method is Safer?',
      excerpt: 'Compare L/C and T/T payment methods for international transactions. Discover the pros, cons, and best use cases for each payment term to protect your business.',
      date: 'January 2025',
      readTime: '6 min read',
      category: 'Payment Terms'
    },
    {
      id: 5,
      title: 'Top 10 Common Mistakes in Export Documentation (And How to Avoid Them)',
      excerpt: 'Customs delays cost time and money. Learn the most frequent errors exporters make in commercial invoices and packing lists, plus practical tips to avoid them.',
      date: 'January 2025',
      readTime: '8 min read',
      category: 'Best Practices'
    },
    {
      id: 6,
      title: 'Country-Specific Import Requirements: USA, EU, and Asia Markets',
      excerpt: 'Navigate the complex world of import regulations. Get essential information on documentation requirements, duties, and compliance for major trading regions.',
      date: 'January 2025',
      readTime: '12 min read',
      category: 'Regulations'
    }
  ]

  const handlePostClick = (id: number) => {
    router.push(`/blog/${id}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">International Trade Blog</h1>
          <p className="text-xl text-gray-600">
            Expert insights on export documentation, customs compliance, and international shipping
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-blue-600 font-semibold hover:text-blue-700">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Invoice?</h3>
          <p className="mb-6 text-blue-100">
            Use our free tools to generate professional commercial invoices, proforma invoices, and packing lists
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </main>
  )
}
