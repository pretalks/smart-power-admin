import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { images } from "@/data/siteData";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const };

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.commercial} alt="Solar installation" className="w-full h-full object-cover" loading="lazy" width={1280} height={720} />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-background mb-4">
          About Smart Power Energy
        </motion.h1>
        <p className="text-background/80 text-lg max-w-xl mx-auto">Powering India's solar revolution since day one</p>
      </div>
    </section>

    {/* Company */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <img src={images.team} alt="Our team" className="rounded-2xl shadow-elevated" loading="lazy" width={640} height={360} />
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Smart Power Energy is a leading solar energy company providing complete solar solutions including installation, maintenance, and government subsidy support across India.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              We deliver reliable, affordable, and high-quality solar solutions for homes, businesses, farms, and industries. Our certified engineers ensure every installation meets the highest quality standards.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              From consultation to installation to annual maintenance, we handle everything so you can enjoy hassle-free solar energy for decades.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="bg-background rounded-2xl p-8 shadow-card">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed">
              To make clean, affordable solar energy accessible to every home and business in India. We aim to reduce dependency on fossil fuels and help our customers save money while protecting the environment.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-background rounded-2xl p-8 shadow-card">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              To become India's most trusted solar energy provider, powering millions of homes and businesses with clean, renewable energy. We envision a solar-powered India where every rooftop generates electricity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 {...fadeUp} className="text-3xl font-display font-bold mb-8">What We Offer</motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {["On Grid Solar", "Off Grid Solar", "Hybrid Solar", "Solar Street Light", "Solar Water Pump", "Solar Water Heater", "Solar AMC", "Govt Subsidy Help", "Installation Service", "Solar Kits"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 shadow-card text-center">
              <p className="text-sm font-medium">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Go Solar?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Contact us for a free consultation and site survey</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/917004729460" target="_blank" rel="noopener noreferrer"
            className="bg-background text-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            WhatsApp Us
          </a>
          <Link to="/contact" className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
            Contact Page
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
