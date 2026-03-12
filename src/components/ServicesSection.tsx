import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Digital Press & Printing",
    desc: "High-quality digital, offset, and large format printing for all brand collateral.",
  },
  {
    num: "02",
    title: "Event Planning & Production",
    desc: "End-to-end event management — corporate events, product launches, grand celebrations.",
  },
  {
    num: "03",
    title: "Outdoor Advertising",
    desc: "Billboards, bus ads, shelter displays, and logo plates across Pakistan's prime locations.",
  },
  {
    num: "04",
    title: "BTL Activations",
    desc: "Below-the-line marketing that creates memorable, direct brand experiences.",
  },
  {
    num: "05",
    title: "In-Store Branding",
    desc: "Transform retail spaces with strategic visual merchandising and POS materials.",
  },
  {
    num: "06",
    title: "Creative & Design",
    desc: "Brand identity, campaign design, and art direction that cuts through noise.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
            Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
            What we do.
          </h2>
        </motion.div>

        <div className="divide-y divide-border border-t border-border">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group py-8 cursor-default hover:bg-muted/10 px-0 sm:px-4 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground font-display w-6">{s.num}</span>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold group-hover:text-primary transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl md:hidden">
                    {s.desc}
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-muted-foreground max-w-xs">{s.desc}</p>
                </div>
                <ArrowUpRight className="hidden sm:block h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
