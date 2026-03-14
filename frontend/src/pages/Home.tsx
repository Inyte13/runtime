import { useMediaQuery } from '@/hooks/useMediaQuery'
import Calendario from '../components/Calendario'
import Dia from '../components/Dia'
import ListaActividades from '../components/ListaActividades'

export default function Home() {
  const isSmall = useMediaQuery(1300)
  return (
    <main className='flex h-dvh overflow-hidden p-4 justify-center'>
      {!isSmall && <ListaActividades />}
      <Calendario />
      <Dia />
    </main>
  )
}
