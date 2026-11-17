import formatMoney, {} from '../scripts/utils/formatMoney.js';

// test suite
console.log('test suite: formatMoney');

// the code converts cents into dollars
console.log('converts cents into dollars');

if (formatMoney(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

// the code works with 0
console.log('works with 0');

if (formatMoney(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

// the code rounds up to the nearest cent
console.log('rounds up to the nearest cent');

if (formatMoney(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}