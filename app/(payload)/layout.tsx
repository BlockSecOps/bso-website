import type { ReactNode } from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/importMap'
import { serverFunction } from './serverFunction'

import '@payloadcms/next/css'

type Args = {
  children: ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })

export default Layout
