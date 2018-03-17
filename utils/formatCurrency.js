function formatCurrency(value) {
  return `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export { formatCurrency };
