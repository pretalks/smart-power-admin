import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { amcServices, images } from "@/data/siteData";

const AMCDetail = () => {
  const { slug } = useParams();
  const amc = amcServices.find((s) => s.slug === slug);

  if (!amc) return <Layout><div className="container mx-auto px-4 py-40 text-center"><h1 className="text-2xl font-bold">Service not found</h1><Link to="/amc-service" className="text-primary mt-4 inline-block">Back to AMC</Link></div></Layout>;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/amc-service" className="text-primary text-sm font-semibold mb-6 inline-block">← Back to AMC Services</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <img src={images.team} alt={amc.name} className="rounded-2xl shadow-elevated w-full" loading="lazy" width={640} height={400} />
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{amc.name}</h1>
                <p className="text-foreground/70 leading-relaxed mb-6">{amc.desc}</p>
                <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                <ul className="space-y-2 mb-8">
                  {["Regular panel cleaning & inspection", "Inverter health check", "Wiring & connection inspection", "Performance monitoring report", "Priority support", "Emergency repairs"].map((b) => (
                    <li key={b} className="text-foreground/70 flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/917004729460?text=I%20need%20${encodeURIComponent(amc.name)}`} target="_blank" rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Get AMC Quote on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AMCDetail;
