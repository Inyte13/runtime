import { ActividadReadDetail, ActividadResumen } from "./Actividad"

export interface CategoriaCreate {
  nombre: string
  color?: string
}
export interface CategoriaRead {
  id: number
  nombre: string
  color: string
}
export interface CategoriaReadDetail extends CategoriaRead {
  actividades: ActividadReadDetail[]
}
export interface CategoriaResumen {
  id: number
  actividades: ActividadResumen[]
}
export interface CategoriaUpdate {
  nombre?: string
  color?: string
}