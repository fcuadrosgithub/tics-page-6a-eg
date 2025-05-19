import Image from "next/image"

export default function Alianzas() {
    const alianzas = [
        {
            logo: "/public/images/cisco.png",
            descripcion: "Empresa líder en networking y seguridad informática",
            url: "https://www.cisco.com",
        },
        {
            logo: "/images/huawei.png",
            descripcion: "Líder global en soluciones de telecomunicaciones",
            url: "https://www.huawei.com",
        },
        {
            logo: "/images/google.jpg",
            descripcion: "Empresa destacada por innovación en tecnologías web y cloud computing",
            url: "https://www.google.com",
        },
        {
            logo: "/images/zabbix.png",
            descripcion: "Solución de monitoreo de red de código abierto",
            url: "https://www.zabbix.com",
        },
        {
            logo: "/images/microsoft.png",
            descripcion: "Líder en software empresarial y soluciones de productividad",
            url: "https://www.microsoft.com",
        },
        {
            logo: "/images/Oracle.png",
            descripcion: "Especialistas en bases de datos y sistemas empresariales",
            url: "https://www.oracle.com",
        },
    ]

    return (
        <section id="Alianzas" className="alianzas-section">
            <div className="alianzas-bg-container">
                <div className="alianzas-bg"></div>
            </div>
            <div className="alianzas-container">
                <h2 className="alianzas-title">Empresas en convenio con ITSOEH</h2>
                <div className="banda-transportadora">
                    <div className="banda-contenedor">
                        {/* Items originales */}
                        {alianzas.map((alianza, index) => (
                            <a
                                href={alianza.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="banda-item"
                                key={`alianza-${index}`}
                                title={`Visitar sitio web de ${alianza.descripcion}`}
                            >
                                <div className="logo-container">
                                    <Image
                                        src={alianza.logo || "/placeholder.svg"}
                                        alt={`Logo ${index + 1}`}
                                        width={150}
                                        height={80}
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                </div>
                                <div className="item-descripcion">
                                    <p>{alianza.descripcion}</p>
                                    <p className="mt-2 text-xs font-bold">Click para visitar →</p>
                                </div>
                            </a>
                        ))}

                        {/* Items duplicados para efecto continuo */}
                        {alianzas.map((alianza, index) => (
                            <a
                                href={alianza.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="banda-item"
                                key={`alianza-duplicada-${index}`}
                                title={`Visitar sitio web de ${alianza.descripcion}`}
                            >
                                <div className="logo-container">
                                    <Image
                                        src={alianza.logo || "/placeholder.svg"}
                                        alt={`Logo ${index + 1}`}
                                        width={150}
                                        height={80}
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                </div>
                                <div className="item-descripcion">
                                    <p>{alianza.descripcion}</p>
                                    <p className="mt-2 text-xs font-bold">Click para visitar →</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
