import { file } from 'bun'

const add = (a: number, b: number) => a + b
const digits = (s: string) =>
  s
    .replaceAll('one', 'one1one')
    .replaceAll('two', 'two2two')
    .replaceAll('three', 'three3three')
    .replaceAll('four', 'four4four')
    .replaceAll('five', 'five5five')
    .replaceAll('six', 'six6six')
    .replaceAll('seven', 'seven7seven')
    .replaceAll('eight', 'eight8eight')
    .replaceAll('nine', 'nine9nine')

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
}

export const day01 = {
  part1: () =>
    input.lines
      .map((x) => [...x].map(Number).filter((y) => !Number.isNaN(y)))
      .map((l) => [l.at(0), l.at(-1)].join(''))
      .map(Number)
      .reduce(add),
  part2: () =>
    input.lines
      .map(digits)
      .map((x) => [...x].map(Number).filter((y) => !Number.isNaN(y)))
      .map((l) => [l.at(0), l.at(-1)].join(''))
      .map(Number)
      .reduce(add),
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
