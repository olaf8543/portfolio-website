import { ArrowUp, RefreshCw } from "lucide-react";

export const Footer = () => {
    /**
     * Refreshes the page and replays the initial 
     * loading animation 
     * @returns {void}
     */
    const fullRefreshPage = () => {
        localStorage.setItem("loaded", "false");
        window.location.reload();
    };

    return (
        <div className="py-4 flex justify-center gap-8">
            <a
                href="#home"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
                <ArrowUp size={20} />
            </a>
            <a
                onClick={fullRefreshPage}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer"
            >
                <RefreshCw size={20} />
            </a>
        </div>
    );
};
