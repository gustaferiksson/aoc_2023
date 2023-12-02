import { file } from 'bun'

type Set = {
  red?: number
  green?: number
  blue?: number
}
type Game = { id: number; sets: Set[] }

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get games(): Game[] {
    return this.lines.map((l) => {
      const [a, b] = l.split(': ')
      const [, id] = a.split(' ').map(Number)
      const sets = b.split('; ').map((set) =>
        set.split(', ').reduce((acc, curr) => {
          const [n, color] = curr.split(' ')
          acc[color as keyof Set] = +n
          return acc
        }, {} as Set),
      )
      return { id, sets }
    })
  },
}

const max = { red: 12, green: 13, blue: 14 }
const isValidSet = (a: Set) => {
  return (a.red == null || a.red <= max.red) && (a.green == null || a.green <= max.green) && (a.blue == null || a.blue <= max.blue)
}

const getMaxSet = (sets: Set[]): Set => ({
  red: sets.reduce((prev, curr) => ((curr.red ?? 0) > (prev.red ?? 0) ? curr : prev), { red: 0 }).red,
  green: sets.reduce((prev, curr) => ((curr.green ?? 0) > (prev.green ?? 0) ? curr : prev), { green: 0 }).green,
  blue: sets.reduce((prev, curr) => ((curr.blue ?? 0) > (prev.blue ?? 0) ? curr : prev), { blue: 0 }).blue,
})

export const day02 = {
  part1: () =>
    input.games
      .filter(({ sets }) => sets.every(isValidSet))
      .map(({ id }) => id)
      .reduce(add),
  part2: () => input.games.map(({ sets }) => Object.values(getMaxSet(sets)).reduce(mul)).reduce(add),
}

process.env.part === 'part1' && console.log(day02.part1())
process.env.part === 'part2' && console.log(day02.part2())
