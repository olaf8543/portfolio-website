import {
    Mail,
    MapPin,
    Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LinkedIn } from "@/assets/linkedin";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    /**
      * Handles form submission for the contact form.
      * Will email me the user's message using formspree
      * @async
      * @param {React.FormEvent<HTMLFormElement>} e - The form event
      * @returns {Promise<void>}
      */
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Message Submitted:", { name, email, message });
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("message", message);
            const response = await fetch("https://formspree.io/f/mnndrvow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setName("");
                setEmail("");
                setMessage("");
                toast({
                    title: "Message sent!",
                    description: "Thank you for your message. I'll get back to you soon.",
                });
            } else {
                console.log("Form submission failed");
                toast({
                    title: "Submission failed",
                    description: "Please check your input",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Error submitting form: ", error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast({
                title: "Error occurred",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30 opacity-0 animate-fade-in-delay-1">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="gradient-text"> Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Want to work together? Feel free to reach out.
                    I'm always open to discussing new opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-10">
                            {" "}
                            Contact Information
                        </h3>

                        <div className="space-y-18 py-4 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4 className="font-medium"> Email</h4>
                                    <a
                                        href="mailto:owenlafferty8543@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        owenlafferty8543@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <LinkedIn className="h-8 w-8 fill-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium pl-16">Linkedin</h4>
                                    <a
                                        href="https://www.linkedin.com/in/owen-lafferty-046946339"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Owen Lafferty
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4 className="font-medium"> Location</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors cursor-default">
                                        Pittsburgh, PA / Rochester, NY
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    {" "}
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Your Name..."
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    {" "}
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="john@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                >
                                    {" "}
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Hello, I'd like to talk about..."
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "special-button w-full flex items-center justify-center gap-2 cursor-pointer"
                                )}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
