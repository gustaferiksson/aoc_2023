import { file } from 'bun'

type Number = { x: number; y: number; value: string }
type Symbol = { x: number; y: number; value: string }

const input = {
  s: await file('./input.txt').text(),
  parse<T extends { x: number; y: number; value: string }>(r: RegExp): T[] {
    return this.s.split('\n').flatMap((line, i) =>
      [...line.matchAll(r)].map(
        (match) =>
          ({
            x: match.index ?? -1,
            y: i,
            value: match[0],
          }) as T,
      ),
    )
  },
  get numbers() {
    return this.parse<Number>(/\d+/g)
  },
  get symbols() {
    return this.parse<Symbol>(/[^\d.]/g)
  },
}

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b

const neighbour = (number: Number) => (symbol: Symbol) =>
  symbol.x >= number.x - 1 && symbol.x <= number.x + number.value.length && symbol.y >= number.y - 1 && symbol.y <= number.y + 1

export const day03 = {
  part1: () =>
    input.numbers
      .filter((n) => input.symbols.some(neighbour(n)))
      .map((n) => +n.value)
      .reduce(add),

  part2: () =>
    input.symbols
      .filter((s) => s.value === '*')
      .map((gear) => input.numbers.filter((n) => neighbour(n)(gear)))
      .filter((n) => n.length === 2)
      .map((l) => l.map((n) => +n.value))
      .map((l) => l.reduce(mul))
      .reduce(add),
}

process.env.part === 'part1' && console.log(day03.part1())
process.env.part === 'part2' && console.log(day03.part2())
