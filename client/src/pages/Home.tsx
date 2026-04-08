/* DevHosting — Home Page
   Design: Obsidian Premium — Full site assembly */

import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Plans from "@/components/Plans";
import PlanComparison from "@/components/PlanComparison";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Migration from "@/components/Migration";
import Domains from "@/components/Domains";
import Payments from "@/components/Payments";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />
      <Hero />
      <WhyUs />
      <Plans />
      <PlanComparison />
      <Infrastructure />
      <Security />
      <Migration />
      <Domains />
      <Payments />
      <FAQ />
      <Footer />
      <AIChatButton />
      <CookieBanner />
    </div>
  );
}
