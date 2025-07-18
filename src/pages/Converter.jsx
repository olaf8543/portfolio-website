import { Background } from "@/components/Background";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { siSpotify, siYoutubemusic } from "simple-icons";
import { ThemeToggle } from "../components/ThemeToggle";
import { Link } from "react-router-dom";
/** @import { conversionData } from '@/../backend/modules/types' */

export const Converter = () => {
    const { toast } = useToast();
    const [link, setLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [conversionData, setConversionData] = useState(
        /** @type {conversionData | null} */(null)
    );
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";

    /**
     * Determine platform type based on URL
     * @returns {"spotify"|"youtube"|"unknown"} Platform identifier
     */
    const linkType = () => {
        if (link.includes("open.spotify.com")) return "spotify";
        if (link.includes("music.youtube.com")) return "youtube";
        return "unknown";
    };

    /**
     * Determine conversion result platform
     * @returns {"spotify"|"youtube"|"unknown"} Platform identifier
     */
    const conversionType = () => {
        if (!conversionData) return "unknown";
        if (conversionData.retrievedSong.url.includes("open.spotify.com")) return "spotify";
        if (conversionData.retrievedSong.url.includes("music.youtube.com")) return "youtube";
        return "unknown";
    };

    /**
     * Copy URL to clipboard
     * @param {string} url - URL to copy
     */
    const copyLink = async (url) => {
        setIsClicked(true);
        try {
            await navigator.clipboard.writeText(url);
            setCopySuccess(true);
            setTimeout(() => {
                setIsClicked(false);
                setCopySuccess(false);
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
            toast({
                title: "Failed to copy",
                description: "Please Try Again",
                variant: "destructive"
            });
        }
    };

    /**
     * Generate dynamic header based on current link type
     * @returns {JSX.Element} Header JSX element
     */
    const generateHeader = () => {
        const currentType = linkType();
        const baseClass = "text-3xl md:text-5xl font-bold mb-6 text-center";

        if (currentType === "spotify") {
            return <p className={baseClass}>Convert Spotify to <span className={cn("gradient-text from-youtube-gradient-one to-youtube-gradient-two")}>Youtube Music</span></p>;
        }
        if (currentType === "youtube") {
            return <p className={baseClass}>Convert Youtube Music to <span className={cn("gradient-text")}>Spotify</span></p>;
        }
        return <p className={baseClass}>Music Link <span className={cn("gradient-text")}>Converter</span></p>;
    };

    /**
     * Returns whether or not the url is a valid url for the converter
     * @param {string} url - Url to check for validity
     * @returns {boolean} Header JSX element
     */
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return /(open\.spotify\.com|music\.youtube\.com)/.test(url);
        } catch {
            return false;
        }
    };

    /**
     * Handle form submission and fetch conversion data
     * @param {React.FormEvent} e - Form event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUrl(link)) {
            console.log(api_url);
            toast({
                title: "Invalid URL",
                description: "Please enter a valid Spotify or YouTube Music URL",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        setConversionData(null);

        try {
            const response = await fetch(
                `${api_url}/convert?link=${encodeURIComponent(link)}`
            );
            const result = await response.json();

            if (response.ok) {
                /** @type {conversionData} */
                setConversionData(result);
            } else {
                console.error('Conversion failed:', result);
                toast({
                    title: "Conversion failed:",
                    description: "Please check your input (did you put in a song?)",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            toast({
                title: "Network Error",
                description: "Please try again.",
                variant: "destructive"
            });
        }
        setIsSubmitting(false);
    };

    // Memoize derived values
    const currentLinkType = linkType();
    const currentConversionType = conversionType();
    const headerElement = generateHeader();

    return (
        <>
            <Background className={
                currentLinkType === "spotify"
                    ? "from-youtube-gradient-one via-youtube-gradient-one shadow-[0_0_10px_5px_rgba(255,0,0,0.3)]"
                    : ""}
            />

            <nav className="p-5 px-4 fixed top-0 left-5 bg-background/80 backdrop-blur-md min-w-full transition-all duration-300">
                <Link to="/" className="text-xl font-bold text-primary flex items-center">
                    <span className="text-glow text-foreground">owenlafferty</span>
                    <span className={cn("relative gradient-text inset-0",
                        currentLinkType === "spotify" ? "from-youtube-gradient-one to-youtube-gradient-two" : ""
                    )}>
                        .com
                    </span>
                </Link>
            </nav>
            <ThemeToggle className="fixed top-5 right-5 z-60" />

            <section className="mt-24 px-4 relative">
                <div className="container mx-auto max-w-5xl">
                    {headerElement}
                    <p className="text-lg font-muted-foreground mb-8">Convert your favorite songs between Youtube Music and Spotify</p>

                    <div className="mb-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="link" required className={cn("w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary focus:shadow-[0_0_15px_rgba(0,246,56,0.5)] transition-all duration-300",
                                    currentLinkType === "spotify" ? "focus:ring-youtube-gradient-one focus:shadow-[0_0_15px_rgba(255,0,0,0.5)]" : ""
                                )}
                                placeholder="Paste Music Link Here"
                                onChange={(e) => setLink(e.target.value)}
                                value={link}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn("special-button cursor-pointer", currentLinkType === "spotify" ? "from-youtube-gradient-one to-youtube-gradient-two hover:shadow-[0_0_10px_rgba(255,0,0,0.5)] text-white" : "")}
                            >
                                <div className="flex flex-row gap-2">
                                    {isSubmitting ? "Converting..." : "Convert Link"}
                                </div>
                            </button>
                        </form>
                    </div>

                    {conversionData && (
                        <div className={cn(
                            "flex flex-col md:flex-row gap-4 bg-card rounded-xl p-4 shadow-xs card-hover relative text-left max-md:items-center",
                            "opacity-0 animate-fade-in",
                            currentConversionType === "youtube" ? "bg-youtube-card" : ""
                        )}>
                            <img
                                src={conversionData.retrievedSong.image}
                                alt="Album Cover"
                                className="rounded-lg max-w-1/2 md:max-w-1/3"
                            />
                            <div className="md:w-2/3 flex flex-col min-h-full">
                                <div className="flex-1">
                                    <p className="mt-1 text-xl">{conversionData.retrievedSong.name}</p>
                                    <div className={cn(
                                        "w-full h-1 bg-gradient-to-r origin-left rounded-full overflow-hidden mt-2",
                                        currentConversionType === "youtube"
                                            ? "from-youtube-gradient-one to-youtube-gradient-two"
                                            : "from-primary-gradient-one to-primary-gradient-two"
                                    )} />
                                    <p className="my-3 text-xl">{conversionData.retrievedSong.artists.join(", ")}</p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between w-full">
                                    <div className="md:min-w-1/2 md:max-w-1/2">
                                        <div className="flex flex-row justify-between w-full text-md">
                                            <p>Match Confidence</p>
                                            <p>{conversionData.confidence}%</p>
                                        </div>
                                        <div className={cn(
                                            "w-full rounded-full",
                                            currentConversionType === "youtube"
                                                ? "bg-youtube-gradient-one/30"
                                                : "bg-primary-gradient-one/50"
                                        )}>
                                            <div
                                                className={cn("h-1 origin-left rounded-full overflow-hidden mt-2",
                                                    currentConversionType === "youtube"
                                                        ? "bg-gradient-to-r from-youtube-gradient-one to-youtube-gradient-two"
                                                        : "bg-gradient-to-r from-primary-gradient-one to-primary-gradient-two"
                                                )}
                                                style={{ width: `${conversionData.confidence}%` }}
                                            />
                                        </div>
                                    </div>
                                    {/* Desktop Buttons */}
                                    <div className="flex flex-row gap-5 max-sm:hidden">
                                        <button
                                            type="button"
                                            className={cn(
                                                "gradient-text text-foreground hover:text-transparent hover:scale-105 transition-all duration-300 cursor-pointer",
                                                currentConversionType === "youtube" ? "from-youtube-gradient-one to-youtube-gradient-two" : ""
                                            )}
                                            onClick={() => copyLink(conversionData.retrievedSong.url)}
                                        >
                                            {copySuccess ? "Copied!" : "Copy Link"}
                                        </button>
                                        <a
                                            href={conversionData.retrievedSong.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn("special-button p-[3px] flex flex-row", currentConversionType === "youtube" ? "from-youtube-gradient-one to-youtube-gradient-two hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]" : "")}
                                        >
                                            <div className={cn(
                                                "bg-card rounded-xl px-6 py-2 hover:bg-transparent text-foreground transition-all duration-300 flex flex-row gap-3 items-center",
                                                currentConversionType === "youtube"
                                                    ? "bg-youtube-card hover:text-white fill-youtube-gradient-one hover:fill-current"
                                                    : "hover:text-primary-foreground fill-primary-gradient-two hover:fill-current"
                                            )}>
                                                <p className="text-lg min-w-2/3">Open in</p>
                                                {currentConversionType === "youtube" ?
                                                    <svg className="w-6 h-6 overflow-visible" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <title>{siYoutubemusic.title}</title>
                                                        <path d={siYoutubemusic.path} />
                                                    </svg> :
                                                    <svg className="w-6 h-6 overflow-visible" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <title>{siSpotify.title}</title>
                                                        <path d={siSpotify.path} />
                                                    </svg>
                                                }
                                            </div>
                                        </a>
                                    </div>

                                    {/* Mobile Buttons */}
                                    <div className="w-full flex flex-row justify-between md:hidden mt-4">
                                        <button
                                            type="button"
                                            className={cn(
                                                "transition-all duration-300",
                                                !isClicked
                                                    ? "text-foreground"
                                                    : currentConversionType === "youtube"
                                                        ? "text-youtube-gradient-one"
                                                        : "text-primary-gradient-one"
                                            )}
                                            onClick={() => copyLink(conversionData.retrievedSong.url)}
                                        >
                                            {copySuccess ? "Copied!" : "Copy Link"}
                                        </button>
                                        <a
                                            href={conversionData.retrievedSong.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {currentConversionType === "youtube" ?
                                                <svg className="h-7 w-7 fill-youtube-gradient-one" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <title>{siYoutubemusic.title}</title>
                                                    <path d={siYoutubemusic.path} />
                                                </svg> :
                                                <svg className="h-7 w-7 fill-primary-gradient-two" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <title>{siSpotify.title}</title>
                                                    <path d={siSpotify.path} />
                                                </svg>
                                            }
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
