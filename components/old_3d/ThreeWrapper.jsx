import React, { Suspense } from 'react'
import Model from './Model'
import ThreeDLoader from '../ThreeDLoader'

const ThreeWrapper = () => {
  return (
    <>
    <ambientLight />
    <Suspense fallback={<ThreeDLoader />}>
    <Model />
    </Suspense>
    </>
  )
}

export default ThreeWrapper