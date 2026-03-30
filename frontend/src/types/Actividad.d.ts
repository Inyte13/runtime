export interface ActividadCreate {
  nombre: string
  id_categoria: number
}

export interface ActividadRead {
  id: number
  nombre: string
  is_active: boolean
}

export interface ActividadReadDetail extends ActividadRead {
  tiene_bloques: boolean
}

export interface ActividadResumen {
  id: number
  duracion: number
  descripciones: string[]
}
export interface ActividadUpdate {
  nombre?: string
  is_active?: boolean
}
