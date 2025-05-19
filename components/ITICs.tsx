import Image from "next/image"

export default function ITICs() {
    return (
        <section id="ITICs" className="info-section">
            <div className="info-container">
                <div className="info-image">
                    <Image
                        src="/images/Enseñar.png"
                        alt="ITICs"
                        width={500}
                        height={300}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <div className="info-content">
                    <h2>Objetivos educativos</h2>
                    <p>
                        Formar profesionistas capaces de integrar y administrar tecnologías de la información y comunicaciones, que
                        contribuyan a la productividad y el logro de los objetivos estratégicos de las organizaciones;
                        caracterizándose por ser líderes, críticos, competentes, éticos y con visión empresarial, comprometidos con
                        el desarrollo sustentable.
                    </p>

                    <ul className="perfil-list">
                        <li>Diseñar, implementar y administrar redes de cómputo y comunicaciones</li>
                        <li>Integrar las diferentes arquitecturas de hardware y administrar plataformas de software</li>
                        <li>
                            Integrar soluciones basadas en sistemas de comunicaciones que involucren tecnologías actuales y emergentes
                        </li>
                        <li>Desempeñar funciones de consultoría y auditoría</li>
                        <li>Utilizar tecnologías y herramientas actuales y emergentes</li>
                        <li>
                            Desarrollar e implementar sistemas de información para el control y la toma de decisiones utilizando
                            metodologías basadas en estándares internacionales
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
