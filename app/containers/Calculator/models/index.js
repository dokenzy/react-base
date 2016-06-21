import { Record } from 'immutable';

const CalculatorModel = new Record({
  display:0,
  operator:0,
  prevValue: 0,
  nextValue: 0,
  resetDisplay: false,
  history: [],
});

function setInitialState(initialState){
  return initialState.Calculator = new CalculatorModel();
}

export { CalculatorModel, setInitialState };
