# PLANNING.md

## 1. Vision & Goals
**OpenIcfes** is an exam preparation platform designed with a "Cyber-Minimalism" aesthetic. The goal is to make studying feel like interacting with a high-end terminal interface.

## 2. Architecture
- **Framework:** React 18 (SPA)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (via CDN)
- **State Management:** React Hooks (Context/Local State)
- **Deployment Strategy:** Client-side static build

## 3. Design System ("BestOf OpenSource")
- **Palette:** 
    - Bg: `#121212`
    - Fg: `#F5F5DC` (Bone)
    - Accent: `#10B981` (Emerald)
    - Error: `#F87171`
- **Typography:** `Fira Code` (Monospace for everything)
- **Key UI Patterns:**
    - "Flashlight" Cards (Mouse-tracking radial gradients)
    - Glassmorphism (Backdrop blur)
    - Noise Texture Overlay
    - Minimalist "Terminal" Layouts

## 4. Component Scope
- **Layout:** Global wrapper with Noise filter and Font application.
- **FlashlightCard:** The core container for interactive elements.
- **ExamView:** Main game loop (Question -> Options -> Timer).
- **Leaderboard:** Data visualization table.
- **Landing:** Hero section with entry animation.

## 5. Constraints
- No external CSS files.
- No heavy assets (Green Software).
- Mobile-first responsive design.