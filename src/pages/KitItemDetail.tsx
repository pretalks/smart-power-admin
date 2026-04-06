import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { installationKitItems, images } from "@/data/siteData";

const KitItemDetail = () => {
  const { slug } = useParams();
  const item = installationKitItems.find((i) => i.slug === slug);

  if (!item) return <Layout><div className="container mx-auto px-4 py-40 text-center"><h1 className="text-2xl font-bold">Item not found</h1><Link to="/shop/solar-installation-kit" className="text-primary mt-4 inline-block">Back to Kit</Link></div></Layout>;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/shop/solar-installation-kit" className="text-primary text-sm font-semibold mb-6 inline-block">← Back to Installation Kit</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <img src={images.installationKit} alt={item.name} className="rounded-2xl shadow-elevated w-full" loading="lazy" width={640} height={400} />
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{item.name}</h1>
                <p className="text-foreground/70 leading-relaxed mb-8">{item.desc}</p>
                <a href={`https://wa.me/917004729460?text=I%20need%20${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default KitItemDetail;
