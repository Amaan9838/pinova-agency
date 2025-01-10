import Privacy from './Privacy';

export const metadata = {
    title: 'Privacy Policy | Pinova Agency',
    description: 'Learn about how we collect, use, and protect your personal information. Our commitment to your privacy and data security.',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Privacy Policy | Pinova Agency',
      type: 'website',
      images: [{
        url: 'https://www.pinova.in/pinova_black_logo.png',
        width: 1200,
        height: 630,
      }],
    }
  }
  
  export default function PrivacyPage() {
    return <Privacy />;
  }