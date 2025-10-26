'use client'

import { useEffect, useRef, useState } from 'react'
import { YOLOAnimation } from '@yolostudio/ui'

export default function Page() {
  return (
    <>
      <YOLOAnimation />
      <div style={{ color: 'white', fontSize: 36, opacity: 0.5, transition: 'opacity 0.6s ease 0.2s', marginTop: 20 }}>aaaaa</div>
    </>
  )
}