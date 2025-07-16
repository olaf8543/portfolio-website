import { useEffect, useState } from "react";

/**
 * @typedef {Object} Particle
 * @property {number} id - Unique identifier for the particle
 * @property {number} size - Size of the particle in arbitrary units
 * @property {number} x - Horizontal position as percentage of container width (0-100)
 * @property {number} y - Vertical starting position as percentage of container height (0-100)
 * @property {number} delay - Delay before animation starts (in seconds)
 * @property {number} animationDuration - Duration of the falling animation (in seconds)
 */

export const Background = ({ className = "" }) => {
    /** @type {[Particle[], function]} */
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        generateParticles();
    }, []);

    /**
     * Generates an array of particles with random properties
     * @function
     * @returns {void}
     */
    const generateParticles = () => {
        const numberOfParticles = 7;
        /** @type {Particle[]} */
        const newParticles = [];

        for (let i = 0; i < numberOfParticles; i++) {
            /** @type {Particle} */
            newParticles.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 90,
                y: Math.random() * 20,
                delay: Math.random() * 1,
                animationDuration: Math.random() * 3 + 3,
            });
        }

        setParticles(newParticles);
    };

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-0 animate-fade-in">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={"particle animate-particle " + className}
                    style={{
                        width: particle.size * (Math.random() * 2 + 3) + "px",
                        height: particle.size * (Math.random() + 1) + "px",
                        left: particle.x + "%",
                        top: particle.y + "%",
                        animationDelay: particle.delay + "s",
                        animationDuration: particle.animationDuration + "s",
                    }}
                />
            ))}
        </div>
    );
};
