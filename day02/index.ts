import { file } from 'bun'

type Game = { id: number; red: number[]; green: number[]; blue: number[] }

const add = (a: number, b: number) => a + b

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get games(): Game[] {
    return this.lines.map((l) => ({
      id: Number(l.split(':').at(0)?.split(' ').at(-1)),
      red: l.match(/(\d+)(?= red)/g)?.map(Number) ?? [],
      green: l.match(/(\d+)(?= green)/g)?.map(Number) ?? [],
      blue: l.match(/(\d+)(?= blue)/g)?.map(Number) ?? [],
    }))
  },
}

const validGame = (game: Game) => Math.max(...game.red) <= 12 && Math.max(...game.green) <= 13 && Math.max(...game.blue) <= 14
const getGamePower = (game: Game) => Math.max(...game.red) * Math.max(...game.green) * Math.max(...game.blue)

export const day02 = {
  part1: () =>
    input.games
      .filter(validGame)
      .map((g) => g.id)
      .reduce(add),
  part2: () => input.games.map(getGamePower).reduce(add),
}

process.env.part === 'part1' && console.log(day02.part1())
process.env.part === 'part2' && console.log(day02.part2())
