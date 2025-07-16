import { Navbar } from "../components/Navbar";
import { HomeSection } from "../components/HomeSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { LoadingScreen } from "../components/LoadingScreen";
import { Background } from "../components/Background";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Home = () => {
    const [isLoaded, setIsLoaded] = useState(
        localStorage.getItem("loaded") === "true"
    );

    return (
        <>
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
            <div
                className={cn(
                    "min-h-screen bg-background text-foreground overflow-x-hidden transition-opacity duration-700",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
            >
                <Navbar />
                <main>
                    <HomeSection />
                    <Background />
                    <AboutSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    );
};
