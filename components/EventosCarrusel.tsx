"use client"

import { useEffect, useState, useRef } from "react"

interface Slide {
    id: number
    title: string
    subtitle: string
    description: string
    backgroundImage: string
    videoSrc: string
}

export default function EventosCarrusel() {
    const slides: Slide[] = [
        {
            id: 0,
            title: "Proyecto Integrador",
            subtitle: "Demuestra tus conocimientos en la práctica",
            description:
                "Los estudiantes de todos los semestres, demusetran sus conocimientos de todas las materias aplicadas en un solo trabajo en equipo",
            backgroundImage: "/images/integrador.png",
            videoSrc: "/videos/Vintegrador.mp4",
        },
        {
            id: 1,
            title: "InnovaTecNM",
            subtitle: "La unión hace la fuerza",
            description:
                "Alumnos de todas las carreras forman equipos para desarrollar proyectos tecnológicos innovadores para competir entre si e intentar llegar a la competencia nacional",
            backgroundImage: "/images/inntec.png",
            videoSrc: "/videos/Vinno.mp4",
        },
        {
            id: 2,
            title: "Jornada Deportiva",
            subtitle: "No todo es estudiar, distraete un rato!",
            description:
                "Para finalizar el semestre los estudiantes de todos los semestres juegan deportes de su agrado fomentando el compañerismo y el deporte",
            backgroundImage: "/images/jdeportiva.png",
            videoSrc: "/videos/Vjd.mp4",
        },
        {
            id: 3,
            title: "Racing Cup",
            subtitle: "Diviertete mientras practicas electrónica",
            description:
                "Alumnos de nivel media superior y superior de todas las escuelas participan en el evento de carreras de carros a control remoto de la ing TICs contra alumnos de la carrera",
            backgroundImage: "/images/rcup.png",
            videoSrc: "/videos/racup.mp4",
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [expandedVideo, setExpandedVideo] = useState<number | null>(null)
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const carouselRef = useRef<HTMLElement>(null)
    const totalSlides = slides.length
    const transitionTime = 10000 // 10 segundos por slide

    useEffect(() => {
        startProgressBar()

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }
    }, [currentSlide, isPaused])

    const startProgressBar = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }

        if (isPaused) return

        setProgress(0)
        const increment = 100 / (transitionTime / 10)

        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + increment
                if (newProgress >= 100) {
                    if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current)
                    }
                    nextSlide()
                    return 0
                }
                return newProgress
            })
        }, 10)
    }

    const showSlide = (index: number) => {
        let newIndex = index
        if (newIndex >= totalSlides) newIndex = 0
        if (newIndex < 0) newIndex = totalSlides - 1

        setCurrentSlide(newIndex)
    }

    const nextSlide = () => {
        showSlide(currentSlide + 1)
    }

    const prevSlide = () => {
        showSlide(currentSlide - 1)
    }

    const handleThumbnailClick = (index: number) => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }
        showSlide(index)
    }

    const handleMouseEnter = () => {
        setIsPaused(true)
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }
    }

    const handleMouseLeave = () => {
        setIsPaused(false)
        startProgressBar()
    }

    const expandVideo = (index: number) => {
        setExpandedVideo(index)
        document.body.classList.add("no-scroll")
        setIsPaused(true)
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }
    }

    const collapseVideo = () => {
        setExpandedVideo(null)
        document.body.classList.remove("no-scroll")
        setIsPaused(false)
        startProgressBar()
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current)
                }
                nextSlide()
            } else if (e.key === "ArrowLeft") {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current)
                }
                prevSlide()
            } else if (e.key === "Escape" && expandedVideo !== null) {
                collapseVideo()
            }
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (expandedVideo !== null && e.target instanceof Element && !e.target.closest(".small-video-container")) {
                collapseVideo()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("click", handleClickOutside)
        }
    }, [expandedVideo, currentSlide])

    return (
        <section
            id="Eventos"
            ref={carouselRef}
            className="timed-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="carousel-container">
                {slides.map((slide, index) => (
                    <div key={slide.id} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                        <div className="slide-bg" style={{ backgroundImage: `url(${slide.backgroundImage})` }}></div>
                        <div className="slide-content-wrapper">
                            <div className="text-content">
                                <h2>{slide.title}</h2>
                                <p className="subtitle">{slide.subtitle}</p>
                                <p className="description">{slide.description}</p>
                            </div>

                            <div className={`small-video-container ${expandedVideo === index ? "expanded" : ""}`}>
                                <video className="small-video" src={slide.videoSrc} controls></video>
                                <div className="carousel-video-controls">
                                    <button
                                        className="carousel-expand-btn"
                                        onClick={() => expandVideo(index)}
                                        aria-label="Expandir video"
                                    >
                                        <i className="fas fa-expand">⤢</i>
                                    </button>
                                    <button className="carousel-collapse-btn" onClick={collapseVideo} aria-label="Reducir video">
                                        <i className="fas fa-compress">⤡</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="carousel-navigation">
                <button className="nav-arrow prev-arrow" onClick={prevSlide} aria-label="Slide anterior">
                    &#10094;
                </button>
                <div className="slide-counter">
                    <span className="current-slide">{currentSlide + 1}</span>
                    <span className="separator">/</span>
                    <span className="total-slides">{totalSlides}</span>
                </div>
                <button className="nav-arrow next-arrow" onClick={nextSlide} aria-label="Siguiente slide">
                    &#10095;
                </button>
            </div>

            <div className="thumbnails-preview">
                <div className="thumbnails-list">
                    {slides.map((slide, index) => (
                        <div
                            key={`thumb-${slide.id}`}
                            className={`thumbnail ${index === currentSlide ? "active" : ""}`}
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                            onClick={() => handleThumbnailClick(index)}
                            role="button"
                            aria-label={`Ver evento ${index + 1}`}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    )
}
