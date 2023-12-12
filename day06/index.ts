import { file } from 'bun'

type Race = { time: number; distance: number }

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get races() {
    const times = this.lines[0].match(/\d+/g)?.map(Number)
    const distances = this.lines[1].match(/\d+/g)?.map(Number)

    return times?.map((time, i) => ({ time, distance: distances?.[i] ?? -1 }))
  },
  get race() {
    const time = Number(this.lines[0].match(/\d+/g)?.join(''))
    const distance = Number(this.lines[1].match(/\d+/g)?.join(''))
    return { time, distance }
  },
}

// D = n * (T - n)
const wins = ({ time, distance }: Race) => {
  const list = Array(time)
  const first = list.findIndex((_, i) => i * (time - i) > distance)
  const last = list.findLastIndex((_, i) => i * (time - i) > distance)
  return last - first + 1
}

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b

export const day06 = {
  part1: () => input.races?.map(wins).reduce(mul),
  part2: () => wins(input.race),
}

process.env.part === 'part1' && console.log(day06.part1())
process.env.part === 'part2' && console.log(day06.part2())
