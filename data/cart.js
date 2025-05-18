export const cart = [];

export function addToCart(productId, quantity) {
  let matchingItem;
    
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
    
  }
}