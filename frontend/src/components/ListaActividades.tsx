import { useCategoriasStore } from '@/store/categoriasStore'
import { useColorStore } from '@/store/colorStore'
import Actividad from './Actividad'
import ActividadTemp from './ActividadTemp'

export default function ListaActividades({
  id,
  crearActividad,
  setCrearActividad,
  setAbrir,
}: {
  id: number
  crearActividad: boolean
  setCrearActividad: (value: boolean) => void
  setAbrir: (value: boolean) => void
}) {
  const color = useColorStore(state => state.colores[id])
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria?.id === id)
  )
  if (!categoria) return
  return (
    <ul
      className='flex flex-col divide-y divide-border/50 border-l-2 border-border rounded-lg bg-card/50'
      style={{ borderLeftColor: color || categoria.color }}
    >
      {categoria.actividades
        .filter(actividad => actividad.is_active)
        .map(actividad => (
          <li key={actividad.id}>
            <Actividad idCategoria={id} idActividad={actividad.id} />
          </li>
        ))}
      {crearActividad && (
        <li>
          <ActividadTemp
            setCrearActividad={setCrearActividad}
            id={id}
            setAbrir={setAbrir}
          />
        </li>
      )}
    </ul>
  )
}
