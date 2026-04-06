import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-display font-bold mb-4">Smart Power Energy</h3>
          <p className="text-background/70 text-sm leading-relaxed">
            Reliable solar solutions for homes and businesses across India. Save electricity, save money, go solar today.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "Govt Subsidy", path: "/govt-subsidy" },
              { label: "AMC Service", path: "/amc-service" },
              { label: "Contact", path: "/contact" },
              { label: "About", path: "/about" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-sm text-background/70 hover:text-background transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2">
            {["On Grid Solar", "Off Grid Solar", "Hybrid Solar", "Solar Street Light", "Solar Water Pump", "Solar AMC"].map((s) => (
              <Link key={s} to={`/shop/${s.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-background/70 hover:text-background transition-colors">
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-sm text-background/70 mb-2">Phone: 7004729460</p>
          <a
            href="https://wa.me/917004729460"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity mt-2"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
        © {new Date().getFullYear()} Smart Power Energy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
