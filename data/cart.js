export const cart = [
  {
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 4
  }, {
    productId: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
    quantity: 2
  }
];

export function addToCart(productId, quantity) {
  let matchingItem;
    
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
    
  }
}