import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {renderPaymentSummary} from './paymentSummary.js'
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary() {
  let orderSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingItem = getProduct(cartItem.productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    orderSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              $${matchingItem.getPrice()}
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
            ${deliveryOptionHTML(matchingItem, cartItem)}
          </div>
        </div>
      </div>
    `
  });

  function deliveryOptionHTML(matchingItem, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingItem.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

  // const cartQuantity = calculateCartQuantity();
  // document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

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

      // document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderOrderSummary();

      // const cartQuantity = calculateCartQuantity();
      // document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
      renderCheckoutHeader();

      renderPaymentSummary();
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

      // const cartQuantity = calculateCartQuantity();
      // document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
      renderCheckoutHeader();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((radio) => {
    radio.addEventListener('click', () => {
      const {productId, deliveryOptionId} = radio.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}