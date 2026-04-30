import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whyChooseUsItems } from "@/data/siteData";

const WhyChooseCarousel = ({ customItems }: { customItems?: any[] }) => {
  const displayItems = customItems?.length > 0 ? customItems : whyChooseUsItems;
  const [current, setCurrent] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurrent((c) => (c + 1) % displayItems.length);
    }, 3000);
    return () => clearInterval(interval.current);
  }, [displayItems.length]);

  const item = displayItems[current];

  if (!item) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-elevated bg-background"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 md:h-96 object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description || item.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {displayItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${current === i ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCarousel;
