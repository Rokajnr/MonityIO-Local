import ClientSideInitializer from "@/components/ClientSideInitializer";
import Navbar from "@/components/Navbar";
import TickerBar from "@/components/TickerBar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";
import Standards from "@/components/Standards";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white text-[#171717] min-h-screen">
      {/* Client-side animations and cursor initialization */}
      <ClientSideInitializer />

      <Navbar />
      <TickerBar />
      <Hero />
      <Process />
      <Dashboard />
      <Features />
      <Standards />
      <Industries />
      <CaseStudies />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}