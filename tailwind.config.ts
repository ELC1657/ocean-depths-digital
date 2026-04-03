import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
        },
        ocean: {
          DEFAULT: "hsl(var(--ocean))",
          glow: "hsl(var(--ocean-glow))",
        },
        brass: {
          DEFAULT: "hsl(var(--brass))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
        },
        deep: {
          DEFAULT: "hsl(var(--deep))",
        },
        abyss: {
          DEFAULT: "hsl(var(--abyss))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "sonar-scan": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(300%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "reveal-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "reveal-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "image-wipe": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(101%)" },
        },
        "bubble": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.4" },
          "50%": { opacity: "0.2" },
          "100%": { transform: "translateY(-100vh) scale(0.3)", opacity: "0" },
        },
        "light-ray": {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.08" },
          "100%": { opacity: "0.3" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(195 100% 45% / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(195 100% 45% / 0.4), 0 0 80px hsl(195 100% 45% / 0.1)" },
        },
        "sonar-ping": {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
        "sonar-scan": "sonar-scan 2s ease-in-out infinite",
        "reveal-left": "reveal-left 0.8s ease-out forwards",
        "reveal-right": "reveal-right 0.8s ease-out forwards",
        "reveal-up": "reveal-up 0.8s ease-out forwards",
        "image-wipe": "image-wipe 0.8s ease-out 0.2s forwards",
        "bubble": "bubble 15s linear infinite",
        "light-ray": "light-ray 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "sonar-ping": "sonar-ping 3s ease-out infinite",
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
