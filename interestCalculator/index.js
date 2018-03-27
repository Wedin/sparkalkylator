import { isNumeric } from './../utils/numberUtils';

const FREQUENCY = 12;

function calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years) {
  const interestPart = 1 + annualInterestRate / recalcTimesPerYear;
  return initialDeposit * interestPart ** (recalcTimesPerYear * years);
}

function calcCompoundInterestForSerie(monthlyDeposit, annualInterestRate, recalcTimesPerYear, years) {
  if (annualInterestRate === 0) {
    return monthlyDeposit * 12;
  }
  const interestPart = annualInterestRate / recalcTimesPerYear;
  const exponent = recalcTimesPerYear * years;
  const perPeriod = ((1 + interestPart) ** exponent - 1) / interestPart;
  return monthlyDeposit * perPeriod;
}

function calculateWithoutReturns(initialDeposit, monthlyDeposit, years) {
  return initialDeposit + monthlyDeposit * 12 * years;
}

function validateInput(input) {
  const values = Object.values(input);

  if (!values.every(isNumeric)) return {};
  // Validate properties individually
  const { interestRate, years, startCapital, monthlyDeposit } = input;
  return {
    startCapital: parseInt(startCapital, 10),
    monthlyDeposit: parseInt(monthlyDeposit, 10),
    interestRate: parseFloat(interestRate),
    years: parseInt(years, 10),
  };
}

function calculateCompoundInterest(input) {
  const { interestRate, years, startCapital, monthlyDeposit } = input;
  if (interestRate === 0) {
    return calculateWithoutReturns(startCapital, monthlyDeposit, years);
  }
  const interest = interestRate / 100;
  const compoundInterestForInitialValue = calcCompoundInterestForInitialValue(startCapital, interest, FREQUENCY, years);
  const compundInterestForSerie = calcCompoundInterestForSerie(monthlyDeposit, interest, FREQUENCY, years);

  return compoundInterestForInitialValue + compundInterestForSerie;
}

function calculateOld(input) {
  const validatedInput = validateInput(input);
  if (validatedInput === {}) {
    return { error: 'Input is not valid' };
  }
  const { years, startCapital, monthlyDeposit } = validatedInput;
  const returns = calculateCompoundInterest(validatedInput);
  const returnsWithoutInterest = calculateWithoutReturns(startCapital, monthlyDeposit, years);

  return {
    total: returns,
    yield: returns - returnsWithoutInterest,
  };
}

function calculatePerYearFnStep({ interestRate, startCapital, totalCapital, monthlyDeposit }, currentYear) {
  const partForInitial = calcCompoundInterestForInitialValue(totalCapital, interestRate, FREQUENCY, 1);
  const partForSeries = calcCompoundInterestForSerie(monthlyDeposit, interestRate, FREQUENCY, 1);
  const newCapital = partForInitial + partForSeries;
  const deposited = startCapital + (currentYear + 1) * monthlyDeposit * 12;
  return { year: currentYear + 1, value: newCapital, deposited };
}

function calculatePerYearFn(input, currentYear, acc) {
  const { years } = input;
  if (years === currentYear) {
    return acc;
  }

  const yearResult = calculatePerYearFnStep(input, currentYear);
  const modifiedInput = Object.assign(input, { totalCapital: yearResult.value });

  return calculatePerYearFn(modifiedInput, currentYear + 1, [...acc, yearResult]);
}

function calcReturnsPerYear(input) {
  const validatedInput = validateInput(input);
  if (Object.keys(validatedInput).length === 0) {
    return { error: 'Input is not valid' };
  }
  const { startCapital, interestRate } = validatedInput;
  const newInput = {
    ...validatedInput,
    interestRate: interestRate / 100,
    totalCapital: startCapital,
  };

  return {
    totals: calculatePerYearFn(newInput, 0, [
      {
        year: 0,
        value: startCapital,
        deposited: startCapital,
      },
    ]),
  };
}

export { calcReturnsPerYear, calcCompoundInterestForInitialValue, validateInput, calculateOld };
