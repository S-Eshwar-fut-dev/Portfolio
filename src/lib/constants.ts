export const projects = [
    {
        id: 'matrix-engine',
        title: 'Parallel Matrix Engine',
        subtitle: 'High-Performance Computing Library',
        shortDescription: 'Production-grade C++17 library achieving 42 GFLOPS throughput with AVX2 SIMD and OpenMP.',
        description: 'A production-grade high-performance matrix operations library designed for computational research and data-intensive applications. Leverages modern C++17 features, OpenMP parallel loops, and AVX2 SIMD vectorization to achieve exceptional throughput.',
        tech: ['C++17', 'OpenMP', 'AVX2', 'SIMD', 'HPC'],
        metrics: ['42 GFLOPS Throughput', '2.3x Faster vs Naive', '48 GB/s Bandwidth'],
        github: 'https://github.com/S-Eshwar-fut-dev',
        image: '/assets/projects/placeholder.jpg', // No image provided in prompt, using placeholder
        images: []
    },
    {
        id: 'eoncord',
        title: 'Eoncord',
        subtitle: 'Distributed Microservices Chat',
        shortDescription: 'Discord clone with 9+ microservices, <100ms latency, and 95% UI fidelity on Kubernetes.',
        description: 'Enterprise-grade distributed microservices platform replicating Discord\'s architecture. Built with 9+ specialized microservices (Auth, Guild, Message, Gateway) deployed on AWS EKS, demonstrating production-ready cloud-native patterns.',
        tech: ['React', 'TypeScript', 'Node.js', 'K8s', 'Redis', 'RabbitMQ', 'AWS'],
        metrics: ['<100ms Latency', '95% UI Match', '9 Microservices'],
        github: 'https://github.com/S-Eshwar-fut-dev/Discord-Frontend',
        image: '/assets/projects/eoncord/chat-general.png',
        images: [
            '/assets/projects/eoncord/chat-general.png',
            '/assets/projects/eoncord/chat-emoji.png',
            '/assets/projects/eoncord/create-server.png'
        ]
    },
    {
        id: 'fraudshield',
        title: 'FraudShield',
        subtitle: 'AI-Powered Fraud Detection',
        shortDescription: 'Hybrid XGBoost + GNN pipeline detecting fraud with 88.37% precision and SHAP explainability.',
        description: 'Hybrid machine learning pipeline combining gradient boosting and graph neural networks for financial fraud detection. Built for high-stakes production environments with explainable AI for analyst triage.',
        tech: ['Python', 'XGBoost', 'GNN', 'SHAP', 'Scikit-learn'],
        metrics: ['88.37% Precision', '0.99 ROC-AUC', '$1.2M Recovery'],
        github: 'https://github.com/S-Eshwar-fut-dev/Fraudsheild',
        image: '/assets/projects/fraudshield/dashboard.png',
        images: [
            '/assets/projects/fraudshield/dashboard.png',
            '/assets/projects/fraudshield/analysis.png'
        ]
    },
    {
        id: 'projecteon',
        title: 'Project Eon',
        subtitle: 'Conversational AI Assistant',
        shortDescription: 'Fine-tuned Llama 3.2 AI with ChromaDB memory and adaptive personality components.',
        description: 'Fine-tuned conversational AI system with long-term memory and adaptive personality. Leverages vector database for context retrieval and custom personality modules for human-like interactions.',
        tech: ['Python', 'Llama 3.2', 'ChromaDB', 'Vector DB', 'TTS'],
        metrics: ['35% Faster Response', 'Human-like Speech', 'Adaptive Tone'],
        github: 'https://github.com/S-Eshwar-fut-dev/EON_AI_CHATBOT',
        image: '/assets/projects/projecteon/chat-active.png',
        images: [
            '/assets/projects/projecteon/chat-active.png',
            '/assets/projects/projecteon/chat-empty.png'
        ]
    },
    {
        id: 'course-dashboard',
        title: 'Curriculum Manager',
        subtitle: 'Enterprise Dashboard for CIT',
        shortDescription: 'RBAC system for 450+ requests/semester, reducing admin time by 50%. Led 10-dev team.',
        description: 'Enterprise web dashboard built for Chennai Institute of Technology to automate course-change request workflows. Led team of 10 developers to replace manual Excel-based processes with a robust role-based access control (RBAC) system.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
        metrics: ['50% Faster Process', '35% Less Overhead', '10 Developer Team'],
        github: '#', // Private property
        image: '/assets/projects/cms/thumbnail.png',
        images: [
            '/assets/projects/cms/thumbnail.png',
            '/assets/projects/cms/dashboard.png'
        ]
    },
    {
        id: 'smart-grid',
        title: 'Smart Grid Fault Detection',
        subtitle: 'IoT Real-time Monitoring',
        shortDescription: 'IoT system with 92% fault accuracy using MQTT telemetry and multi-sensor fusion.',
        description: 'IoT-enabled real-time fault detection system for electrical grid infrastructure. Combines multi-sensor fusion with geospatial visualization for rapid fault localization in power distribution networks.',
        tech: ['Flutter', 'IoT', 'MQTT', 'Node.js', 'Leaflet'],
        metrics: ['92% Accuracy', 'Real-time Telemetry', 'Multi-sensor Fusion'],
        github: 'https://github.com/S-Eshwar-fut-dev/sih_2025_mayday',
        image: '/assets/projects/smartgrid.png', // Placeholder or need to check if exists, prompt implied it might not
        images: []
    },
    {
        id: 'twin-nebula',
        title: 'Twin Nebula v2',
        subtitle: 'Interactive 3D Portfolio',
        shortDescription: 'Immersive 60fps portfolio with custom GLSL shaders and 15,000+ particle starfield.',
        description: 'Deeply immersive 3D portfolio experience featuring a custom GLSL Butterfly Nebula, GPU-accelerated starfield, and glassmorphic UI. Showcases advanced web graphics programming.',
        tech: ['R3F', 'GLSL', 'Next.js', 'Framer Motion', 'WebGL'],
        metrics: ['60fps Performance', '15k+ Particles', 'GPU Acceleration'],
        github: 'https://github.com/S-Eshwar-fut-dev/Portfolio',
        image: '/assets/projects/portfolio/hero.png',
        images: [
            '/assets/projects/portfolio/hero.png',
            '/assets/projects/portfolio/main.png'
        ]
    },
    {
        id: 'finance-app',
        title: 'Finsmart',
        subtitle: 'Personal Finance Manager',
        shortDescription: 'Offline-first Flutter app with predictive budgeting and local data privacy.',
        description: 'Cross-platform personal finance tracking application built with Flutter. Features predictive budgeting, investment portfolio analysis, and offline-first architecture for complete privacy.',
        tech: ['Flutter', 'Dart', 'Local Storage', 'Visualization'],
        metrics: ['100% Privacy', 'Offline-first', 'Predictive Budgeting'],
        github: '#',
        image: '/assets/projects/finsmart/1.png',
        images: [
            '/assets/projects/finsmart/1.png',
            '/assets/projects/finsmart/2.png'
        ]
    },
    {
        id: 'eon-automator',
        title: 'EON Automator',
        subtitle: 'AI Workflow Automation',
        shortDescription: 'Autonomous agent environment with visual debugging and intent parsing.',
        description: 'Autonomous agent execution environment for AI-powered workflow automation. Features visual debugging, intent parsing, and comprehensive execution history tracking.',
        tech: ['React', 'TypeScript', 'AI Agents', 'Automation'],
        metrics: ['Visual Debugging', 'Autonomous Agents', 'Intent Parsing'],
        demo: 'https://juwarz465rvjxm2leaqj.share.dreamflow.app/',
        image: '/assets/projects/eon/automation-steps.png',
        images: [
            '/assets/projects/eon/automation-steps.png',
            '/assets/projects/eon/inspector.png'
        ]
    }
]

