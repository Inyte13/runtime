import { ActividadResumen } from '@/types/Actividad'
import { CategoriaReadDetail, CategoriaResumen } from '@/types/Categoria'
import { DiaReadDetail, DiaResumen } from '@/types/Dia'

export function resumenDia(diaDetail: DiaReadDetail): DiaResumen {
  const resumen: Record<number, BloqueResumen> = {}

  for (const bloque of diaDetail.bloques) {
    const { id_actividad, descripcion, duracion } = bloque

    if (!resumen[id_actividad]) {
      resumen[id_actividad] = {
        id_actividad,
        duracion,
        descripciones: descripcion ? [descripcion] : [],
      }
    } else {
      resumen[id_actividad].duracion += duracion
      if (descripcion) resumen[id_actividad].descripciones.push(descripcion)
    }
  }
  return {
    fecha: diaDetail.fecha,
    titulo: diaDetail.titulo,
    estado: diaDetail.estado,
    bloques: Object.values(resumen),  
  }
}