import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}%0APhone: ${form.phone}%0ACity: ${form.city}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/917004729460?text=${msg}`, "_blank");
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">Get in touch for a free solar consultation</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
                <h2 className="text-xl font-display font-bold mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a href="tel:7004729460" className="text-lg font-semibold text-primary">7004729460</a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <a href="https://wa.me/917004729460" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Service Area</p>
                    <p className="font-medium">All across India</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-card h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.9!2d85.13!3d25.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzM2LjAiTiA4NcKwMDcnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Smart Power Energy Location"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card">
                <h2 className="text-xl font-display font-bold mb-6">Send us a Message</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "phone", label: "Phone", type: "tel" },
                    { key: "city", label: "City", type: "text" },
                  ].map((f) => (
                    <input key={f.key} type={f.type} placeholder={f.label} required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  ))}
                  <textarea placeholder="Your Message" required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button type="submit" className="bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
