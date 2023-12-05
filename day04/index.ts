import { file } from 'bun'

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get cards() {
    return this.lines.map((line) => line.match(/\d+/g)?.slice(1) ?? []).map((l) => l.length - new Set(l).size)
  },
}

const add = (a: number, b: number) => a + b

export const day04 = {
  // 13
  part1: () =>
    input.cards
      .filter((n) => n > 0)
      .map((x) => 2 ** (x - 1))
      .reduce(add, 0),
  // 30
  part2: () => {
    process.exit(1)
  },
}

process.env.part === 'part1' && console.log(day04.part1())
process.env.part === 'part2' && console.log(day04.part2())
