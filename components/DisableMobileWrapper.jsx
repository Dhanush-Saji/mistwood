"use client"
import React, { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js';

const DisableMobileWrapper = ({children}) => {
  const [isClient, setisClient] = useState(false);
  const [widthSize, setwidthSize] = useState(500);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setisClient(true);
    setwidthSize(windowSize);
  }, []);

  var parser = new UAParser();
  const os = (parser.getResult())?.os?.name;

  if (os === 'Android' || widthSize < 500) {
    return null;
  }
  return children
}

export default DisableMobileWrapper