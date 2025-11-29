import { useEffect, useState } from "react";
import { Anchor, Ship, Compass, Mail, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-heritage.jpg";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "mission", label: "Mission" },
    { id: "about", label: "About" },
    { id: "team", label: "Team" },
    { id: "expeditions", label: "Expeditions" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <Anchor className="w-7 h-7 text-navy" strokeWidth={2.5} />
              <span className="text-xl font-serif font-semibold text-navy tracking-tight">
                Nautic Discovery
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-foreground/70 hover:text-navy transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-background" />

        <div className="relative z-10 container-wide pt-20">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="heading-display text-white mb-6 font-serif">
              Nautic Discovery
            </h1>
            <div className="space-y-3 mb-12">
              <p className="text-2xl md:text-3xl text-white/95 font-light">
                Entdeckung der versunkenen Schätze
              </p>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Discovering the Treasures of the Deep
              </p>
            </div>
            <Button
              onClick={() => scrollToSection("mission")}
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white px-8 h-12 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Explore Our Heritage
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section id="mission" className="section-padding bg-cream">
        <div className="container-narrow text-center">
          <Anchor className="w-12 h-12 text-ocean mx-auto mb-8" strokeWidth={1.5} />
          <blockquote className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-relaxed">
            "It needs a lot of silver to find the gold"
          </blockquote>
          <p className="text-lg text-muted-foreground">— Mac Mace</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="heading-xl font-serif text-navy mb-4">Our Mission</h2>
            <div className="heritage-line max-w-24 mx-auto" />
          </div>

          <div className="space-y-8 text-body-lg text-foreground/80">
            <p>
              Nautic Discovery is dedicated to the exploration and documentation of historical
              shipwrecks around the world. We combine cutting-edge underwater technology with
              traditional maritime archaeology to uncover the stories hidden beneath the waves.
            </p>

            <p>
              Our team of experienced divers, archaeologists, and historians work together to
              locate, document, and preserve these underwater time capsules. Each shipwreck tells
              a unique story of human ambition, trade, and survival on the high seas.
            </p>

            <p>
              From ancient Mediterranean vessels to modern warships, we explore the depths to
              bring history to the surface, ensuring these important discoveries are shared with
              the world and preserved for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="heading-xl font-serif text-navy mb-4">The Founders</h2>
            <div className="heritage-line max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-ocean/10 mb-6 mx-auto">
                <Compass className="w-10 h-10 text-ocean" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-navy text-center mb-2">
                Jörg Mathieu
              </h3>
              <p className="text-ocean font-medium text-center mb-4">Co-Founder & Lead Explorer</p>
              <p className="text-foreground/70 leading-relaxed text-center">
                Expert in maritime archaeology with over 20 years of deep-sea exploration experience.
              </p>
            </div>

            <div className="bg-white p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-ocean/10 mb-6 mx-auto">
                <Ship className="w-10 h-10 text-ocean" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-navy text-center mb-2">
                Martin Wenzel
              </h3>
              <p className="text-ocean font-medium text-center mb-4">Co-Founder & Technical Director</p>
              <p className="text-foreground/70 leading-relaxed text-center">
                Specialist in underwater technology and historical ship research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section id="expeditions" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="heading-xl font-serif text-navy mb-4">Recent Expeditions</h2>
            <div className="heritage-line max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Baltic Treasure Fleet",
                location: "Baltic Sea",
                year: "2023",
                description: "Discovery of 18th-century merchant vessels containing valuable cargo.",
              },
              {
                title: "Mediterranean Odyssey",
                location: "Mediterranean Sea",
                year: "2022",
                description: "Uncovering ancient Roman trade routes and shipwrecks.",
              },
              {
                title: "Atlantic Expedition",
                location: "North Atlantic",
                year: "2021",
                description: "Mapping uncharted wrecks from the Age of Exploration.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-sm border border-border hover:border-ocean/50 hover:shadow-md transition-all group"
              >
                <div className="text-sm font-medium text-ocean mb-2">{project.year}</div>
                <h3 className="text-2xl font-serif font-semibold text-navy mb-3 group-hover:text-ocean transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                <p className="text-foreground/70 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-navy text-white">
        <div className="container-narrow text-center">
          <Mail className="w-14 h-14 mx-auto mb-8 text-white/90" strokeWidth={1.5} />
          <h2 className="heading-lg font-serif mb-6">Get in Touch</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Interested in our expeditions or want to learn more about our discoveries?
            We'd love to hear from you.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/95 text-navy px-8 h-12 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border">
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Anchor className="w-6 h-6 text-navy" strokeWidth={2} />
              <span className="font-serif font-semibold text-navy">Nautic Discovery</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nautic Discovery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
