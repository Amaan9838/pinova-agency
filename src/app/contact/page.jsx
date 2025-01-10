import Contact from "./Contact"

export const metadata = {
    title: 'Contact Us | Get in Touch | Pinova Agency',
    description: 'Ready to start your project? Contact Pinova Agency for web development, design, and digital marketing services. Let\'s create something extraordinary together.',
    openGraph: {
      title: 'Contact Pinova Agency',
      description: 'Let\'s discuss your next digital project',
      images: [{
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
      }],
    },
    alternates: {
      canonical: 'https://pinova.agency/contact'
    }
  }
  
  export default function ContactPage() {
    return  <Contact />;    
  }