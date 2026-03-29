import Layout from '../components/Layout'
import Dia from '../components/Dia'

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
