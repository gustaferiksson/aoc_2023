import { describe, expect, test } from 'bun:test'
import { day01 } from './index.ts'

describe('Tests day01', () => {
  test('Part 1', () => {
    expect(day01.part1()).toBe(53334)
  })
  test('Part 2', () => {
    expect(day01.part2()).toBe(52834)
  })
})
