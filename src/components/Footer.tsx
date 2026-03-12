import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Ads Dot COM" className="h-8 w-auto" />
        <div className="flex gap-6 text-xs text-muted-foreground font-display tracking-wider uppercase">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ads Dot COM
        </div>
      </div>
    </footer>
  );
};

export default Footer;
