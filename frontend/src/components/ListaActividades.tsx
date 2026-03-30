import { useCategoriasStore } from '@/store/categoriasStore'
import { useColorStore } from '@/store/colorStore'
import Actividad from './Actividad'
import ActividadTemp from './ActividadTemp'

export default function ListaActividades() {
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria?.id === id)
  )
  if (!categoria) return
  return (
      {categoria.actividades.map(actividad => (
      ))}
          />
  )
}
