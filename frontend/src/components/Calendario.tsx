import { useFechaStore } from '@/store/fechaStore'
import CalendarioDia from './CalendarioDia'
import { useEffect } from 'react'
import { useDiasStore } from '@/store/diasStore'
import { cn } from '@/lib/utils'

export default function Calendario() {
  const fecha = useFechaStore(state => state.fecha)


  const traerDiasResumen = useDiasStore(state => state.traerDiasResumen)
  useEffect(() => {
    traerDiasResumen()
  }, [fecha.getMonth(), fecha.getFullYear(), traerDiasResumen])

          </div>
    </section>
  )
}
