import React from 'react'
import './LoadingCircle.css'

const LoadingCircleText = ({children}) => {
  return (
    <div className="loader">
        {children}
    </div>
  )
}

export default LoadingCircleText