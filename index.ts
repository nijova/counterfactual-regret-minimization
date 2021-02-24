// strategy[rock,paper,scissors]

let regretSum: number[] = [1, 1, 1];
let strategySum: number[] = [0, 0, 0];

let strategy: number[] = [1 / 3, 1 / 3, 1 / 3];
console.assert(strategy.length === 3);
console.assert(strategy.reduce((a, b) => {return a + b;}, 0) === 1, 'Sum of strategy should be 1');
let oppStrategy: number[] = [0.3, 0.3, 0.4];
console.assert(oppStrategy.length === 3);
console.assert(oppStrategy.reduce((a, b) => {return a + b;}, 0) === 1, 'Sum of oppStrategy should be 1');

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
  if (r <= _strategy[0]) {
    return 0;
  } else if (r <= _strategy[0] + _strategy[1]) {
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
  const logFrequency = 200;
  console.log('start training');
  let actionUtility: number[] = [0,0,0];
  for (let i = 0; i < iterations; i++) {
    let _strategy = getStrategy();
    const myAction = getAction(_strategy);
    const oppAction = getAction(oppStrategy)
    actionUtility[oppAction] = 0;
    actionUtility[(oppAction + 1) % 3] = 1;
    actionUtility[(oppAction + 2) % 3] = -1;
    for (let j = 0; j < 3; j++) {
      regretSum[j] += actionUtility[j] - actionUtility[myAction];
    }
    if (i % logFrequency === logFrequency - 1) {
      console.log(`iteration ${i + 1}, current average strategy: ${getAverageStrategy()}`)
    }
  }

  console.log(`*** opponent played ${Math.round(oppStrategy[0]*100)}% rock, ${Math.round(oppStrategy[1]*100)}% paper, ${Math.round(oppStrategy[2]*100)}% scissors.`);
  console.log(`*** cfr optimized to play ${Math.round(strategy[0]*100)}% rock, ${Math.round(strategy[1]*100)}% paper, ${Math.round(strategy[2]*100)}% scissors after ${iterations} iterations.`);
}

declare var process : {
  argv: string[]
}
if (process.argv[2] === 'train') {
  train(+process.argv[3]);
} else if(process.argv[2] === 'play') {
  console.log('TODO implement play mode')
} else if(process.argv[2] === 'test') {
  console.log('TODO implement some test examples')
}
