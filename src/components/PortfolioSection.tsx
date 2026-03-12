import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import portfolioBillboard from "@/assets/portfolio-billboard.jpg";
import portfolioEvent from "@/assets/portfolio-event.jpg";
import portfolioPrinting from "@/assets/portfolio-printing.jpg";
import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioBtl from "@/assets/portfolio-btl.jpg";
import portfolioCreative from "@/assets/portfolio-creative.jpg";

const projects = [
  {
    image: portfolioEvent,
    title: "Jeeto Pakistan — Set Design",
    category: "Event Production",
    client: "ARY Digital",
    size: "large",
  },
  {
    image: portfolioBillboard,
    title: "Samsung OOH Campaign",
    category: "Outdoor Advertising",
    client: "Samsung Pakistan",
    size: "small",
  },
  {
    image: portfolioPrinting,
    title: "Corporate Print Collateral",
    category: "Digital Press",
    client: "Nishat Group",
    size: "small",
  },
  {
    image: portfolioBtl,
    title: "PSO Brand Activation",
    category: "BTL Activities",
    client: "PSO",
    size: "small",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
              Portfolio
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
              Selected work.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            A glimpse into projects delivered for Pakistan's leading brands — from
            nationally televised shows to citywide campaigns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                project.size === "large" ? "md:col-span-2 aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-xs tracking-widest uppercase text-primary-foreground/70 font-display mb-1">
                  {project.category} — {project.client}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-primary-foreground">
                  {project.title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/70 to-transparent md:hidden">
                <span className="text-xs tracking-widest uppercase text-primary-foreground/70 font-display">
                  {project.category}
                </span>
                <h3 className="text-lg font-display font-bold text-primary-foreground">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
