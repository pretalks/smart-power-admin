import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { subsidyStates, images } from "@/data/siteData";

const SubsidyDetail = () => {
  const { slug } = useParams();
  const state = subsidyStates.find((s) => s.slug === slug);

  if (!state) return <Layout><div className="container mx-auto px-4 py-40 text-center"><h1 className="text-2xl font-bold">State not found</h1><Link to="/govt-subsidy" className="text-primary mt-4 inline-block">Back to Subsidy</Link></div></Layout>;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/govt-subsidy" className="text-primary text-sm font-semibold mb-6 inline-block">← Back to All States</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <img src={images.happyFamily} alt={`Solar subsidy in ${state.name}`} className="rounded-2xl shadow-elevated w-full" loading="lazy" width={640} height={400} />
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Solar Subsidy in {state.name}</h1>
                <p className="text-foreground/70 leading-relaxed mb-6">{state.subsidy}</p>
                <h3 className="font-semibold text-lg mb-3">Eligibility</h3>
                <p className="text-foreground/70 mb-6">{state.eligibility}</p>
                <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                <ul className="space-y-2 mb-8">
                  {state.benefits.map((b) => (
                    <li key={b} className="text-foreground/70 flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/917004729460?text=I%20want%20to%20apply%20for%20solar%20subsidy%20in%20${encodeURIComponent(state.name)}`} target="_blank" rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Apply Now via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SubsidyDetail;
