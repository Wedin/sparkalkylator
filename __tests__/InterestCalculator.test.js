import { calcCompoundInterestForInitialValue, validateInput, calculateOld, calcReturnsPerYear } from '../interestCalculator';

test('Parses input correctly', () => {
  expect(
    validateInput({
      startCapital: '1000000',
      monthlyDeposit: '1000',
      interestRate: '8.2',
      years: '10',
    })
  ).toEqual({
    startCapital: 1000000,
    monthlyDeposit: 1000,
    interestRate: 8.2,
    years: 10,
  });
});

test('Handle parse of incorrect input', () => {
  expect(
    validateInput({
      startCapital: '1000000',
      monthlyDeposit: 'asdf',
      interestRate: '8.2',
      years: '10',
    })
  ).toEqual({});
});

describe('Compound interest without additions', () => {
  test('Should handle 0% interest', () => {
    const initialDeposit = 1000;
    const annualInterestRate = 0;
    const recalcTimesPerYear = 12;
    const years = 5;
    const total = calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(1000);
  });

  test('Should handle inital deposit 0', () => {
    const initialDeposit = 0;
    const annualInterestRate = 1000;
    const recalcTimesPerYear = 10;
    const years = 10;
    const total = calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(0);
  });

  test('Should handle 0 years', () => {
    const initialDeposit = 1000;
    const annualInterestRate = 10;
    const recalcTimesPerYear = 12;
    const years = 0;
    const total = calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(1000);
  });
});

describe('Correct compund interest', () => {
  test('For montly savings with start deposit', () => {
    const compundInterest = calculateOld({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 5,
      years: 10,
    });
    expect(compundInterest.total).toBeCloseTo(23763.28);
  });

  test('For montly savings with start deposit2', () => {
    const compundInterest = calculateOld({
      startCapital: 0,
      monthlyDeposit: 1000,
      interestRate: 8,
      years: 2,
    });
    expect(compundInterest.total).toBeCloseTo(25933.19);
  });

  test('for 0 interest', () => {
    const compundInterest = calculateOld({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 0,
      years: 10,
    });
    expect(compundInterest.total).toEqual(17000);
  });

  test('For 0 monthlyDeposit', () => {
    const compundInterest = calculateOld({
      startCapital: 5000,
      monthlyDeposit: 0,
      interestRate: 0,
      years: 10,
    });
    expect(compundInterest.total).toEqual(5000);
  });

  test('For 0 years', () => {
    const compundInterest = calculateOld({
      startCapital: 10000,
      monthlyDeposit: 100,
      interestRate: 10,
      years: 0,
    });
    expect(compundInterest.total).toEqual(10000);
  });
});

describe('Calculate year by year', () => {
  test('For 0 monthlyDeposit', () => {
    const allYears = calcReturnsPerYear({
      startCapital: 10000,
      monthlyDeposit: 1000,
      interestRate: 10,
      years: 1,
    });
    const year1 = allYears.totals.find(res => res.year === 1);
    expect(year1.value).toBeCloseTo(23612.7);
  });

  test('For 100 monthlyDeposit', () => {
    const allYears = calcReturnsPerYear({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 5,
      years: 10,
    });
    const year10 = allYears.totals.find(res => res.year === 10);
    expect(year10.value).toBeCloseTo(23763.28);
  });

  test('With 0 interest', () => {
    const allYears = calcReturnsPerYear({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 0,
      years: 10,
    });
    const year10 = allYears.totals.find(res => res.year === 10);
    expect(year10.value).toBe(17000);
  });

  test('With max input', () => {
    const allYears = calcReturnsPerYear({
      startCapital: 300000,
      monthlyDeposit: 15000,
      interestRate: 25,
      years: 50,
    });
    expect(allYears.totals.length).toBe(51);
  });

  test('Should handle erroneous input', () => {
    const result = calcReturnsPerYear({
      startCapital: 5000,
      monthlyDeposit: 0,
      interestRate: 'asdf',
      years: '',
    });
    expect(result).toHaveProperty('error');
  });
});
