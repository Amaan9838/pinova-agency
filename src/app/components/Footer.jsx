import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Twitter, Phone } from 'lucide-react'

const footerLinks = {
  leftSection: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms", href: "/terms" },
    { text: "hello@pinova.in", href: "mailto:hello@pinova.in" }
  ],
  rightSection: [
    { text: "Our services", href: "/services" },
    { text: "How we works", href: "/how-we-work" },
    { text: "Blog", href: "/blog" }
  ],
  socialLinks: [
    { icon: Instagram, href: "https://www.instagram.com/pinovastudio/", label: "Instagram" },
    { icon: Facebook, href: "https://bitly.cx/iiXR", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    {  icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), 
    href: "https://x.com/pinovastudio", 
    label: "X" 
  },
  { 
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ), href: "https://wa.me/919266612906", label: "WhatsApp" }
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
          
          {/* Social Media Links */}
          <div className="flex gap-6 mt-4">
            {footerLinks.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:items-center gap-12">
          <div className="hidden md:flex md:flex-col flex-row gap-6">
            <div className="flex gap-12">
              {footerLinks.rightSection.map((link, index) => (
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
