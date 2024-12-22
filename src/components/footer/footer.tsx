import Link from "next/link";
import { greatVibes } from "@/app/fonts/font";
import useAssets from "@/customHooks/useAssets";

const Footer = () => {
  const { svgs } = useAssets();

  const footerLinks = {
    opportunities: [
      { name: "Hackathons", href: "/hackathons" },
      { name: "Grants", href: "/grants" },
      { name: "Scholarships", href: "/scholarships" },
      { name: "Fellowships", href: "/fellowships" },
      { name: "Competitions", href: "/competitions" },
      { name: "Conferences", href: "/conferences" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "FAQ", href: "/faq" },
    ],
    social: [
      { name: "Twitter", href: "https://twitter.com", icon: "🐦" },
      { name: "LinkedIn", href: "https://linkedin.com", icon: "💼" },
      { name: "Instagram", href: "https://instagram.com", icon: "📸" },
      { name: "Discord", href: "https://discord.com", icon: "💬" },
    ],
  };

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={svgs.siteLogo.src}
                alt="Site Logo"
                className="h-10 w-10"
              />
              <h2 className={`${greatVibes.className} text-2xl`}>
                Eleva8 Access
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering individuals by providing access to life-changing
              opportunities worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-yellow-400 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold text-lg mb-4">Opportunities</h3>
            <ul className="space-y-2">
              {footerLinks.opportunities.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Eleva8 Access. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-400 text-sm"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-400 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-yellow-400 text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
