'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Cpu, GitBranch, Zap, Award, Users } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

const stats = [
    { label: 'CGPA', value: '8.88/10', subtext: '3.5/4.0 GPA' },
    { label: 'LeetCode', value: 'Knight', subtext: 'Top 1.44%' },
    { label: 'Parallel Efficiency', value: '85%', subtext: 'Multi-core' },
]

const achievements = [
    {
        icon: Trophy,
        title: 'BNY Mellon Service Design Jam',
        metric: '3rd Place Nationally',
        detail: 'Led 10-member team against 600+ teams',
        color: 'text-amber-400',
        bgGlow: 'bg-amber-500/10'
    },
    {
        icon: Zap,
        title: 'TCS CodeVita Global Rank',
        metric: '5,942 / 300,000+',
        detail: 'Algorithmic problem solving',
        color: 'text-blue-400',
        bgGlow: 'bg-blue-500/10'
    },
    {
        icon: Cpu,
        title: 'High-Performance Matrix Engine',
        metric: '42 GFLOPS',
        detail: 'C++ · OpenMP · AVX2 SIMD',
        color: 'text-cyan-400',
        bgGlow: 'bg-cyan-500/10'
    },
    {
        icon: GitBranch,
        title: 'Production Microservices',
        metric: 'Kubernetes + Istio',
        detail: 'Fault-tolerant event-driven architecture',
        color: 'text-purple-400',
        bgGlow: 'bg-purple-500/10'
    },
    {
        icon: Users,
        title: 'Team Leadership',
        metric: '10-Member Team',
        detail: 'Cloud-native automation system',
        color: 'text-green-400',
        bgGlow: 'bg-green-500/10'
    },
    {
        icon: Award,
        title: 'Technical Workshop',
        metric: 'Terabyte-Scale',
        detail: 'Parallel data stream processing',
        color: 'text-rose-400',
        bgGlow: 'bg-rose-500/10'
    }
]

const AchievementCard = memo(({ item, index }: { item: typeof achievements[0], index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
    >
        <GlassCard
            className="p-6 h-full group cursor-pointer hover:border-slate-600 transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${item.bgGlow} ${item.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                    <item.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 text-sm leading-tight">
                        {item.title}
                    </h3>
                    <p className={`font-bold text-lg mb-1 ${item.color}`}>
                        {item.metric}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        {item.detail}
                    </p>
                </div>
            </div>
        </GlassCard>
    </motion.div>
))
AchievementCard.displayName = 'AchievementCard'


export default function About() {
    return (
        <section id="about" className="relative py-32 min-h-screen flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-32"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text leading-tight">
                            Building Systems That Scale
                        </h2>

                        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                            <p>
                                My journey into high-performance computing started in a lab, debugging terabytes of simulated particle-collision data.
                                That bottleneck taught me a fundamental truth: <span className="text-blue-400 font-medium">computation must respect hardware limits</span>.
                            </p>
                            <p>
                                I specialize in building production-grade distributed systems and performance-critical applications.
                                From parallel matrix engines achieving <span className="text-cyan-400 font-semibold">85% efficiency on multi-core architectures</span> to
                                fault-tolerant microservices on Kubernetes handling real-world loads—I engineer solutions that are both elegant and reliable.
                            </p>
                            <p className="text-slate-400 text-base italic border-l-2 border-slate-700 pl-4">
                                "The best code isn't just correct—it's measurable, reproducible, and tuned for the metal beneath the abstraction."
                            </p>
                            <p>
                                Currently pursuing B.Tech at Chennai Institute of Technology, I approach problems through the lens of experimental science:
                                <span className="text-purple-400 font-medium"> hypothesize, measure, iterate</span>.
                                Whether optimizing cache locality or orchestrating distributed workflows, I treat systems as instruments to be tuned.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col"
                                >
                                    <span className="text-3xl font-bold gradient-text">{stat.value}</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</span>
                                    <span className="text-xs text-slate-600 mt-0.5">{stat.subtext}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Achievement Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((item, index) => (
                            <AchievementCard key={index} item={item} index={index} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
