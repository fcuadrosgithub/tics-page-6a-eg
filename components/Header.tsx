"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function Header() {
    const [lastScroll, setLastScroll] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [activeSection, setActiveSection] = useState("")
    const [scrollTimeout, setScrollTimeoutId] = useState<NodeJS.Timeout | null>(null)
    const HIDE_DELAY = 1000

    useEffect(() => {
        const header = document.getElementById("main-header")

        const handleScroll = () => {
            const currentScroll = window.pageYOffset

            // Mostrar header si estamos en el top
            if (currentScroll <= 0) {
                setIsVisible(true)
                if (scrollTimeout) clearTimeout(scrollTimeout)
                return
            }

            // Scroll hacia arriba - mostrar header
            if (currentScroll < lastScroll) {
                setIsVisible(true)
                if (scrollTimeout) clearTimeout(scrollTimeout)
            }
            // Scroll hacia abajo - ocultar después de 1 segundo
            else if (currentScroll > lastScroll && currentScroll > (header?.offsetHeight || 0)) {
                if (scrollTimeout) clearTimeout(scrollTimeout)
                const timeoutId = setTimeout(() => {
                    setIsVisible(false)
                }, HIDE_DELAY)
                setScrollTimeoutId(timeoutId)
            }

            setLastScroll(currentScroll)

            // Verificar sección visible
            checkSectionInView()
        }

        const checkSectionInView = () => {
            const sections = document.querySelectorAll("section")
            let current = ""

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100
                const sectionHeight = section.offsetHeight

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.id
                }
            })

            setActiveSection(current)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (scrollTimeout) clearTimeout(scrollTimeout)
        }
    }, [lastScroll, scrollTimeout])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault()
        const target = document.getElementById(targetId)

        if (target) {
            setIsVisible(true)
            if (scrollTimeout) clearTimeout(scrollTimeout)

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth",
            })

            const timeoutId = setTimeout(() => {
                if (window.pageYOffset > target.offsetTop - 80) {
                    setIsVisible(false)
                }
            }, HIDE_DELAY)

            setScrollTimeoutId(timeoutId)
        }
    }

    const handleMouseEnter = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout)
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        if (window.pageYOffset > (document.getElementById("main-header")?.offsetHeight || 0)) {
            const timeoutId = setTimeout(() => {
                setIsVisible(false)
            }, HIDE_DELAY)
            setScrollTimeoutId(timeoutId)
        }
    }

    return (
        <header
            id="main-header"
            className="header"
            style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="header-content">
                <h1 className="logo">Ingeniería en Tecnologías de la Información y Comunicaciones</h1>
                <nav className="menu">
                    <a
                        href="#ITICs"
                        className={activeSection === "ITICs" ? "nav-link active" : "nav-link"}
                        onClick={(e) => handleLinkClick(e, "ITICs")}
                    >
                        ITICs
                    </a>
                    <a
                        href="#capacidades-section"
                        className={activeSection === "capacidades-section" ? "nav-link active" : "nav-link"}
                        onClick={(e) => handleLinkClick(e, "capacidades-section")}
                    >
                        Capacidades
                    </a>
                    <a
                        href="#Alianzas"
                        className={activeSection === "Alianzas" ? "nav-link active" : "nav-link"}
                        onClick={(e) => handleLinkClick(e, "Alianzas")}
                    >
                        Alianzas
                    </a>
                    <a
                        href="#Eventos"
                        className={activeSection === "Eventos" ? "nav-link active" : "nav-link"}
                        onClick={(e) => handleLinkClick(e, "Eventos")}
                    >
                        Eventos
                    </a>
                    <a
                        href="#Logros"
                        className={activeSection === "Logros" ? "nav-link active" : "nav-link"}
                        onClick={(e) => handleLinkClick(e, "Logros")}
                    >
                        Logros
                    </a>
                </nav>
            </div>
        </header>
    )
}
