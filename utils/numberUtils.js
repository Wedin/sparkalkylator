const isNumeric = num => !Number.isNaN(parseFloat(num)) && Number.isFinite(Math.abs(num));

const localeRounded = (num, digits) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });

export { isNumeric, localeRounded };
