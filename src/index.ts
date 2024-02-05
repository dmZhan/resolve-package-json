import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import type { pkgJson } from './types'

export default async function resolveJson<T extends Record<string, any>>({
  path = cwd(),
} = {}): Promise<Partial<T & pkgJson>> {
  let pkgJsonPath: undefined | string = undefined

  try {
    const pkgPath = path.endsWith('package.json')
      ? path
      : join(path, '/package.json')
    const isFile = (await stat(pkgPath)).isFile()

    if (isFile) {
      pkgJsonPath = pkgPath
    }
  } catch {
    return {}
  }

  if (pkgJsonPath) {
    return JSON.parse(await readFile(pkgJsonPath, 'utf-8'))
  } else {
    return {}
  }
}
