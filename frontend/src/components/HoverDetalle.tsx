import { useCategoriasStore } from '@/store/categoriasStore'
import { useDiasStore } from '@/store/diasStore'

export default function HoverDetalle({
  fechaISO,
  idActividad,
  idCategoria,
}: {
  fechaISO: string
  idActividad: number
  idCategoria: number
}) {
  const actividad = useCategoriasStore(state =>
    state.categoriasDetail
      .find(categoria => categoria.id === idCategoria)
      ?.actividades.find(actividad => actividad.id === idActividad)
  )
  const actividadResumen = useDiasStore(state =>
    state.diasResumen.find(dia => dia.fecha === fechaISO)
  )
    ?.categorias.find(categoria => categoria.id === idCategoria)
    ?.actividades.find(actividad => actividad.id === idActividad)

  if (!actividad || !actividadResumen) return

  return (
    <li className='flex flex-col justify-center'>
      <div className='flex justify-between gap-x-1.5 text-sm'>
        <span className='truncate'>{actividad.nombre}</span>
        <div className='flex justify-center items-center bg-secondary py-0.5 px-1.5 rounded-md'>
          <span>{actividadResumen.duracion}h</span>
        </div>
      </div>
      {actividadResumen.descripciones &&
        actividadResumen.descripciones.length > 0 && (
          <ul>
            {actividadResumen.descripciones.map((descripcion, i) => (
              <li className='text-secondary-foreground truncate normal-case' key={i}>
                {descripcion}
              </li>
            ))}
          </ul>
        )}
    </li>
  )
}
