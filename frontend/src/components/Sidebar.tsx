import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Archive, CircleCheck } from 'lucide-react'
import ListaCategorias from './ListaCategorias'
import ListaArchivadas from './ListaArchivadas'

export default function Sidebar() {
  // TODO: Crear el button inteligente para contraer y ampliar las categorias
  // TODO: Que el TabTrigger sea responsive con su contenido
  return (
    <Tabs defaultValue='activas' asChild>
      <section className='flex flex-col h-full overflow-hidden gap-y-2 pl-4 w-56'>
        <TabsList asChild>
          <header >
            <TabsTrigger value='activas' className='flex gap-1'>
              <CircleCheck className='size-3.5' />
              Activas
            </TabsTrigger>
            <TabsTrigger value='archivadas' className='flex gap-1'>
              <Archive className='size-3.5' />
              Archivadas
            </TabsTrigger>
          </header>
        </TabsList>
        <TabsContent value='activas' asChild>
          <ListaCategorias />
        </TabsContent>
        <TabsContent
          value='archivadas'
          className='m-0 flex flex-col flex-1 gap-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        >
          <ListaArchivadas />
        </TabsContent>
      </section>
    </Tabs>
  )
}
