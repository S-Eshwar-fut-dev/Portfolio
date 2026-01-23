'use client'

import { memo, useRef, useEffect } from 'react'
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
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

const AchievementCard = memo(({ item }: { item: typeof achievements[0] }) => (
    <GlassCard
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
))
AchievementCard.displayName = 'AchievementCard'


function Counter({ value, suffix }: { value: number, suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [motionValue, isInView, value])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest) + suffix
            }
        })
    }, [springValue, suffix])

    return <span ref={ref} className="text-3xl font-bold text-white" />
}

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
                                I architect digital realities where <span className="text-cyan-400 font-semibold">15,000 stars compute at 60fps</span>.
                                Currently studying at Chennai Institute of Technology (2027), I don't just build applications; I engineer experiences that bridge the gap between silicon and soul.
                            </p>
                            <p>
                                <span className="text-purple-400 font-semibold">The Challenge:</span> Transforming complex distributed systems and heavy AI models into fluid, accessible interfaces.
                            </p>
                            <p>
                                <span className="text-green-400 font-semibold">The Solution:</span> From microservices handling massive concurrency in Discord clones to reducing fraud by 88% with XGBoost pipelines, I forge solutions that are as robust as they are beautiful.
                            </p>
                            <p>
                                As a <span className="bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent font-bold">LeetCode Knight (Top 5%)</span>, I bring algorithmic precision to every pixel.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col">
                                    <Counter value={parseInt(stat.value.replace(/\D/g, ''))} suffix={stat.value.replace(/[0-9]/g, '')} />
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((item, index) => (
                            <AchievementCard key={index} item={item} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
