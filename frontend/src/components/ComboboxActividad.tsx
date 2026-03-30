import { useCategoriasStore } from '@/store/categoriasStore'
import { ComboboxItem } from './ui/combobox'
import { useColorStore } from '@/store/colorStore'

export default function ComboboxActividad({
  const actividad = useCategoriasStore(state =>
    state.categoriasDetail
      .find(categoria => categoria.id === idCategoria)
      ?.actividades.find(actividad => actividad.id === idActividad)
  )
  return (
    <ComboboxItem
      key={actividad.id}
      value={actividad.id.toString()}
      disabled={!actividad.is_active}
      <span className='capitalize truncate'>{actividad.nombre}</span>
    </ComboboxItem>
  )
}
