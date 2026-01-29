import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BobaShowcase from "@/components/BobaShowcase";
import Features from "@/components/Features";
import Lineup from "@/components/Lineup";
import Footer from "@/components/Footer";
import Location from "@/components/Location";
import InstagramFeed from "@/components/InstagramFeed";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="bg-[#F5F5F0]">
        <BobaShowcase />
      </section>

      <Features />
      <Lineup />
      <InstagramFeed />
      <Location />
      <Footer />
    </main>
  );
}
