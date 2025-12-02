import { useEffect, useState } from "react";
import { Ship, Compass, Mail, MapPin, ChevronRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-heritage.jpg";
import logo from "@/assets/logo.png";
import teamImage from "@/assets/team-submarine.jpg";
import shipwreckImage from "@/assets/shipwreck-scan.jpg";
import martinImage from "@/assets/martin-wenzel.jpg";
import joergImage from "@/assets/joerg-mathieu.jpg";

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
            <img src={logo} alt="Nautic Discovery" className="w-12 h-12" />
            <span className="text-xl font-serif font-semibold text-navy tracking-tight">
              Nautic Discovery
            </span>
          </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="sonar-nav text-sm font-medium text-foreground/70 hover:text-navy transition-colors px-3 py-2"
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
          <img src={logo} alt="Nautic Discovery" className="w-16 h-16 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-relaxed">
            "It needs a lot of silver to find the gold"
          </blockquote>
          <p className="text-lg text-muted-foreground">— Mac Mace</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding section-accent">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="floating-badge mb-4 animate-float">Underwater Exploration</span>
            <h2 className="heading-xl font-serif text-navy mb-4">Our Mission</h2>
            <div className="heritage-line max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-body-lg text-foreground/80">
              <p className="leading-relaxed">
                Nautic Discovery is dedicated to the exploration and documentation of historical
                shipwrecks around the world. We combine cutting-edge underwater technology with
                traditional maritime archaeology to uncover the stories hidden beneath the waves.
              </p>

              <p className="leading-relaxed">
                Our team of experienced divers, archaeologists, and historians work together to
                locate, document, and preserve these underwater time capsules. Each shipwreck tells
                a unique story of human ambition, trade, and survival on the high seas.
              </p>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-ocean/5 to-brass/5 rounded-lg border border-ocean/10">
                <Waves className="w-6 h-6 text-ocean mt-1 flex-shrink-0" />
                <p className="text-sm text-foreground/70">
                  From ancient Mediterranean vessels to modern warships, we explore the depths to
                  bring history to the surface, ensuring these important discoveries are shared with
                  the world and preserved for future generations.
                </p>
              </div>
            </div>

            <div className="image-modern">
              <img src={shipwreckImage} alt="Underwater shipwreck scan" className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="floating-badge mb-4">Leadership Team</span>
            <h2 className="heading-xl font-serif text-navy mb-4">The Founders</h2>
            <div className="heritage-line max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="card-modern p-8 group">
              <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-ocean/20 to-brass/20 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img src={joergImage} alt="Jörg Mathieu" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-navy text-center mb-2">
                Jörg Mathieu
              </h3>
              <p className="text-ocean font-medium text-center mb-4 text-sm">Co-Founder & Lead Explorer</p>
              <p className="text-foreground/70 leading-relaxed text-center text-sm">
                Expert in maritime archaeology with over 20 years of deep-sea exploration experience.
              </p>
            </div>

            <div className="card-modern p-8 group">
              <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-ocean/20 to-brass/20 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img src={martinImage} alt="Martin Wenzel" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-navy text-center mb-2">
                Martin Wenzel
              </h3>
              <p className="text-ocean font-medium text-center mb-4 text-sm">Co-Founder & Technical Director</p>
              <p className="text-foreground/70 leading-relaxed text-center text-sm">
                Specialist in underwater technology and historical ship research.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="image-modern">
              <img src={teamImage} alt="Team member in submarine" className="w-full h-[300px] object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section id="expeditions" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="floating-badge mb-4">Discoveries</span>
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
                status: "Active",
              },
              {
                title: "Mediterranean Odyssey",
                location: "Mediterranean Sea",
                year: "2022",
                description: "Uncovering ancient Roman trade routes and shipwrecks.",
                status: "Completed",
              },
              {
                title: "Atlantic Expedition",
                location: "North Atlantic",
                year: "2021",
                description: "Mapping uncharted wrecks from the Age of Exploration.",
                status: "Completed",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="card-modern p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-ocean to-brass text-white">
                    {project.year}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    project.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-navy mb-3 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-ocean" />
                  {project.location}
                </div>
                <p className="text-foreground/70 leading-relaxed text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative overflow-hidden bg-gradient-to-br from-navy via-navy to-ocean text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brass rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ocean rounded-full blur-3xl" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8 animate-float">
            <Mail className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="heading-lg font-serif mb-6">Get in Touch</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Interested in our expeditions or want to learn more about our discoveries?
            We'd love to hear from you.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/95 text-navy px-8 h-12 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Contact Us
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border">
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Nautic Discovery" className="w-10 h-10" />
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
