"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface Capacidad {
    id: number
    titulo: string
    descripcion: string
    videoUrl: string
}

export default function Capacidades() {
    const [capacidadSeleccionada, setCapacidadSeleccionada] = useState<Capacidad | null>(null)
    const [animacionCompletada, setAnimacionCompletada] = useState(false)
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    })

    const capacidades: Capacidad[] = [
        {
            id: 1,
            titulo: "Desarrollo móvil",
            descripcion:
                "Los ingenieros en TIC especializados en desarrollo móvil crean aplicaciones para dispositivos iOS y Android utilizando tecnologías como React Native, Flutter, Swift o Kotlin. Diseñan interfaces intuitivas, implementan funcionalidades avanzadas como geolocalización, notificaciones push y sincronización offline, y optimizan el rendimiento para diferentes dispositivos. Su trabajo es fundamental para conectar a usuarios con servicios digitales a través de experiencias móviles fluidas y accesibles.",
            videoUrl: "https://www.youtube.com/embed/roDz8mMvbIg",
        },
        {
            id: 2,
            titulo: "Desarrollo web",
            descripcion:
                "Los desarrolladores web en el campo de las TIC crean y mantienen sitios y aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, React, Angular o Vue.js para el frontend, y Node.js, Python, PHP o Java para el backend. Implementan arquitecturas escalables, bases de datos eficientes, y aseguran la compatibilidad cross-browser. Su trabajo combina diseño visual con funcionalidad técnica para crear experiencias web responsivas, accesibles y seguras que satisfagan las necesidades de usuarios y negocios.",
            videoUrl: "https://www.youtube.com/embed/VufN46voCY8",
        },
        {
            id: 3,
            titulo: "Desarrollo electrónico",
            descripcion:
                "Los especialistas en desarrollo electrónico dentro de las TIC diseñan y construyen sistemas hardware que integran componentes electrónicos con software. Trabajan con microcontroladores, sensores, actuadores y circuitos integrados para crear dispositivos IoT, sistemas embebidos y soluciones de automatización. Dominan lenguajes como C/C++ para programación a bajo nivel, diseñan PCBs, y realizan pruebas de rendimiento y fiabilidad. Su trabajo es esencial para la creación de tecnologías físicas que interactúan con el mundo digital.",
            videoUrl: "https://www.youtube.com/embed/MCgR_NFl8QI",
        },
        {
            id: 4,
            titulo: "Administración de redes",
            descripcion:
                "Los administradores de redes en TIC diseñan, implementan y mantienen la infraestructura de comunicaciones que conecta sistemas y usuarios. Configuran y gestionan routers, switches, firewalls y servidores, implementan políticas de seguridad, monitorean el rendimiento y solucionan problemas de conectividad. Trabajan con tecnologías como Cisco, Juniper, protocolos TCP/IP, VLANs y VPNs. Su labor es crucial para garantizar comunicaciones seguras, estables y eficientes que soporten las operaciones digitales de las organizaciones.",
            videoUrl: "https://www.youtube.com/embed/La0qoK8hxKM",
        },
        {
            id: 5,
            titulo: "Habilidades de IoT",
            descripcion:
                "Los especialistas en Internet de las Cosas (IoT) combinan conocimientos de hardware, software y redes para crear ecosistemas de dispositivos conectados. Trabajan con sensores, actuadores, microcontroladores como Arduino o ESP32, y plataformas cloud como AWS IoT o Azure IoT. Desarrollan sistemas que recopilan, procesan y analizan datos en tiempo real para automatizar procesos, monitorear entornos y facilitar la toma de decisiones. Su trabajo está transformando industrias como manufactura, agricultura, salud y ciudades inteligentes.",
            videoUrl: "https://www.youtube.com/embed/LlhmzVL5bm8",
        },
        {
            id: 6,
            titulo: "Ciber Seguridad",
            descripcion:
                "Los profesionales de ciberseguridad protegen sistemas, redes y datos contra amenazas digitales. Implementan controles de seguridad, realizan evaluaciones de vulnerabilidades y pruebas de penetración, desarrollan políticas de seguridad y responden a incidentes. Utilizan herramientas como firewalls, IDS/IPS, analizadores de tráfico y software de encriptación. Su conocimiento abarca desde seguridad de redes y aplicaciones hasta forense digital y gestión de riesgos, siendo fundamentales para proteger la información sensible y mantener la confianza en los sistemas digitales.",
            videoUrl: "https://www.youtube.com/embed/aNDRn9OsAkk",
        },
    ]

    const seleccionarCapacidad = (capacidad: Capacidad) => {
        setCapacidadSeleccionada(capacidad)
    }

    useEffect(() => {
        if (inView && !animacionCompletada) {
            const timer = setTimeout(
                () => {
                    setAnimacionCompletada(true)
                },
                capacidades.length * 500 + 500,
            ) // Tiempo total de las animaciones

            return () => clearTimeout(timer)
        }
    }, [inView, animacionCompletada, capacidades.length])

    return (
        <section id="Capacidades" className="capacidades-section py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Capacidades de un Ingeniero en TICs</h2>

                <div className="flex flex-col lg:flex-row gap-8" ref={ref}>
                    {/* Lista de capacidades */}
                    <div className={`lg:w-1/3 ${capacidadSeleccionada ? "lg:w-1/4" : "lg:w-full"}`}>
                        <ul className="space-y-4">
                            {capacidades.map((capacidad, index) => (
                                <li
                                    key={capacidad.id}
                                    className={`
                    capacidad-item
                    p-4 border rounded-lg shadow-sm cursor-pointer
                    transition-all duration-500 ease-in-out
                    ${inView ? `animate-slide-in` : "opacity-0 -translate-x-full"}
                    ${capacidadSeleccionada && capacidadSeleccionada.id === capacidad.id ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"}
                  `}
                                    style={{
                                        animationDelay: `${index * 300}ms`,
                                        animationFillMode: "forwards",
                                    }}
                                    onClick={() => seleccionarCapacidad(capacidad)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{capacidad.titulo}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contenido de la capacidad seleccionada */}
                    {capacidadSeleccionada && (
                        <>
                            {/* Descripción */}
                            <div className="lg:w-1/3 animate-fade-in">
                                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                                    <h3 className="text-xl font-bold mb-4 text-blue-600">{capacidadSeleccionada.titulo}</h3>
                                    <p className="text-gray-700 leading-relaxed">{capacidadSeleccionada.descripcion}</p>
                                </div>
                            </div>

                            {/* Video */}
                            <div className="lg:w-1/3 animate-fade-in">
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src={capacidadSeleccionada.videoUrl}
                                        title={`Video sobre ${capacidadSeleccionada.titulo}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mensaje inicial cuando no hay selección */}
                    {!capacidadSeleccionada && animacionCompletada && (
                        <div className="lg:w-2/3 flex items-center justify-center animate-fade-in">
                            <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-bold mb-4 text-blue-600">Explora nuestras capacidades</h3>
                                <p className="text-gray-700">
                                    Selecciona una capacidad de la lista para conocer más detalles y ver un video relacionado.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
