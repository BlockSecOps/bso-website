import type { ImportMap } from 'payload'

export const importMap: ImportMap = {
  '@payloadcms/next/views#RootPage': {
    path: '@payloadcms/next/views',
    exportName: 'RootPage',
  },
  '@payloadcms/next/views#RootLayout': {
    path: '@payloadcms/next/views',
    exportName: 'RootLayout',
  },
  '@payloadcms/next/views#AccountView': {
    path: '@payloadcms/next/views',
    exportName: 'AccountView',
  },
  '@payloadcms/next/views#DashboardView': {
    path: '@payloadcms/next/views',
    exportName: 'DashboardView',
  },
  '@/components/admin/SimpleCaptcha#SimpleCaptcha': {
    path: '/var/www/bso/components/admin/SimpleCaptcha',
    exportName: 'SimpleCaptcha',
  },
}
