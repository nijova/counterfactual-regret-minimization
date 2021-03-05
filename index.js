var readline = require('readline');
// strategy[rock,paper,scissors]
var regretSum = [1, 1, 1];
var strategySum = [0, 0, 0];
var strategy = [1 / 3, 1 / 3, 1 / 3];
console.assert(strategy.length === 3);
console.assert(strategy.reduce(function (a, b) { return a + b; }, 0) === 1, 'Sum of strategy should be 1');
function getStrategy() {
    var normalizingSum = 0;
    for (var i = 0; i < 3; i++) {
        strategy[i] = Math.max(regretSum[i], 0);
        normalizingSum += strategy[i];
    }
    for (var i = 0; i < 3; i++) {
        if (normalizingSum > 0) {
            strategy[i] /= normalizingSum;
        }
        else {
            strategy[i] = 1 / 3;
        }
        strategySum[i] += strategy[i];
    }
    return strategy;
}
function getAction(_strategy) {
    var r = Math.random();
    if (r <= _strategy[0]) {
        return 0;
    }
    else if (r <= _strategy[0] + _strategy[1]) {
        return 1;
    }
    else {
        return 2;
    }
}
function getAverageStrategy() {
    var avgStrategy = [0, 0, 0];
    var normalizingSum = 0;
    for (var i = 0; i < 3; i++) {
        normalizingSum += strategySum[i];
    }
    for (var i = 0; i < 3; i++) {
        if (normalizingSum > 0) {
            avgStrategy[i] = strategySum[i] / normalizingSum;
        }
        else {
            avgStrategy[i] = 1 / 3;
        }
    }
    return avgStrategy;
}
/*
function train(iterations: number, logFrequency = 200): void {
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
}*/
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function play() {
    var _strategy = getStrategy();
    console.log('crf strategy:', _strategy);
    rl.question('Choose Rock(0) or Paper(1) or Scissors(2): ', function (answer) {
        if ([0, 1, 2].indexOf(+answer) === -1) {
            play();
        }
        var actionUtility = [0, 0, 0];
        var myAction = getAction(_strategy);
        console.log('crf action: ', myAction);
        var oppAction = +answer;
        actionUtility[oppAction] = 0;
        actionUtility[(oppAction + 1) % 3] = 1;
        actionUtility[(oppAction + 2) % 3] = -1;
        for (var j = 0; j < 3; j++) {
            regretSum[j] += actionUtility[j] - actionUtility[myAction];
        }
        play();
    });
}
play();
