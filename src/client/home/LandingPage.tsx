import CardSection from "./components/CardSection";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import VideoHeroCTA from "./components/VideoHeroCTA";


export default function LandingPage() {
  return (
    <>
    <div>
      <Navbar />
      <Hero />
     <CardSection />
     {/* <ServicesSection /> */}
     <VideoHeroCTA />
     <div className="bg-[#0A0A0A] md:px-30 ">
     <Footer/>
     </div>
    </div>
    </>
  );
}
