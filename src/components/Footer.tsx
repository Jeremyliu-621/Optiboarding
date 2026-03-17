import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export function FooterCTA() {
  return (
    <section className="w-full pt-8 pb-40 px-6 border-b border-[var(--border-subtle)]">
      <div className="max-w-2xl mx-auto text-center">
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
      </div>
    </section>
  );
}

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
    {
      title: "Follow",
      links: [
        { name: "Twitter", href: "#" },
        { name: "LinkedIn", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[var(--bg-surface)] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-0.75 mb-6">
              <Image src="/optimalaismalllogo.png" alt="Optimal AI" width={25} height={25} className="rounded shrink-0" />
              <span className="text-[18px] leading-none mt-[2px] font-normal tracking-[-0.02em] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>Optimal AI</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              AI code review with full codebase context.
            </p>
            <p className="text-[var(--text-muted)] text-xs">
              &copy; {new Date().getFullYear()} Optimal AI. All rights reserved.
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
      </div>
    </footer>
  );
}
