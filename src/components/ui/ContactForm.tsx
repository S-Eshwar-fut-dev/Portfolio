'use client'

import { useState } from "react"
import { Send, Mail, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import MagneticButton from "@/components/ui/MagneticButton"

export default function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        toast.success("Message sent! I'll get back to you soon.")
        setFormState({ name: "", email: "", message: "" })
        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-cyan-400/80"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:-translate-y-1 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 placeholder:text-slate-600"
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
                        className="text-sm font-medium text-cyan-400/80"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:-translate-y-1 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 placeholder:text-slate-600"
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
                    className="text-sm font-medium text-cyan-400/80"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:-translate-y-1 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 placeholder:text-slate-600 resize-none"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                    }
                />
            </div>

            {/* Pulsing Neon Button */}
            <MagneticButton className="w-full flex items-center justify-center gap-2 group bg-[#1a0b2e] border border-cyan-500/30 hover:bg-[#312e81] text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 border-none animate-[pulse_3s_infinite]">
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
    )
}
