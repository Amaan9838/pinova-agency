import Terms from './Terms';
export const metadata = {
    title: 'Terms of Service | Pinova Agency',
    description: 'Read our terms of service to understand the agreement between Pinova Agency and our clients regarding the use of our services.',
    openGraph: {
      title: 'Terms of Service | Pinova Agency',
      type: 'website',
      images: [{
        url: 'https://www.pinova.in/pinova_black_logo.png',
        width: 1200,
        height: 630,
      }],
    }
  }
  
  export default function TermsPage() {
    return <Terms />;
  }