import Image from 'next/image';

const FeaturedOn = () => {
  const features = [
    {
      name: 'Trustpilot',
      logo: '/trustpilot-1.svg',
      link: 'https://www.trustpilot.com',
      rating: '4.8/5'
    },
    {
      name: 'Design Rush',
      logo: '/designrush-badge.png',
      link: 'https://www.designrush.com',
      badge: 'Top Agency 2024'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured On
          </h2>
          <p className="text-text text-lg">
            Recognized by leading platforms in the industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
          {features.map((feature) => (
            <a
              key={feature.name}
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-sm p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
  <div className="relative w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-24 transition-all duration-300 hover:scale-105">
    <Image
      src={feature.logo}
      alt={`${feature.name} logo`}
      fill
      className="object-contain filter hover:brightness-110"
      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
      priority
    />
  </div>
  {feature.rating && (
    <div className="text-lg sm:text-xl text-primary font-semibold transform hover:scale-105 transition-transform">
      {feature.rating}
    </div>
  )}
  {feature.badge && (
    <div className="bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base hover:bg-primary/15 transition-colors">
      {feature.badge}
    </div>
  )}
</div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;
