import { Metadata } from 'next'
import BlogPost from "./BlogPost"
import { blogPosts } from '@/app/blog/blogPosts'

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const post = blogPosts.find(post => post.slug === params.id)
  const baseUrl =  'https://www.pinova.in'
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: 'noindex, nofollow'
    }
  }

  // Construct canonical URL
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`

  return {
    title: {
      absolute: `${post.title} | Your Brand Name`,
      template: '%s | Your Brand Name'
    },
    description: post.excerpt,
    keywords: ['blog', 'article', post.category], // Assuming you add tags to posts
    authors: [{ name: post.author.name, url: `${baseUrl}/author/${post.author.name}` }],
    canonical: canonicalUrl,
    
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Pinova Technologies',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate, // If you track updates
      authors: [post.author.name],
      tags: post.tags,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      creator: '@pinovastudio',
      site: '@pinova',
    },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/blog/${post.slug}`,
        // Add other language versions if available
      },
    },
    
    // Schema.org structured data
    other: {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.publishDate,
        dateModified: post.updatedDate,
        author: {
          '@type': 'Person',
          name: post.author.name,
          url: `${baseUrl}/author/${post.author.name}`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Pinova Technologies',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
    },
    
   
    
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}

export default function BlogPostPage({ params }) {
  return <BlogPost params={params.id} />
}
