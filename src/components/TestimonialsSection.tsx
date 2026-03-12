import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I have worked with Ads Dot COM for 10 years. Their attention to detail and solution driven approach has been invaluable.",
    name: "Ishfaq Ramey",
    role: "Senior Set Designer, ARY News",
  },
  {
    quote: "They delivered great service, rarely unable to meet our short deadlines and still turn out superior quality.",
    name: "Waqar Ahmad Khan",
    role: "Chairman, Pak Arab Housing",
  },
  {
    quote: "The service and advice received was second to none and the price was very competitive.",
    name: "Sharyar",
    role: "General Manager, Wakgroup — Samsung",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
            What they say.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <p className="text-foreground text-lg leading-relaxed flex-1 mb-8">
                "{t.quote}"
              </p>
              <footer className="border-t border-border pt-4">
                <div className="font-display font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
