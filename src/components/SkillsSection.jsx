import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {"languages" | "technologies" | "tools"} category
 */

/** @type {Skill[]} */
const skills = [
    // Languages
    { name: "C", category: "languages" },
    { name: "Rust", category: "languages" },
    { name: "Shell Script", category: "languages" },
    { name: "Java", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "HTML/CSS", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "JavaScript", category: "languages" },

    // Frontend & Frameworks
    { name: "React", category: "technologies" },
    { name: "Angular", category: "technologies" },
    { name: "Next.js", category: "technologies" },
    { name: "TailwindCSS", category: "technologies" },
    { name: "Node.js", category: "technologies" },
    { name: "JSDoc", category: "technologies" },
    { name: "RESTful APIs", category: "technologies" },
    { name: "Spring Boot", category: "technologies" },

    { name: "Docker", category: "tools" },
    { name: "CI/CD", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "Linux", category: "tools" },
    { name: "Git", category: "tools" },
    { name: "Jira", category: "tools" },
];

const categories = ["languages", "technologies", "tools", "all"];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("languages");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );
    return (
        <section
            id="skills"
            className="pt-24 lg:py-24 px-4 relative bg-secondary/30 opacity-0 animate-fade-in-delay-1"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="gradient-text"> Skills</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-5 py-2 rounded-full transition-all duration-300 capitalize hover:scale-105 cursor-pointer",
                                activeCategory === category
                                    ? "bg-gradient-to-r from-primary-gradient-one to-primary-gradient-two text-primary-foreground"
                                    : "bg-card text-foreground"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div
                            key={key}
                            className="bg-card p-6 rounded-lg shadow-xs card-hover"
                        >
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg"> {skill.name}</h3>
                            </div>
                            <div className="w-full h-2 bg-gradient-to-r from-primary-gradient-one to-primary-gradient-two origin-left rounded-full overflow-hidden" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
