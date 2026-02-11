"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Custom hook that returns a ref and a boolean indicating whether the element
 * has entered the viewport. Once triggered, it stays visible (fires once).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px"
) {
    const ref = useRef<T>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(el)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, rootMargin])

    return { ref, isVisible }
}
