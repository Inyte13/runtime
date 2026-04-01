import { useDiasStore } from '@/store/diasStore'
import { useFechaStore } from '@/store/fechaStore'
import { formatFechaISO } from '@/utils/formatDate'
import { Button } from './ui/button'
import Grafico from './Grafico'

export default function CalendarioDia({ indice }: { indice: number }) {
  const dias = useDiasStore(state => state.diasResumen)
  const fecha = useFechaStore(state => state.fecha)
  const setFecha = useFechaStore(state => state.setFecha)

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

  const nroDia = indice - nroDiaSemana + 1

  // Para cortar si no pertene a los dias del mes
  const existeDia = 1 <= nroDia && nroDia <= nroDias
  if (!existeDia) return null

  const fechaCelda = new Date(fecha.getFullYear(), fecha.getMonth(), nroDia)
  const fechaISO = formatFechaISO(fechaCelda)
  const dia = dias.find(dia => dia.fecha === fechaISO)

  const maxDuracion = dia
    ? Math.max(
        ...dia.categorias.map(categoria =>
          categoria.actividades.reduce((sum, act) => sum + act.duracion, 0)
        )
      )
    : 0
  return (
    <>
      <header
        className='flex items-center gap-x-1'
        onClick={() => setFecha(fechaCelda)}
      >
        <Button
          variant={
            fechaCelda.toDateString() === fecha.toDateString()
              ? 'primary'
              : 'ghost'
          }
          className='rounded-full text-xs'
          size='icon-xs'
        >
          {nroDia}
        </Button>
        {dia?.titulo && (
          <span className='text-sm text-muted-foreground truncate px-0.5 w-full italic cursor-pointer'>
            {dia.titulo}
          </span>
        )}
      </header>
      {dia && (
        <div
          data-slot='wrapper'
          className='flex items-start w-full flex-col gap-px px-4 min-h-0 mt-auto'
        >
          {dia.categorias.map(categoria => (
            <Grafico
              key={categoria.id}
              id={categoria.id}
              fechaISO={fechaISO}
              maxDuracion={maxDuracion}
            />
          ))}
        </div>
      )}
    </>
  )
}
