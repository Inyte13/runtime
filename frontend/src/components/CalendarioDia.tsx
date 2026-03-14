import { useDiasStore } from '@/store/diasStore'
import { useFechaStore } from '@/store/fechaStore'
import { formatFechaISO } from '@/utils/formatDate'
import { Button } from './ui/button'
import { useActividadesStore } from '@/store/actividadesStore'
import Grafico from './Grafico'

export default function CalendarioDia({ indice }: { indice: number }) {
  const diasResumen = useDiasStore(state => state.diasResumen)
  const fecha = useFechaStore(state => state.fecha)
  const actividades = useActividadesStore(state => state.actividadesDetail)
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

  const nroDiaMes = indice - nroDiaSemana + 1
  const existeDia = 1 <= nroDiaMes && nroDiaMes <= nroDias
  if (!existeDia) return null

  const fechaCelda = new Date(fecha.getFullYear(), fecha.getMonth(), nroDiaMes)
  const fechaISO = formatFechaISO(fechaCelda)

  const diaResumen = diasResumen.find(dia => dia.fecha === fechaISO)

  const bloquesFiltrados =
    diaResumen?.bloques.filter(b => b.id_actividad !== 1) ?? []

  const maxDuracion =
    bloquesFiltrados.length > 0
      ? Math.max(...bloquesFiltrados.map(b => b.duracion))
      : 1
  return (
    <>
      <div
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
          {nroDiaMes}
        </Button>
        {diaResumen?.titulo && (
          <span className='text-sm text-muted-foreground truncate px-0.5 w-full italic cursor-pointer'>
            {diaResumen.titulo}
          </span>
        )}
      </div>
      <div className='flex items-end justify-center w-full min-h-15'>
        {diaResumen?.bloques
          .filter(b => b.id_actividad !== 1)
          .map(bloque => {
            const actividad = actividades.find(
              actividad => actividad.id === bloque.id_actividad
            )!

            return (
              <Grafico
                key={bloque.id_actividad}
                id={bloque.id_actividad}
                colorDefault={actividad.color}
                duracion={bloque.duracion}
                maxDuracion={maxDuracion}
                nombre={actividad.nombre}
              />
            )
          })}
      </div>
    </>
  )
}
