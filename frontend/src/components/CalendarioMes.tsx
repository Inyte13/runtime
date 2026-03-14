import { useFechaStore } from '@/store/fechaStore'
import CalendarioDia from './CalendarioDia'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useDiasStore } from '@/store/diasStore'

export default function CalendarioMes() {
  const semana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const fecha = useFechaStore(state => state.fecha)
  // El nro (semana) cuando Domingo = 0
  const nroDiaSemanaGregoriano = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    1
  ).getDay()
  // El nro (semana) cuando Lunes = 0
  const nroDiaSemana = (nroDiaSemanaGregoriano + 6) % 7
  const nroDias = new Date(
    fecha.getFullYear(),
    fecha.getMonth() + 1,
    0
  ).getDate()

  // Renderizamos siempre redondeando hacia arriba
  const nroCeldas = Math.ceil((nroDiaSemana + nroDias) / 7) * 7
  
  const traerDiasMes = useDiasStore(state => state.traerDiasMes)
  useEffect(() => {
    traerDiasMes()
  }, [fecha.getMonth(), fecha.getFullYear(), traerDiasMes])

  return (
    <section
      className={cn(
        'flex flex-col h-full bg-card',
        'rounded-lg border border-border'
      )}
    >
      <header className='grid grid-cols-7 border-border'>
        {semana.map(dia => (
          <div
            key={dia}
            className='text-center text-xs text-secondary-foreground py-2'
          >
            {dia}
          </div>
        ))}
      </header>
      <ol className='grid grid-cols-7 flex-1 min-h-0'>
        {Array.from({ length: nroCeldas }).map((_, indice) => (
          <li
            key={indice}
            className={cn(
              'p-1 pb-0 flex flex-col gap-y-2',
              'border-t border-l border-border/50',
              indice % 7 === 0 && 'border-l-0'
            )}
          >
            <CalendarioDia indice={indice} />
          </li>
        ))}
      </ol>
    </section>
  )
}
