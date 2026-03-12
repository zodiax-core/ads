import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          // Double the array for smooth infinite marquee effect if we have data
          setClients([...data, ...data]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading || clients.length === 0) return null;
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
                  src={client.logo_url} 
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
                  src={client.logo_url} 
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
