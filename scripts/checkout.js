import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProductsFetch} from '../data/products.js'
import {loadCartFetch} from '../data/cart.js';

async function loadPage() {
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ]);

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();