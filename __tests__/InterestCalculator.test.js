import InterestCalculator from '../interestCalculator/interestCalculator';
import { isNumeric } from '../utils/numberUtils';

let interestCalculator;

beforeAll(() => {
  interestCalculator = new InterestCalculator();
});

describe('isNumeric', () => {
  test('1 is numeric', () => {
    expect(isNumeric('1')).toBeTruthy();
  });

  test('1.12 is numeric', () => {
    expect(isNumeric('1.12')).toBeTruthy();
  });

  test('10aa is not numeric', () => {
    expect(isNumeric('10aa')).toBeFalsy();
  });
});

test('Parses input correctly', () => {
  expect(
    InterestCalculator.validateInput({
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
    InterestCalculator.validateInput({
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
    const total = InterestCalculator.calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(1000);
  });

  test('Should handle inital deposit 0', () => {
    const initialDeposit = 0;
    const annualInterestRate = 1000;
    const recalcTimesPerYear = 10;
    const years = 10;
    const total = InterestCalculator.calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(0);
  });

  test('Should handle 0 years', () => {
    const initialDeposit = 1000;
    const annualInterestRate = 10;
    const recalcTimesPerYear = 12;
    const years = 0;
    const total = InterestCalculator.calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years);
    expect(total).toBe(1000);
  });
});

describe('Correct compund interest', () => {
  test('For montly savings with start deposit', () => {
    const compundInterest = interestCalculator.calculate({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 5,
      years: 10,
    });
    expect(compundInterest.total).toBeCloseTo(23763.28);
  });

  test('For montly savings with start deposit2', () => {
    const compundInterest = interestCalculator.calculate({
      startCapital: 0,
      monthlyDeposit: 1000,
      interestRate: 8,
      years: 2,
    });
    expect(compundInterest.total).toBeCloseTo(25933.19);
  });

  test('for 0 interest', () => {
    const compundInterest = interestCalculator.calculate({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 0,
      years: 10,
    });
    expect(compundInterest.total).toEqual(17000);
  });

  test('For 0 monthlyDeposit', () => {
    const compundInterest = interestCalculator.calculate({
      startCapital: 5000,
      monthlyDeposit: 0,
      interestRate: 0,
      years: 10,
    });
    expect(compundInterest.total).toEqual(5000);
  });

  test('For 0 years', () => {
    const compundInterest = interestCalculator.calculate({
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
    const allYears = interestCalculator.calculatePerYear({
      startCapital: 10000,
      monthlyDeposit: 1000,
      interestRate: 10,
      years: 1,
    });
    const year1 = allYears.totals.find(res => res.year === 1);
    expect(year1.value).toBeCloseTo(23612.7);
  });

  test('For 100 monthlyDeposit', () => {
    const allYears = interestCalculator.calculatePerYear({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 5,
      years: 10,
    });
    const year10 = allYears.totals.find(res => res.year === 10);
    expect(year10.value).toBeCloseTo(23763.28);
  });

  test('With 0 interest', () => {
    const allYears = interestCalculator.calculatePerYear({
      startCapital: 5000,
      monthlyDeposit: 100,
      interestRate: 0,
      years: 10,
    });
    const year10 = allYears.totals.find(res => res.year === 10);
    expect(year10.value).toBe(17000);
  });
  test('Should handle erroneous input', () => {
    const result = interestCalculator.calculatePerYear({
      startCapital: 5000,
      monthlyDeposit: 0,
      interestRate: 'asdf',
      years: '',
    });
    expect(result).toHaveProperty('error');
  });
});
