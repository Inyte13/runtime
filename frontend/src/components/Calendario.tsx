import { useFechaStore } from '@/store/fechaStore'
import CalendarioDia from './CalendarioDia'
import { useEffect } from 'react'
import { useDiasStore } from '@/store/diasStore'
import { cn } from '@/lib/utils'

export default function Calendario() {
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
  const nroFilas = Math.ceil((nroDiaSemana + nroDias) / 7)
  const nroCeldas = nroFilas * 7

  const traerDiasResumen = useDiasStore(state => state.traerDiasResumen)
  useEffect(() => {
    traerDiasResumen()
  }, [fecha.getMonth(), fecha.getFullYear(), traerDiasResumen])

      <header className='grid grid-cols-7'>
        {semana.map(dia => (
          <div
            key={dia}
            className='text-center text-xs text-secondary-foreground py-2'
          >
            {dia}
          </div>
        ))}
      </header>
        {Array.from({ length: nroCeldas }).map((_, indice) => (
          <li
            key={indice}
            className={cn(
              'p-1 flex flex-col gap-y-2',
              'border-t border-l border-border/50 min-h-0',
              indice % 7 === 0 && 'border-l-0'
            )}
          >
            <CalendarioDia indice={indice} />
          </li>
    </section>
  )
}
