"use client";
import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (options = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observerOptions = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || "0px 0px -100px 0px",
            ...options,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally disconnect after first animation
                    if (options.once !== false) {
                        observer.unobserve(entry.target);
                    }
                } else if (!options.once) {
                    // Reset animation when scrolling back up
                    setIsVisible(false);
                }
            });
        }, observerOptions);

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options.threshold, options.rootMargin, options.once]);

    return [elementRef, isVisible];
};

