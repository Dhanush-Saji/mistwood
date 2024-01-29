import React from 'react'
import './LoadingCircle.css'

const LoadingCircleText = ({children}) => {
  return (
    <div class="loader">
        {children}
    </div>
  )
}

export default LoadingCircleText