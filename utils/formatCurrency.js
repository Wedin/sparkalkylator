import { localeRounded } from './numberUtils';

const MILLION = 1000000;

function formatCurrency(value) {
  if (value >= MILLION) {
    const rounded = localeRounded(value / MILLION, 2);
    return `${rounded} mnkr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default { formatCurrency };
