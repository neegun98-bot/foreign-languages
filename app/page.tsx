import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import About from "@/components/sections/About";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Languages from "@/components/sections/Languages";
import Method from "@/components/sections/Method";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Languages />
        <About />
        <Method />
        <Pricing />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
