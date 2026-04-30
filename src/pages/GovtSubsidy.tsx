import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SolarCalculator from "@/components/SolarCalculator";
import { subsidyStates, images } from "@/data/siteData";
import { useSiteData } from "@/contexts/SiteContext";

const GovtSubsidy = () => {
  const { subsidyStates: dynamicStates } = useSiteData();
  const displayStates = dynamicStates.length > 0 ? dynamicStates : subsidyStates;

  return (
    <Layout>
      {/* Banner */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.subsidyBanner} alt="Government solar subsidy" className="w-full h-full object-cover" loading="lazy" width={1920} height={600} />
          <div className="absolute inset-0 backdrop-blur-[2px] bg-foreground/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-background mb-4">
            Government Solar Subsidy
          </motion.h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            Get up to 40% subsidy on solar installation under PM Surya Ghar Yojana. Select your state to learn more.
          </p>
        </div>
      </section>

      {/* States */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {displayStates.map((state, i) => (
              <motion.div key={state.id || state.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/govt-subsidy/${state.slug || 'details'}`} className="block bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                  <img src={state.image} alt={`Solar subsidy ${state.name}`} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={208} />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{state.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{(state.description || state.subsidy).slice(0, 100)}...</p>
                    <span className="inline-block mt-3 text-primary text-sm font-semibold">View Details →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <SolarCalculator />
    </Layout>
  );
};

export default GovtSubsidy;
