import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Access cart items
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.slice(1)); // Convert cost to number
      return total + item.quantity * itemCost;
    }, 0).toFixed(2);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping(); // Call parent function
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item.name); // Remove item if quantity reaches 0
    }
  };

  // Remove item from cart
  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName)); // Dispatch action to remove item
  };

  // Calculate total cost for an individual item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.slice(1)); // Convert cost to number
    return (item.quantity * itemCost).toFixed(2);
  };

  // Handle checkout (placeholder)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total quantity of items
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h3>Total Items: {calculateTotalQuantity()}</h3>
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
