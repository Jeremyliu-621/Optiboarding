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
    <footer className="w-full bg-[var(--bg-surface)] pt-24 pb-12 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Call to Action */}
        <div className="text-center mb-20 max-w-2xl">
          <h2 className="text-[32px] md:text-[40px] font-normal tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Start reviewing PRs in under 5 minutes
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button className="rounded-full h-12 px-8 text-lg bg-[var(--text-primary)] hover:bg-white text-[var(--bg-deep)]">
              Get a Demo
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 text-lg border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-deep)]">
              Get Started — Free
            </Button>
          </div>
          <p className="text-[13px] text-[var(--text-muted)] mt-6">
            SOC 2 Type II certified · 99.99% uptime SLA · No code stored · Read-only by default
          </p>
        </div>

        {/* Footer Navigation Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-[var(--border-subtle)]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-5 rounded-[5px] bg-[#e46a3d]" />
              <span className="text-[17px] font-bold tracking-tight text-[var(--text-primary)]">Optimal AI</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              AI code review with full codebase context.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[var(--text-primary)] font-medium mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex items-center justify-between pt-16 mt-16 border-t border-[var(--border-subtle)] text-sm text-[var(--text-muted)]">
          <div>&copy; {new Date().getFullYear()} Optimal AI. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
