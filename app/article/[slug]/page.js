// app/article/[slug]/page.js
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// List artikel yang ada
const KNOWN_ARTICLES = [
  'artikel-kesehatan.mdx',
  // Tambahkan nama file lain di sini
]

async function getArticleBySlug(slug) {
  // Find matching file
  const matchingFile = KNOWN_ARTICLES.find(filename => {
    const fileSlug = filename
      .replace('.mdx', '')
      .replace('.md', '')
      .toLowerCase()
      .replace(/\s+/g, '-')
    return fileSlug === slug
  })

  if (!matchingFile) {
    console.log('No file found for slug:', slug)
    return null
  }

  const url = `https://phmibcxawxuvdlfkwrus.supabase.co/storage/v1/object/public/health-articles/mdx/${matchingFile}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Failed to fetch ${matchingFile}:`, response.status)
      return null
    }
    
    const text = await response.text()
    const { data: frontmatter, content } = matter(text)
    
    return {
      slug,
      filename: matchingFile,
      frontmatter: {
        title: frontmatter.title || matchingFile.replace(/\.(md|mdx)$/, ''),
        author: frontmatter.author || 'Admin',
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || '',
        coverImage: frontmatter.coverImage || null,
        category: frontmatter.category || 'Kesehatan',
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || '5 menit',
        authorBio: frontmatter.authorBio || '',
        ...frontmatter
      },
      content
    }
  } catch (error) {
    console.error(`Error fetching ${matchingFile}:`, error)
    return null
  }
}

// Custom components untuk MDX - Minimalist style
const components = {
  h1: (props) => <h1 className="text-3xl sm:text-4xl font-light mt-12 mb-6 text-black" {...props} />,
  h2: (props) => <h2 className="text-2xl sm:text-3xl font-light mt-10 mb-4 text-black" {...props} />,
  h3: (props) => <h3 className="text-xl sm:text-2xl font-light mt-8 mb-3 text-black" {...props} />,
  p: (props) => <p className="mb-6 leading-relaxed text-gray-700 font-light" {...props} />,
  ul: (props) => <ul className="mb-6 ml-6 space-y-2 text-gray-700" {...props} />,
  ol: (props) => <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-2 border-black pl-6 my-8 italic text-gray-600 font-light" {...props} />
  ),
  code: (props) => (
    <code className="bg-gray-100 px-2 py-1 text-sm font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-black text-white p-6 rounded-none overflow-x-auto my-8 text-sm" {...props} />
  ),
  img: (props) => (
    <Image className="w-full my-8" {...props} />
  ),
  a: (props) => (
    <a className="underline underline-offset-2 hover:no-underline transition-all" {...props} />
  ),
  hr: () => <hr className="my-12 border-gray-200" />,
  strong: (props) => <strong className="font-medium text-black" {...props} />,
  em: (props) => <em className="italic" {...props} />,
}

// Fix: await params in Next.js 15
export default async function ArtikelDetailPage({ params }) {
  // Await params first (Next.js 15 requirement)
  const { slug } = await params
  
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <Link 
              href="/article" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors"
            >
              <span className="mr-2">←</span>
              <span className="font-light">Kembali ke Artikel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <article>
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-6">
              <span className="uppercase tracking-wider font-light">
                {article.frontmatter.category}
              </span>
              <span className="font-light">•</span>
              <time className="font-light">
                {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="font-light">•</span>
              <span className="font-light">{article.frontmatter.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-black mb-8">
              {article.frontmatter.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-black rounded-full"></div>
              <div>
                <p className="font-medium text-black">{article.frontmatter.author}</p>
                {article.frontmatter.authorBio && (
                  <p className="text-sm text-gray-600 font-light">{article.frontmatter.authorBio}</p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.frontmatter.coverImage && (
        <div className="w-full bg-gray-100 mb-8 sm:mb-12 lg:mb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Image
                src={article.frontmatter.coverImage}
                alt={article.frontmatter.title} 
                width={1200}
                height={600}
                className="w-full"
                />
            </div>
            </div>
        </div>
        )}


        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt/Lead */}
            {article.frontmatter.excerpt && (
              <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-700 mb-8 sm:mb-12">
                {article.frontmatter.excerpt}
              </p>
            )}

            {/* MDX Content */}
            <div className="prose-base sm:prose-lg max-w-none">
              <MDXRemote source={article.content} components={components} />
            </div>

            {/* Tags */}
            {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
              <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-light">
                  Topik Terkait
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.frontmatter.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-2 text-sm border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24">
          <div className="max-w-3xl mx-auto">
            {/* Author Bio Box */}
            {article.frontmatter.authorBio && (
              <div className="border border-gray-200 p-6 sm:p-8 mb-12">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-light">
                  Tentang Penulis
                </h3>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-black mb-2">{article.frontmatter.author}</p>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                      {article.frontmatter.authorBio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center pb-16">
              <Link 
                href="/article"
                className="inline-flex items-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all text-sm uppercase tracking-wider"
              >
                Lihat Artikel Lainnya
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}