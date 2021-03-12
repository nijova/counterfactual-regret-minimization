export const rps: string[] = ['Rock', 'Paper', 'Scissors'];
export let regretSum: number[] = [1, 1, 1];
export let strategySum: number[] = [0, 0, 0];
export let strategy: number[] = [1 / 3, 1 / 3, 1 / 3];

export function reset(): void {
  regretSum = [1, 1, 1];
  strategySum = [0, 0, 0];
  strategy = [1 / 3, 1 / 3, 1 / 3];
}

export function getStrategy(): number[] {
  let normalizingSum: number = 0;
  for (let i = 0; i < 3; i++) {
    strategy[i] = Math.max(regretSum[i], 0);
    normalizingSum += strategy[i];
  }
  for (let i = 0; i < 3; i++) {
    if (normalizingSum > 0) {
      strategy[i] /= normalizingSum;
    } else {
      strategy[i] = 1 / 3;
    }
    strategySum[i] += strategy[i];
  }
  return strategy;
}

export function getAction(_strategy: number[]): number {
  const r = Math.random();
  if (r <= _strategy[0]) {
    return 0;
  } else if (r <= _strategy[0] + _strategy[1]) {
    return 1;
  } else {
    return 2;
  }
}

export function getAverageStrategy(): number[] {
  let avgStrategy: number[] = [0, 0, 0];
  let normalizingSum = 0;
  for (let i = 0; i < 3; i++) {
    normalizingSum += strategySum[i];
  }
  for (let i = 0; i < 3; i++) {
    if (normalizingSum > 0) {
      avgStrategy[i] = strategySum[i] / normalizingSum;
    } else {
      avgStrategy[i] = 1 / 3;
    }
  }
  return avgStrategy;
}

export function updateRegretSum(cfrAction: number, playerAction: number): void {
  let actionUtility: number[] = [0,0,0];
  actionUtility[playerAction] = 0;
  actionUtility[(playerAction + 1) % 3] = 1;
  actionUtility[(playerAction + 2) % 3] = -1;
  for (let i = 0; i < 3; i++) {
    regretSum[i] += actionUtility[i] - actionUtility[cfrAction];
  }
}
