export const checkValidCoins = (
  ValidAmounts: number[],
  amount: number
): boolean => {
  if (!amount) return false

  let sum = amount
  let i = ValidAmounts.length - 1

  while (sum) {
    if (sum % ValidAmounts[i] >= 0 && sum >= ValidAmounts[i])
      sum = sum - ValidAmounts[i] * Math.floor(sum / ValidAmounts[i])

    if (i === 0 && sum) return false
    i--
  }

  return true
}
