import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './ui/button'
import { memo } from 'react'
import useDuracionBloque from '@/hooks/useDuracionBloque'
import { useDiasStore } from '@/store/diasStore'


export default memo(function Duracion({
  duracion,
  manejarDuracion,
}: {
  duracion: number
  manejarDuracion: (newDuracion: number) => void
}) {
  const nextTime = () => manejarDuracion(duracion + 0.5)
  const prevTime = () => manejarDuracion(Math.max(0, duracion - 0.5))
  return (
    <div className='flex mr-5 justify-center items-center'>
      <span className='text-3xl font-extralight text-card-foreground'>
        {duracion}h
      </span>
      <div className='flex flex-col '>
        <Button
          size='icon-xs'
          onClick={prevTime}
          // TODO: Deberia ser el mínimo múltiplo que elija el usuario ejm(0.25, 0.5, 1)
          disabled={duracion === 0.5}
          variant='ghost'
        >
          <ChevronUp />
        </Button>
        <Button onClick={nextTime} size='icon-xs' variant='ghost'>
          <ChevronDown />
        </Button>
      </div>
    </div>
  )
})
