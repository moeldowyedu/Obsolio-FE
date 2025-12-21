import React, { useState, useEffect } from 'react';

const TypingEffect = ({
    text,
    speed = 50,
    deleteSpeed = 30,
    delay = 1000,
    pauseBeforeDelete = 2000,
    className = ''
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeoutId;

        const handleTyping = () => {
            // Deleting phase
            if (isDeleting) {
                if (index > 0) {
                    setDisplayedText(text.substring(0, index - 1));
                    setIndex(prev => prev - 1);
                    timeoutId = setTimeout(handleTyping, deleteSpeed);
                } else {
                    setIsDeleting(false);
                    timeoutId = setTimeout(handleTyping, delay); // Wait before re-typing
                }
            }
            // Typing phase
            else {
                if (index < text.length) {
                    setDisplayedText(text.substring(0, index + 1));
                    setIndex(prev => prev + 1);
                    timeoutId = setTimeout(handleTyping, speed);
                } else {
                    // Finished typing, wait before deleting
                    timeoutId = setTimeout(() => {
                        setIsDeleting(true);
                        // Start deleting logic next cycle
                        handleTyping();
                    }, pauseBeforeDelete);
                }
            }
        };

        // Initial trigger
        // We need to kick off the cycle. 
        // If we rely purely on index change, it might deadlock if index doesn't change on mount.
        // So we just call it once.
        timeoutId = setTimeout(handleTyping, speed);

        return () => clearTimeout(timeoutId);
    }, [index, isDeleting, text, speed, deleteSpeed, delay, pauseBeforeDelete]);

    return (
        <span className={className}>
            {displayedText}
            {/* Matrix-style block cursor */}
            <span className="inline-block w-[0.6em] h-[1em] ml-1 align-text-bottom bg-current animate-pulse"></span>
        </span>
    );
};

export default TypingEffect;
