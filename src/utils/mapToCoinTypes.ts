type changeType = {
  type: number
  value: number
}

export const mapToCoinTypes = (
  ValidAmounts: number[],
  amount: number
): boolean | changeType[] => {
  if (!amount) return false

  let sum = amount
  let i = ValidAmounts.length - 1
  const change: changeType[] = []

  while (sum) {
    if (sum % ValidAmounts[i] >= 0 && sum >= ValidAmounts[i]) {
      const coinQuantity = Math.floor(sum / ValidAmounts[i])
      sum = sum - coinQuantity * ValidAmounts[i]
      change.push({ type: ValidAmounts[i], value: coinQuantity })
    }

    if (i === 0 && sum) return false
    i--
  }

  return change
}
