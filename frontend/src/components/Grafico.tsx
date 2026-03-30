import { useColorStore } from '@/store/colorStore'
import { useCategoriasStore } from '@/store/categoriasStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { useDiasStore } from '@/store/diasStore'
import HoverDetalle from './HoverDetalle'

export default function Grafico({
  id,
  maxDuracion,
}: {
  id: number
  maxDuracion: number
}) {
  const categoriaResumen = useDiasStore(state =>
    state.diasResumen.find(dia => dia.fecha === fechaISO)
  )?.categorias.find(categoria => categoria.id === id)
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria?.id === id)
  )
  const color = useColorStore(state => state.colores[id])
  if (!categoriaResumen) return
  const duracionTotal = categoriaResumen.actividades.reduce(
    (sum, act) => sum + act.duracion,
    0
  )
  if (!categoria) return
  return (
        <ul
          className='min-h-1 h-2 flex gap-px group'
          style={{ width: `${(duracionTotal / maxDuracion) * 100}%` }}
        >
          {categoriaResumen.actividades.map(actividad => (
            <li
              className='h-full first:rounded-l-lg last:rounded-r-lg opacity-60 group-hover:opacity-100'
              key={actividad.id}
              style={{
                backgroundColor: color || categoria.color,
                width: `${(actividad.duracion / duracionTotal) * 100}%`,
              }}
            />
          ))}
        </ul>
        <header className='px-2.5 py-1.5 flex justify-between bg-primary rounded-t-lg text-primary-foreground font-medium text-base gap-x-2'>
          <div className='flex items-center gap-x-1.5'>
            <span
              className='rounded-full size-3'
              style={{ backgroundColor: color || categoria.color }}
            />
            <h4 className='capitalize italic truncate'>{categoria.nombre}</h4>
          </div>
          <span>{duracionTotal}h</span>
        </header>
  )
}
