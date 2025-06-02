import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let orderSummaryHTML = '';

cart.forEach((cartItem) => {
  let matchingItem;

  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingItem = product;
    }
  });

  orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
            data-product-id="${matchingItem.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingItem.id}">
            <span class="save-quantity-link link-primary js-save-quantity"
            data-product-id="${matchingItem.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

const cartQuantity = calculateCartQuantity();
document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    //we can also use .splice() to directly remove a product from cart

    // cart.forEach((cartItem, i) => {
    //   if (cartItem.productId === productId) {
    //     cart.splice(i, 1);
    //     console.log(cart);
    //   }
    // });
    
    removeFromCart(productId);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();

    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  });
});

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
    const newQuantity = Number(quantityInput);

    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  });
});