import { file } from 'bun'

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get cardMatches() {
    return this.lines.map((line) => line.match(/\d+/g)?.slice(1) ?? []).map((l) => l.length - new Set(l).size)
  },
}

const add = (a: number, b: number) => a + b

export const day04 = {
  // 13
  part1: () =>
    input.cardMatches
      .filter((n) => n > 0)
      .map((x) => 2 ** (x - 1))
      .reduce(add, 0),
  // 30
  part2: () => {
    const matches = input.cardMatches
    const copies = Array(matches.length).fill(0)

    for (const [i, m] of matches.entries()) {
      copies[i] += 1
      for (const [j, _] of Array(m).entries()) {
        if (i + j < matches.length) copies[j + i + 1] += copies[i]
      }
    }

    return copies.reduce(add)
  },
}

process.env.part === 'part1' && console.log(day04.part1())
process.env.part === 'part2' && console.log(day04.part2())
