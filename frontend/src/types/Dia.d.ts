import { BloqueRead } from './Bloque'
import { CategoriaResumen } from './Categoria'

export enum Estado {
  MAL = 1,
  NORMAL = 2,
  BIEN = 3,
}

export interface DiaRead {
  fecha: string
  titulo: string | null
  estado: Estado | null
}

export interface DiaReadDetail extends DiaRead {
  bloques: BloqueRead[]
}

export interface DiaResumen extends DiaRead {
  categorias: CategoriaResumen[]
}

export interface DiaUpdate {
  titulo?: string | null
  estado?: Estado | null
}
