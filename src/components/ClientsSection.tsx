import { motion } from "framer-motion";

const clients = [
  "Jeeto Pakistan", "ARY News", "ARY Digital", "ARY QTV", "ARY Zindagi",
  "Samsung", "Coca-Cola", "PSO", "Nishat", "Packages Mall",
  "Jolta Electrics", "UOL", "Stylo", "Park Avenue", "Beach Tree",
  "Keep Truck In", "Motive", "ISPR", "Hush Puppies", "Dubai Islamic Bank", "Sufi",
];

const ClientsSection = () => {
  return (
    <section id="clients" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
            Clients
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Trusted by the best.
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/80 to-transparent z-10" />
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, i) => (
            <div key={`${client}-${i}`} className="flex-shrink-0 mx-6">
              <span className="font-display font-semibold text-sm text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Client grid */}
      <div className="container mx-auto mt-14">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-px bg-border rounded-2xl overflow-hidden"
        >
          {clients.slice(0, 21).map((client) => (
            <div
              key={client}
              className="bg-background flex items-center justify-center p-5 min-h-[80px] hover:bg-muted/50 transition-colors duration-300"
            >
              <span className="font-display text-xs font-medium text-muted-foreground text-center leading-tight">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
