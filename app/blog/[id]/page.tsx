'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { getBlogPost } from '@/lib/blogData'
import ReactMarkdown from 'react-markdown'

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const post = getBlogPost(parseInt(resolvedParams.id))

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => router.push('/blog')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Blog
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => router.push('/blog')}
            className="text-blue-100 hover:text-white mb-6 inline-flex items-center"
          >
            ← Back to Blog
          </button>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
            <span className="text-blue-100">{post.readTime}</span>
            <span className="text-blue-100">•</span>
            <span className="text-blue-100">{post.date}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-blue-100">{post.excerpt}</p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none
                          prose-headings:text-gray-900
                          prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900 prose-strong:font-semibold
                          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                          prose-li:text-gray-700 prose-li:my-2
                          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                          prose-table:w-full prose-table:my-6
                          prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                          prose-td:border prose-td:border-gray-300 prose-td:p-3">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
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

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">More Articles</h3>
          <button
            onClick={() => router.push('/blog')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Articles →
          </button>
        </div>
      </article>
    </main>
  )
}
