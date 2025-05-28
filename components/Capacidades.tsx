"use client";

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";

const capacities = [
    {
        id: "desarrollo-movil",
        name: "Desarrollo Móvil",
        description:
            "Los ingenieros en TICs con enfoque en desarrollo móvil crean aplicaciones para iOS y Android, utilizando frameworks como React Native, Flutter, Swift/Objective-C y Kotlin/Java. Se encargan del diseño de interfaz de usuario, la lógica de negocio y la integración con APIs para ofrecer experiencias fluidas y eficientes en dispositivos móviles.",
        videoUrl: "https://www.youtube.com/watch?v=ppEwuIR2Xc0", // ¡ACTUALIZA CON TUS IDs REALES!
    },
    {
        id: "desarrollo-web",
        name: "Desarrollo Web",
        description:
            "En desarrollo web, los ingenieros construyen sitios y aplicaciones web dinámicas y responsivas. Dominan lenguajes como JavaScript, HTML y CSS, junto con frameworks como React, Angular o Vue.js para el frontend, y Node.js, Python (Django/Flask) o PHP (Laravel) para el backend. Se enfocan en la experiencia de usuario, la seguridad y la escalabilidad.",
        videoUrl: "https://www.youtube.com/watch?v=dFhXYlMeTSA", // ¡ACTUALIZA CON TUS IDs REALES!
    },
    {
        id: "administracion-redes",
        name: "Administración de Redes",
        description:
            "La administración de redes implica el diseño, implementación y mantenimiento de infraestructuras de red. Los ingenieros en TICs en este campo gestionan routers, switches, firewalls y servidores, asegurando la conectividad, seguridad y rendimiento de la red. Son expertos en protocolos de red, monitoreo y resolución de problemas para garantizar la operación continua.",
        videoUrl: "https://www.youtube.com/watch?v=huN-3rOrKSA", // ¡ACTUALIZA CON TUS IDs REALES!
    },
    {
        id: "seguridad-informatica",
        name: "Seguridad Informática",
        description:
            "Los especialistas en seguridad informática protegen sistemas, redes y datos de amenazas cibernéticas. Realizan análisis de vulnerabilidades, implementan medidas de seguridad, gestionan incidentes y desarrollan políticas de seguridad. Su conocimiento abarca criptografía, forense digital, seguridad en la nube y cumplimiento normativo para salvaguardar la información crítica.",
        videoUrl: "https://www.youtube.com/watch?v=JXDUKotmsWQ", // ¡ACTUALIZA CON TUS IDs REALES!
    },
    {
        id: "ciencia-datos",
        name: "Ciencia de Datos e IA",
        description:
            "En ciencia de datos e inteligencia artificial, los ingenieros utilizan técnicas estadísticas y algoritmos de aprendizaje automático para extraer información valiosa de grandes conjuntos de datos. Desarrollan modelos predictivos, sistemas de recomendación y soluciones de IA, aplicando herramientas como Python (Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch) para la toma de decisiones basada en datos.",
        videoUrl: "https://www.youtube.com/watch?v=BtswSZRpN7M", // ¡ACTUALIZA CON TUS IDs REALES!
    },
];

const Capacidades = () => {
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [hasAnimatedButtons, setHasAnimatedButtons] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimatedButtons) {
                    setHasAnimatedButtons(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById("capacidades-section");
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, [hasAnimatedButtons]);

    const getYouTubeVideoId = (url) => {
        // Expresión regular mejorada para extraer el ID de video de YouTube
        const regExp =
            /^.*(?:youtu\.be\/|v\/|e\/|watch\?v=|\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    };

    const opts = {
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <section id="capacidades-section" className="capacidades-section">
            <div className="capacidades-container">
                {/* Lado Izquierdo: Botones de Capacidades */}
                <div className="capacidades-buttons-wrapper">
                    <h2 className="capacidades-main-title">CAPACIDADES DE UN INGENIERO EN TICS</h2> {/* Título principal */}
                    <div className="capacidades-button-list">
                        {capacities.map((capacity, index) => (
                            <motion.button
                                key={capacity.id}
                                className={`capacidad-button ${selectedCapacity?.id === capacity.id ? 'active' : ''} ${hasAnimatedButtons ? 'animate-slide-in' : ''}`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                                onClick={() => setSelectedCapacity(capacity)}
                            >
                                {capacity.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Lado Derecho: Contenido Dinámico (Video y Texto) */}
                <div className="capacidades-content-wrapper">
                    <AnimatePresence mode="wait">
                        {selectedCapacity ? (
                            <motion.div
                                key={selectedCapacity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="capacidad-info animate-fade-in"
                            >
                                {selectedCapacity.videoUrl && getYouTubeVideoId(selectedCapacity.videoUrl) && (
                                    <div className="video-responsive-container">
                                        <YouTube
                                            videoId={getYouTubeVideoId(selectedCapacity.videoUrl)}
                                            opts={opts}
                                            className="youtube-player"
                                        />
                                    </div>
                                )}
                                <h3 className="capacidad-sub-title">{selectedCapacity.name}</h3>
                                <p className="capacidad-description">
                                    {selectedCapacity.description}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="initial-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: hasAnimatedButtons ? capacities.length * 0.2 + 0.3 : 0 }}
                                className="capacidad-info animate-fade-in"
                            >
                                <h3 className="capacidad-sub-title">
                                    Conoce más sobre las capacidades de un Ingeniero en TICs
                                </h3>
                                <p className="capacidad-description">
                                    Dando clic en alguna de las capacidades.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Capacidades;