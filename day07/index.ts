import { file } from 'bun'

enum H {
  NOTHIN = 0,
  PAIR_1 = 1,
  PAIR_2 = 2,
  KIND_3 = 3,
  FULL_H = 4,
  KIND_4 = 5,
  KIND_5 = 6,
}

type Hand = { cards: number[]; bid: number; type: H; first: number; second?: number }

const add = (a: number, b: number) => a + b
const mul = (a: number, b: number) => a * b

const score: Record<string, number> = { A: 14, K: 13, Q: 12, J: 1, T: 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 }

const toType = (cards: number[]) => {
  const unique = new Set(cards)
  const non_unique = new Set(cards.filter((x, i, a) => a.lastIndexOf(x) !== i || a.indexOf(x) !== i))
  const once = cards.filter((v, i, a) => a.indexOf(v) === a.lastIndexOf(v))

  if (unique.size === 1) return { type: H.KIND_5, first: cards[0] }
  if (unique.size === 5) return { type: H.NOTHIN, first: cards[0] }
  if (unique.size === 4) return { type: H.PAIR_1, first: cards[0] }
  if (unique.size === 2 && non_unique.size === 1) return { type: H.KIND_4, first: cards[0] }
  if (unique.size === 2 && non_unique.size === 2) return { type: H.FULL_H, first: cards[0] }
  if (unique.size === 3 && non_unique.size === 1) return { type: H.KIND_3, first: cards[0] }
  if (unique.size === 3 && non_unique.size === 2) return { type: H.PAIR_2, first: cards[0] }
  throw 'No matching hand'
}

const toJokerType = (cards: number[]) => {}

const input = {
  s: await file('./input.txt').text(),
  get lines() {
    return this.s.split('\n')
  },
  get numbers() {
    return this.lines.map(Number)
  },
  get hands(): Hand[] {
    return this.lines.map((l) => {
      const [c, b] = l.split(' ')
      const cards = [...c].map((x) => score[x])
      return { cards, bid: +b, ...toType(cards) }
    })
  },
}

const compare = (a: Hand, b: Hand): number => {
  if (a.type !== b.type) return a.type - b.type
  if (a.cards[0] !== b.cards[0]) return a.cards[0] - b.cards[0]
  if (a.cards[1] !== b.cards[1]) return a.cards[1] - b.cards[1]
  if (a.cards[2] !== b.cards[2]) return a.cards[2] - b.cards[2]
  if (a.cards[3] !== b.cards[3]) return a.cards[3] - b.cards[3]
  if (a.cards[4] !== b.cards[4]) return a.cards[4] - b.cards[4]
  return 0
}

export const day07 = {
  // 253200674 too low
  // 253373378 too low
  // 253387353 too low
  // 253037879
  // 253139228
  // 252548881
  // 253910319
  part1: () =>
    input.hands
      .sort(compare)
      .map(({ bid }, i) => bid * (i + 1))
      .reduce(add),
  part2: () => input.numbers.reduce(mul),
}

process.env.part === 'part1' && console.log(day07.part1())
process.env.part === 'part2' && console.log(day07.part2())
