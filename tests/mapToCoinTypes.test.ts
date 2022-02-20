import { mapToCoinTypes } from '../src/utils/mapToCoinTypes'

describe('Vending coins allowance check ', () => {
  const ValidAmounts = [5, 10, 20, 50, 100]

  test('50c should return an object change', () => {
    const amount = 50
    const result = [{ type: 50, value: 1 }]
    expect(mapToCoinTypes(ValidAmounts, amount)).toEqual(result)
  })

  test('154 should return false', () => {
    const amount = 154
    expect(mapToCoinTypes(ValidAmounts, amount)).toBe(false)
  })

  test('0 should return false', () => {
    const amount = 0
    expect(mapToCoinTypes(ValidAmounts, amount)).toBe(false)
  })

  test('-1 should return false', () => {
    const amount = -1
    expect(mapToCoinTypes(ValidAmounts, amount)).toBe(false)
  })

  test('null should return false', () => {
    expect(mapToCoinTypes(ValidAmounts, null)).toBe(false)
  })

  test('undefined should return false', () => {
    expect(mapToCoinTypes(ValidAmounts, undefined)).toBe(false)
  })

  test('150, should return multiple coing types', () => {
    const amount = 150
    const result = [
      { type: 100, value: 1 },
      { type: 50, value: 1 }
    ]
    expect(mapToCoinTypes(ValidAmounts, amount)).toEqual(result)
  })

  test('185, should return one coin of each', () => {
    const amount = 185
    const result = [
      { type: 100, value: 1 },
      { type: 50, value: 1 },
      { type: 20, value: 1 },
      { type: 10, value: 1 },
      { type: 5, value: 1 }
    ]
    expect(mapToCoinTypes(ValidAmounts, amount)).toEqual(result)
  })
})
