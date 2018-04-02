import { localeRounded } from "./numberUtils";

const BILLION = 1e9;

function formatCurrency(value) {
  if (value >= BILLION) {
    const rounded = localeRounded(value / BILLION, 2);
    return `${rounded} md kr`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default { formatCurrency };
