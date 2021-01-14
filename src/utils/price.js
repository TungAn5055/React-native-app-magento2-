export const currencySymbols = Object.freeze({
  USD: '$',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  CAD: 'CA$',
  CNY: 'CN¥',
  JPY: '¥',
  SEK: 'SEK',
  CHF: 'CHF',
  INR: '₹',
  KWD: 'د.ك',
  RON: 'RON',
});

export const priceSignByCode = (code) => {
  const sign = currencySymbols[code];
  if (sign) {
    return sign;
  }
  // If no currency symbol specified for currency code, return currency code
  return code;
};
