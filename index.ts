const readline = require('readline');

const rps: string[] = ['Rock', 'Paper', 'Scissors'];
let regretSum: number[] = [1, 1, 1];
let strategySum: number[] = [0, 0, 0];

let strategy: number[] = [1 / 3, 1 / 3, 1 / 3];
console.assert(strategy.length === 3);
console.assert(strategy.reduce((a, b) => a + b, 0) === 1, 'Sum of strategy should be 1');

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function play(): void {
  let _strategy = getStrategy();
  rl.question('Choose Rock(r) or Paper(p) or Scissors(s): ', (answer: string) => {
    if (answer === 'r' || answer === 'p' || answer === 's') {
      const move = answer === 'r' ? 0 : answer === 'p' ? 1 : 2;
      console.log(`- Player chose ${rps[move]}.`);
      let actionUtility: number[] = [0,0,0];
      const cfrAction = getAction(_strategy);
      console.log(`- CFR chose ${rps[cfrAction]}.`);
      console.log();
      const playerAction = move;
      actionUtility[playerAction] = 0;
      actionUtility[(playerAction + 1) % 3] = 1;
      actionUtility[(playerAction + 2) % 3] = -1;
      for (let j = 0; j < 3; j++) {
        regretSum[j] += actionUtility[j] - actionUtility[cfrAction];
      }
      if ((3 + cfrAction - playerAction) % 3 === 2) { playerScore += 1; }
      if ((3 + cfrAction - playerAction) % 3 === 1) { cfrScore += 1; }
      console.log(`***** Player score: ${playerScore}, CFR score: ${cfrScore} *****`);
    }
    console.log();
    play();
  });
}

let cfrScore = 0;
let playerScore = 0;

play();
