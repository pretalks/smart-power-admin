import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { services, installationKitItems } from "@/data/siteData";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Layout><div className="container mx-auto px-4 py-40 text-center"><h1 className="text-2xl font-bold">Service not found</h1><Link to="/shop" className="text-primary mt-4 inline-block">Back to Shop</Link></div></Layout>;

  const isKit = slug === "solar-installation-kit";

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/shop" className="text-primary text-sm font-semibold mb-6 inline-block">← Back to Shop</Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <img src={service.image} alt={service.name} className="rounded-2xl shadow-elevated w-full" width={640} height={400} />
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{service.name}</h1>
                <p className="text-foreground/70 leading-relaxed mb-8">{service.desc}</p>
                <div className="flex flex-wrap gap-4">
                  <a href={`https://wa.me/917004729460?text=I%20am%20interested%20in%20${encodeURIComponent(service.name)}`} target="_blank" rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Enquire on WhatsApp
                  </a>
                  <a href="tel:7004729460" className="border border-border px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
                    Call 7004729460
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {isKit && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold mb-8">Installation Kit Components</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {installationKitItems.map((item, i) => (
                  <motion.div key={item.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/shop/installation-kit/${item.slug}`} className="block bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                      <span className="inline-block mt-3 text-primary text-sm font-semibold">View Details →</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
