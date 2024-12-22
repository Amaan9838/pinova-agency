import Image from 'next/image'

const footerLinks = {
  leftSection: [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms", href: "#" },
    { text: "sales@pinova.in", href: "mailto:sales@pinova.in" }
  ],
  rightSection: [
    { text: "Our services", href: "#" },
    { text: "Our projects", href: "#" },
    { text: "How it works", href: "#" },
    { text: "Customer reviews", href: "#" }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-[#000] py-6 md:py-16 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 text-white">
        <div className="flex flex-col gap-12">
          <Image src="/pinova_black_logo.png" alt="Pinova Logo" width={300} height={300} className='w-48 md:w-64' />
          <div className='flex md:flex-row flex-col md:gap-12 gap-4'>
            {footerLinks.leftSection.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className={`text-lg ${
                  link.text === 'sales@pinova.in' 
                    ? 'text-white font-semibold' 
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:items-center gap-12">
          <div className="hidden md:flex md:flex-col flex-row gap-6">
            <div className="flex gap-12">
              {footerLinks.rightSection.slice(0, 2).map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-400 font-semibold text-lg hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
            <div className="flex gap-12">
              {footerLinks.rightSection.slice(2, 4).map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-400 font-semibold text-lg hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <a 
            href="#top" 
            className="flex items-center gap-2 text-white border border-white rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
