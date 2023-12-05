import { describe, expect, test } from 'bun:test'
import { day04 } from './index.ts'

describe('Tests day04', () => {
  test('Part 1', () => {
    expect(day04.part1()).toBe(25004)
  })
  test.todo('Part 2', () => {
    expect(day04.part2()).toBe(56154)
  })
})
