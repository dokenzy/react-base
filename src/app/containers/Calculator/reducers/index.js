import CreateReducer from 'base/shared/CreateReducer';
import { CalculatorModel } from '../models';
import Types from '../types';

const actionHandlers = {
  [Types.RESULT]: result,
  [Types.INPUT_NUMBER]: inputNumber,
  [Types.INPUT_DECIMAL]: inputDecimal,
  [Types.INPUT_OPERATOR]: inputOperator,
  [Types.INPUT_OPERATION]: inputOperation
};

function inputOperator(state, action) {
  const currentOperator = action.operator;
  const prevOperator = state.get('operator');
  const prevValue = state.get('prevValue');
  const nextValue = state.get('nextValue');
  const newValue = state.get('newValue');

  const result = (newValue) ?
  calculate(prevOperator, prevValue, nextValue) : prevValue;

  return state
    .set('nextValue', 0)
    .set('newValue', true)
    .set('display', result)
    .set('prevValue', result)
    .set('resetDisplay', true)
    .set('operator', currentOperator);
}

function inputNumber( state, action) {
  const selectedValue = action.value;
  const newValue = state.get('newValue');
  const prevValue = (newValue) ? state.get('nextValue') : state.get('prevValue');
  const value = parseFloat(`${prevValue}${selectedValue}`);

  if (newValue) {
    return state
      .set('display', value)
      .set('nextValue', value)
      .set('resetDisplay', false);
  } else {
    return state
      .set('display', value)
      .set('prevValue', value)
      .set('resetDisplay', false);
  }
}

function inputDecimal( state ) {
  const value = `${state.get('prevValue')}.`;
  return state
    .set('display', value)
    .set('newValue', false)
    .set('prevValue', value);
}

function inputOperation( state, action ) {
  let value = 0;
  const operation = action.value;
  const prevValue = state.get('prevValue');

  switch (operation) {
    case Types.PERCENT:
      value = prevValue / 100;
      return state
        .set('display', value)
        .set('prevValue', value);

    case Types.CLEAN:
      value = 0;
      return state
        .set('display', value)
        .set('prevValue', value)
        .set('nextValue', value)
        .set('resetDisplay', true);

    case Types.CHANGE_SIGN:
      value = (Math.sign(prevValue) === 1) ?
      -Math.abs(prevValue) : Math.abs(prevValue);
      return state
        .set('display', value)
        .set('prevValue', value);
  }
}

function calculate( operator, prevValue, nextValue) {
  const result = {
    [Types.SUM]: () => prevValue + nextValue,
    [Types.DIVIDE]: () => prevValue / nextValue,
    [Types.MULTIPLY]: () => prevValue * nextValue,
    [Types.SUBSTRACT]: () => prevValue - nextValue
  };

  return result[operator]();
}

function result(state) {
  const operator = state.get('operator');
  const prevValue = state.get('prevValue');
  const nextValue = state.get('nextValue');
  const result = calculate(operator, prevValue, nextValue);

  return state
    .set('newValue', false)
    .set('display', result)
    .set('prevValue', result)
    .set('resetDisplay', true);
}

export default CreateReducer(actionHandlers, new CalculatorModel());
