import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { services } from "@/data/siteData";

const Shop = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Solar Solutions Shop</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Explore our complete range of solar products and services</p>
        </motion.div>
        <div className="flex flex-col gap-8">
          {services.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all">
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-semibold text-2xl mb-3">{s.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/shop/${s.slug}`}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Learn More
                    </Link>
                    <a
                      href="tel:7004729460"
                      className="border border-border px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Shop;
