import { Route, Routes } from 'react-router'
import { lazy, useEffect, useState } from 'react'
import { useCategoriasStore } from './store/categoriasStore.js'
import { Loader2 } from 'lucide-react'

const Home = lazy(() => import('./pages/Home.js'))

export default function App() {
  // Loading global, por la normalizacion de datos
  const [isReady, setIsReady] = useState(false)
  const traerActividadesDetail = useActividadesStore(
    state => state.traerActividadesDetail
  )
  useEffect(() => {
    traerActividadesDetail().finally(() => setIsReady(true))
  }, [traerActividadesDetail])

  if (!isReady)
    return (
      <div className='h-dvh w-full flex items-center justify-center'>
        <Loader2 className='animate-spin text-muted-foreground' />
      </div>
    )
  // overflow-hidden: para que el contenido interior no rompa hacia fuera del contenedor
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}
