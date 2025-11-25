import { useEffect, useRef } from "react";

const AnimatedDots = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const particles = useRef([]);

    const initCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const ctx = canvas.getContext("2d");
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);
        return ctx;
    };

    const createParticle = (x, y) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.2;
        particles.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 2 + 1,
            life: 0,
            maxLife: 100,
        });
    };

    const animate = (ctx) => {
        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // spawn particles around mouse
            createParticle(mouse.current.x, mouse.current.y);
            // update and draw particles
            particles.current.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                const alpha = 1 - p.life / p.maxLife;
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                if (p.life >= p.maxLife) particles.current.splice(i, 1);
            });
            requestAnimationFrame(draw);
        };
        draw();
    };

    useEffect(() => {
        const ctx = initCanvas();
        if (!ctx) return;
        const handleMouseMove = (e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        animate(ctx);
        return () => {
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
        />
    );
};

export default AnimatedDots;
