import { file } from 'bun'

type mapping = { dest: number; src: number; range: number }

const input = {
  s: await file('./input.txt').text(),
  get chunks() {
    return this.s.split('\n\n')
  },
  get seeds() {
    return this.chunks.at(0)?.match(/\d+/g)?.map(Number) ?? []
  },
  get maps(): mapping[][] {
    return this.chunks.slice(1).map((chunk) =>
      chunk
        .split('\n')
        .slice(1)
        .map((l) => l.match(/\d+/g)?.map(Number) ?? [])
        .map(([dest, src, range]) => ({ dest, src, range })),
    )
  },
}

const getDest = (seed: number, map: mapping[]) => {
  const { dest, src, range } = map.find(({ src, range }) => seed >= src && seed <= src + range) ?? {}
  if (dest == null || src == null) return seed
  return dest + seed - src
}

export const day05 = {
  // 35
  part1: () => Math.min(...input.seeds.map((s) => input.maps.reduce(getDest, s))),

  // 46
  part2: () => process.exit(1), // fakk this
}

process.env.part === 'part1' && console.log(day05.part1())
process.env.part === 'part2' && console.log(day05.part2())
