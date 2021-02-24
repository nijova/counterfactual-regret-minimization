const ROCK: number = 0;
const PAPER: number = 1;
const SCISSORS: number = 2;

let regretSum: number[] = [1,1,1];
let strategy: number[] = [1,1,1];
let strategySum: number[] = [1,1,1];

let oppStrategy: number[] = [0.8, 0.1, 0.1];

function getStrategy(): number[] {
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

function getAction(_strategy: number[]): number {
  const r = Math.random();
  if (r < _strategy[0]) {
    return 0;
  } else if (r < 1 - _strategy[2]) {
    return 1;
  } else {
    return 2;
  }
}

function getAverageStrategy(): number[] {
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


function train(iterations: number): void {
  let actionUtility: number[] = [0,0,0];
  for (let i = 0; i < iterations; i++) {
    let _strategy = getStrategy();
    const myAction = getAction(_strategy);
    const oppAction = getAction(oppStrategy)
    actionUtility[oppAction] = 0;
    actionUtility[(oppAction + 1) % 3] = 1;
    actionUtility[(oppAction - 1) % 3] = -1;
    for (let j = 0; j < 3; j++) {
      regretSum[j] += actionUtility[j] - actionUtility[myAction];
    }
  }
}


train(1000);
console.log(getAverageStrategy());
