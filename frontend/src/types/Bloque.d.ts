export interface BloqueCreate {
  duracion?: number // default: 0.5 en el backend
  descripcion?: string | null
  fecha: string
  id_actividad?: number
  id_ref?: number
}

export interface BloqueRead {
  id: number
  hora: string
  hora_fin: string
  duracion: number
  descripcion: string | null
  id_actividad: number
}

export interface BloqueUpdate {
  duracion?: number
  descripcion?: string | null
  id_actividad?: number
}
