import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="contact">
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
