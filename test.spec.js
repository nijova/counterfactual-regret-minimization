const helpers = require('./compiled/helpers.js');
const iterations = 10000;

describe("strategy array", function() {
  it("contains three actions", function() {
    expect(helpers.strategy.length).toBe(3);
  });
  it("sum of probabilities is 1", function() {
    expect(helpers.strategy.reduce((a, b) => a + b, 0)).toBe(1);
  });
});

describe("cfr strategy", function() {
  beforeEach(function() {
    helpers.reset();
  });
  it("plays rock against scissors", function() {
    let _oppStrategy = [0.3, 0.3, 0.4];
    for (let i = 0; i < iterations; i++) {
      let _strategy = helpers.getStrategy();
      const oppAction = helpers.getAction(_oppStrategy);
      const cfrAction = helpers.getAction(_strategy);
      helpers.updateRegretSum(cfrAction, oppAction);
    }
    expect(helpers.getStrategy()).toEqual([1,0,0]);
  })
  it("plays paper against rock", function() {
    let _oppStrategy = [0.4, 0.3, 0.3];
    for (let i = 0; i < iterations; i++) {
      let _strategy = helpers.getStrategy();
      const oppAction = helpers.getAction(_oppStrategy);
      const cfrAction = helpers.getAction(_strategy);
      helpers.updateRegretSum(cfrAction, oppAction);
    }
    expect(helpers.getStrategy()).toEqual([0,1,0]);
  })
  it("plays scissors against paper", function() {
    let _oppStrategy = [0.3, 0.4, 0.3];
    for (let i = 0; i < iterations; i++) {
      let _strategy = helpers.getStrategy();
      const oppAction = helpers.getAction(_oppStrategy);
      const cfrAction = helpers.getAction(_strategy);
      helpers.updateRegretSum(cfrAction, oppAction);
    }
    expect(helpers.getStrategy()).toEqual([0,0,1]);
  })
  it("plays any mixed strategy against random", function() {
    let _oppStrategy = [1 / 3, 1 / 3, 1 / 3];
    for (let i = 0; i < iterations; i++) {
      let _strategy = helpers.getStrategy();
      const oppAction = helpers.getAction(_oppStrategy);
      const cfrAction = helpers.getAction(_strategy);
      helpers.updateRegretSum(cfrAction, oppAction);
    }
    expect(helpers.getAverageStrategy()[0]).not.toEqual(0);
    expect(helpers.getAverageStrategy()[0]).not.toEqual(1);
    expect(helpers.getAverageStrategy()[1]).not.toEqual(0);
    expect(helpers.getAverageStrategy()[1]).not.toEqual(1);
    expect(helpers.getAverageStrategy()[2]).not.toEqual(0);
    expect(helpers.getAverageStrategy()[2]).not.toEqual(1);
  })
});
