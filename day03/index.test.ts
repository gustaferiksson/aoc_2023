import { describe, expect, test } from 'bun:test'
import { day03 } from './index.ts'

describe('Tests day03', () => {
  test('Part 1', () => {
    expect(day03.part1()).toBe(550064)
  })
  test('Part 2', () => {
    expect(day03.part2()).toBe(85010461)
  })
})
