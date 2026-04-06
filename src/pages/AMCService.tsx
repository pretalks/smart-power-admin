import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { amcServices, images } from "@/data/siteData";

const AMCService = () => (
  <Layout>
    {/* Banner */}
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.amcBanner} alt="Solar AMC service team" className="w-full h-full object-cover" loading="lazy" width={1920} height={600} />
        <div className="absolute inset-0 backdrop-blur-[2px] bg-foreground/50" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-background mb-4">
          Solar AMC Service
        </motion.h1>
        <p className="text-background/80 text-lg max-w-2xl mx-auto">
          Annual Maintenance Contracts to keep your solar systems running at peak performance
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amcServices.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/amc-service/${s.slug}`} className="block bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <img src={s.image} alt={s.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={192} />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
                  <span className="inline-block mt-3 text-primary text-sm font-semibold">Learn More →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AMCService;
