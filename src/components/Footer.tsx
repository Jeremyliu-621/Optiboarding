import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Optibot", href: "#" },
        { name: "Insights", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "API", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#f8f8f8] pt-24 pb-12 px-6 border-t border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Call to Action */}
        <div className="text-center mb-20 max-w-2xl">
          <h2 className="text-[32px] md:text-[40px] font-normal tracking-[-0.02em] text-black mb-4">
            Start reviewing PRs in under 5 minutes
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button className="rounded-full h-12 px-8 bg-[#171717] hover:bg-black text-white text-lg">
              Get a Demo
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 text-lg border-[#e2e2e2]">
              Get Started — Free
            </Button>
          </div>
          <p className="text-[13px] text-[#878787] mt-6">
            SOC 2 Type II certified · 99.99% uptime SLA · No code stored · Read-only by default
          </p>
        </div>

        {/* Footer Navigation Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-[#e2e2e2]/60">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-5 rounded-[5px] bg-[#e46a3d]" />
              <span className="text-[17px] font-bold tracking-tight">Optimal AI</span>
            </div>
            <p className="text-[#878787] text-sm">
              AI code review with full codebase context.
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
          <div>&copy; {new Date().getFullYear()} Optimal AI. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-black transition-colors">LinkedIn</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
