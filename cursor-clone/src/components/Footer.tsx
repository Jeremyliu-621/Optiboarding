import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Pricing", href: "#" },
        { name: "Enterprise", href: "#" },
        { name: "Changelog", href: "#" },
        { name: "Features", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Docs", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Forum", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#f8f8f8] pt-24 pb-12 px-6 border-t border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Call to Action */}
        <div className="text-center mb-32 max-w-2xl">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-black mb-8">
            Ready to code faster?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="rounded-full h-12 px-8 bg-[#171717] hover:bg-black text-white text-lg">
              Download for Windows
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 text-lg border-[#e2e2e2]">
              View Pricing
            </Button>
          </div>
        </div>

        {/* Footer Navigation Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-[#e2e2e2]/60">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor"/>
              </svg>
              <span className="text-xl font-bold tracking-tight">CURSOR</span>
            </div>
            <p className="text-[#878787] text-sm">
              The AI-first code editor.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-black font-medium mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#878787] hover:text-black text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex items-center justify-between pt-16 mt-16 border-t border-[#e2e2e2]/60 text-sm text-[#878787]">
          <div>© {new Date().getFullYear()} Cursor. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-black transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-black transition-colors">Discord</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
