export function calculateCheckoutShipping(subtotal, { isWorkshop = false, deliveryMethod = "DELIVERY" } = {}) {
  if (isWorkshop || deliveryMethod === "PICKUP") return 0;
  return subtotal >= 50 ? 0 : 5.9;
}
