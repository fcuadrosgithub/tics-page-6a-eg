import Image from "next/image"; // Asegúrate de importar Image

export default function ITICs() {
    return (
        <section id="ITICs" className="info-section">
            <div className="info-container">
                <div className="info-image">
                    {/* Usando el componente Image de Next.js */}
                    <Image
                        src="/images/ense.png" // La ruta es relativa al directorio 'public'
                        alt="enseñar"
                        width={500} // Define el ancho original de tu imagen
                        height={300} // Define el alto original de tu imagen
                        layout="responsive" // Esto hará que la imagen sea responsiva
                        objectFit="contain" // O "cover" dependiendo de cómo quieras que se ajuste
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
                        <li>Diseñan, implementan y administran redes de cómputo y comunicaciones, bajo estándares de seguridad de la información.</li>
                        <li>Desarrollan software basado en metodologías emergentes.</li>
                        <li>
                            Desempeñan funciones de auditoría en el campo de las Tecnologías de la Información y Comunicaciones.
                        </li>
                        <li>Participan en proyectos de TI o crea empresas, en el ámbito de las tecnologías de la información bajo un marco legal.</li>
                        
                    </ul>
                </div>
            </div>
        </section>
    );
}