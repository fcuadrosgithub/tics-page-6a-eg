"use client"

import { useEffect, useRef } from "react"

export default function MapaCurricular() {
    const sectionRef = useRef<HTMLElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && textContainerRef.current) {
                    textContainerRef.current.classList.add("in-view")
                } else if (textContainerRef.current) {
                    textContainerRef.current.classList.remove("in-view")
                }
            })
        }, observerOptions)

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        // Fallback para navegadores antiguos
        if (!("IntersectionObserver" in window) && sectionRef.current && textContainerRef.current) {
            let isVisible = false

            const checkVisibility = () => {
                if (!sectionRef.current) return

                const rect = sectionRef.current.getBoundingClientRect()
                const elementHeight = sectionRef.current.offsetHeight
                const newVisibility = rect.top <= window.innerHeight * 0.75 && rect.bottom >= -elementHeight * 0.25

                if (newVisibility !== isVisible) {
                    isVisible = newVisibility
                    if (isVisible && textContainerRef.current) {
                        textContainerRef.current.classList.add("in-view")
                    } else if (textContainerRef.current) {
                        textContainerRef.current.classList.remove("in-view")
                    }
                }
            }

            window.addEventListener("scroll", checkVisibility)
            checkVisibility() // Comprobar estado inicial

            return () => {
                window.removeEventListener("scroll", checkVisibility)
            }
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section ref={sectionRef} className="pdf-section">
            <div className="pdf-content">
                <div ref={textContainerRef} className="text-container">
                    <h2>Mapa curricular</h2>
                    <p>
                        Aquí podrás consultar las materias de nuestro programa educativo de la Ingeniería en Tecnologías de la
                        Información y Comunicaciones.
                    </p>
                    <a href="/documents/MapaCurricular.pdf" className="doc-btn" download="MapaCurricular_ITSOEH.pdf">
                        Descargar PDF
                    </a>
                </div>
            </div>
        </section>
    )
}
