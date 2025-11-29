import { useEffect, useState } from "react";
import { Anchor, Waves, Compass, Ship, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-underwater.jpg";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = ["hero", "mission", "about", "team", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
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
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const teamMembers = [
    {
      name: "Jörg Mathieu",
      role: "Co-Founder & Lead Explorer",
      description: "Expert in maritime archaeology with over 20 years of deep-sea exploration experience.",
    },
    {
      name: "Martin Wenzel",
      role: "Co-Founder & Technical Director",
      description: "Specialist in underwater technology and historical ship research.",
    },
  ];

  const projects = [
    {
      title: "Baltic Treasure Fleet",
      location: "Baltic Sea",
      year: "2023",
      description: "Discovery of 18th-century merchant vessels containing valuable cargo.",
      icon: Ship,
    },
    {
      title: "Mediterranean Odyssey",
      location: "Mediterranean Sea",
      year: "2022",
      description: "Uncovering ancient Roman trade routes and shipwrecks.",
      icon: Compass,
    },
    {
      title: "Atlantic Expedition",
      location: "North Atlantic",
      year: "2021",
      description: "Mapping uncharted wrecks from the Age of Exploration.",
      icon: Anchor,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-2xl" : "glass"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <Waves className="w-8 h-8 text-accent" />
              <span className="text-xl font-bold">Nautic Discovery</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === item.id ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 parallax"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.1)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
          <div className="glass-heavy rounded-3xl p-12 md:p-16 glow">
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">Nautic Discovery</span>
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 mb-4 font-light">
              Entdeckung der versunkenen Schätze
            </p>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-light">
              Discovering the Treasures of the Deep
            </p>
            <Button
              onClick={() => scrollToSection("mission")}
              variant="outline"
              size="lg"
              className="glass hover:glass-strong text-foreground border-accent/50 hover:border-accent rounded-full px-8 py-6 text-lg group"
            >
              Explore Our Journey
              <ChevronDown className="ml-2 w-5 h-5 group-hover:animate-float" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-accent/70" />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section-container">
        <div className="glass rounded-3xl p-12 md:p-16 glow-hover animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <Anchor className="w-16 h-16 text-accent mx-auto mb-8 animate-float" />
            <blockquote className="text-3xl md:text-4xl font-light italic text-foreground/90 mb-6">
              "It needs a lot of silver to find the gold"
            </blockquote>
            <p className="text-xl text-muted-foreground">— Mac Mace</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12 animate-fade-in">
            <span className="text-gradient">Our Mission</span>
          </h2>
          
          <div className="glass rounded-3xl p-8 md:p-12 space-y-6 animate-fade-in-up">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Nautic Discovery is dedicated to the exploration and documentation of historical
              shipwrecks around the world. We combine cutting-edge underwater technology with
              traditional maritime archaeology to uncover the stories hidden beneath the waves.
            </p>
            
            <p className="text-lg text-foreground/90 leading-relaxed">
              Our team of experienced divers, archaeologists, and historians work together to
              locate, document, and preserve these underwater time capsules. Each shipwreck tells
              a unique story of human ambition, trade, and survival on the high seas.
            </p>
            
            <p className="text-lg text-foreground/90 leading-relaxed">
              From ancient Mediterranean vessels to modern warships, we explore the depths to
              bring history to the surface, ensuring these important discoveries are shared with
              the world and preserved for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg text-center mb-12 animate-fade-in">
            <span className="text-gradient">Meet the Founders</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 hover:glass-strong transition-all duration-300 glow-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center mb-6 glow">
                    <Compass className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-4">{member.role}</p>
                  <p className="text-foreground/80 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg text-center mb-12 animate-fade-in">
            <span className="text-gradient">Recent Expeditions</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 hover:glass-strong transition-all duration-300 hover:scale-105 glow-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <project.icon className="w-12 h-12 text-accent mb-6 animate-float" />
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                <p className="text-sm text-accent mb-4">{project.year}</p>
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12 animate-fade-in">
            <span className="text-gradient">Get in Touch</span>
          </h2>

          <div className="glass rounded-3xl p-12 text-center glow-hover animate-fade-in-up">
            <Mail className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
            <p className="text-xl text-foreground/90 mb-8 leading-relaxed">
              Interested in our expeditions or want to learn more about our discoveries?
              We'd love to hear from you.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-accent/50 transition-all"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Waves className="w-6 h-6 text-accent" />
              <span className="font-bold">Nautic Discovery</span>
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
