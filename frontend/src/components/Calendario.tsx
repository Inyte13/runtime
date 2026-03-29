import { useFechaStore } from '@/store/fechaStore'
import CalendarioDia from './CalendarioDia'
import { useEffect } from 'react'
import { useDiasStore } from '@/store/diasStore'
import { cn } from '@/lib/utils'

export default function Calendario() {
  const { prevDia, nextDia, irHoy, prevMes, nextMes } = useFechaStore()
  const fecha = useFechaStore(state => state.fecha)
  const fechaTitle = formatFechaTitle(fecha)
  const traerDiasMes = useDiasStore(state => state.traerDiasMes)
  const isSmall = useMediaQuery(1300)
  return (
    <section className='p-4 h-full min-w-190.5 flex flex-col'>
      <Tabs
        defaultValue='mes'
        onValueChange={value => {
          if (value === 'mes') traerDiasMes()
        }}
        className='flex flex-col flex-1 min-h-0 gap-y-3'
      >
        <header className='flex gap-x-2 justify-between items-center'>
          {isSmall && (
            <Sheet>
              <SheetTrigger asChild>
                <Button size='icon-sm' variant='ghost'>
                  <PanelLeft />
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='border-none data-[side=left]:w-60'
                showCloseButton={false}
              >
                <ListaActividades />
              </SheetContent>
            </Sheet>
          )}

          <TabsList>
            <TabsTrigger value='mes' className='flex gap-1'>
              <CalendarDays className='size-3.5' />
              Mes
            </TabsTrigger>
            <TabsTrigger value='semana' className='flex gap-1'>
              <Columns3 className='size-3.5' />
              Semana
            </TabsTrigger>
          </TabsList>

          <div className='flex gap-2 items-center justify-between flex-1'>
            <Button
              size='icon'
              variant='ghost'
              className='rounded-full'
              onClick={prevMes}
            >
              <ChevronLeft />
            </Button>
            <h2 className='text-3xl font-semibold'>{fechaTitle}</h2>
            <Button
              size='icon'
              variant='ghost'
              className='rounded-full'
              onClick={nextMes}
            >
              <ChevronRight />
            </Button>
          </div>

          <div className='flex items-center gap-x-1'>
            <Button
              size='icon'
              variant='secondary'
              className='rounded-full'
              onClick={prevDia}
            >
              <ChevronLeft />
            </Button>
            <Button variant='secondary' onClick={irHoy}>
              Hoy
            </Button>
            <Button
              size='icon'
              variant='secondary'
              className='rounded-full'
              onClick={nextDia}
            >
              <ChevronRight />
            </Button>
          </div>
        </header>
        <TabsContent value='mes' className='flex-1 min-h-0 mt-0'>
          <CalendarioMes />
        </TabsContent>
      </Tabs>
    </section>
  )
}
