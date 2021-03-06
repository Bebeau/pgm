import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';

import payment from '../assets/img/payment-icons.png';

const config = require('../config/keys');
const stripePromise = loadStripe(config.stripe.publishableKey);

// const advancedMatching = {};
// const options = {
//     autoConfig: true,
//     debug: false,
// };
// ReactPixel.init('141808286769279', advancedMatching, options);
// ReactPixel.pageView();

ReactGA.initialize('UA-44007005-13');
ReactGA.plugin.require('ecommerce');
ReactGA.pageview(window.location.pathname + window.location.search);

class Checkout extends React.Component {
  constructor() {
    super()
    // define state variables
    this.state = {
      isLoading: true,
      stripeToken: null,
      quantity: 1,
      price: '59.99',
      total: '62.19',
      stripeLoading: true,
    }
    this.checkout = this.checkout.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
      stripeLoading: false
    });
  }
  async checkout(event) {
    this.setState({
      isLoading: true
    });
    let qty = this.state.quantity;
    // Call your backend to create the Checkout session.
    // const { sessionId } = await this.fetchCheckoutSession();
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qty
      })
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      let displayError = document.getElementById('error-message');
      displayError.textContent = result.error.message;
    }
  }
  updateInputValue(evt) {
    let quantity = Number(evt.target.value),
        cost = (this.state.quantity * Number(this.state.total)) * 100;
    this.setState({
      quantity: quantity,
      cost: cost
    });
  }
  render() {
    let buttonText = this.state.isLoading ? "Please wait ..." : "Buy Now",
        buttonClassName = "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "");
    if(this.state.stripeToken && this.state.isLoading === true) {
      buttonText = "Processing payment..."
      buttonClassName = "Pay-Now Pay-Now-Disabled"
    }
    let subtotal = (this.state.quantity * Number(this.state.price)),
        tax = (subtotal * Number(0.0445)),
        total = (subtotal + tax);
    return (
      <div id="checkout">
        <article>
          <input type="number" min="1" name="quantity" value={this.state.quantity} onChange={evt => this.updateInputValue(evt)} placeholder="qty" />
          <span><span className="dollarsign">$</span>{this.state.price} / unit</span>
        </article>
        <article id="purchaseDetails">
          <div>
            <span>Subtotal</span>
            <span className="sub"><span className="dollarsign">$</span>{subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Tax</span>
            <span className="sub"><span className="dollarsign">$</span>{tax.toFixed(2)}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span className="sub">FREE</span>
          </div>
          <div id="total">
            <span>Total</span>
            <span><span className="dollarsign">$</span>{total.toFixed(2)}</span>
          </div>
        </article>
        <button className={buttonClassName} onClick={this.checkout}>{buttonText}</button>
        <div id="error-message"></div>
        <img src={payment} alt="Payment Icons" />
      </div>
    );
  }
}
export default Checkout;