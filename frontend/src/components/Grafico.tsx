import { useColorStore } from '@/store/colorStore'
import { useCategoriasStore } from '@/store/categoriasStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { useDiasStore } from '@/store/diasStore'
import HoverDetalle from './HoverDetalle'

export default function Grafico({
  id,
  duracion,
  maxDuracion,
  nombre,
}: {
  id: number
  duracion: number
  maxDuracion: number
  nombre: string
}) {
  const altura = (duracion / maxDuracion) * 100
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
    <div className='relative h-full flex items-end'>
      <div
        className='w-1.5 rounded-t-lg peer opacity-50 hover:opacity-100'
        style={{ backgroundColor: color, height: `${altura}%` }}
      />
      <div className='absolute left-0 top-full hidden peer-hover:block bg-popover border border-border rounded-lg px-2 py-1.5 text-xs z-10 whitespace-nowrap'>
        <span className=' text-foreground capitalize'>{nombre}</span>
        <span className='text-primary ml-1'>{duracion}h</span>
      </div>
    </div>
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
