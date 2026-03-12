import { motion } from "framer-motion";

// We'll use a combination of known logo URLs, Clearbit Autocomplete, or fallback UI for these logos
// Using direct high-quality CDN links for reliable loading, matching user's requested sources
const clients = [
  { name: "Jeeto Pakistan", logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Jeeto_Pakistan_Logo.png" },
  { name: "ARY News", logo: "https://cdn.brandfetch.io/arynews.tv/w/400/h/400" },
  { name: "ARY Digital", logo: "https://cdn.brandfetch.io/arydigital.tv/w/400/h/400" },
  { name: "ARY QTV", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/ARY_Qtv_logo.png" },
  { name: "ARY Zindagi", logo: "https://cdn.brandfetch.io/aryzindagi.tv/w/400/h/400" },
  { name: "Samsung", logo: "https://cdn.brandfetch.io/samsung.com/w/400/h/400" },
  { name: "Coca-Cola", logo: "https://cdn.brandfetch.io/coca-cola.com/w/400/h/400" },
  { name: "PSO", logo: "https://crystalpng.com/wp-content/uploads/2021/04/pso-logo-768x552.png" },
  { name: "Nishat Group", logo: "https://seeklogo.com/images/N/nishat-group-logo-DEEC1CA8DF-seeklogo.com.png" },
  { name: "Packages Mall", logo: "https://cdn.brandfetch.io/packagesmall.com/w/400/h/400" },
  { name: "Jolta Electrics", logo: "https://joltaelectric.com/wp-content/uploads/2021/04/Jolta-Electric-Logo.png" },
  { name: "UOL", logo: "https://upload.wikimedia.org/wikipedia/en/7/77/The_University_of_Lahore_Logo.png" },
  { name: "Stylo", logo: "https://crystalpng.com/wp-content/uploads/2022/02/stylo-logo-768x336.png" },
  { name: "Park Avenue", logo: "https://parkavenue.pk/wp-content/uploads/2022/02/Logo-Park-Avenue-1.png" }, 
  { name: "Beech Tree", logo: "https://cdn.brandfetch.io/beechtree.pk/w/400/h/400" },
  { name: "Keep Truckin", logo: "https://cdn.brandfetch.io/motive.com/w/400/h/400" },
  { name: "Motive", logo: "https://cdn.brandfetch.io/motive.com/w/400/h/400" },
  { name: "ISPR", logo: "https://upload.wikimedia.org/wikipedia/en/c/cb/Inter-Services_Public_Relations_logo.png" },
  { name: "Hush Puppies", logo: "https://cdn.brandfetch.io/hushpuppies.com.pk/w/400/h/400" },
  { name: "Dubai Islamic Bank", logo: "https://cdn.brandfetch.io/dib.ae/w/400/h/400" },
  { name: "Sufi", logo: "https://sufigroup.biz/wp-content/uploads/2020/07/Sufi-Logo.png" },
  { name: "Omore", logo: "https://cdn.brandfetch.io/engro.com/w/400/h/400" },
  { name: "Soul City", logo: "https://soulcitylahore.com.pk/wp-content/uploads/2023/04/soul-city-logo.png" },
  { name: "Al-Hussain Developer", logo: "https://cdn.brandfetch.io/alhussain.com/w/400/h/400" }, 
  { name: "Ibne-Hashim", logo: "https://cdn.brandfetch.io/ibnehashim.com/w/400/h/400" },
  { name: "Oz Technology", logo: "https://oz-technologies.com/wp-content/uploads/2021/08/OZ-Tech-Logo-1.png" },
  { name: "ConsoliAds", logo: "https://consoliads.com/wp-content/uploads/2020/12/ConsoliAds-Logo-.png" },
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
      <div className="relative overflow-hidden py-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee items-center min-w-max">
          {[...clients, ...clients].map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex-shrink-0 mx-8 md:mx-12 group flex flex-col items-center">
              <div className="h-10 md:h-14 flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-h-full max-w-[120px] object-contain"
                  onError={(e) => {
                    // Instantly fallback to a dynamic initial-based logo if clearbit fails
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('ui-avatars')) {
                       target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=transparent&color=64748b&size=128&bold=true`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client grid */}
      <div className="container mx-auto mt-16 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0.5 bg-border rounded-2xl overflow-hidden shadow-sm"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-background flex flex-col items-center justify-center p-6 min-h-[120px] hover:bg-muted/50 transition-colors duration-300 group"
            >
              <div className="h-12 w-full flex items-center justify-center mb-2 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-h-full max-w-[100px] object-contain"
                  onError={(e) => {
                    // Instantly fallback to a dynamic initial-based logo if clearbit fails
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('ui-avatars')) {
                       target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=transparent&color=64748b&size=128&bold=true`;
                    }
                  }}
                />
              </div>
              <span className="font-display text-[10px] font-medium text-muted-foreground text-center uppercase tracking-wider group-hover:text-primary transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
