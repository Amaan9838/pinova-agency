'use client'

import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const Cursor = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 999;
  transition: transform 0.1s ease;
`

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return <Cursor ref={cursorRef} />
}
