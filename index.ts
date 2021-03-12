const readline = require('readline');
import {rps, strategy, getStrategy, getAction, updateRegretSum } from './helpers';

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
      const cfrAction = getAction(_strategy);
      console.log(`- CFR chose ${rps[cfrAction]}.`);
      console.log();
      const playerAction = move;
      updateRegretSum(cfrAction, playerAction);
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
