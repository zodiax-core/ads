import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Probe = keyof React.JSX.IntrinsicElements;

const HeroSection = () => {
  const [bgImage, setBgImage] = React.useState("https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2070&auto=format&fit=crop");

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'hero_bg')
        .maybeSingle();
      
      if (data?.value && !error) {
        setBgImage(data.value);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center md:items-end pt-24 md:pt-32 pb-16 md:pb-28 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/10 z-10" />
        <img 
          src={bgImage}
          alt="Ads Dot COM Commercial Printing"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Subtle grid background on top of image for texture */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-6">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground tracking-widest uppercase font-display mb-8"
        >
          Digital Press · Printing · Events — Since 2006
        </motion.p>

        {/* Main heading — editorial large type */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,8vw,8rem)] font-display font-bold leading-[0.95] tracking-tighter max-w-5xl"
        >
          We make brands
          <br />
          <span className="text-muted-foreground">unforgettable.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-start gap-6"
        >
          <p className="text-muted-foreground max-w-md leading-relaxed text-base">
            Pakistan's integrated creative agency — transforming brands through
            innovative advertising, event production, and print solutions.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="#portfolio" style={{ color: "white" }}>
              View Our Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 md:mt-20 flex flex-wrap gap-x-12 gap-y-8 border-t border-border pt-8 justify-center sm:justify-start"
        >
          {[
            { val: "18+", label: "Years" },
            { val: "200+", label: "Projects" },
            { val: "50+", label: "Clients" },
          ].map((s) => (
            <div key={s.label} className="min-w-[80px]">
              <div className="text-2xl md:text-4xl font-display font-bold">{s.val}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
