import HowWeWork from "./HowWeWork"

export const metadata = {
    title: 'Our Process | How We Work | Pinova Agency',
    description: 'Discover our proven 4-step process for delivering exceptional digital solutions. From discovery to launch, we ensure transparency and results.',
    openGraph: {
      title: 'Our Development Process | Pinova Agency',
      description: 'See how we transform ideas into digital reality',
      images: [{
        url: 'https://illustrations.popsy.co/blue/woman-with-a-laptop.svg',
        width: 1200,
        height: 630,
      }],
    }
  }
  
  export default function HowWeWorkPage() {
    return  <HowWeWork />;
  }