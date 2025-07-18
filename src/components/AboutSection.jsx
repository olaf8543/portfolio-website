export const AboutSection = () => {
    return (
        <section id="about" className="pt-24 lg:py-24 px-4 relative opacity-0 animate-fade-in-delay-1">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="gradient-text"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            Passionate Software Developer & Student
                        </h3>

                        <p className="text-muted-foreground">
                            I've developed a versatile technical skillset through hands-on projects and team collaborations.
                            My approach is all about building clean, practical solutions to complex problems.
                            Whether it's creating responsive web interfaces, developing desktop tools, or working on backend systems,
                            I focus on crafting maintainable solutions that actually work in the real world.
                        </p>

                        <p className="text-muted-foreground">
                            Learning and building useful technologies
                            are things I am deeply passionate about. I love figuring
                            out all of the cool things computers can do, and love developing
                            those things!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="special-button py-2">
                                {" "}
                                Get In Touch
                            </a>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                download="/OwenLaffertyResume.pdf"
                                className="special-button p-[2px]"
                            >
                                <div className="bg-background rounded-xl px-6 py-[6px] hover:bg-background/85 transition-all duration-300">
                                    <span className="text-foreground">Resume</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="relative group p-[2px] bg-gradient-to-r from-primary-gradient-one to-primary-gradient-two rounded-4xl card-hover">
                        <img className="rounded-4xl" src="/images/mady.jpg" alt="Me" />
                    </div>
                </div>
            </div>
        </section>
    );
};
