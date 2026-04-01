import { useEffect, useState } from "react";
import { Mail, MapPin, ChevronRight, Waves, Anchor, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Counter from "@/components/Counter";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import heroImage from "@/assets/hero-heritage.jpg";
import logo from "@/assets/logo.png";
import teamImage from "@/assets/team-submarine.jpg";
import shipwreckImage from "@/assets/shipwreck-scan.jpg";
import martinImage from "@/assets/martin-wenzel.jpg";
import joergImage from "@/assets/joerg-mathieu.jpg";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
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
                  className="nav-link-underline pb-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section — Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-background" />

        <div className="relative z-10 container-wide pt-20">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="heading-display text-white mb-6 font-serif">
              Nautic Discovery
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-2xl md:text-3xl text-white/95 font-light">
                Entdeckung der versunkenen Schätze
              </p>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Discovering the Treasures of the Deep
              </p>
            </div>

            {/* Animated stats strip */}
            <div className="flex flex-wrap gap-6 md:gap-10 mb-12 text-white/80">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-brass" />
                <span className="text-lg font-semibold text-white">
                  <Counter target={200} suffix="+" />
                </span>
                <span className="text-sm">Wrecks Explored</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brass" />
                <span className="text-lg font-semibold text-white">
                  <Counter target={15} />
                </span>
                <span className="text-sm">Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-brass" />
                <span className="text-lg font-semibold text-white">
                  <Counter target={25} suffix="+" />
                </span>
                <span className="text-sm">Years of Discovery</span>
              </div>
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
          <ScrollReveal>
            <img src={logo} alt="Nautic Discovery" className="w-16 h-16 mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <blockquote className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-relaxed">
              "It needs a lot of silver to find the gold"
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg text-muted-foreground mb-6">— Mac Mace</p>
            <div className="heritage-line max-w-24 mx-auto mb-8" />
            <p className="text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Every great discovery demands patience, investment, and an unyielding belief in what lies
              beneath the surface. Our expeditions are driven by the conviction that history's greatest
              stories are still waiting to be told.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding section-accent">
        <div className="container-wide">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">Underwater Exploration</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-navy mb-4">Our Mission</h2>
              <div className="heritage-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6 text-body-lg text-foreground/80">
                <p className="leading-relaxed">
                  Somewhere on the ocean floor, a ship rests in silence — its cargo untouched, its
                  story untold. Nautic Discovery exists to find these lost chapters of human history
                  and bring them back to light.
                </p>

                <p className="leading-relaxed">
                  We combine cutting-edge sonar mapping, ROV technology, and deep-sea diving expertise
                  with meticulous historical research. Our multidisciplinary team of archaeologists,
                  historians, and technical divers treat every wreck site as a time capsule deserving
                  the highest standard of care.
                </p>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-ocean/5 to-brass/5 rounded-lg border border-ocean/10">
                  <Waves className="w-6 h-6 text-ocean mt-1 flex-shrink-0" />
                  <p className="text-sm text-foreground/70">
                    From ancient Mediterranean trading vessels to wartime convoys lost in the Atlantic,
                    each expedition adds a new thread to the tapestry of maritime heritage — preserved
                    for future generations.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-serif font-bold text-navy">
                      <Counter target={25} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Years Active</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-serif font-bold text-navy">
                      <Counter target={200} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Wrecks Documented</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-serif font-bold text-navy">
                      <Counter target={1500} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Artifacts Recovered</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <ImageReveal
                src={shipwreckImage}
                alt="Underwater shipwreck scan"
                className="h-[450px]"
                imgClassName="w-full h-full object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">Leadership Team</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-navy mb-4">The Founders</h2>
              <div className="heritage-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <ScrollReveal delay={0}>
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
            </ScrollReveal>

            <ScrollReveal delay={150}>
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
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <ImageReveal
                src={teamImage}
                alt="Team member in submarine"
                className="h-[300px] rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expeditions Section */}
      <section id="expeditions" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">Discoveries</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-navy mb-4">Recent Expeditions</h2>
              <div className="heritage-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          {/* Timeline connector on desktop */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean/20 to-transparent -translate-y-1/2" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Baltic Treasure Fleet",
                  location: "Baltic Sea",
                  year: "2023",
                  description: "Discovery of 18th-century merchant vessels containing valuable cargo from the Swedish Empire's peak trading era.",
                  status: "Active",
                  highlight: "47 artifacts recovered",
                  depth: "85m",
                },
                {
                  title: "Mediterranean Odyssey",
                  location: "Mediterranean Sea",
                  year: "2022",
                  description: "Uncovering ancient Roman trade routes through a network of remarkably preserved shipwrecks off the coast of Sicily.",
                  status: "Completed",
                  highlight: "3 intact vessels mapped",
                  depth: "120m",
                },
                {
                  title: "Atlantic Expedition",
                  location: "North Atlantic",
                  year: "2021",
                  description: "Mapping uncharted wrecks from the Age of Exploration, revealing previously unknown Portuguese trade routes.",
                  status: "Completed",
                  highlight: "12 new sites catalogued",
                  depth: "200m",
                },
              ].map((project, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="card-modern p-8 group cursor-pointer relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-ocean to-brass text-white">
                        {project.year}
                      </span>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          project.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-navy mb-3 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-ocean" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Anchor className="w-3 h-3 mr-2 text-brass" />
                      Depth: {project.depth}
                    </div>
                    <p className="text-foreground/70 leading-relaxed text-sm mb-4">{project.description}</p>
                    <div className="pt-3 border-t border-border/50">
                      <span className="text-xs font-medium text-ocean">{project.highlight}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8 animate-float">
              <Mail className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-lg font-serif mb-6">Get in Touch</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Interested in our expeditions or want to learn more about our discoveries?
              We'd love to hear from you.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Button
              size="lg"
              className="bg-white hover:bg-white/95 text-navy px-8 h-12 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Contact Us
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </ScrollReveal>
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
