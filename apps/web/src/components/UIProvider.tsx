'use client'

import { ReactNode } from "react"
import { TamaguiProvider } from "@yolostudio/ui"
import tamaguiConfig from '@yolostudio/ui/tamagui.config';

export default function UIProvider({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  )
}