import { describe, expect, test } from 'bun:test'
import { day02 } from './index.ts'

describe('Tests day02', () => {
  test('Part 1', () => {
    expect(day02.part1()).toBe(2278)
  })
  test('Part 2', () => {
    expect(day02.part2()).toBe(67953)
  })
})
