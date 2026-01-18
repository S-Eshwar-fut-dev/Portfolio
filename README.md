# Twin Neon Nebula Portfolio

A high-performance, immersive 3D portfolio experience engineered with **Next.js 15**, **React Three Fiber**, and **Tailwind CSS v4**.

<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/8901a78f-9380-4aea-83f2-0808d1624ce4" />


## 🌌 The Core Engine

### Volumetric Twin Nebula (Custom Shaders)
The centerpiece is a custom **GLSL Fragment & Vertex Shader** implementation of a "Twin Butterfly Nebula".
-   **Volumetric Raymarching simulation**: Creates depth and density without heavy texture loads.
-   **Reactive Shockwaves**: "Arc of Lighting" effect that ripples through the nebula structure.
-   **Deep Purple Integration**: Tuned specifically to blend with the `#1a0b2e` Deep Midnight Purple theme.

### Infinite GPU Starfield
-   **InstancedMesh Architecture**: Renders 4,000+ stars with a single draw call for 60FPS performance.
-   **Z-Axis Drift Algorithm**: Custom physics logic (modulo wrapping) creates an infinite flight illusion without object destruction/creation overhead.
-   **Parallax Layers**: distinct star sizes and speeds for realistic depth perception.

## 🎨 UI Architecture

### Asymmetrical Bento Grid
-   A custom 2x3 responsive grid layout for the "featured work" section.
-   Dynamic cell sizing (Large Left, Stacked Right, Wide Bottom) to break visual monotony.
-   **Cinematic Modals**: Full-screen, backdrop-blur overlays for deep dives into project details using `framer-motion` shared layout animations.

### "Ghost" UI System
-   **Deep Purple Theme**: A unified design language using Deep Midnight Purple (`#1a0b2e`) and Neon Cyan (`#06b6d4`).
-   **Contrast Engine**: Smart text color logic ensuring legibility against both the Void (Black) and the Nebula Core (Bright White).
-   **Transparent Forms**: The "Contact Us" section uses a "Ghost" technique—100% transparency with ultra-thin `white/10` borders—allowing the starfield to flow uninterrupted behind the interactive elements.

## 🛠️ Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **3D Engine**: React Three Fiber / Three.js / Drei
-   **Styling**: Tailwind CSS v4 (Alpha/Beta features enabled)
-   **Animation**: Framer Motion (orchestrating DOM animations) & GSAP (timeline precision)
-   **Smooth Scroll**: Lenis (virtualized scrolling)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/S-Eshwar-fut-dev/Portfolio.git
    cd Portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```
src/
├── components/
│   ├── three/          # R3F Components (Nebula, Starfield, Scene)
│   ├── sections/       # Page Sections (Hero, Projects, Experience)
│   └── ui/             # Reusable UI (GlassCard, MagneticButton)
├── lib/
│   └── constants.ts    # centralized data (Projects, Experience)
└── app/                # Next.js App Router
```

---

*Designed & Engineered by Eshwar S.*
