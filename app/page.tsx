"use client"

import Header from "@/components/Header"
import Inicio from "@/components/Inicio"
import ITICs from "@/components/ITICs"
import Capacidades from "@/components/Capacidades"
import Alianzas from "@/components/Alianzas"
import MapaCurricular from "@/components/MapaCurricular"
import EventosCarrusel from "@/components/EventosCarrusel"
import LogrosCarrusel from "@/components/LogrosCarrusel"
import ScrollToTop from "@/components/ScrollToTop"

export default function Home() {
  return (
    <main>
      <Header />
      <Inicio />
      <ITICs />
      <Capacidades />
      <Alianzas />
      <MapaCurricular />
      <EventosCarrusel />
      <LogrosCarrusel />
      <ScrollToTop />
    </main>
  )
}
