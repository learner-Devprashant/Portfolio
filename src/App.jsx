import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Preloader from "./components/UI/Preloader";
import CursorBlob from "./components/UI/CursorBlob";
import SideLabel from "./components/UI/SideLabel";

// Lazy-loaded sections for code splitting
const HeroSection = lazy(() => import("./components/Hero/HeroSection"));
const AboutSection = lazy(() => import("./components/About/AboutSection"));
const TOCSection = lazy(() => import("./components/TOC/TOCSection"));
const ProjectsSection = lazy(
  () => import("./components/Projects/ProjectSection"),
);
const Footer = lazy(() => import("./components/Footer/FooterSection"));

const SectionFallback = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-yellow border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const preloaderDone = useSelector((s) => s.portfolio.preloaderDone);

  return (
    <>
      {/* Preloader — always mounted until animation completes */}
      {!preloaderDone && <Preloader />}

      {/* Cursor glow */}
      <CursorBlob />

      {/* Fixed side label */}
      <SideLabel />

      {/* Main content */}
      <main>
        <Suspense fallback={<SectionFallback />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TOCSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
