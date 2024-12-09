import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ cartItems, onContinueShopping }) => {
  const dispatch = useDispatch();

  // Function to calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.slice(1)); // Convert cost to number (removing "$")
      return total + item.quantity * itemCost;
    }, 0);
  };

  // Function to calculate the subtotal for a specific item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.slice(1)); // Convert cost to number
    return item.quantity * itemCost;
  };

  // Increment the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item.name); // Remove item if quantity reaches 0
    }
  };

  // Remove an item from the cart
  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // Handle the checkout button (placeholder functionality)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total quantity for the cart icon
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <button className="continue-shopping-button" onClick={onContinueShopping}>
        Continue Shopping
      </button>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Unit Price: {item.cost}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <p>Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
                </div>
                <button className="remove-button" onClick={() => handleRemove(item.name)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total Items: {calculateTotalQuantity()}</h3>
            <h3>Total Cost: ${calculateTotalAmount().toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
