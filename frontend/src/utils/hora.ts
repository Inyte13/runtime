import { BloqueRead } from '@/types/Bloque'

export function modificarHora(inicio: string, duracion: number): string {
  // Map number lo convierte a number
  const [hora, minutos] = inicio.split(':').map(Number)
  const totalMinutos = hora * 60 + minutos + duracion * 60

  const HH = String(Math.floor(totalMinutos / 60) % 24).padStart(2, '0')
  const MM = String(totalMinutos % 60).padStart(2, '0')
  return `${HH}:${MM}`
}

export function modificarHoras(
  bloques: BloqueRead[],
  indiceRef: number,
  diferencia: number
): BloqueRead[] {
  return bloques.map((bloque, i) => {
    if (i < indiceRef) return bloque
    return {
      ...bloque,
      hora: modificarHora(bloque.hora, diferencia),
      hora_fin: modificarHora(bloque.hora_fin, diferencia),
    }
  })
}
