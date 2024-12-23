'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "How to Start a Successful Business in 2024",
    excerpt: "Learn the essential steps to launch your business, from market research to securing funding.",
    category: "Entrepreneurship",
    readTime: "8 min read",
    image: "https://illustrations.popsy.co/blue/engineer.svg",
    author: {
      name: "Sarah Johnson",
      avatar: "/uifaces-cartoon-image.jpg"
    }
  },
  {
    id: 2,
    title: "Digital Marketing Strategies for Small Businesses",
    excerpt: "Discover cost-effective marketing techniques to grow your business online and attract customers.",
    category: "Marketing",
    readTime: "6 min read",
    image: "https://img.freepik.com/free-vector/marketing-specialists-computer-with-megaphone-social-media-icons-social-media-marketing-social-networking-internet-marketing-concept-pinkish-coral-bluevector-isolated-illustration_335657-2290.jpg?t=st=1734940691~exp=1734944291~hmac=6218148f964ecc1b591b3107e35d114e712f126c830b17b8826dad9231dfbd21&w=996",
    author: {
      name: "Michael Chen",
      avatar: "/uifaces-cartoon-image (1).jpg"
    }
  },
  {
    id: 3,
    title: "Building a Strong Brand Identity",
    excerpt: "Create a memorable brand that resonates with your target audience and stands out in the market.",
    category: "Branding",
    readTime: "5 min read",
    image: "https://img.freepik.com/free-vector/smart-id-card-with-photo-users-identification-microchip-electronic-identity-card-plastic-smartcard-personal-information-chipcard-concept-vector-isolated-illustration_335657-2220.jpg?t=st=1734940596~exp=1734944196~hmac=770ccf00425630270fb07f8dbdb3d426699e7457b82b61c01a944f2f04e6be81&w=996",
    author: {
      name: "Emma Davis",
      avatar: "/uifaces-cartoon-image.jpg"
    }
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen md:py-32 bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Business Insights & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice and practical tips to help you build and grow your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="bg-gray-100"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span className="ml-3 text-sm text-gray-700">{post.author.name}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
