import { useCategoriasStore } from '@/store/categoriasStore'
import { useColorStore } from '@/store/colorStore'
import Actividad from './Actividad'
import ActividadTemp from './ActividadTemp'

export default function ListaActividades() {
  const [crear, setCrear] = useState(false)
  // TODO: Filtros, por color, con/sin bloques y recientes/semana
  // TODO: En la medidad 1024x768, mejorar el sheet
  const [search, setSearch] = useState('')
  return (
    <section className='flex flex-col min-w-60 max-w-60 h-full overflow-hidden p-4 gap-y-3'>
      <InputGroup className='bg-input/30 border-input/30'>
        <InputGroupInput
          placeholder='Buscar'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <InputGroupAddon align='inline-end'>
            <InputGroupButton
              variant='ghost'
              size='icon-xs'
              onClick={() => setSearch('')}
            >
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <Tabs defaultValue='activas' className='flex flex-col min-h-0 gap-3'>
        <TabsList>
          <TabsTrigger value='activas' className='flex gap-1'>
            <CircleCheck className='size-3.5' />
            Activas
          </TabsTrigger>

          <TabsTrigger value='archivadas' className='flex gap-1'>
            <Archive className='size-3.5' />
            Archivadas
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='activas'
          className='m-0 flex flex-col min-h-50 gap-2'
        >
          <ActividadesActivas
            crear={crear}
            setCrear={setCrear}
            search={search}
          />
          {!search && (
            <footer>
              <Button
                size='icon'
                className='w-full'
                onClick={() => setCrear(true)}
              >
                <Plus />
              </Button>
            </footer>
          )}
        </TabsContent>

        <TabsContent
          value='archivadas'
          className='m-0 flex flex-col min-h-50 gap-2'
        >
          <ActividadesArchivadas search={search} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
