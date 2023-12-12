import { describe, expect, test } from 'bun:test'
import { day06 } from './index.ts'

describe('Tests day06', () => {
  test('Part 1', () => {
    expect(day06.part1()).toBe(131376)
  })
  test('Part 2', () => {
    expect(day06.part2()).toBe(34123437)
  })
})
