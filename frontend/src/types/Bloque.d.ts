export interface BloqueCreate {
  duracion?: number
  descripcion?: string | null
  id_actividad?: number
  fecha: string
}

export interface BloqueRead {
  id: number
  hora: string
  descripcion: string | null
  actividad: ActividadRead
  duracion: number
  hora_fin: string
}

export interface BloqueUpdate {
  descripcion?: string | null
  id_actividad?: number
  duracion?: number
}
