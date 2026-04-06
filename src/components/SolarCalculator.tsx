import { useState } from "react";
import { motion } from "framer-motion";

const SolarCalculator = () => {
  const [bill, setBill] = useState("");
  const [result, setResult] = useState<null | { size: string; cost: string; monthly: string; yearly: string }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseInt(bill) || 0;
    const units = b / 8;
    const kwNeeded = Math.ceil(units / 120);
    const kw = Math.max(kwNeeded, 1);
    const cost = kw * 55000;
    const monthlySaving = Math.round(b * 0.8);
    setResult({
      size: `${kw} kW`,
      cost: `₹${cost.toLocaleString("en-IN")}`,
      monthly: `₹${monthlySaving.toLocaleString("en-IN")}`,
      yearly: `₹${(monthlySaving * 12).toLocaleString("en-IN")}`,
    });
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Calculate Your Solar Savings</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Find out how much you can save with solar energy</p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-background rounded-2xl p-8 shadow-card">
          <form onSubmit={calculate} className="flex flex-col gap-5">
            <input type="number" placeholder="Monthly Electricity Bill (₹)" required value={bill} onChange={(e) => setBill(e.target.value)}
              className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Select Location</option>
              <option>Bihar</option><option>Uttar Pradesh</option><option>Jharkhand</option>
              <option>West Bengal</option><option>Delhi</option><option>Rajasthan</option>
              <option>Haryana</option><option>Punjab</option><option>Other</option>
            </select>
            <select className="border border-border rounded-lg px-4 py-3 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Home Type</option>
              <option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural</option>
            </select>
            <button type="submit" className="bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Calculate Savings
            </button>
          </form>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Recommended Size", value: result.size },
                { label: "Estimated Cost", value: result.cost },
                { label: "Monthly Savings", value: result.monthly },
                { label: "Yearly Savings", value: result.yearly },
              ].map((r) => (
                <div key={r.label} className="bg-secondary/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">{r.label}</p>
                  <p className="text-xl font-bold text-primary">{r.value}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
