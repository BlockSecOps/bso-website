'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/importMap'

export async function serverFunction(args: any): Promise<any> {
  'use server'
  return await handleServerFunctions({ ...args, config, importMap })
}
