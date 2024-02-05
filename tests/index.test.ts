import { join } from 'node:path'
import { cwd } from 'node:process'
import { describe, expect, it } from 'vitest'

import resolveJson from '../src'

interface efgIn {
  a: number
  b: boolean
  c: string[]
}

interface json {
  abc: string
  efg: efgIn
}

describe('index', () => {
  it('input interface json', async () => {
    const { abc, efg } = await resolveJson<json>({
      path: join(cwd(), '/tests/jsons/4'),
    })

    expect(abc).toMatchInlineSnapshot(`"ttteeesssttt"`)
    expect(efg).toMatchInlineSnapshot(`
      {
        "a": 10,
        "b": false,
        "c": [
          "1",
          "2",
        ],
      }
    `)
  })
  it('default package.json', async () => {
    const { name } = await resolveJson()

    expect(name).toMatchInlineSnapshot(`"@dmzj/resolve-package-json"`)
  })

  it('package.json by with path', async () => {
    const cPath = import.meta.glob('./jsons/**/package.json')
    const parseRes = []

    for (const p of Object.keys(cPath)) {
      const path = join(cwd(), '/tests', p)

      parseRes.push({ [path]: await resolveJson({ path }) })
    }

    expect(parseRes).toMatchInlineSnapshot(`
      [
        {
          "/Users/zhanqingjie/m/resolvePKG/tests/jsons/1/package.json": {
            "description": "My awesome typescript library",
            "name": "@dmzj/resolve-package-json",
            "packageManager": "pnpm@8.15.0",
            "test1": "1",
            "version": "0.0.0",
          },
        },
        {
          "/Users/zhanqingjie/m/resolvePKG/tests/jsons/2/package.json": {
            "description": "My awesome typescript library",
            "name": "@dmzj/resolve-package-json",
            "packageManager": "pnpm@8.15.0",
            "test3": "3",
            "version": "0.0.0",
          },
        },
        {
          "/Users/zhanqingjie/m/resolvePKG/tests/jsons/3/package.json": {
            "description": "My awesome typescript library",
            "name": "@dmzj/resolve-package-json",
            "packageManager": "pnpm@8.15.0",
            "test2": "2",
            "version": "0.0.0",
          },
        },
        {
          "/Users/zhanqingjie/m/resolvePKG/tests/jsons/4/package.json": {
            "abc": "ttteeesssttt",
            "description": "My awesome typescript library",
            "efg": {
              "a": 10,
              "b": false,
              "c": [
                "1",
                "2",
              ],
            },
            "name": "@dmzj/resolve-package-json",
            "packageManager": "pnpm@8.15.0",
            "test4": "4",
            "version": "0.0.0",
          },
        },
      ]
    `)
  })

  it('callback', async () => {
    expect(await resolveJson({ path: join(cwd(), '/tests/jsons/1') }))
      .toMatchInlineSnapshot(`
      {
        "description": "My awesome typescript library",
        "name": "@dmzj/resolve-package-json",
        "packageManager": "pnpm@8.15.0",
        "test1": "1",
        "version": "0.0.0",
      }
    `)
  })
})
