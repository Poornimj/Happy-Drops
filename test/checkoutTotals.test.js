import assert from "node:assert/strict";
import test from "node:test";
import { calculateCheckoutShipping } from "../src/lib/checkoutTotals.js";

test("checkout shipping and totals update for delivery and pickup", () => {
  const cases = [
    { subtotal: 40, method: "DELIVERY", shipping: 5.9, total: 45.9 },
    { subtotal: 40, method: "PICKUP", shipping: 0, total: 40 },
    { subtotal: 60, method: "DELIVERY", shipping: 0, total: 60 },
    { subtotal: 60, method: "PICKUP", shipping: 0, total: 60 },
  ];

  for (const expected of cases) {
    const shipping = calculateCheckoutShipping(expected.subtotal, { deliveryMethod: expected.method });
    assert.equal(shipping, expected.shipping);
    assert.equal(expected.subtotal + shipping, expected.total);
  }

  assert.equal(calculateCheckoutShipping(40, { deliveryMethod: "PICKUP" }), 0);
  assert.equal(calculateCheckoutShipping(40, { deliveryMethod: "DELIVERY" }), 5.9);
});

test("workshop shipping remains zero", () => {
  assert.equal(calculateCheckoutShipping(40, { isWorkshop: true, deliveryMethod: "DELIVERY" }), 0);
});
