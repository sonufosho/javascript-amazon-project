import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id: '7',
    deliveryDays: 7,
    priceCents: 0
  }, {
    id: '3',
    deliveryDays: 3,
    priceCents: 499
  }, {
    id: '1',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let today = dayjs();
  
  let remainingDays = deliveryOption.deliveryDays;

  while (remainingDays > 0) {
    today = today.add(1, 'day');

    if (today.format('dddd') !== 'Saturday' && today.format('dddd') !== 'Sunday') {
      remainingDays--;
    }
  }

  const dateString = today.format('dddd, MMMM D');
  
  return dateString;
}