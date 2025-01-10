import exp from "constants";
import Services from "./Services";

export const metadata = {
  title: 'Digital Services | Web Development, Design & SEO | Pinova Agency',
  description: 'Transform your digital presence with Pinova Agency\'s professional web development, design, and SEO services. Get custom solutions for your business needs.',
  keywords: ['web development', 'web design', 'SEO services', 'digital agency'],
  openGraph: {
    title: 'Digital Services | Pinova Agency',
    description: 'Professional web development, design & SEO services',
    images: [{
      url: '/images/services-og.jpg',
      width: 1200,
      height: 630,
    }],
  }
}

export default function ServicesPage() {
  return  <Services />;
}