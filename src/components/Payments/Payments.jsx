import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Cart from "../../../src/components/Cart/Cart";

export default function Payments() {
  const stripePromise = loadStripe(
    "pk_test_51LaJmxF13fYbs0BsX1wFBN5ewQU5qWqBUdJx3DykrwIcy8D93ZK8Y1bmFQxMGnzDdEpfFwCE6hGSb2fHq9oUN5YJ00CoyP5txg"
  );

  return (
    <Elements stripe={stripePromise}>
      <Cart
        CardNumberElement={CardNumberElement}
        CardExpiryElement={CardExpiryElement}
        CardCvcElement={CardCvcElement}
      />
    </Elements>
  );
}
