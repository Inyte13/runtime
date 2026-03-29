import { create } from 'zustand'
import {
  createActividad,
  deleteActividad,
  updateActividad,
} from '../services/actividadService'
import { ActividadCreate, ActividadUpdate } from '../types/Actividad'
import { useColorStore } from './colorStore'
import {
  CategoriaCreate,
  CategoriaReadDetail,
  CategoriaUpdate,
} from '@/types/Categoria'
import {
  createCategoria,
  deleteCategoria,
  readCategoriasDetail,
  updateCategoria,
} from '@/services/categoriaService'

  // Si cambias el #A18072, cambialo en el backend (categoria.py) models y schemas
