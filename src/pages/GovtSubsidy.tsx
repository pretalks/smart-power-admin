import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { subsidyStates, images } from "@/data/siteData";

const GovtSubsidy = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Government Solar Subsidy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Get up to 40% subsidy on solar installation under PM Surya Ghar Yojana. Select your state to learn more.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subsidyStates.map((state, i) => (
            <motion.div key={state.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/govt-subsidy/${state.slug}`} className="block bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all group p-6">
                <img src={images.happyFamily} alt={`Solar subsidy ${state.name}`} className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" width={300} height={160} />
                <h3 className="font-semibold text-lg mb-1">{state.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{state.subsidy.slice(0, 80)}...</p>
                <span className="inline-block mt-3 text-primary text-sm font-semibold">View Details →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default GovtSubsidy;
