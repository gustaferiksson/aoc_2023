import { file } from 'bun'

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get numbers() {
    return this.lines.map(Number)
  },
}

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b

export const TEMPLATE = {
  part1: () => input.numbers.reduce(add),
  part2: () => input.numbers.reduce(mul),
}

process.env.part === 'part1' && console.log(TEMPLATE.part1())
process.env.part === 'part2' && console.log(TEMPLATE.part2())
