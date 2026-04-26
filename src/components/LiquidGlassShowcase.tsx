import { Anchor, Compass, Search, Waves } from "lucide-react";

/**
 * Liquid Glass Theme — reference showcase.
 * Demonstrates all .lg-* utility classes from index.css.
 *
 * Usage:
 *   <div className="lg-panel p-6">...</div>
 *   <button className="lg-button lg-button-primary">Dive</button>
 *   <input className="lg-input" />
 */
const LiquidGlassShowcase = () => {
  return (
    <section className="lg-bg section-padding">
      <div className="container-wide grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Hero panel */}
        <div className="lg-panel lg-panel-lg lg-hover p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="lg-icon"><Waves className="w-5 h-5" /></span>
            <span className="lg-chip">Liquid Glass</span>
          </div>
          <h3 className="heading-lg lg-text mb-3">Refractive Surface</h3>
          <p className="lg-text-muted text-body-lg mb-6">
            Frosted, fluid, and tactile — designed to feel like a sheet of
            tinted glass floating above the deep.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="lg-button lg-button-primary">
              <Compass className="w-4 h-4" /> Begin Dive
            </button>
            <button className="lg-button lg-button-ghost">
              <Anchor className="w-4 h-4" /> Anchor
            </button>
          </div>
        </div>

        {/* Ocean tint panel */}
        <div className="lg-panel lg-panel-ocean lg-hover p-6">
          <span className="lg-icon mb-4"><Compass className="w-5 h-5" /></span>
          <h4 className="heading-md lg-text mb-2">Ocean Tint</h4>
          <p className="lg-text-muted">Saturated refraction with an oceanic rim.</p>
        </div>

        {/* Warm tint panel */}
        <div className="lg-panel lg-panel-warm lg-hover p-6">
          <span className="lg-icon mb-4"><Anchor className="w-5 h-5" /></span>
          <h4 className="heading-md lg-text mb-2">Warm Brass</h4>
          <p className="lg-text-muted">Brass-edged glass for contrast moments.</p>
        </div>

        {/* Input demo */}
        <div className="lg-panel p-6 md:col-span-2">
          <label className="lg-text-muted text-sm mb-2 block">Search the depths</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="lg-input pl-10" placeholder="e.g. bioluminescence" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="lg-chip">2,400 m</span>
            <span className="lg-chip">Twilight Zone</span>
            <span className="lg-chip">Cold Currents</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidGlassShowcase;
