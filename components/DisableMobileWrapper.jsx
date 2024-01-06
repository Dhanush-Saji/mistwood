"use client"
import React from 'react'
import { UAParser } from 'ua-parser-js';

const DisableMobileWrapper = ({children}) => {
    var parser = new UAParser();
  let os = (parser.getResult())?.os?.name
  if(os == 'Android'){
    return null
  }
  return children
}

export default DisableMobileWrapper