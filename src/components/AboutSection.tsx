import * as React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-6 block">
              About
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight">
              A small name
              <br />
              with big meaning.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              Incorporated in 2006, Ads Dot COM began as an outdoor advertising
              company and has reinvented itself over ten times. Today, we are a
              truly integrated creative agency — passionate about developing
              brands across Pakistan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe in data-driven insight and the transformative power of
              technology, combined with human intelligence, vision, and
              creativity. Our mission is to help clients grow their companies
              with well-crafted marketing communications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-8 border-t border-border">
              {[
                { title: "Mission", text: "Deliver real results through innovative communications" },
                { title: "Vision", text: "Push boundaries and always look for better ways" },
                { title: "Values", text: "Integrity, creativity, and relentless execution" },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="font-display font-semibold text-sm mb-3 sm:mb-2">{item.title}</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
