// lib/mdx-utils.js
import { supabase } from './supabase'
import matter from 'gray-matter'

// Fungsi untuk list semua artikel
export async function getArticlesList() {
  try {
    // List semua file di folder mdx
    const { data: files, error } = await supabase
      .storage
      .from('health-articles')
      .list('mdx', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Error listing files:', error)
      return []
    }

    // Filter hanya file .md atau .mdx
    const mdFiles = files.filter(file => 
      file.name.endsWith('.md') || file.name.endsWith('.mdx')
    )

    // Fetch content untuk setiap artikel
    const articles = await Promise.all(
      mdFiles.map(async (file) => {
        const article = await getArticleByFilename(file.name)
        return {
          ...article,
          createdAt: file.created_at,
          updatedAt: file.updated_at,
          fileSize: file.metadata?.size || 0
        }
      })
    )

    return articles.filter(Boolean) // Remove null values
  } catch (error) {
    console.error('Error in getArticlesList:', error)
    return []
  }
}

// Fungsi untuk fetch single artikel by filename
export async function getArticleByFilename(filename) {
  try {
    // Download file content
    const { data, error } = await supabase
      .storage
      .from('health-articles')
      .download(`mdx/${filename}`)

    if (error) {
      console.error('Error downloading file:', error)
      return null
    }

    // Convert blob to text
    const text = await data.text()
    
    // Parse frontmatter dan content
    const { data: frontmatter, content } = matter(text)
    
    // Generate slug dari filename
    const slug = filename
      .replace('.mdx', '')
      .replace('.md', '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')

    return {
      slug,
      filename,
      frontmatter: {
        title: frontmatter.title || filename.replace(/\.(md|mdx)$/, ''),
        author: frontmatter.author || 'Admin',
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || content.substring(0, 150) + '...',
        coverImage: frontmatter.coverImage || null,
        category: frontmatter.category || 'Umum',
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || '5 menit',
        ...frontmatter
      },
      content
    }
  } catch (error) {
    console.error('Error in getArticleByFilename:', error)
    return null
  }
}

// Fungsi untuk fetch artikel by slug
export async function getArticleBySlug(slug) {
  try {
    // List semua files untuk cari yang match dengan slug
    const { data: files, error } = await supabase
      .storage
      .from('health-articles')
      .list('mdx')

    if (error) throw error

    // Cari file yang match dengan slug
    const matchedFile = files.find(file => {
      const fileSlug = file.name
        .replace('.mdx', '')
        .replace('.md', '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
      
      return fileSlug === slug
    })

    if (!matchedFile) {
      console.log('No file found for slug:', slug)
      return null
    }

    return getArticleByFilename(matchedFile.name)
  } catch (error) {
    console.error('Error in getArticleBySlug:', error)
    return null
  }
}

// Fungsi untuk get public URL gambar
export function getImageUrl(path) {
  if (!path) return null
  
  // Jika sudah full URL, return as is
  if (path.startsWith('http')) return path
  
  // Generate Supabase public URL
  const { data } = supabase
    .storage
    .from('health-articles')
    .getPublicUrl(path.startsWith('/') ? path.slice(1) : path)
  
  return data.publicUrl
}