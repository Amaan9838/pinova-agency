'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

const blogPost = {
  id: 1,
  title: "How to Start a Successful Business in 2024",
  publishDate: "January 15, 2024",
  readTime: "8 min read",
  author: {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "Business Strategy Expert"
  },
  category: "Entrepreneurship",
  image: "https://illustrations.popsy.co/blue/startup-launch.svg",
  content: [
    {
      type: "paragraph",
      content: "Starting a business in 2024 requires a strategic approach that combines traditional business principles with modern digital solutions. Here's your comprehensive guide to launching a successful venture."
    },
    {
      type: "heading",
      content: "1. Market Research and Validation"
    },
    {
      type: "paragraph",
      content: "Before investing time and resources, thoroughly research your market. Understand your target audience, analyze competitors, and identify unique opportunities. Use tools like Google Trends, social media insights, and customer surveys to validate your business idea."
    },
    {
      type: "heading",
      content: "2. Business Plan Development"
    },
    {
      type: "paragraph",
      content: "Create a detailed business plan that outlines your vision, mission, and strategies. Include financial projections, marketing plans, and operational procedures. This document will serve as your roadmap and is essential for securing funding."
    },
    {
      type: "heading",
      content: "3. Legal and Financial Setup"
    },
    {
      type: "paragraph",
      content: "Choose the right business structure, register your company, and obtain necessary licenses. Set up business banking, accounting systems, and ensure compliance with local regulations."
    }
  ],
  relatedPosts: [
    {
      id: 2,
      title: "Digital Marketing Strategies for Small Businesses",
      image: "https://illustrations.popsy.co/purple/digital-marketing.svg"
    },
    {
      id: 3,
      title: "Building a Strong Brand Identity",
      image: "https://illustrations.popsy.co/blue/brand-identity.svg"
    }
  ]
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-96">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              style={{ objectFit: 'cover' }}
              className="bg-gray-100"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center mb-4 space-x-4">
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                {blogPost.category}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readTime}
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {blogPost.publishDate}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {blogPost.title}
            </h1>

            <div className="flex items-center mb-8 pb-8 border-b">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{blogPost.author.name}</div>
                <div className="text-sm text-gray-500">{blogPost.author.role}</div>
              </div>
              <button className="ml-auto flex items-center text-gray-500 hover:text-gray-900">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              {blogPost.content.map((section, index) => (
                section.type === 'heading' ? (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>
                ) : (
                  <p key={index} className="mb-6 text-gray-600">{section.content}</p>
                )
              ))}
            </div>
          </div>
        </motion.article>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPost.relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900">{post.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
