import React from 'react';
import '../styles/ItemInput.css';

export default function ItemInput({
  newItem,
  itemPrice,
  quantity,
  editingIndex,
  handleItemInputChange,
  handlePriceInputChange,
  handleQuantityInputChange,
  addItem,
  cancelEdit,
}) {
  return (
    <>
      <h2>Items</h2>
    <div className="event-items-container">
      <input
        className="item-input"
        type="text"
        placeholder="Item"
        value={newItem}
        onChange={handleItemInputChange}
      />
      <input
        className="price-input"
        type="number"
        placeholder="Price"
        value={itemPrice}
        onChange={handlePriceInputChange}
      />
      <input
        className="quantity-input"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityInputChange}
      />
      <button className="add-btn" onClick={addItem}> {/* ✅ Call `addItem` here */}
        {editingIndex !== null ? '✔️' : 'Add'}
      </button>
      {editingIndex !== null && (
        <button className="cancel-btn" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </div>
    </>
    
  );
}
