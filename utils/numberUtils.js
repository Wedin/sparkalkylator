const isNumeric = num => !isNaN(parseFloat(num)) && isFinite(num);

const localeRounded = (num, digits) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });

export { isNumeric, localeRounded };
