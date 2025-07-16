import { useEffect, useState } from "react";

/**
 * A loading screen component that displays a typing animation of "Hello World!"
 * and manages the initial loading state of the application.
 */
export const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const fullText = "Hello World!";

    /**
     * Handles the typing animation effect and loading state management.
     * Checks localStorage to determine if the loading animation should play.
     */
    useEffect(() => {
        const storedState = localStorage.getItem("loaded");
        if (storedState !== "true") {
            let index = 0;
            const interval = setInterval(() => {
                setText(fullText.substring(0, index));
                index++;

                if (index > fullText.length) {
                    clearInterval(interval);
                    window.scrollTo(0, 0);

                    setTimeout(() => {
                        localStorage.setItem("loaded", "true");
                        onComplete();
                    }, 1000);
                }
            }, 100);

            return () => clearInterval(interval);
        } else {
            onComplete();
        }
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col items-center justify-center">
            <div className="mb-4 text-4xl font-mono font-bold gradient-text">
                {text}
                <span className="animate-blink ml-1">| </span>
            </div>
        </div>
    );
};
