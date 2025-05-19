"use client"

import { useEffect, useState } from "react"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <button
            id="scrollToTop"
            className="scroll-top-btn"
            style={{ display: isVisible ? "block" : "none" }}
            onClick={scrollToTop}
            title="Ir al inicio"
            aria-label="Volver al inicio de la página"
        >
            ↑
        </button>
    )
}
