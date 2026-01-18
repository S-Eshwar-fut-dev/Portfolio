'use client'

import { motion } from 'framer-motion'
import { Trophy, Crown, Award, Brain } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

const stats = [
    { label: 'CGPA', value: '9.0/10' },
    { label: 'LeetCode', value: '2000+' },
    { label: 'Team Size', value: '10+' }
]

const achievements = [
    {
        icon: Trophy,
        title: 'BNY Mellon Hackathon',
        subtitle: '2nd Runner-Up • Global 2024',
        color: 'text-yellow-400'
    },
    {
        icon: Crown,
        title: 'Knight @LeetCode',
        subtitle: 'Top 5% Global • 2000+ Rating',
        color: 'text-blue-400'
    },
    {
        icon: Award,
        title: 'Salesforce PD1',
        subtitle: 'Certified Developer',
        color: 'text-cyan-400'
    },
    {
        icon: Brain,
        title: 'CIT AI Centre',
        subtitle: 'Member • Research Focus',
        color: 'text-purple-400'
    }
]

export default function About() {
    return (
        <section id="about" className="relative py-32 min-h-screen flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text leading-tight">
                            Engineering Digital Magic
                        </h2>

                        <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
                            <p>
                                I'm Eshwar, a Full Stack Sorcerer who blends systems engineering with
                                creative computation. Currently studying at Chennai Institute of Technology
                                (2027), I specialize in building scalable, high-performance applications
                                that don't just work—they mesmerize.
                            </p>
                            <p>
                                From architecting microservices for distributed Discord clones to training
                                CNNs for fraud detection, I push the boundaries of what's possible in the
                                browser and beyond.
                            </p>
                            <p>
                                As a LeetCode Knight (Top 5% Global) and Salesforce Certified Developer,
                                I bring algorithmic thinking and enterprise-grade engineering to every project.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((item, index) => (
                            <GlassCard
                                key={index}
                                className="p-6 flex flex-col items-center text-center justify-center gap-4 group"
                            >
                                <div className={`p-4 rounded-full bg-slate-900/50 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
