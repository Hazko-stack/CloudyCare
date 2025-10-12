// lib/mdx-utils.js
import { supabase } from './supabase'
import matter from 'gray-matter'

export async function getArticlesList() {
  try {
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

    const mdFiles = files.filter(file => 
      file.name.endsWith('.md') || file.name.endsWith('.mdx')
    )

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

    return articles.filter(Boolean) 
  } catch (error) {
    console.error('Error in getArticlesList:', error)
    return []
  }
}

export async function getArticleByFilename(filename) {
  try {
    const { data, error } = await supabase
      .storage
      .from('health-articles')
      .download(`mdx/${filename}`)

    if (error) {
      console.error('Error downloading file:', error)
      return null
    }

    const text = await data.text()
    const { data: frontmatter, content } = matter(text)
 
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
    const { data: files, error } = await supabase
      .storage
      .from('health-articles')
      .list('mdx')

    if (error) throw error

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


export function getImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path

  const { data } = supabase
    .storage
    .from('health-articles')
    .getPublicUrl(path.startsWith('/') ? path.slice(1) : path)
  
  return data.publicUrl
}