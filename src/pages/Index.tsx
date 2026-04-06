import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SolarCalculator from "@/components/SolarCalculator";
import ReviewSlider from "@/components/ReviewSlider";
import { images, services } from "@/data/siteData";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.hero} alt="Solar installation on Indian rooftop" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-background mb-6 leading-tight">
            Reliable Solar Solutions For Homes & Businesses
          </h1>
          <p className="text-lg text-background/80 mb-8">Save Electricity. Save Money. Go Solar Today.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/917004729460?text=I%20want%20a%20free%20consultation" target="_blank" rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Get Free Consultation
            </a>
            <a href="tel:7004729460" className="bg-background/20 backdrop-blur text-background border border-background/30 px-8 py-4 rounded-lg font-semibold hover:bg-background/30 transition-colors">
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Services Carousel */}
    <section className="py-16 overflow-hidden bg-muted/30">
      <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Our Services</motion.h2>
      <div className="relative">
        <div className="animate-marquee flex gap-6 w-max">
          {[...services, ...services].map((s, i) => (
            <Link key={i} to={`/shop/${s.slug}`} className="flex-shrink-0 w-72 group">
              <div className="rounded-2xl overflow-hidden shadow-card bg-background hover:shadow-elevated transition-shadow">
                <img src={s.image} alt={s.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={288} height={176} />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* About Company */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <img src={images.team} alt="Smart Power Energy team" className="rounded-2xl shadow-elevated w-full" loading="lazy" width={640} height={360} />
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Smart Power Energy</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Smart Power Energy provides complete solar solutions including installation, maintenance and subsidy support.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-6">
              We deliver reliable, affordable and high-quality solar solutions across India. Our team of certified engineers ensures every installation meets the highest standards.
            </p>
            <Link to="/about" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Solar Calculator */}
    <SolarCalculator />

    {/* Why Choose Us */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Why Choose Us</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "High Quality Solar Panels", desc: "We use only top-tier solar panels with 25+ year warranty and maximum efficiency.", img: images.commercial },
            { title: "Expert Installation", desc: "Certified technicians with years of experience in residential and commercial installations.", img: images.team },
            { title: "Govt Subsidy Support", desc: "Complete assistance with PM Surya Ghar Yojana and state subsidy applications.", img: images.happyFamily },
            { title: "Affordable Pricing", desc: "Competitive pricing with EMI options. Best value solar solutions in India.", img: images.hero },
            { title: "Fast Service", desc: "Quick site survey, fast installation, and prompt after-sales support.", img: images.team },
            { title: "AMC Support", desc: "Annual maintenance contracts to keep your solar systems running at peak performance.", img: images.commercial },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow group">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={192} />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <ReviewSlider />

    {/* Services Grid */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Our Solar Solutions</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/shop/${s.slug}`} className="block bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <img src={s.image} alt={s.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={208} />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">Get a free consultation and start saving on your electricity bills today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/917004729460?text=I%20want%20a%20free%20consultation" target="_blank" rel="noopener noreferrer"
              className="bg-background text-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              WhatsApp Us
            </a>
            <a href="tel:7004729460" className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              Call 7004729460
            </a>
            <Link to="/contact" className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              Enquiry Form
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
