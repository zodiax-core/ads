import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LayoutDashboard, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const authLink = user ? (
    isAdmin ? (
      <Link
        to="/admin"
        className="flex items-center gap-1.5 text-xs font-display font-medium tracking-wider uppercase text-primary hover:text-primary/80 transition-colors duration-300"
      >
        <Shield className="h-4 w-4" />
        Admin Panel
      </Link>
    ) : (
      <Link
        to="/admin"
        className="p-2 rounded-full hover:bg-muted transition-colors"
        title="Dashboard"
      >
        <LayoutDashboard className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </Link>
    )
  ) : (
    <Link
      to="/login"
      className="text-xs font-display font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
    >
      Login
    </Link>
  );

  const mobileAuthLink = user ? (
    isAdmin ? (
      <Link
        to="/admin"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-2 text-sm font-display font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <Shield className="h-4 w-4" />
        Admin Panel
      </Link>
    ) : (
      <Link
        to="/admin"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-2 text-sm font-display font-medium text-foreground hover:text-primary transition-colors"
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
    )
  ) : (
    <Link
      to="/login"
      onClick={() => setMobileOpen(false)}
      className="text-sm font-display font-medium text-foreground hover:text-primary transition-colors"
    >
      Login
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border py-3"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ads Dot COM" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                const target = document.querySelector(link.href);
                if (target) {
                  e.preventDefault();
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = target.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className="text-xs font-display font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          {authLink}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    const target = document.querySelector(link.href);
                    if (target) {
                      e.preventDefault();
                      setMobileOpen(false);
                      const offset = 80;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = target.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className="text-sm font-display font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {mobileAuthLink}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
