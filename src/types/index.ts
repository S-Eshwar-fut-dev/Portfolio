export interface Project {
    id: string
    title: string
    subtitle: string
    shortDescription?: string
    description: string
    tech: string[]
    metrics?: string[]
    github?: string
    demo?: string
    video?: string
    image?: string
    images?: string[]
}
