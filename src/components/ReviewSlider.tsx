import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "@/data/siteData";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-accent" : "text-muted-foreground/30"}`}>★</span>
    ))}
  </div>
);

const ReviewSlider = ({ customReviews }: { customReviews?: any[] }) => {
  const displayReviews = customReviews?.length > 0 ? customReviews : reviews;
  const [current, setCurrent] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurrent((c) => (c + 2 >= displayReviews.length ? 0 : c + 2));
    }, 4000);
    return () => clearInterval(interval.current);
  }, [displayReviews.length]);

  const visible = displayReviews.slice(current, current + 2);

  if (displayReviews.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12">What Our Customers Say</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {visible.map((r, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background/60 backdrop-blur-md rounded-2xl p-8 shadow-elevated border border-primary/10"
              >
                <StarRating rating={r.rating} />
                <p className="text-foreground/80 mb-6 leading-relaxed italic">"{r.text}"</p>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.city || 'Verified Customer'}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(displayReviews.length / 2) }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i * 2)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${current === i * 2 ? "bg-primary" : "bg-primary/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
