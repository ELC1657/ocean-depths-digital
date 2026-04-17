import { useEffect, useState } from "react";

interface SideNavItem {
  id: string;
  label: string;
}

interface SideNavigatorProps {
  items: SideNavItem[];
}

/** Vertical dot navigator that highlights the active section while scrolling. */
const SideNavigator = ({ items }: SideNavigatorProps) => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-end focus:outline-none"
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`absolute right-6 px-3 py-1 rounded-md glass text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "opacity-0 -translate-x-1"
                  : "opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 text-ocean"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ${
                isActive
                  ? "w-3 h-3 bg-ocean shadow-[0_0_12px_hsl(var(--ocean))]"
                  : "w-2 h-2 bg-ocean/30 group-hover:bg-ocean/60 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SideNavigator;
