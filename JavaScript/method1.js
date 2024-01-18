// Class representing a product
class Product {
  constructor(name, price) {
      this.name = name;
      this.price = price;
  }
}

// Class representing a shopping cart
class Cart {
  constructor(products) {
      this.products = products;
      this.items = [];
  }

  // Method to add a product to the cart
  addToCart(product, quantity, isGiftWrapped) {
      this.items.push({ product, quantity, isGiftWrapped });
  }

  // Method to calculate the subtotal of the cart
  calculateSubtotal() {
      return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Method to calculate the total quantity of items in the cart
  calculateTotalQuantity() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Method to calculate the shipping fee based on the total quantity of items
  calculateShippingFee() {
      const totalQuantity = this.calculateTotalQuantity();
      return Math.ceil(totalQuantity / 10) * 5;
  }

  // Method to calculate the gift wrap fee based on the number of items with gift wrap
  calculateGiftWrapFee() {
      return this.items.filter(item => item.isGiftWrapped).length;
  }

  // Method to apply discount rules and determine the most beneficial discount
  applyDiscountRules() {
      const total = this.calculateSubtotal();
      const totalQuantity = this.calculateTotalQuantity();

      const discountRules = {
          flat_10_discount: () => (total > 200 ? 10 : 0),
          bulk_5_discount: () => (totalQuantity > 10 ? total * 0.05 : 0),
          bulk_10_discount: () => (totalQuantity > 20 ? total * 0.1 : 0),
          tiered_50_discount: () => ((totalQuantity > 30 && this.items.some(item => item.quantity > 15)) ? (total * 0.5) : 0)
      };

      let maxDiscount = 0;
      let appliedDiscount = '';

      for (const discountRule in discountRules) {
          const discountAmount = discountRules[discountRule]();
          if (discountAmount > maxDiscount) {
              maxDiscount = discountAmount;
              appliedDiscount = discountRule;
          }
      }

      return { appliedDiscount, maxDiscount };
  }

  // Method to display the details of the cart
  displayCartDetails() {
      console.log(`Product Name: ${this.products[0].name}`);
      console.log(`Quantity: ${this.calculateTotalQuantity()}`);
      console.log(`Total Amount: ${this.calculateSubtotal()}`);
      console.log(`Subtotal: ${this.calculateSubtotal()}`);
      const discount = this.applyDiscountRules();
      console.log(`Discount Applied: ${discount.appliedDiscount} - ${discount.maxDiscount}`);
      console.log(`Shipping Fee: ${this.calculateShippingFee()}`);
      console.log(`Gift Wrap Fee: ${this.calculateGiftWrapFee()}`);
      console.log(`Total: ${this.calculateSubtotal() - discount.maxDiscount + this.calculateShippingFee() + this.calculateGiftWrapFee()}`);
  }
}

// Example with your provided products
const products = [
  new Product('Product A', 20),
  new Product('Product B', 40),
  new Product('Product C', 50)
];

const cart = new Cart(products);

// Prompt the user for quantities and gift wrap preferences
for (const product of products) {
  const quantity = parseInt(prompt(`Enter the quantity of ${product.name}:`));
  const isGiftWrapped = confirm(`Is ${product.name} wrapped as a gift?`);
  cart.addToCart(product, quantity, isGiftWrapped);
}

// Display the details of the cart
cart.displayCartDetails();
