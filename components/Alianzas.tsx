import Image from "next/image"; // Asegúrate de importar Image
import Link from "next/link"; // Importa Link para navegación en Next.js

export default function Alianzas() {
    const alianzas = [
        {
            logo: "/images/cisco.png",
            descripcion: "Empresa líder en networking y seguridad informática",
            url: "https://www.cisco.com/c/es_mx/index.html", // ¡Reemplaza con la URL real de Cisco!
        },
        {
            logo: "/images/huawei.png",
            descripcion: "Líder global en soluciones de telecomunicaciones",
            url: "https://www.huawei.com/mx/", // ¡Reemplaza con la URL real de Huawei!
        },
        {
            logo: "/images/google.jpg",
            descripcion: "Empresa destacada por innovación en tecnologías web y cloud computing",
            url: "https://about.google/", // ¡Reemplaza con la URL real de Google!
        },
        {
            logo: "/images/zabbix.png",
            descripcion: "Solución de monitoreo de red de código abierto",
            url: "https://www.zabbix.com/", // ¡Reemplaza con la URL real de Zabbix!
        },
        {
            logo: "/images/microsoft.png",
            descripcion: "Líder en software empresarial y soluciones de productividad",
            url: "https://www.microsoft.com/es-mx/", // ¡Reemplaza con la URL real de Microsoft!
        },
        {
            logo: "/images/oracle.png",
            descripcion: "Especialistas en bases de datos y sistemas empresariales",
            url: "https://www.oracle.com/mx/index.html", // ¡Reemplaza con la URL real de Oracle!
        },
    ];

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
                            <div className="banda-item" key={`alianza-${index}`}>
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
                                    {/* Botón "Saber Más" - ¡MODIFICADO PARA NEXT.JS 13+! */}
                                    {alianza.url && ( // Solo renderiza el botón si hay una URL
                                        <Link
                                            href={alianza.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="saber-mas-btn"
                                        >
                                            Saber Más
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Items duplicados para efecto continuo */}
                        {alianzas.map((alianza, index) => (
                            <div className="banda-item" key={`alianza-duplicada-${index}`}>
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
                                    {/* Botón "Saber Más" en los duplicados - ¡MODIFICADO PARA NEXT.JS 13+! */}
                                    {alianza.url && (
                                        <Link
                                            href={alianza.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="saber-mas-btn"
                                        >
                                            Saber Más
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}