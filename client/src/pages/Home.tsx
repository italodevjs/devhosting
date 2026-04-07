/* DevHosting — Home Page
   Design: Obsidian Premium — Full site assembly
   Integrates all sections: Navbar, Hero, Plans, Infrastructure, Security, Domains, Payments, Footer */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Domains from "@/components/Domains";
import Payments from "@/components/Payments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Plans />
      <Infrastructure />
      <Security />
      <Domains />
      <Payments />
      <Footer />
    </div>
  );
}
