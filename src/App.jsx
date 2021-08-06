import React from 'react';
import CheckoutLayout from './Checkout/Layout'
import BuyNowButton from './Checkout/BuyNowButton'

export default function App(props) {
  return (
    <div className="App">
    <BuyNowButton feed={props} />
    </div>
  );
}

