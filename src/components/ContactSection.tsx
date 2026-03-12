import * as React from "react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const serviceOptions = [
  "Digital Press & Printing",
  "Event Planning & Production",
  "Outdoor Advertising",
  "BTL Activities",
  "In-Store Branding",
  "Creative & Design",
  "Other",
];

const CustomDropdown = ({ value, onChange, options }: { value: string; onChange: (val: string) => void; options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-0 py-3 bg-transparent border-b border-border text-foreground cursor-pointer focus:border-primary transition-colors"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground/50"}>
          {value || "Select a service"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-full mt-1 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 text-sm cursor-pointer transition-colors ${value === option
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                  }`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(serviceOptions[0]);
  const [customService, setCustomService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error("Please fill all required fields");
      return;
    }

    // Basic Rate Limiting: Prevent more than one submission every 60 seconds
    const lastSubmission = localStorage.getItem("lastContactSubmission");
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
      const remaining = Math.ceil((60000 - (now - parseInt(lastSubmission))) / 1000);
      toast.error(`Please wait ${remaining} seconds before sending another message.`);
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("contact_queries").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        custom_service: service === "Other" ? customService.trim() : null,
        message: message.trim(),
      });

      if (error) {
        throw error;
      }

      toast.success("Message sent! We'll get back to you soon.");
      localStorage.setItem("lastContactSubmission", now.toString());

      setName("");
      setEmail("");
      setPhone("");
      setService(serviceOptions[0]);
      setCustomService("");
      setMessage("");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-display font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4 lg:mb-6 block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 lg:mb-8 leading-tight">
              Let's work
              <br />
              together.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 lg:mb-12 max-w-md">
              Ready to elevate your brand? Whether it's a grand event, a printing
              project, or a full-scale campaign — we're here.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 text-sm">
              <div>
                <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Phone</span>
                <div className="font-display font-medium mt-1 text-base">042 366 13 115</div>
              </div>
              <div>
                <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Email</span>
                <div className="font-display font-medium mt-1 text-base">adsdotcom786@gmail.com</div>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Address</span>
                <div className="font-display font-medium mt-1 text-base leading-relaxed">
                  E-193/II, Bank Stop, Main Walton Road,
                  <br />
                  Cantt, Lahore
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border shadow-sm"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                  Service
                </label>
                <CustomDropdown
                  value={service}
                  onChange={setService}
                  options={serviceOptions}
                />
              </div>
              {service === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                    Specify Service
                  </label>
                  <input
                    type="text"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Describe the service you need"
                    className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </motion.div>
              )}
              <div>
                <label className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  required
                  maxLength={2000}
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full mt-2" type="submit" disabled={submitting} style={{ color: "white" }}>
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
