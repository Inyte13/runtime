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
    </section>
  )
}
