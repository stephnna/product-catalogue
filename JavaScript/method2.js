// calculate the discount amount based on rules
const calculateDiscount = (cart, discounts) => {
  let maxDiscount = 0;
  let appliedDiscount = '';

  // Iterate through each discount rule
  for (const discountRule in discounts) {
      const discountAmount = discounts[discountRule](cart);

      if (discountAmount > maxDiscount) {
          maxDiscount = discountAmount;
          appliedDiscount = discountRule;
      }
  }

  return { appliedDiscount, maxDiscount };
}

// Discount rules
const discountRules = {
  flat_10_discount: (cart) => (cart.total > 200 ? 10 : 0),
  bulk_5_discount: (cart) => (cart.quantity > 10 ? cart.price * 0.05 : 0),
  bulk_10_discount: (cart) => (cart.totalQuantity > 20 ? cart.total * 0.1 : 0),
  tiered_50_discount: (cart) => ((cart.totalQuantity > 30 && cart.quantity > 15) ? (cart.price * 0.5) : 0)
};

// calculate the cart details
const calculateCart = products => {
  let subtotal = 0;
  let totalQuantity = 0;
  let shippingFee = 0;
  let giftWrapFee = 0;

  // Iterate through each product
  for (const product of products) {
      const quantity = parseInt(prompt(`Enter the quantity of ${product.name}:`));
      const isGiftWrapped = confirm(`Is ${product.name} wrapped as a gift?`);

      const totalAmount = product.price * quantity;
      subtotal += totalAmount;
      totalQuantity += quantity;

      giftWrapFee += isGiftWrapped ? quantity : 0;
  }

  // Calculate shipping fee
  shippingFee = Math.ceil(totalQuantity / 10) * 5;

  const discount = calculateDiscount({ total: subtotal, quantity: totalQuantity, totalQuantity }, discountRules);

  // Output the details
  console.log(`Product Name: ${products[0].name}`);
  console.log(`Quantity: ${totalQuantity}`);
  console.log(`Total Amount: ${subtotal}`);
  console.log(`Subtotal: ${subtotal}`);
  console.log(`Discount Applied: ${discount.appliedDiscount} - ${discount.maxDiscount}`);
  console.log(`Shipping Fee: ${shippingFee}`);
  console.log(`Gift Wrap Fee: ${giftWrapFee}`);
  console.log(`Total: ${subtotal - discount.maxDiscount + shippingFee + giftWrapFee}`);
}

// Example usage with your provided products
const products = [
  { name: 'Product A', price: 20 },
  { name: 'Product B', price: 40 },
  { name: 'Product C', price: 50 }
];

calculateCart(products);
