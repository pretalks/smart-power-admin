import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { reviews } from "@/data/siteData";

const ReviewSlider = () => {
  const [current, setCurrent] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurrent((c) => (c + 2 >= reviews.length ? 0 : c + 2));
    }, 4000);
    return () => clearInterval(interval.current);
  }, []);

  const visible = reviews.slice(current, current + 2);

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12">What Our Customers Say</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {visible.map((r, i) => (
            <motion.div key={current + i} initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-8 shadow-card">
              <p className="text-foreground/80 mb-6 leading-relaxed italic">"{r.text}"</p>
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i * 2)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${current === i * 2 ? "bg-primary" : "bg-primary/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
