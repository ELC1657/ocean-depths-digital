import { useEffect, useState } from "react";
import { Mail, MapPin, ChevronRight, Waves, ExternalLink, Globe, Anchor, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import BubbleField from "@/components/BubbleField";
import LightRays from "@/components/LightRays";
import WaveDivider from "@/components/WaveDivider";
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
  const { lang, toggleLang, t } = useLanguage();

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
    { id: "mission", label: t("Mission", "Mission") },
    { id: "about", label: t("Über uns", "About") },
    { id: "projects", label: t("Projekte", "Projects") },
    { id: "team", label: t("Team", "Team") },
    { id: "contact", label: t("Kontakt", "Contact") },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-ocean/5"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Nautic Discovery" className="w-12 h-12" />
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
                className="flex items-center gap-1.5 text-sm font-medium text-ocean hover:text-ocean-glow transition-colors px-3 py-1.5 rounded-full border border-ocean/20 hover:border-ocean/40"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "de" ? "EN" : "DE"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section — Full immersive */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform scale-110"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.35}px) scale(1.1)`,
          }}
        />
        {/* Deep ocean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        {/* Atmospheric effects */}
        <LightRays />
        <BubbleField count={25} />

        {/* Sonar ping effect */}
        <div className="absolute bottom-32 right-20 hidden lg:block">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full bg-ocean/40 animate-sonar-ping" />
            <div className="absolute inset-0 rounded-full bg-ocean/40 animate-sonar-ping" style={{ animationDelay: "1s" }} />
            <div className="absolute inset-0 rounded-full bg-ocean/60 w-2 h-2 m-auto" />
          </div>
        </div>

        <div className="relative z-10 container-wide pt-20">
          <div className="max-w-5xl animate-fade-in">
            {/* Depth indicator */}
            <div className="flex items-center gap-3 mb-8 opacity-60">
              <Anchor className="w-4 h-4 text-ocean" />
              <div className="h-px w-16 bg-gradient-to-r from-ocean to-transparent" />
              <span className="text-xs font-mono text-ocean tracking-[0.3em] uppercase">
                {t("Tiefenforschung", "Deep Exploration")}
              </span>
            </div>

            <h1 className="heading-display text-foreground mb-6 font-serif text-glow">
              {t("Faszination", "Fascination of")}
              <br />
              <span className="gradient-text">{t("Wracksuche", "Wreck Hunting")}</span>
            </h1>
            <div className="space-y-3 mb-10">
              <p className="text-2xl md:text-3xl text-foreground/80 font-light">
                {t(
                  "Geschichte · Technik · Teamwork · Abenteuer",
                  "History · Technology · Teamwork · Adventure"
                )}
              </p>
              <p className="text-lg md:text-xl text-foreground/50 font-light max-w-2xl">
                {t(
                  "Entdeckung der versunkenen Schätze — Discovering the Treasures of the Deep",
                  "Discovering the Treasures of the Deep"
                )}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => scrollToSection("mission")}
                size="lg"
                className="bg-ocean hover:bg-ocean-glow text-background px-8 h-14 font-medium shadow-lg shadow-ocean/20 hover:shadow-ocean/40 hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                {t("Unsere Mission entdecken", "Discover Our Mission")}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="border-ocean/30 text-ocean hover:bg-ocean/10 hover:border-ocean/50 h-14 px-8 transition-all duration-300"
              >
                {t("Expeditionen", "Expeditions")}
                <Compass className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-foreground/30 tracking-widest uppercase">{t("Scrollen", "Scroll")}</span>
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ocean animate-bounce" />
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider color="hsl(215, 80%, 6%)" />

      {/* Mission Quote */}
      <section id="mission" className="section-padding section-abyss relative">
        <BubbleField count={8} />
        <LightRays />
        <div className="container-narrow text-center relative z-10">
          <ScrollReveal>
            <div className="relative inline-block">
              <img src={logo} alt="Nautic Discovery" className="w-16 h-16 mx-auto mb-8" />
              <div className="absolute inset-0 w-20 h-20 -m-2 rounded-full border border-ocean/20 animate-sonar-ping mx-auto" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <blockquote className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-relaxed text-glow">
              «It needs a lot of silver
              <br />
              to find the <span className="gradient-text">gold</span>»
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg text-muted-foreground mb-6">
              — Mac Mace, {t("Wracksucher Scilly Islands", "Wreck Hunter, Scilly Islands")}
            </p>
            <div className="ocean-line max-w-24 mx-auto mb-8" />
            <p className="text-base text-foreground/50 max-w-2xl mx-auto leading-relaxed">
              {t(
                "Jede grosse Entdeckung verlangt Geduld, Investition und den unerschütterlichen Glauben an das, was unter der Oberfläche verborgen liegt. Unsere Expeditionen werden angetrieben von der Überzeugung, dass die grössten Geschichten der Menschheit noch darauf warten, erzählt zu werden.",
                "Every great discovery demands patience, investment, and an unwavering belief in what lies hidden beneath the surface. Our expeditions are driven by the conviction that humanity's greatest stories are still waiting to be told."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider color="hsl(210, 100%, 4%)" flip />

      {/* About Section */}
      <section id="about" className="section-padding section-deep relative">
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">{t("Unterwasser-Erforschung", "Underwater Exploration")}</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-foreground mb-4">
                {t("Über ", "About ")}
                <span className="gradient-text">Nautic Discovery</span>
              </h2>
              <div className="ocean-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6 text-body-lg text-foreground/70">
                <p className="leading-relaxed">
                  {t(
                    "Nautic Discovery hat sich der Suche nach bisher unentdeckten Schiffwracks im In- und Ausland verschrieben. Die Suche ist dabei immer mit spannender Technik und oft auch mit Abenteuer verbunden.",
                    "Nautic Discovery is dedicated to the search for previously undiscovered shipwrecks both domestically and abroad. The search is always linked to exciting technology and often to adventure."
                  )}
                </p>

                <p className="leading-relaxed">
                  {t(
                    "Die Faszination, Wracks als Zeitkapsel der Geschichte zu entdecken und zu dokumentieren ist unsere Hauptmotivation. Bei spezifischen Projekten im Meer schwingt jedoch auch der Traum nach dem grossen Schatzfund mit.",
                    "The fascination of discovering and documenting wrecks as time capsules of history is our main motivation. For specific ocean projects, the dream of a great treasure find also resonates."
                  )}
                </p>

                <div className="glass rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <Waves className="w-6 h-6 text-ocean mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground/60">
                      {t(
                        "Wir kombinieren modernste Sonar-Kartierung, ROV-Technologie und Taucherfahrung mit akribischer historischer Forschung — von antiken Handelsschiffen im Mittelmeer bis zu Kriegsschiffen im Atlantik.",
                        "We combine cutting-edge sonar mapping, ROV technology, and diving expertise with meticulous historical research — from ancient merchant ships in the Mediterranean to warships in the Atlantic."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <ImageReveal
                  src={shipwreckImage}
                  alt={t("Unterwasser-Wrack-Scan", "Underwater Wreck Scan")}
                  className="h-[450px]"
                  imgClassName="w-full h-full object-cover"
                />
                {/* Decorative depth marker */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
                  <div className="w-px h-20 bg-gradient-to-b from-transparent to-ocean/40" />
                  <span className="text-[10px] font-mono text-ocean/60 -rotate-90 whitespace-nowrap">DEPTH: 47m</span>
                  <div className="w-px h-20 bg-gradient-to-b from-ocean/40 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <WaveDivider color="hsl(215, 80%, 6%)" />

      {/* Projects Section */}
      <section id="projects" className="section-padding section-abyss relative">
        <BubbleField count={10} />
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">{t("Entdeckungen", "Discoveries")}</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-foreground mb-4">
                {t("Expeditionen & ", "Expeditions & ")}
                <span className="gradient-text">{t("Projekte", "Projects")}</span>
              </h2>
              <div className="ocean-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          {/* Ongoing Projects */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="heading-md font-serif text-foreground">{t("Laufende Projekte", "Ongoing Projects")}</h3>
            </div>
          </ScrollReveal>

          <div className="relative mb-20">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean/15 to-transparent -translate-y-1/2" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
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
              ].map((project, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="card-modern group cursor-pointer relative overflow-hidden rounded-lg">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
                        {project.status}
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded glass-light text-ocean">
                        ↓ {project.depth}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-ocean transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-ocean" />
                        {project.location}
                      </div>
                      <p className="text-foreground/50 leading-relaxed text-sm mb-3">{project.description}</p>
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-xs font-medium text-ocean">{project.highlight}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Past Projects */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <h3 className="heading-md font-serif text-foreground">{t("Verschiedene Projekte", "Various Projects")}</h3>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t("Karawang Wrack", "Karawang Wreck"),
                location: t("Indonesien", "Indonesia"),
                status: t("Abgeschlossen", "Completed"),
                description: t(
                  "Erforschung eines historischen Wracks vor der Küste von Karawang, Indonesien — ein Zeugnis des Seehandels in Südostasien.",
                  "Exploration of a historic wreck off the coast of Karawang, Indonesia — a testament to maritime trade in Southeast Asia."
                ),
                image: karawangImg,
              },
              {
                title: t("Freibeuter Forbes", "Privateer Forbes"),
                location: t("Indonesien", "Indonesia"),
                status: t("Abgeschlossen", "Completed"),
                description: t(
                  "Auf den Spuren des berüchtigten Freibeuters Forbes in den Gewässern Indonesiens — Abenteuer und Geschichte vereint.",
                  "Following the trail of the infamous privateer Forbes in Indonesian waters — adventure and history combined."
                ),
                image: forbesImg,
              },
              {
                title: "Bellevue",
                location: t("Thunersee", "Lake Thun"),
                status: t("Abgeschlossen", "Completed"),
                description: t(
                  "Dokumentation des Wracks der Bellevue im Thunersee — ein Stück lokaler Schweizer Schifffahrtsgeschichte.",
                  "Documentation of the Bellevue wreck in Lake Thun — a piece of local Swiss maritime history."
                ),
                image: bellevueImg,
              },
            ].map((project, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="card-modern group cursor-pointer relative overflow-hidden rounded-lg">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full glass-light text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-ocean transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-ocean" />
                      {project.location}
                    </div>
                    <p className="text-foreground/50 leading-relaxed text-sm">{project.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="hsl(210, 100%, 4%)" flip />

      {/* Team Section */}
      <section id="team" className="section-padding section-deep relative">
        <LightRays />
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="floating-badge mb-4">{t("Gründer", "Founders")}</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-xl font-serif text-foreground mb-4">
                {t("Das ", "The ")}
                <span className="gradient-text">Team</span>
              </h2>
              <div className="ocean-line max-w-24 mx-auto" />
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="text-body-lg text-foreground/50 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              {t(
                "Nautic Discovery wurde von Jörg Mathieu und Martin Wenzel gegründet. Sie haben sich 2008 bei einer Wrackbergung über den gemeinsamen Freund Klaus Keppler† kennengelernt und haben seither zusammen zahlreiche Wracks betaucht und neue Wrackprojekte initiiert. Für grössere Projekte wird jeweils ein Team gebildet mit Fachleuten aus den Bereichen Literaturrecherche, Hydrologie/Vermessung, Tauchtechnik und Archäologie.",
                "Nautic Discovery was founded by Jörg Mathieu and Martin Wenzel. They met in 2008 during a wreck recovery through their mutual friend Klaus Keppler† and have since dived numerous wrecks together and initiated new wreck projects. For larger projects, a team is assembled with specialists in literature research, hydrology/surveying, diving technology, and archaeology."
              )}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <ScrollReveal delay={0}>
              <div className="card-modern p-8 group text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <img src={joergImage} alt="Jörg Mathieu" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full border-2 border-ocean/30 group-hover:border-ocean transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  Jörg Mathieu
                </h3>
                <p className="text-ocean font-medium mb-4 text-sm">
                  {t("Mitgründer & Technik", "Co-Founder & Technology")}
                </p>
                <p className="text-foreground/50 leading-relaxed text-sm">
                  {t(
                    "Experte für maritime Technik und Tauchtechnologie. Betreut den gesamten technischen Bereich von Nautic Discovery.",
                    "Expert in maritime technology and diving technology. Oversees all technical operations at Nautic Discovery."
                  )}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="card-modern p-8 group text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <img src={martinImage} alt="Martin Wenzel" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full border-2 border-ocean/30 group-hover:border-ocean transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  Martin Wenzel
                </h3>
                <p className="text-ocean font-medium mb-4 text-sm">
                  {t("Mitgründer & Finanzierung", "Co-Founder & Finance")}
                </p>
                <p className="text-foreground/50 leading-relaxed text-sm">
                  {t(
                    "Verantwortlich für die Finanzierung der externen Leistungen und strategische Projektplanung.",
                    "Responsible for financing external services and strategic project planning."
                  )}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <ImageReveal
                src={teamImage}
                alt={t("Team im U-Boot", "Team in Submarine")}
                className="h-[300px] rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider color="hsl(220, 100%, 3%)" />

      {/* Contact Section */}
      <section id="contact" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220, 100%, 3%) 0%, hsl(210, 100%, 6%) 50%, hsl(220, 100%, 3%) 100%)" }}>
        <BubbleField count={15} />
        <LightRays />

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-[100px]" style={{ background: "hsl(195, 100%, 45%, 0.08)" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[120px]" style={{ background: "hsl(195, 100%, 45%, 0.05)" }} />
        </div>

        <div className="container-narrow text-center relative z-10">
          <ScrollReveal>
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full glass mb-8 animate-float">
              <Mail className="w-10 h-10 text-ocean" strokeWidth={1.5} />
              <div className="absolute inset-0 rounded-full animate-pulse-glow" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-lg font-serif mb-6 text-foreground text-glow">{t("Kontakt", "Contact")}</h2>
            <p className="text-xl text-foreground/70 mb-4 leading-relaxed max-w-2xl mx-auto">
              {t("Kontaktpersonen: Jörg Mathieu & Martin Wenzel", "Contact: Jörg Mathieu & Martin Wenzel")}
            </p>
            <p className="text-lg text-ocean mb-10">
              info@nauticdiscovery.com
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a href="mailto:info@nauticdiscovery.com">
              <Button
                size="lg"
                className="bg-ocean hover:bg-ocean-glow text-background px-8 h-14 font-medium shadow-lg shadow-ocean/20 hover:shadow-ocean/40 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t("E-Mail senden", "Send Email")}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border" style={{ background: "hsl(210, 100%, 4%)" }}>
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Nautic Discovery" className="w-10 h-10" />
              <span className="font-serif font-semibold text-foreground">Nautic Discovery</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://www.wip-dresden.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocean transition-colors flex items-center gap-1"
              >
                WIP Martin Wenzel
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.subspirit.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocean transition-colors flex items-center gap-1"
              >
                Sub Spirit
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nautic Discovery
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Website by <a href="https://studio-arm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-ocean transition-colors font-medium">StudioARM</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
