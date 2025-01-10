'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { blogPosts } from '@/app/blog/blogPosts';


export default function BlogPost({ params }) {
  // Use useMemo to memoize the post data
  console.log("this is params",params);
  const post = useMemo(() => blogPosts.find(post => post.slug === params), [params]);

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <main className="min-h-screen md:py-40 bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              className="bg-gray-100"
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center mb-4 gap-4">
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
              {post.publishDate && (
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.publishDate}
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center mb-8 pb-8 border-b">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.author.role}</div>
              </div>
              <button
                onClick={sharePost}
                className="ml-auto flex items-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </motion.article>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900">{relatedPost.title}</h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
