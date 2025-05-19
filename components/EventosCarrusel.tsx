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
            title: "Evento 1",
            subtitle: "Saca tu niño interior en la ingeniería",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis animi rem iure sunt eius ullam provident minima odit, esse atque numquam ipsum, enim similique molestias dolores dignissimos sint earum impedit? Iste, eveniet ratione! Quasi quos deserunt veritatis explicabo perspiciatis laudantium molestiae obcaecati, odit veniam facere nam ipsum commodi neque adipisci placeat fuga iusto porro ex laboriosam delectus quod ipsa quis?",
            backgroundImage: "/images/Enseñar.png",
            videoSrc: "/videos/viideo.mp4",
        },
        {
            id: 1,
            title: "Evento 2",
            subtitle: "Sí lo puedes imaginar lo puedes programar",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis animi rem iure sunt eius ullam provident minima odit, esse atque numquam ipsum, enim similique molestias dolores dignissimos sint earum impedit? Iste, eveniet ratione! Quasi quos deserunt veritatis explicabo perspiciatis laudantium molestiae obcaecati, odit veniam facere nam ipsum commodi neque adipisci placeat fuga iusto porro ex laboriosam delectus quod ipsa quis?",
            backgroundImage: "/images/FondoInicio.png",
            videoSrc: "/videos/viideo.mp4",
        },
        {
            id: 2,
            title: "Evento 3",
            subtitle: "Demuestra tus habilidades en programacion",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis animi rem iure sunt eius ullam provident minima odit, esse atque numquam ipsum, enim similique molestias dolores dignissimos sint earum impedit? Iste, eveniet ratione! Quasi quos deserunt veritatis explicabo perspiciatis laudantium molestiae obcaecati, odit veniam facere nam ipsum commodi neque adipisci placeat fuga iusto porro ex laboriosam delectus quod ipsa quis?",
            backgroundImage: "/images/zabbix.png",
            videoSrc: "/videos/viideo.mp4",
        },
        {
            id: 3,
            title: "Evento 4",
            subtitle: "Entrena tus habilidades para el mercado laboral",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis animi rem iure sunt eius ullam provident minima odit, esse atque numquam ipsum, enim similique molestias dolores dignissimos sint earum impedit? Iste, eveniet ratione! Quasi quos deserunt veritatis explicabo perspiciatis laudantium molestiae obcaecati, odit veniam facere nam ipsum commodi neque adipisci placeat fuga iusto porro ex laboriosam delectus quod ipsa quis?",
            backgroundImage: "/images/cisco.png",
            videoSrc: "/videos/viideo.mp4",
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
