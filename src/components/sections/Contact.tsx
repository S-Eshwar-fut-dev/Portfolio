'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Message sent! I'll get back to you soon.")
        setFormState({ name: '', email: '', message: '' })
        setIsSubmitting(false)
    }

    return (
        <section id="contact" className="relative py-32 min-h-[60vh] flex items-center">
            <div className="container mx-auto px-6 max-w-4xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Contact Me</h2>
                    <p className="text-xl text-slate-400">
                        Have a project in mind or just want to say hi? <br />
                        Fill out the form below and I'll get back to you.
                    </p>
                </motion.div>

                {/* Simplified Contact Form */}
                {/* Simplified Contact Form */}
                <div className="bg-transparent border border-white/10 rounded-3xl p-8 lg:p-12 shadow-none">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="John Doe"
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="john@example.com"
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 resize-none"
                                placeholder="Tell me about your project..."
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <MagneticButton className="w-full flex items-center justify-center gap-2 group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-none">
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </MagneticButton>
                    </form>
                </div>

            </div>
        </section>
    )
}
