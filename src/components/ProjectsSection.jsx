import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { siGithub } from 'simple-icons';

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string[]} tags
 * @property {string} demoUrl
 * @property {string} githubUrl
 */

/**
 * The 3 Projects I want to feature 
 *
 * TODO: When I have too many projects to show, make a
 * dedicated page so those projects still have a way to find 
 * them
 *
 * @type {Project[]}
 */
const projects = [
    {
        id: 1,
        title: "Music Link Converter",
        description: "Convert song links to and from Spotify and YouTube Music",
        image: "/projects/linkconverter.jpg",
        tags: ["React", "TailwindCSS", "CRUD", "JSDoc", "AWS"],
        demoUrl: "/converter",
        githubUrl: "https://github.com/olaf8543/portfolio-website",
    },
    {
        id: 2,
        title: "Controller Button Visualizer",
        description:
            "A real-time on-screen display that shows your button inputs for leverless fightsticks",
        image: "/projects/visualizer.png",
        tags: ["Python", "Qt"],
        demoUrl: "https://youtu.be/QLb7bwcPBwE",
        githubUrl: "https://github.com/olaf8543/controller_visualizer",
    },
    {
        id: 3,
        title: "Santa's Workshop Donation Project",
        description:
            "Full stack web application where people can donate toys to children in need",
        image: "/projects/ufunddashboard.png",
        tags: ["Angular", "TypeScript", "Springboot"],
        demoUrl: "https://drive.google.com/file/d/1BlZxyb4p_iq-N-kHcMOu6ISnT_xXjon_/view?usp=sharing",
        githubUrl:
            "https://github.com/RIT-SWEN-261-04/team-project-2245-swen-261-04-5e-iwanttogohome",
    },
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="pt-24 lg:py-24 px-4 relative opacity-0 animate-fade-in-delay-1">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    {" "}
                    Featured <span className="gradient-text"> Projects </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Here is some of my projects that I've been working on recently!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div
                            key={key}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover relative h-full"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, key) => (
                                        <span
                                            key={key}
                                            className="bg-primary/10 text-primary py-1 px-2 rounded-full text-xs hover:bg-primary/20 hover:shadow-[0_2_8px_rgba(139,92,246,0.2)] transition cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-6">
                                    {project.description}
                                </p>
                                <div className="absolute bottom-4 left-6 flex space-x-3">
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <title>{siGithub.title}</title>
                                            <path d={siGithub.path} />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        className="special-button w-fit flex items-center mx-auto gap-2"
                        target="_blank"
                        href="https://github.com/olaf8543"
                    >
                        Check My Github <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};
