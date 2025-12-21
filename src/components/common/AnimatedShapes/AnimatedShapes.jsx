import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const AnimatedShapes = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Colors based on theme
        const isDark = theme === 'dark';
        const particleColor = isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(71, 85, 105, 0.25)'; // Increased opacity for better visibility
        const lineColor = isDark ? '255, 255, 255' : '99, 102, 241'; // White vs Indigo-500
        const clearColor = isDark ? 'rgba(11, 14, 20, 0.2)' : 'rgba(248, 250, 252, 0.2)'; // Dark vs Slate-50

        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseY = y;
                this.amplitude = Math.random() * 50 + 25;
                this.frequency = Math.random() * 0.015 + 0.01;
                this.offset = Math.random() * Math.PI * 2;
            }

            update(time) {
                this.y = this.baseY + Math.sin(time * this.frequency + this.offset) * this.amplitude;
            }

            draw(ctx) {
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles - optimized for performance
        const initParticles = () => {
            particles = [];
            const spacing = 40; // Spacing
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    particles.push(new Particle(x, y));
                }
            }
        };

        // Set canvas size to full viewport
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(); // Reinitialize on resize
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Draw connections - optimized
        const drawConnections = () => {
            const maxDistance = 70;

            for (let i = 0; i < particles.length; i++) {
                // Only check nearby particles for connections
                for (let j = i + 1; j < Math.min(i + 20, particles.length); j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.12; // Increased opacity
                        ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        let time = 0;
        const animate = () => {
            // Clear canvas with trail effect
            ctx.fillStyle = clearColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 2;

            // Update and draw particles
            particles.forEach(particle => {
                particle.update(time);
                particle.draw(ctx);
            });

            // Draw connections
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-run effect when theme changes

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />
            {/* Gradient Overlay for Fade Effect */}
            <div
                className={`absolute inset-0 ${theme === 'dark'
                    ? 'bg-gradient-to-b from-[#0B0E14]/80 via-transparent to-[#0B0E14]/90'
                    : 'bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50/90'
                    }`}
            />
        </div>
    );
};

export default AnimatedShapes;
