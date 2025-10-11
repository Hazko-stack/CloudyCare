import { createClient } from '@supabase/supabase-js'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { FloatingDockDemo } from '@/components/Dock'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function getSupabaseImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/health-articles/${path}`
}

async function listArticles() {
  try {
    const { data, error } = await supabase
      .storage
      .from('health-articles')
      .list('mdx', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return data
      .filter(file => file.name && (file.name.endsWith('.mdx') || file.name.endsWith('.md')))
      .map(file => file.name)
  } catch (error) {
    console.error('Error listing articles:', error)
    return []
  }
}

async function fetchArticle(filename) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const url = `${supabaseUrl}/storage/v1/object/public/health-articles/mdx/${filename}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      console.error(`Failed to fetch ${filename}:`, response.status)
      return null
    }
    
    const text = await response.text()
    const { data: frontmatter, content } = matter(text)
    
    const slug = filename
      .replace('.mdx', '')
      .replace('.md', '')
      .toLowerCase()
      .replace(/\s+/g, '-')
    
    return {
      slug,
      filename,
      frontmatter: {
        title: frontmatter.title || filename.replace(/\.(md|mdx)$/, ''),
        author: frontmatter.author || 'Admin',
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || content.substring(0, 150).replace(/[#*`]/g, '') + '...',
        // JANGAN convert disini - biarkan path asli
        coverImage: frontmatter.coverImage,
        thumbnail: frontmatter.thumbnail,
        category: frontmatter.category || 'Kesehatan',
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || '5 menit',
        ...frontmatter
      },
      content
    }
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error)
    return null
  }
}

export default async function ArticlePage() {
  const articleFilenames = await listArticles()
  const articlePromises = articleFilenames.map(filename => fetchArticle(filename))
  const articles = (await Promise.all(articlePromises)).filter(Boolean)
  
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB - dateA
  })

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12 lg:py-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
              Artikel
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-light">
              {sortedArticles.length} artikel tersedia untuk Anda
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {sortedArticles.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <p className="text-gray-400 text-lg font-light">Tidak ada artikel tersedia</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {sortedArticles[0] && (
              <div className="mb-12 sm:mb-16 lg:mb-20">
                <Link href={`/article/${sortedArticles[0].slug}`}>
                  <article className="group cursor-pointer">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      {sortedArticles[0].frontmatter.coverImage ? (
                        <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                          <Image
                            src={getSupabaseImageUrl(sortedArticles[0].frontmatter.coverImage)}
                            alt={sortedArticles[0].frontmatter.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-black"></div>
                      )}
                      
                      <div className="py-4">
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                          <span className="uppercase tracking-wider">
                            {sortedArticles[0].frontmatter.category}
                          </span>
                          <span>•</span>
                          <time>{new Date(sortedArticles[0].frontmatter.date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</time>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight text-black mb-4 group-hover:text-gray-700 transition-colors">
                          {sortedArticles[0].frontmatter.title}
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base line-clamp-3">
                          {sortedArticles[0].frontmatter.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span>{sortedArticles[0].frontmatter.author}</span>
                            <span className="mx-2">•</span>
                            <span>{sortedArticles[0].frontmatter.readTime}</span>
                          </div>
                          <span className="text-sm font-medium uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                            Baca →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {sortedArticles.length > 1 && (
              <>
                <div className="border-t border-gray-200 pt-12 sm:pt-16 mb-8">
                  <h2 className="text-xl sm:text-2xl font-light text-black mb-8 sm:mb-12">
                    Artikel Lainnya
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                  {sortedArticles.slice(1).map((article) => {
                    const imagePath = article.frontmatter.thumbnail || article.frontmatter.coverImage
                    const imageUrl = getSupabaseImageUrl(imagePath)
                    
                    return (
                      <Link key={article.slug} href={`/article/${article.slug}`}>
                        <article className="group cursor-pointer">
                          {imageUrl ? (
                            <div className="aspect-[16/10] bg-gray-100 overflow-hidden mb-4 relative">
                              <Image
                                src={imageUrl}
                                alt={article.frontmatter.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="aspect-[16/10] bg-black mb-4"></div>
                          )}
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="uppercase tracking-wider">
                                {article.frontmatter.category}
                              </span>
                              <span>•</span>
                              <time>{new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                                month: 'short',
                                day: 'numeric'
                              })}</time>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-light leading-snug text-black group-hover:text-gray-700 transition-colors line-clamp-2">
                              {article.frontmatter.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                              {article.frontmatter.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs text-gray-500">
                                {article.frontmatter.readTime}
                              </span>
                              <span className="text-xs font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {sortedArticles.some(a => a.frontmatter.tags?.length > 0) && (
              <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 border-t border-gray-200">
                <h3 className="text-sm font-light uppercase tracking-wider text-gray-500 mb-6">
                  Topik Populer
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {Array.from(new Set(sortedArticles.flatMap(a => a.frontmatter.tags || [])))
                    .slice(0, 10)
                    .map(tag => (
                      <span 
                        key={tag}
                        className="px-4 py-2 text-xs sm:text-sm border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <FloatingDockDemo />
    </div>
  )
}