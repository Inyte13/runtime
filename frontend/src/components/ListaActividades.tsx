import { useCategoriasStore } from '@/store/categoriasStore'
import { useColorStore } from '@/store/colorStore'
import Actividad from './Actividad'
import ActividadTemp from './ActividadTemp'

export default function ListaActividades({
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria?.id === id)
  )
  if (!categoria) return
  return (
    <ul
      className='flex flex-col divide-y divide-border/50 border-l-2 border-border rounded-lg bg-card/50'
      style={{ borderLeftColor: color || categoria.color }}
    >
      {categoria.actividades.map(actividad => (
      ))}
          />
      )}
    </ul>
  )
}
