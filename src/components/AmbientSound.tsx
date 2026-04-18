import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Tiny floating toggle that plays a procedural underwater hum via Web Audio API */
const AmbientSound = () => {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[]; lfo: OscillatorNode } | null>(null);

  const stop = () => {
    if (nodesRef.current) {
      nodesRef.current.oscs.forEach((o) => {
        try { o.stop(); } catch { /* noop */ }
      });
      try { nodesRef.current.lfo.stop(); } catch { /* noop */ }
      nodesRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
  };

  const start = () => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 240;
    filter.Q.value = 2;
    filter.connect(gain);

    // Two detuned low oscillators → deep ocean hum
    const oscA = ctx.createOscillator();
    oscA.type = "sine";
    oscA.frequency.value = 55;
    oscA.detune.value = -8;
    oscA.connect(filter);
    oscA.start();

    const oscB = ctx.createOscillator();
    oscB.type = "sine";
    oscB.frequency.value = 82;
    oscB.detune.value = 6;
    oscB.connect(filter);
    oscB.start();

    // LFO modulating the filter → slow underwater sway
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    nodesRef.current = { gain, oscs: [oscA, oscB], lfo };
  };

  useEffect(() => {
    if (enabled) start();
    else stop();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((e) => !e)}
      className="fixed bottom-6 left-6 z-50 glass rounded-full w-11 h-11 flex items-center justify-center text-foreground/70 hover:text-ocean transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
      aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={enabled}
      title={enabled ? "Mute ambient hum" : "Play ambient hum"}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      {enabled && (
        <span className="absolute inset-0 rounded-full border border-ocean/40 animate-ping pointer-events-none" />
      )}
    </button>
  );
};

export default AmbientSound;
