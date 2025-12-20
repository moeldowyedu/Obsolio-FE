import React, { useEffect, useRef } from 'react';

const ParticleWaveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

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
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles - optimized for performance
        const initParticles = () => {
            particles = [];
            const spacing = 30; // Wider spacing = fewer particles = better performance
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
            const maxDistance = 60; // Reduced for performance

            for (let i = 0; i < particles.length; i++) {
                // Only check nearby particles for connections
                for (let j = i + 1; j < Math.min(i + 20, particles.length); j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
            // Clear canvas
            ctx.fillStyle = 'rgba(11, 14, 20, 0.2)';
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
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            {/* Dark overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'linear-gradient(180deg, rgba(11, 14, 20, 0.75) 0%, rgba(11, 14, 20, 0.9) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
        </>
    );
};

export default ParticleWaveBackground;
