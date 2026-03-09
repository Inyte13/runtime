import Duracion from './Duracion'
import SelectorActividad from './SelectorActividad'
import { memo } from 'react'

export default memo(function BloqueHeader({ id }: { id: number }) {
  
  return (
    <header className='flex justify-between items-center'>
      <SelectorActividad id={id} />
      <Duracion id={id} />
    </header>
  )
})
