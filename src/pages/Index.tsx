import { useEffect, useState, useRef } from "react";
import { Mail, MapPin, ChevronRight, Waves, ExternalLink, Globe, Anchor, Compass, ChevronDown, Menu, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import BubbleField from "@/components/BubbleField";
import LightRays from "@/components/LightRays";
import WaveDivider from "@/components/WaveDivider";
import UnderwaterCanvas from "@/components/UnderwaterCanvas";
import DepthMeter from "@/components/DepthMeter";
import SonarSweep from "@/components/SonarSweep";
import ParallaxSection from "@/components/ParallaxSection";
import FloatingDebris from "@/components/FloatingDebris";
import DepthPressure from "@/components/DepthPressure";
import JellyfishSwarm from "@/components/JellyfishSwarm";
import MagneticCursor from "@/components/MagneticCursor";
import DiveTransition from "@/components/DiveTransition";
import AbyssPortal from "@/components/AbyssPortal";
import HUDOverlay from "@/components/HUDOverlay";
import WhaleSongWaves from "@/components/WhaleSongWaves";
import TiltCard from "@/components/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-heritage.jpg";
import logo from "@/assets/logo.png";
import teamImage from "@/assets/team-submarine.jpg";
import shipwreckImage from "@/assets/shipwreck-scan.jpg";
import martinImage from "@/assets/martin-wenzel.jpg";
import joergImage from "@/assets/joerg-mathieu.jpg";
import mercedesImg from "@/assets/mercedes-project.jpg";
import t19Img from "@/assets/t19-project.jpg";
import merchantImg from "@/assets/merchant-royal.jpg";
import karawangImg from "@/assets/karawang-project.jpg";
import forbesImg from "@/assets/forbes-project.jpg";
import bellevueImg from "@/assets/bellevue-project.jpg";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const { lang, toggleLang, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setScrollY(y);
      setShowScrollTop(y > 800);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for nav highlighting
  useEffect(() => {
    const ids = ["mission", "about", "projects", "team", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  // Card mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll(".card-modern").forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "mission", label: t("Mission", "Mission") },
    { id: "about", label: t("Über uns", "About") },
    { id: "projects", label: t("Projekte", "Projects") },
    { id: "team", label: t("Team", "Team") },
    { id: "contact", label: t("Kontakt", "Contact") },
  ];

  const ongoingProjects = [
    {
      title: "Mercedes",
      location: "Lago Maggiore",
      status: t("Aktiv", "Active"),
      description: t(
        "Suche und Dokumentation des versunkenen Dampfschiffs Mercedes im Lago Maggiore — ein faszinierendes Stück Schweizer Schifffahrtsgeschichte.",
        "Search and documentation of the sunken steamship Mercedes in Lago Maggiore — a fascinating piece of Swiss maritime history."
      ),
      highlight: t("Aktuelle Tauchgänge", "Current Dives"),
      image: mercedesImg,
      depth: "210m",
    },
    {
      title: "Torpediniera T19",
      location: "Lago Maggiore",
      status: t("Aktiv", "Active"),
      description: t(
        "Erforschung des italienischen Torpedoboots T19, das im Zweiten Weltkrieg auf dem Grund des Lago Maggiore versank.",
        "Exploration of the Italian torpedo boat T19, which sank to the bottom of Lago Maggiore during World War II."
      ),
      highlight: t("Historische Dokumentation", "Historical Documentation"),
      image: t19Img,
      depth: "180m",
    },
    {
      title: t("Handelsschiff 17. Jhd.", "17th Century Merchant Ship"),
      location: t("Ärmelkanal", "English Channel"),
      status: t("Aktiv", "Active"),
      description: t(
        "Suche nach einem Handelsschiff aus dem 17. Jahrhundert im Ärmelkanal — der Traum vom grossen Schatzfund.",
        "Search for a 17th-century merchant ship in the English Channel — the dream of a great treasure discovery."
      ),
      highlight: t("Schatzsuche", "Treasure Hunt"),
      image: merchantImg,
      depth: "65m",
    },
  ];

  const pastProjects = [
    {
      title: t("Karawang Wrack", "Karawang Wreck"),
      location: t("Indonesien", "Indonesia"),
      description: t(
        "Erforschung eines historischen Wracks vor der Küste von Karawang, Indonesien.",
        "Exploration of a historic wreck off the coast of Karawang, Indonesia."
      ),
      image: karawangImg,
    },
    {
      title: t("Freibeuter Forbes", "Privateer Forbes"),
      location: t("Indonesien", "Indonesia"),
      description: t(
        "Auf den Spuren des berüchtigten Freibeuters Forbes in den Gewässern Indonesiens.",
        "Following the trail of the infamous privateer Forbes in Indonesian waters."
      ),
      image: forbesImg,
    },
    {
      title: "Bellevue",
      location: t("Thunersee", "Lake Thun"),
      description: t(
        "Dokumentation des Wracks der Bellevue im Thunersee.",
        "Documentation of the Bellevue wreck in Lake Thun."
      ),
      image: bellevueImg,
    },
  ];

  // Hero parallax opacity — fade out hero content as you scroll
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0003;
  const heroBlur = Math.min(10, scrollY * 0.01);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Global atmospheric layers */}
      <UnderwaterCanvas />
      <JellyfishSwarm />
      <FloatingDebris />
      <DepthPressure />
      <DepthMeter />
      <MagneticCursor />
      <HUDOverlay />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "glass shadow-2xl shadow-ocean/10 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Nautic Discovery"
                className={`transition-all duration-500 ${scrolled ? "w-10 h-10" : "w-12 h-12"}`}
              />
              <span className="text-xl font-serif font-semibold text-foreground tracking-tight">
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
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-sm font-medium text-ocean hover:text-ocean-glow transition-colors px-3 py-1.5 rounded-full border border-ocean/20 hover:border-ocean/40 hover:shadow-lg hover:shadow-ocean/10"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "de" ? "EN" : "DE"}
              </button>
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground/70 hover:text-ocean transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[49] md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-serif text-foreground/70 hover:text-ocean transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-lg font-medium text-ocean hover:text-ocean-glow transition-colors px-5 py-2 rounded-full border border-ocean/20"
            >
              <Globe className="w-4 h-4" />
              {lang === "de" ? "EN" : "DE"}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* HERO — Full-screen cinematic with multi-layer parallax */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[130vh] flex items-center overflow-hidden">
        {/* Layer 1: Background image — slowest parallax + zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.4}px) scale(${heroScale})`,
            filter: `blur(${heroBlur}px)`,
          }}
        />
        
        {/* Layer 2: Deep blue overlay that intensifies on scroll */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              hsl(210 100% 4% / ${0.2 + scrollY * 0.0005}) 0%, 
              hsl(210 100% 4% / ${0.5 + scrollY * 0.0003}) 50%, 
              hsl(210 100% 4% / 1) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        <div className="absolute inset-0 vignette" />

        {/* Layer 3: Atmospheric — medium parallax */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <LightRays />
        </div>
        
        {/* Layer 4: Bubbles — fast parallax */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <BubbleField count={40} />
        </div>

        {/* Sonar display — floats independently */}
        <div
          className="absolute bottom-40 right-16 hidden xl:block will-change-transform"
          style={{
            opacity: Math.max(0, 0.6 - scrollY * 0.001),
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.02}deg)`,
          }}
        >
          <SonarSweep />
        </div>

        {/* Content — parallax fade out */}
        <div
          className="relative z-10 container-wide will-change-transform"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
        >
          <div className="max-w-6xl">
            <div className="flex items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-px bg-ocean" />
              <span className="text-xs font-mono text-ocean tracking-[0.5em] uppercase">
                {t("Tiefenforschung seit 2008", "Deep Exploration since 2008")}
              </span>
            </div>

            <h1 className="heading-display font-serif mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <span className="block text-foreground text-glow-strong">
                {t("Faszination", "Fascination")}
              </span>
              <span className="block gradient-text mt-[-0.05em]">
                {t("Wracksuche", "Wreck Hunting")}
              </span>
            </h1>

            <div className="max-w-2xl space-y-4 mb-14 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
                {t(
                  "Geschichte · Technik · Teamwork · Abenteuer",
                  "History · Technology · Teamwork · Adventure"
                )}
              </p>
              <p className="text-base text-foreground/30 font-light">
                {t(
                  "Entdeckung der versunkenen Schätze der Tiefe",
                  "Discovering the Treasures of the Deep"
                )}
              </p>
            </div>

            <div className="flex items-center gap-5 animate-fade-in" style={{ animationDelay: "1.1s" }}>
              <Button
                onClick={() => scrollToSection("mission")}
                size="lg"
                className="bg-ocean hover:bg-ocean-glow text-background px-10 h-16 text-lg font-medium shadow-2xl shadow-ocean/30 hover:shadow-ocean/50 hover:scale-105 transition-all duration-500"
              >
                {t("Mission entdecken", "Discover Mission")}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="border-ocean/30 text-ocean hover:bg-ocean/10 hover:border-ocean/50 h-16 px-10 text-lg transition-all duration-500 hover:shadow-lg hover:shadow-ocean/10"
              >
                {t("Expeditionen", "Expeditions")}
                <Compass className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll cue — parallax bounce */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <span className="text-[10px] text-foreground/20 tracking-[0.4em] uppercase font-mono">
            {t("Abtauchen", "Dive In")}
          </span>
          <ChevronDown className="w-5 h-5 text-ocean/40 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* MISSION — Cinematic quote with split parallax */}
      {/* ═══════════════════════════════════════ */}
      <AbyssPortal />

      <section id="mission" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220, 100%, 3%) 0%, hsl(215, 80%, 5%) 50%, hsl(220, 100%, 3%) 100%)" }}>
        <BubbleField count={6} />
        <LightRays />
        
        {/* Parallax ambient orbs */}
        <ParallaxSection speed={-0.4} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-10 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "hsl(195 100% 45% / 0.04)" }} />
          <div className="absolute bottom-1/4 right-20 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: "hsl(185 100% 55% / 0.03)" }} />
        </ParallaxSection>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <ParallaxSection speed={-0.15}>
              <img src={logo} alt="Nautic Discovery" className="w-20 h-20 mx-auto mb-12 opacity-60" />
            </ParallaxSection>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <blockquote className="text-4xl md:text-7xl font-serif text-foreground mb-8 leading-[1.1] text-glow-strong">
              {/* Each line at different parallax speed for dramatic split */}
              <ParallaxSection speed={-0.08} direction="horizontal">
                <span className="block">«It needs a lot of</span>
              </ParallaxSection>
              <ParallaxSection speed={0.12} direction="horizontal">
                <span className="block"><span className="text-outline">silver</span> to find</span>
              </ParallaxSection>
              <ParallaxSection speed={-0.06} direction="horizontal">
                <span className="block">the <span className="gradient-text">gold</span>»</span>
              </ParallaxSection>
            </blockquote>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <ParallaxSection speed={0.1}>
              <p className="text-lg text-muted-foreground mb-8">
                — Mac Mace, {t("Wracksucher, Scilly Islands", "Wreck Hunter, Scilly Islands")}
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-ocean to-transparent mx-auto mb-10" />
              <p className="text-base md:text-lg text-foreground/40 max-w-2xl mx-auto leading-relaxed">
                {t(
                  "Jede grosse Entdeckung verlangt Geduld, Investition und den unerschütterlichen Glauben an das, was unter der Oberfläche verborgen liegt.",
                  "Every great discovery demands patience, investment, and an unwavering belief in what lies hidden beneath the surface."
                )}
              </p>
            </ParallaxSection>
          </ScrollReveal>
        </div>
      </section>

      <DiveTransition />

      {/* Whale Song ambient waves */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220, 100%, 3%), hsl(215, 80%, 5%))" }}>
        <WhaleSongWaves />
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* ABOUT — Split dramatic with opposing parallax */}
      {/* ═══════════════════════════════════════ */}
      <section id="about" className="section-padding relative section-deep overflow-hidden">
        {/* Giant background text — super slow parallax */}
        <ParallaxSection speed={0.15} className="absolute inset-0 pointer-events-none overflow-hidden">
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-bold tracking-tighter"
            style={{ color: "hsl(195 100% 45% / 0.02)" }}
          >
            EXPLORE
          </span>
        </ParallaxSection>

        <div className="container-wide relative z-10">
          <div className="mb-20">
            <ScrollReveal>
              <ParallaxSection speed={-0.05} direction="horizontal">
                <span className="floating-badge mb-6">{t("Unterwasser-Erforschung", "Underwater Exploration")}</span>
              </ParallaxSection>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ParallaxSection speed={0.08} direction="horizontal">
                <h2 className="heading-xl font-serif text-foreground">
                  {t("Über ", "About ")}
                  <span className="gradient-text">Nautic Discovery</span>
                </h2>
              </ParallaxSection>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Text — slides from left */}
            <ParallaxSection speed={-0.1} direction="both" className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light">
                    {t(
                      "Nautic Discovery hat sich der Suche nach bisher unentdeckten Schiffwracks im In- und Ausland verschrieben. Die Suche ist dabei immer mit spannender Technik und oft auch mit Abenteuer verbunden.",
                      "Nautic Discovery is dedicated to the search for previously undiscovered shipwrecks both domestically and abroad. The search is always linked to exciting technology and often to adventure."
                    )}
                  </p>

                  <p className="text-lg text-foreground/50 leading-relaxed">
                    {t(
                      "Die Faszination, Wracks als Zeitkapsel der Geschichte zu entdecken und zu dokumentieren ist unsere Hauptmotivation. Bei spezifischen Projekten im Meer schwingt jedoch auch der Traum nach dem grossen Schatzfund mit.",
                      "The fascination of discovering and documenting wrecks as time capsules of history is our main motivation. For specific ocean projects, the dream of a great treasure find also resonates."
                    )}
                  </p>

                  <div className="glass rounded-xl p-8 mt-8">
                    <div className="flex items-start space-x-5">
                      <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                        <Waves className="w-6 h-6 text-ocean" />
                      </div>
                      <p className="text-foreground/50 leading-relaxed">
                        {t(
                          "Wir kombinieren modernste Sonar-Kartierung, ROV-Technologie und Taucherfahrung mit akribischer historischer Forschung — von antiken Handelsschiffen im Mittelmeer bis zu Kriegsschiffen im Atlantik.",
                          "We combine cutting-edge sonar mapping, ROV technology, and diving expertise with meticulous historical research — from ancient merchant ships in the Mediterranean to warships in the Atlantic."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </ParallaxSection>

            {/* Image — opposing parallax, slides from right */}
            <ParallaxSection speed={0.15} direction="both" className="lg:col-span-2">
              <ScrollReveal direction="right">
                <div className="relative">
                  <ImageReveal
                    src={shipwreckImage}
                    alt={t("Unterwasser-Wrack-Scan", "Underwater Wreck Scan")}
                    className="h-[500px] rounded-xl"
                    imgClassName="w-full h-full object-cover"
                  />
                  {/* Floating depth marker with its own parallax */}
                  <ParallaxSection speed={-0.3} className="absolute -left-6 top-1/3 hidden lg:flex flex-col items-center gap-3">
                    <div className="w-px h-24 bg-gradient-to-b from-transparent via-ocean/40 to-transparent" />
                    <div className="glass-light rounded-full px-3 py-2">
                      <span className="text-[10px] font-mono text-ocean tracking-widest">47m</span>
                    </div>
                    <div className="w-px h-24 bg-gradient-to-b from-transparent via-ocean/40 to-transparent" />
                  </ParallaxSection>
                </div>
              </ScrollReveal>
            </ParallaxSection>
          </div>
        </div>
      </section>

      <WaveDivider color="hsl(215, 80%, 5%)" />

      {/* ═══════════════════════════════════════ */}
      {/* PROJECTS — Full immersion with staggered parallax cards */}
      {/* ═══════════════════════════════════════ */}
      <section id="projects" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(215, 80%, 5%) 0%, hsl(220, 100%, 3%) 40%, hsl(215, 80%, 5%) 100%)" }}>
        <BubbleField count={12} />
        
        {/* Giant parallax depth number */}
        <ParallaxSection speed={0.25} className="absolute inset-0 pointer-events-none overflow-hidden">
          <span
            className="absolute top-[20%] right-[-5%] text-[35vw] font-mono font-bold leading-none"
            style={{ color: "hsl(195 100% 45% / 0.015)" }}
          >
            210m
          </span>
        </ParallaxSection>

        <div className="container-wide relative z-10">
          {/* Header with horizontal parallax */}
          <div className="mb-20">
            <ScrollReveal>
              <ParallaxSection speed={-0.1} direction="horizontal">
                <span className="floating-badge mb-6">{t("Entdeckungen", "Discoveries")}</span>
              </ParallaxSection>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ParallaxSection speed={0.06} direction="horizontal">
                <h2 className="heading-xl font-serif text-foreground">
                  {t("Expeditionen & ", "Expeditions & ")}
                  <span className="gradient-text">{t("Projekte", "Projects")}</span>
                </h2>
              </ParallaxSection>
            </ScrollReveal>
          </div>

          {/* Ongoing */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <h3 className="heading-md font-serif text-foreground">{t("Laufende Projekte", "Ongoing Projects")}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-ocean/20 to-transparent" />
            </div>
          </ScrollReveal>

          {/* Featured project — full width with scale parallax */}
          <ParallaxSection speed={-0.05} scale>
            <ScrollReveal className="mb-12">
              <TiltCard className="card-modern group cursor-pointer" intensity={8}>
                <div className="grid md:grid-cols-2">
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <img
                      src={ongoingProjects[0].image}
                      alt={ongoingProjects[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:hidden" />
                    <span className="absolute top-4 left-4 text-xs font-medium px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                      {ongoingProjects[0].status}
                    </span>
                  </div>
                  <div className="p-10 md:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-ocean font-mono text-xs mb-4 tracking-widest">
                      <Anchor className="w-3 h-3" />
                      DEPTH: {ongoingProjects[0].depth}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 group-hover:text-ocean transition-colors duration-500">
                      {ongoingProjects[0].title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-5">
                      <MapPin className="w-4 h-4 mr-2 text-ocean" />
                      {ongoingProjects[0].location}
                    </div>
                    <p className="text-foreground/50 leading-relaxed mb-6">{ongoingProjects[0].description}</p>
                    <div className="pt-4 border-t border-border/30">
                      <span className="text-sm font-medium text-ocean">{ongoingProjects[0].highlight}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </ParallaxSection>

          {/* Other ongoing — staggered parallax speeds */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {ongoingProjects.slice(1).map((project, index) => (
              <ParallaxSection key={index} speed={index === 0 ? -0.08 : 0.08}>
                <ScrollReveal delay={index * 200}>
                  <TiltCard className="card-modern group cursor-pointer h-full" intensity={12}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <span className="absolute top-4 left-4 text-xs font-medium px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                        {project.status}
                      </span>
                      <span className="absolute top-4 right-4 text-[10px] font-mono px-3 py-1.5 rounded-full glass-light text-ocean tracking-widest">
                        ↓ {project.depth}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-ocean transition-colors duration-500">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-ocean" />
                        {project.location}
                      </div>
                      <p className="text-foreground/45 leading-relaxed text-sm mb-4">{project.description}</p>
                      <div className="pt-4 border-t border-border/30">
                        <span className="text-xs font-medium text-ocean">{project.highlight}</span>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </ParallaxSection>
            ))}
          </div>

          {/* Past Projects — with rotation parallax */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              <h3 className="heading-md font-serif text-foreground">{t("Verschiedene Projekte", "Various Projects")}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border/30 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pastProjects.map((project, index) => (
              <ParallaxSection key={index} speed={[-0.06, 0.04, -0.08][index]} rotate>
                <ScrollReveal delay={index * 150}>
                  <TiltCard className="card-modern group cursor-pointer h-full" intensity={10}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 saturate-[0.7] group-hover:saturate-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-ocean transition-colors duration-500">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-ocean" />
                        {project.location}
                      </div>
                      <p className="text-foreground/40 leading-relaxed text-sm">{project.description}</p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      <AbyssPortal />

      {/* ═══════════════════════════════════════ */}
      {/* TEAM — Dramatic portraits with opposing parallax */}
      {/* ═══════════════════════════════════════ */}
      <section id="team" className="section-padding relative section-deep overflow-hidden">
        <LightRays />
        
        {/* Giant background text */}
        <ParallaxSection speed={-0.2} className="absolute inset-0 pointer-events-none overflow-hidden">
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold tracking-tighter"
            style={{ color: "hsl(195 100% 45% / 0.015)" }}
          >
            TEAM
          </span>
        </ParallaxSection>

        <div className="container-wide relative z-10">
          <div className="mb-20">
            <ScrollReveal>
              <ParallaxSection speed={0.06} direction="horizontal">
                <span className="floating-badge mb-6">{t("Gründer", "Founders")}</span>
              </ParallaxSection>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ParallaxSection speed={-0.08} direction="horizontal">
                <h2 className="heading-xl font-serif text-foreground">
                  {t("Das ", "The ")}
                  <span className="gradient-text">Team</span>
                </h2>
              </ParallaxSection>
            </ScrollReveal>
          </div>

          <ParallaxSection speed={-0.05}>
            <ScrollReveal>
              <p className="text-xl text-foreground/45 max-w-3xl mb-16 leading-relaxed">
                {t(
                  "Nautic Discovery wurde von Jörg Mathieu und Martin Wenzel gegründet. Sie haben sich 2008 bei einer Wrackbergung über den gemeinsamen Freund Klaus Keppler† kennengelernt und haben seither zusammen zahlreiche Wracks betaucht und neue Wrackprojekte initiiert.",
                  "Nautic Discovery was founded by Jörg Mathieu and Martin Wenzel. They met in 2008 during a wreck recovery through their mutual friend Klaus Keppler† and have since dived numerous wrecks together and initiated new wreck projects."
                )}
              </p>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.05}>
            <ScrollReveal delay={100}>
              <p className="text-lg text-foreground/35 max-w-3xl mb-16 leading-relaxed">
                {t(
                  "Für grössere Projekte wird jeweils ein Team gebildet mit Fachleuten aus den Bereichen Literaturrecherche, Hydrologie/Vermessung, Tauchtechnik und Archäologie.",
                  "For larger projects, a team is assembled with specialists in literature research, hydrology/surveying, diving technology, and archaeology."
                )}
              </p>
            </ScrollReveal>
          </ParallaxSection>

          {/* Team cards — opposing parallax */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mb-16">
            {[
              {
                name: "Jörg Mathieu",
                role: t("Mitgründer & Technik", "Co-Founder & Technology"),
                image: joergImage,
                desc: t(
                  "Experte für maritime Technik und Taucherfahrung. Betreut den gesamten technischen Bereich von Nautic Discovery.",
                  "Expert in maritime technology and diving technology. Oversees all technical operations at Nautic Discovery."
                ),
              },
              {
                name: "Martin Wenzel",
                role: t("Mitgründer & Finanzierung", "Co-Founder & Finance"),
                image: martinImage,
                desc: t(
                  "Verantwortlich für die Finanzierung der externen Leistungen und strategische Projektplanung.",
                  "Responsible for financing external services and strategic project planning."
                ),
              },
            ].map((member, i) => (
              <ParallaxSection key={i} speed={i === 0 ? -0.08 : 0.08}>
                <ScrollReveal delay={i * 200}>
                  <div className="card-modern p-0 group overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card hidden sm:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent sm:hidden" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className="text-ocean font-medium mb-4 text-sm">{member.role}</p>
                        <p className="text-foreground/45 leading-relaxed text-sm">{member.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxSection>
            ))}
          </div>

          <ParallaxSection speed={0.1} scale>
            <ScrollReveal>
              <div className="max-w-3xl">
                <ImageReveal
                  src={teamImage}
                  alt={t("Team im U-Boot", "Team in Submarine")}
                  className="h-[350px] rounded-xl"
                  imgClassName="w-full h-full object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
          </ParallaxSection>
        </div>
      </section>

      <WaveDivider color="hsl(220, 100%, 3%)" />

      {/* Whale Song ambient waves before contact */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220, 100%, 3%), hsl(210, 100%, 6%))" }}>
        <WhaleSongWaves />
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* CONTACT — Atmospheric with depth parallax */}
      {/* ═══════════════════════════════════════ */}
      <section id="contact" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220, 100%, 3%) 0%, hsl(210, 100%, 6%) 50%, hsl(220, 100%, 3%) 100%)" }}>
        <BubbleField count={18} />
        <LightRays />

        {/* Parallax ambient glow */}
        <ParallaxSection speed={-0.3} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "hsl(195, 100%, 45%, 0.06)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: "hsl(195, 100%, 45%, 0.04)" }} />
        </ParallaxSection>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <ParallaxSection speed={-0.1}>
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full glass mb-12">
                <Mail className="w-12 h-12 text-ocean" strokeWidth={1} />
                <div className="absolute inset-0 rounded-full border border-ocean/20 animate-[sonar-ping_4s_ease-out_infinite]" />
                <div className="absolute inset-0 rounded-full border border-ocean/10 animate-[sonar-ping_4s_ease-out_infinite_1s]" />
              </div>
            </ParallaxSection>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ParallaxSection speed={0.06} direction="horizontal">
              <h2 className="heading-xl font-serif mb-8 text-foreground text-glow">
                {t("Kontakt", "Contact")}
              </h2>
            </ParallaxSection>
            <p className="text-xl text-foreground/50 mb-3 leading-relaxed">
              {t("Kontaktpersonen: Jörg Mathieu & Martin Wenzel", "Contact: Jörg Mathieu & Martin Wenzel")}
            </p>
            <p className="text-2xl text-ocean mb-12 font-light">
              info@nauticdiscovery.com
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a href="mailto:info@nauticdiscovery.com">
              <Button
                size="lg"
                className="bg-ocean hover:bg-ocean-glow text-background px-12 h-16 text-lg font-medium shadow-2xl shadow-ocean/30 hover:shadow-ocean/50 hover:scale-105 transition-all duration-500"
              >
                {t("E-Mail senden", "Send Email")}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════ */}
      <footer className="relative border-t border-border/30" style={{ background: "linear-gradient(180deg, hsl(210, 100%, 4%), hsl(220, 100%, 2%))" }}>
        <div className="container-wide py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Nautic Discovery" className="w-10 h-10 opacity-70" />
              <span className="font-serif font-semibold text-foreground/70">Nautic Discovery</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a
                href="https://www.wip-dresden.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocean transition-colors flex items-center gap-1.5 hover-lift"
              >
                WIP Martin Wenzel
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.subspirit.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocean transition-colors flex items-center gap-1.5 hover-lift"
              >
                Sub Spirit
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground/60">
              © {new Date().getFullYear()} Nautic Discovery
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-border/20 text-center">
            <p className="text-xs text-muted-foreground/40">
              Website by{" "}
              <a
                href="https://studio-arm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean/40 hover:text-ocean transition-colors"
              >
                StudioARM
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-ocean hover:text-ocean-glow hover:scale-110 transition-all duration-500 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Index;
