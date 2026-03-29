import { useColorStore } from '@/store/colorStore'
import { useCategoriasStore } from '@/store/categoriasStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { useDiasStore } from '@/store/diasStore'
import HoverDetalle from './HoverDetalle'

export default function Grafico({
  id,
  colorDefault,
  duracion,
  maxDuracion,
  nombre,
}: {
  id: number
  colorDefault: string
  duracion: number
  maxDuracion: number
  nombre: string
}) {
  const color = useColorStore(state => state.colores[id] || colorDefault)
  const altura = (duracion / maxDuracion) * 100
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
  )
}
