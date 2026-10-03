export const cart = [];

export function addToCart(productId) {
  let matchingCartItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingCartItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  if (matchingCartItem) {
    matchingCartItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }
}