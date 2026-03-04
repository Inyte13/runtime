export interface ActividadCreate {
  nombre: string
  color?: string
  is_active?: boolean
}

export interface ActividadRead {
  id: number
  nombre: string
  color: string
  is_active: boolean
}

export interface ActividadUpdate {
  nombre?: string
  color?: string
  is_active?: boolean
}
