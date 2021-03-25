import React from "react";

export default function CartItem({
  removeCartItem,
  increaseCartItemQty,
  decreaseCartItemQty,
  cart_img,
  // cart_qty,
  cart_amount,
  cart_title,
}) {
  console.log(cart_title);
  return (
    <div className="cart-box">
      <div className="row">
        <div className="cart-item-text">{cart_title}</div>
        <i
          type="button"
          className="btn fa fa-times remove-cart-item"
          onClick={removeCartItem}
        ></i>
      </div>
      <div className="img-box">
        <img width="auto" height="80" src={cart_img} />
      </div>
      <div className="row quantity-box">
        <div
          className="btn-group btn-group-sm quantity-box-line"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn bg-white"
            onClick={decreaseCartItemQty}
          >
            -
          </button>
          <button type="button quantity-box-price" className="btn bg-white">
            1
          </button>
          <button
            type="button"
            className="btn bg-white"
            onClick={increaseCartItemQty}
          >
            +
          </button>
        </div>
        <div className="price-box">
          <p className="price">{cart_amount}</p>
        </div>
      </div>
    </div>
  );
}
