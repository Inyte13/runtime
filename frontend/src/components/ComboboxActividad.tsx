import { useCategoriasStore } from '@/store/categoriasStore'
import { ComboboxItem } from './ui/combobox'
import { useColorStore } from '@/store/colorStore'

export default function ComboboxActividad({
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria.id === idCategoria)
  )
  const actividad = useCategoriasStore(state =>
    state.categoriasDetail
      .find(categoria => categoria.id === idCategoria)
      ?.actividades.find(actividad => actividad.id === idActividad)
  )
  const color = useColorStore(
    state => state.colores[idCategoria] 
  )
  if (!actividad || !categoria) return
  return (
    <ComboboxItem
      key={actividad.id}
      value={actividad.id.toString()}
      disabled={!actividad.is_active}
      className='py-1.25 border-l border-border rounded-l-none last:rounded-bl nth-[2]:rounded-tl pl-3 '
      style={{ borderLeftColor: color || categoria.color}}
    >
      <span className='capitalize truncate'>{actividad.nombre}</span>
    </ComboboxItem>
  )
}
