export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {  
  cart = [
    {
      productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      quantity: 2,
      deliveryOptionId: '7'
    }, {
      productId: '82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
      quantity: 1,
      deliveryOptionId: '3'
    }
  ];
}

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
      quantity: quantity,
      deliveryOptionId: '7'
    });
    
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }

    cart = newCart;
  });

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', (response) => {
    console.log(xhr.response);
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}