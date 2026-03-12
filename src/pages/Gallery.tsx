import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

import portfolioBillboard from "@/assets/portfolio-billboard.jpg";
import portfolioEvent from "@/assets/portfolio-event.jpg";
import portfolioPrinting from "@/assets/portfolio-printing.jpg";
import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioBtl from "@/assets/portfolio-btl.jpg";
import portfolioCreative from "@/assets/portfolio-creative.jpg";

const staticProjects = [
  { image: portfolioEvent, title: "Jeeto Pakistan — Set Design", category: "Event Production" },
  { image: portfolioBillboard, title: "Samsung OOH Campaign", category: "Outdoor Advertising" },
  { image: portfolioPrinting, title: "Corporate Print Collateral", category: "Digital Press" },
  { image: portfolioBtl, title: "PSO Brand Activation", category: "BTL Activities" },
  { image: portfolioBranding, title: "Packages Mall In-Store", category: "In-Store Branding" },
  { image: portfolioCreative, title: "Coca-Cola Campaign", category: "Creative & Design" },
];

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

const Gallery = () => {
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
      if (data) setDbImages(data);
    };
    fetchImages();
  }, []);

  const allItems = [
    ...staticProjects.map((p, i) => ({ id: `static-${i}`, ...p, image_url: p.image })),
    ...dbImages.map((img) => ({ ...img, image: img.image_url })),
  ];

  const categories = ["All", ...Array.from(new Set(allItems.map((item) => item.category)))];
  const filtered = filter === "All" ? allItems : allItems.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
              Gallery
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tight">
              Our Work.
            </h1>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-display font-medium tracking-wider uppercase transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={item.image_url || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-xs tracking-widest uppercase text-primary-foreground/70 font-display mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-primary-foreground">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/70 to-transparent md:hidden">
                  <span className="text-xs tracking-widest uppercase text-primary-foreground/70 font-display">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-display font-bold text-primary-foreground">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Gallery;
