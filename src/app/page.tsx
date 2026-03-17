import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoWall } from "@/components/LogoWall";
import { AgentFeatures } from "@/components/AgentFeatures";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoWall />
      <AgentFeatures />
      <FeatureGrid />
      <Testimonials />
      <Footer />
    </main>
  );
}
