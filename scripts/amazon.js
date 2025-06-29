import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// callback
loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
  let productHTML = '';

  products.forEach((product) => {
    productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productHTML;

  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`).value;
      const quantity = Number(quantitySelector);

      addToCart(productId, quantity);

      const cartQuantity = calculateCartQuantity();
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; 
      
      renderAddedToCart(productId);
    });
  });

  const addedTimeoutIds = {};

  function renderAddedToCart(productId) {
    const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
    addedElement.classList.add('render-added-to-cart');

    const previousTimeoutId = addedTimeoutIds[productId];

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedElement.classList.remove('render-added-to-cart');
    }, 2000);

    addedTimeoutIds[productId] = timeoutId;
  }
}