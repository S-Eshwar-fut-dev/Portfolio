"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent! I'll get back to you soon.");
    setFormState({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative py-32 min-h-[60vh] flex items-center gradient-text"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Header with Neon Blue Gradient */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 ">Contact Me</h2>
          <p className="text-2xl text-blue-300/80">
            Have a project in mind or just want to say hi? <br />
            Fill out the form below and I'll get back to you.
          </p>
        </motion.div>

        {/* Neon Container */}
        <div className="relative group">
          {/* Outer Glow Layer */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

          <div className="relative bg-black border border-blue-500/30 rounded-3xl p-8 lg:p-12 shadow-[0_0_30px_rgba(37,99,235,0.2)] backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-blue-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-blue-950/20 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-blue-900"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-blue-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-blue-950/20 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-blue-900"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-blue-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full bg-blue-950/20 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-blue-900 resize-none"
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                />
              </div>

              {/* Neon Button */}
              <MagneticButton className="w-full flex items-center justify-center gap-2 group bg-blue-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 border-none">
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message{" "}
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </>
                )}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
