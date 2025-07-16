import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col items-center justify-center py-4">
            <div className="text-center">
                <ThemeToggle className="fixed top-2 right-5 z-50 p-2 rounded-full transition-all duration-300" />
                <h1 className="text-2xl font-bold">Page Not Found</h1>
                <p className="mt-2">Sorry, this page was not found</p>

                <div className="mt-8">
                    <Link to="/" className="special-button">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
