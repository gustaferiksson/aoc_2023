import { file } from 'bun'

type Game = { winning: number[]; numbers: number[] }

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get games(): Game[] {
    return this.lines.map((line) => {
      const [g, nums] = line.split(': ')
      const [a, b] = nums.split(' | ')

      return { winning: a.split(' ').filter(Boolean).map(Number), numbers: b.split(' ').filter(Boolean).map(Number) }
    })
  },
}

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b
const pow = (a: number, b: number) => (b !== 0 ? a + 2 ** (b - 1) : a)

export const day04 = {
  // 13
  part1: () =>
    input.games
      .map(({ winning, numbers }) => numbers.filter((n) => winning.includes(n)))
      .map((l) => l.length)
      .map((x) => (x !== 0 ? 2 ** (x - 1) : 0))
      .reduce(add),
  part2: () => process.exit(1),
}

process.env.part === 'part1' && console.log(day04.part1())
process.env.part === 'part2' && console.log(day04.part2())
