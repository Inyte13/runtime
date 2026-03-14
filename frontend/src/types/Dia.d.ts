import { BloqueRead, BloqueResumen } from './Bloque'

export enum Estado {
  MAL = 1,
  NORMAL = 2,
  BIEN = 3,
}

export interface DiaRead {
  titulo: string | null
  estado: Estado | null
  fecha: string
}

export interface DiaReadDetail extends DiaRead {
  bloques: BloqueRead[]
}

export interface DiaResumen extends DiaRead {
  bloques: BloqueResumen[]
}

export interface DiaUpdate {
  titulo?: string | null
  estado?: Estado | null
}
