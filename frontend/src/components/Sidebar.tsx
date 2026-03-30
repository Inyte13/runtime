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
      </section>
    </Tabs>
  )
}
