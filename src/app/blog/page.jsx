import Blog from "./Blog";

export const metadata = {
    title: 'Blog - Business Insights & Guides',
    description: 'Expert advice and practical tips to help you build and grow your business.',
    openGraph: {
      title: 'Blog - Business Insights & Guides',
      description: 'Expert advice and practical tips to help you build and grow your business.',
      images: ['/og-blog.jpg'],
    },
  };

  export default function BlogPage() {
    return <Blog />;
  }