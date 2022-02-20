import { checkValidCoins } from '../src/utils/checkValidCoins'

describe('Vending coins allowance check ', () => {
  test('50c should return true', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    const amount = 50
    expect(checkValidCoins(ValidAmounts, amount)).toBe(true)
  })

  test('154 should return false', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    const amount = 154
    expect(checkValidCoins(ValidAmounts, amount)).toBe(false)
  })

  test('0 should return false', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    const amount = 0
    expect(checkValidCoins(ValidAmounts, amount)).toBe(false)
  })

  test('-1 should return false', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    const amount = -1
    expect(checkValidCoins(ValidAmounts, amount)).toBe(false)
  })

  test('null should return false', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    expect(checkValidCoins(ValidAmounts, null)).toBe(false)
  })

  test('undefined should return false', () => {
    const ValidAmounts = [5, 10, 20, 50, 100]
    expect(checkValidCoins(ValidAmounts, undefined)).toBe(false)
  })
})
