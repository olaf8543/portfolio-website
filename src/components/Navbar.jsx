import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Array of navigation items with their names and corresponding href links
 * @type {Array<{name: string, href: string}>}
 */
const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /**
     * Effect to handle scroll events and update isScrolled state
     * @effect
     */
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="max-lg:hidden">
                <ThemeToggle className={isScrolled
                    ? "fixed top-2 right-5 z-60 p-2 rounded-full transition-all duration-300"
                    : "fixed top-4 right-5 z-60 p-2 rounded-full transition-all duration-300"
                } />
            </div>
            <nav
                className={cn(
                    "fixed w-full z-50 transition-all duration-300",
                    isScrolled
                        ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
                        : "py-5"
                )}
            >
                <div className="container flex items-center justify-between">
                    <a
                        className="text-xl font-bold text-primary flex items-center"
                        href="#home"
                    >
                        <span className="relative z-10 gradient-text">
                            <span className="text-glow text-foreground">owenlafferty</span>
                            .com
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden mr-5 lg:flex space-x-8">
                        {navItems.map((item, key) => (
                            <a
                                key={key}
                                href={item.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="lg:hidden p-2 text-foreground z-50"
                        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 lg:hidden",
                    isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col space-y-8 text-xl">
                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.href}
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <ThemeToggle className="fixed bottom-5 right-5" />
                </div>
            </div>
        </>
    );
};
