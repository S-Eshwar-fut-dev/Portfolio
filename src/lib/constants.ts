export const projects = [
    {
        id: 'eoncord',
        title: 'Eoncord',
        subtitle: 'Distributed Discord Clone',
        description: 'Microservices architecture with WebSocket, Redis pub/sub, and Kubernetes orchestration. 95% UI similarity to Discord.',
        tech: ['React', 'Node.js', 'WebSocket', 'K8s', 'Docker'],
        metrics: ['95% UI Match', '40% Faster Setup', '20-30ms Latency'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        demo: '#',
        video: '/assets/projects/eoncord-preview.mp4',
        image: '/assets/projects/eoncord-thumb.jpg'
    },
    {
        id: 'fraudshield',
        title: 'FraudShield',
        subtitle: 'AI-Powered Fraud Detection',
        description: 'Hybrid XGBoost + GNN pipeline achieving 88.37% precision. SHAP explainability for analyst triage. Projected $1.2M/month recovery.',
        tech: ['Python', 'XGBoost', 'SHAP', 'GNN', 'FastAPI'],
        metrics: ['0.99 ROC-AUC', '71.70% Recall', '88.37% Precision'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        caseStudy: '#',
        video: '/assets/projects/fraudshield-preview.mp4',
        image: '/assets/projects/fraudshield-thumb.jpg'
    },
    {
        id: 'projecteon',
        title: 'ProjectEon',
        subtitle: 'Conversational AI with Memory',
        description: 'Fine-tuned Llama 3.2 with ChromaDB vector retrieval. Adaptive personality module for context-aware dialogue.',
        tech: ['Python', 'Llama 3.2', 'ChromaDB', 'LLM'],
        metrics: ['35% Faster Response', 'Human-like Speech'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        demo: '#',
        video: '/assets/projects/projecteon-preview.mp4',
        image: '/assets/projects/projecteon-thumb.jpg'
    },
    {
        id: 'finance-app',
        title: 'FinanceFlow',
        subtitle: 'Personal Financial Management',
        description: 'Comprehensive financial tracking with predictive budgeting and investment portfolio analysis.',
        tech: ['Next.js', 'Supabase', 'Recharts', 'Tailwind'],
        metrics: ['Real-time Sync', 'Data Encryption'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        demo: '#',
        video: '/assets/projects/finance-preview.mp4',
        image: '/assets/projects/finance-thumb.jpg'
    },
    {
        id: 'twin-nebula',
        title: 'Twin Nebula v2',
        subtitle: 'Interactive 3D Portfolio',
        description: 'A deeply immersive portfolio experience featuring a custom GLSL Butterfly Nebula, GPU-accelerated starfield, and glassmorphic UI.',
        tech: ['R3F', 'GLSL', 'Next.js', 'Framer Motion'],
        metrics: ['60fps Performance', 'Custom Shaders'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        demo: '#',
        video: '/assets/projects/portfolio-preview.mp4',
        image: '/assets/projects/portfolio-thumb.jpg'
    },
    {
        id: 'course-dashboard',
        title: 'Course Change Automation',
        subtitle: 'Enterprise Dashboard for CIT',
        description: 'Led team of 10 to build role-based system. 4 PostgreSQL databases powering real-time analytics.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
        metrics: ['50% Less Manual Work', '35% Less Overhead'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        video: '/assets/projects/course-preview.mp4',
        image: '/assets/projects/course-thumb.jpg'
    }
]

export const skills = {
    inner: [
        { name: 'React', color: '#61DAFB', slug: 'react/react-original' },
        { name: 'Next.js', color: '#000000', slug: 'nextjs/nextjs-original' },
        { name: 'TypeScript', color: '#3178C6', slug: 'typescript/typescript-original' },
        { name: 'Tailwind', color: '#38B2AC', slug: 'tailwindcss/tailwindcss-original' },
        { name: 'Three.js', color: '#FFFFFF', slug: 'threejs/threejs-original' },
        { name: 'GSAP', color: '#88CE02' }, // No standard devicon, using fallback
        { name: 'Framer', color: '#E42575' }, // No standard devicon, using fallback
        { name: 'WebGL', color: '#990000', slug: 'opengl/opengl-original' }
    ],
    middle: [
        { name: 'Node.js', color: '#339933', slug: 'nodejs/nodejs-original' },
        { name: 'Python', color: '#3776AB', slug: 'python/python-original' },
        { name: 'Express', color: '#000000', slug: 'express/express-original' },
        { name: 'FastAPI', color: '#009688', slug: 'fastapi/fastapi-original' },
        { name: 'Postgres', color: '#336791', slug: 'postgresql/postgresql-original' },
        { name: 'MongoDB', color: '#47A248', slug: 'mongodb/mongodb-original' },
        { name: 'Redis', color: '#DC382D', slug: 'redis/redis-original' },
        { name: 'ChromaDB', color: '#FF00FF' }, // Fallback
        { name: 'Go', color: '#00ADD8', slug: 'go/go-original-wordmark' },
        { name: 'Java', color: '#007396', slug: 'java/java-original' }
    ],
    outer: [
        { name: 'Docker', color: '#2496ED', slug: 'docker/docker-original' },
        { name: 'K8s', color: '#326CE5', slug: 'kubernetes/kubernetes-plain' },
        { name: 'AWS', color: '#FF9900', slug: 'amazonwebservices/amazonwebservices-original-wordmark' },
        { name: 'Terraform', color: '#623CE4', slug: 'terraform/terraform-original' },
        { name: 'NGINX', color: '#009639', slug: 'nginx/nginx-original' },
        { name: 'XGBoost', color: '#FF6600' }, // Fallback
        { name: 'SHAP', color: '#FF0000' }, // Fallback
        { name: 'LLM', color: '#00FFFF' }
    ]
}
