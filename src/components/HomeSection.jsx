import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const HomeSection = () => {
    return (
        <section
            id="home"
            className="relative z-30 flex flex-col justify-center px-4 pt-50 lg:min-h-screen lg:py-24"
        >
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center lg:gap-28">
                <div className="lg:w-1/3 mt-10 lg:mt-0">
                    <img
                        className={cn("rounded-4xl max-w-[280px] md:max-w-[350px] lg:max-w-full w-full h-auto p-[2px] bg-gradient-to-r",
                            "from-primary-gradient-one to-primary-gradient-two card-hover opacity-0 animate-fade-in-delay-4 md:animate-fade-in-delay-2")}
                        src="/images/picnic.webp"
                        alt="Profile"
                    />
                </div>
                <div className="lg:w-2/3 text-center">
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            <span className="opacity-0 animate-fade-in">Hi, I'm </span>
                            <span className="gradient-text pl-1 opacity-0 animate-fade-in-delay-1">
                                Owen
                            </span>
                            <span className="ml-2 md:ml-4 opacity-0 animate-fade-in-delay-2">
                                Lafferty
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground mx-auto opacity-0 animate-fade-in-delay-3">
                            I'm a software engineering student at
                            <span className="font-medium gradient-text from-orange-300 to-orange-400"> Rochester Institute of Technology </span>
                            where I'm learning skills for devlopment, design, and leadership, across the entire stack.
                        </p>
                        <div className="pt-2 md:pt-4 opacity-0 animate-fade-in-delay-4">
                            <a href="#about" className="special-button inline-block">
                                About Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-sm text-muted-foreground mb-2">Scroll</span>
                    <ArrowDown className="h-5 w-5 text-primary" />
                </div>
            </div>
        </section>
    );
};
