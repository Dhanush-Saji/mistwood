import React, { Suspense } from 'react'
import Model from './Model'

const ThreeWrapper = () => {
  return (
    <>
    <ambientLight />
    <Suspense fallback={null}>
    <Model />
    </Suspense>
    </>
  )
}

export default ThreeWrapper