export const skillsCategories = [
    {
        title: "Languages",
        skills: ["C++ (C++17/20)", "Python", "Go", "Java", "JavaScript", "TypeScript", "SQL", "Bash", "Dart"]
    },
    {
        title: "Frontend Development",
        skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Three.js (R3F)", "GSAP", "Framer Motion", "WebGL", "Flutter"]
    },
    {
        title: "Backend & APIs",
        skills: ["Node.js", "Express.js", "FastAPI", "gRPC", "REST APIs", "WebSocket", "GraphQL"]
    },
    {
        title: "Databases & Caching",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ChromaDB", "Elasticsearch", "S3"]
    },
    {
        title: "Distributed Systems & DevOps",
        skills: ["Kubernetes", "Docker", "Microservices", "CI/CD (GitHub Actions)", "Terraform", "AWS (EC2, EKS, RDS)", "NGINX", "Istio"]
    },
    {
        title: "Message Queues & Real-time",
        skills: ["RabbitMQ", "Redis Pub/Sub", "MQTT", "WebSocket"]
    },
    {
        title: "High-Performance Computing",
        skills: ["OpenMP", "SIMD (AVX2)", "Cache Optimization", "Custom Allocators", "CUDA (Basics)"]
    },
    {
        title: "AI/ML & Data Science",
        skills: ["XGBoost", "SHAP", "Graph Neural Networks", "LLMs (Llama 3.2)", "Vector DBs", "Scikit-learn", "Pandas", "TensorFlow"]
    },
    {
        title: "Security & Auth",
        skills: ["JWT", "OAuth2", "mTLS", "TLS/SSL", "Row-Level Security"]
    },
    {
        title: "Monitoring & Testing",
        skills: ["CloudWatch", "Distributed Tracing", "k6 Load Testing", "Performance Profiling"]
    }
]
