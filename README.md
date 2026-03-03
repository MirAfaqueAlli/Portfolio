# Mir Afaque Alli - 3D Interactive Portfolio

A bleeding-edge, immersive web portfolio built to showcase full-stack development skills, projects, and achievements. The design focuses on combining exceptional performance with striking visual aesthetics, utilizing interactive 3D elements and smooth animations.

## 🚀 Live Demo
(Link to be added once deployed)

## ✨ Features
- **3D Interactive Hero**: A fully interactive, physics-based 3D floating ID card with mouse tracking.
- **Cinematic Project Showcase**: A deep-perspective 3D scrolling gallery for projects with detailed overlay modals.
- **Dynamic Skills Constellation**: An interactive tag cloud of skills that assembles on scroll and features a custom dynamic cursor.
- **Immersive Achievements Timeline**: A visually stunning SVG and glow-driven timeline tracking milestones.
- **Magnetic UI Elements**: Buttons and cards that subtly track mouse movements.
- **Custom Blend-Mode Cursor**: A bespoke cursor that adapts its size, shape, and color depending on the underlying context.
- **Fully Responsive**: Carefully optimized for seamless experiences across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/gsap/) & `@gsap/react`
- **3D Rendering**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Physics**: `@react-three/rapier`
- **Icons**: `react-icons`

## 📂 Project Structure
The project is built with a clean, scalable component architecture:
```text
src/
├── assets/         # Images, fonts, and 3D models (.glb)
├── components/     # Reusable React components (UI & layout sections)
├── data/           # Extracted data arrays (Projects, Skills, Achievements)
├── index.css       # Global styles and Tailwind directives
├── App.jsx         # Main application assembly
└── main.jsx        # React DOM entry point
```

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/MirAfaqueAlli/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Customizing Content
To easily add or modify the portfolio content without diving into complex UI code, edit the files in the `src/data/` directory:
- `src/data/projectsData.js`
- `src/data/skillsData.jsx`
- `src/data/achievementsData.jsx`

## 📬 Contact Setup (EmailJS)
If using the working contact form, ensure you create a `.env` file in the root directory and add your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
