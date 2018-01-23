import { isNumeric } from './../utils/numberUtils';

export default class {
  constructor() {
    this.frequency = 12;
    this.calculate = this.calculate.bind(this);
    this.calculateCompoundInterest = this.calculateCompoundInterest.bind(this);
  }

  static calcCompoundInterestForInitialValue(initialDeposit, annualInterestRate, recalcTimesPerYear, years) {
    const interestPart = 1 + annualInterestRate / recalcTimesPerYear;
    return initialDeposit * interestPart ** (recalcTimesPerYear * years);
  }

  static calcCompoundInterestForSerie(monthlyDeposit, annualInterestRate, recalcTimesPerYear, years) {
    if (annualInterestRate === 0) {
      return monthlyDeposit * 12;
    }
    const interestPart = annualInterestRate / recalcTimesPerYear;
    const exponent = recalcTimesPerYear * years;
    const perPeriod = ((1 + interestPart) ** exponent - 1) / interestPart;
    return monthlyDeposit * perPeriod;
  }

  static calculateWithoutReturns(initialDeposit, monthlyDeposit, years) {
    return initialDeposit + monthlyDeposit * 12 * years;
  }

  static validateInput(input) {
    const values = Object.values(input);

    if (!values.every(isNumeric)) return {};
    // Validate properties individually
    const { interestRate, years, startCapital, monthlyDeposit } = input;
    return {
      startCapital: parseInt(startCapital, 10),
      monthlyDeposit: parseInt(monthlyDeposit, 10),
      interestRate: parseFloat(interestRate),
      years: parseInt(years, 10)
    };
  }

  calculateCompoundInterest(input) {
    const { interestRate, years, startCapital, monthlyDeposit } = input;
    if (interestRate === 0) {
      return this.constructor.calculateWithoutReturns(startCapital, monthlyDeposit, years);
    }
    const interest = interestRate / 100;
    const compoundInterestForInitialValue = this.constructor.calcCompoundInterestForInitialValue(startCapital, interest, this.frequency, years);
    const compundInterestForSerie = this.constructor.calcCompoundInterestForSerie(monthlyDeposit, interest, this.frequency, years);

    return compoundInterestForInitialValue + compundInterestForSerie;
  }

  calculate(input) {
    const validatedInput = this.constructor.validateInput(input);
    if (validatedInput === {}) {
      return { error: 'Input is not valid' };
    }
    const { years, startCapital, monthlyDeposit } = validatedInput;
    const returns = this.calculateCompoundInterest(validatedInput);
    const returnsWithoutInterest = this.constructor.calculateWithoutReturns(startCapital, monthlyDeposit, years);

    return {
      total: returns,
      yield: returns - returnsWithoutInterest
    };
  }

  calculatePerYearFn(input, currentYear, acc) {
    const { interestRate, years, startCapital, totalCapital, monthlyDeposit } = input;
    if (years === currentYear) {
      return acc;
    }
    const partForInitial = this.constructor.calcCompoundInterestForInitialValue(totalCapital, interestRate, this.frequency, 1);
    const partForSeries = this.constructor.calcCompoundInterestForSerie(monthlyDeposit, interestRate, this.frequency, 1);
    const newCapital = partForInitial + partForSeries;
    const deposited = startCapital + (currentYear + 1) * monthlyDeposit * 12;
    const newAcc = [...acc, { year: currentYear + 1, value: newCapital, deposited }];
    const nextYear = currentYear + 1;
    return this.calculatePerYearFn(
      {
        interestRate,
        monthlyDeposit,
        years,
        startCapital,
        totalCapital: newCapital
      },
      nextYear,
      newAcc
    );
  }

  calculatePerYear(input) {
    const validatedInput = this.constructor.validateInput(input);
    if (Object.keys(validatedInput).length === 0) {
      return { error: 'Input is not valid' };
    }
    const { startCapital } = validatedInput;
    const newInput = {
      ...validatedInput,
      interestRate: validatedInput.interestRate / 100,
      totalCapital: startCapital
    };
    return {
      totals: this.calculatePerYearFn(newInput, 0, [
        {
          year: 0,
          value: validatedInput.startCapital,
          deposited: validatedInput.startCapital
        }
      ])
    };
  }
}
