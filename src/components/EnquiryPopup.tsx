import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EnquiryPopup = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", requirement: "" });

  useEffect(() => {
    const shown = sessionStorage.getItem("enquiryShown");
    if (!shown) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("enquiryShown", "1");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}%0APhone: ${form.phone}%0ACity: ${form.city}%0ARequirement: ${form.requirement}`;
    window.open(`https://wa.me/917004729460?text=${msg}`, "_blank");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl p-8 max-w-md w-full shadow-elevated"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-bold">Get Free Consultation</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "phone", label: "Phone", type: "tel" },
                { key: "city", label: "City", type: "text" },
              ].map((f) => (
                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.label}
                  required
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              ))}
              <textarea
                placeholder="Requirement"
                required
                value={form.requirement}
                onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
              />
              <button type="submit" className="bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryPopup;
