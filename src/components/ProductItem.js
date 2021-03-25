import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import sample_img from "../../src/assets/images/sample_img.png";
import sample_img2 from "../../src/assets/images/sample_img2.png";
import sample_img3 from "../../src/assets/images/sample_img3.png";
import sample_img1 from "../../src/assets/images/sample_img1.png";
import sample_img5 from "../../src/assets/images/sample_img5.png";
import CartItem from "../components/CartItem";

export default function ProductItem({ key, _id, _image, _title, _price }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartItems);
    console.log("calling....");
  }, [cartItems]);

  const addCartItem = (key, _id, _price, _image, _title) => {
    let new_items = [...cartItems];

    const data = {
      id: _id,
      title: _title,
      image: _image,
      price: _price,
    };

    new_items.push(data);

    setCartItems(new_items);
  };

  const removeCartItem = (i) => {
    const newcart = cartItems.filter((cart_item) => cart_item != cartItems[i]);
    setCartItems(newcart);
  };

  const increaseCartItemQty = (i) => {
    const cart_item_copy = cartItems.find(
      (cart_item) => cart_item === cartItems[i]
    );
    const cart_item_price = cartItems.find(
      (cart_item) => cart_item === cartItems[i]
    ).price;

    cart_item_copy.quantity = cart_item_copy.quantity + 1;
    cart_item_copy.price = cart_item_copy.quantity * cart_item_price;

    cartItems[i] = cart_item_copy;
    const newcart = cartItems.concat(cartItems[i]);

    setCartItems(newcart);
  };

  const decreaseCartItemQty = (i) => {
    const cart_item_copy = cartItems.find(
      (cart_item) => cart_item === cartItems[i]
    );
    cart_item_copy.quantity = cart_item_copy.quantity - 1;
    cart_item_copy.price = cart_item_copy.quantity * cart_item_copy.price;

    cartItems[i] = cart_item_copy;
    const newcart = cartItems.concat(cartItems[i]);

    if (newcart[i].quantity < 1) {
      return removeCartItem(i);
    }

    setCartItems(newcart);
  };

  return (
    <>
      <div className="col-6 col-sm-6 col-md-4">
        {console.log(cartItems)}
        <div className="product-holder">
          <img src={_image} className="img-style" />
          <p className="product-title-text">{_title}</p>
          <p className="product-title-text mb-0">
            From: $
            <NumberFormat
              value={`${_price}.00`}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
          <button
            className="btn btn-demo add-to-cart-btn"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => addCartItem(key, _id, _price, _image, _title)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div
        className="modal left fade"
        id="exampleModal"
        tabIndex=""
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ backgroundColor: "#f2f2ef" }}>
            <div className="modal-body">
              <div className="row">
                <i
                  type="button"
                  data-dismiss="modal"
                  className="btn fa fa-chevron-circle-right chev"
                ></i>

                <div className="cart-text">YOUR CART</div>
              </div>
              <div className="dropdown">
                <button
                  style={{ borderRadius: 0 }}
                  className="btn bg-white dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  NGN
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>

              {!cartItems.length && (
                <h5 className="empty-cart-text">Your Cart is Empty!</h5>
              )}
              {cartItems.map((cart_item, i) => (
                <CartItem
                  key={cart_item.index}
                  cart_img={cart_item.image}
                  cart_amount={`USD ${cart_item.price}.00`}
                  cart_qty={cart_item.quantity}
                  cart_title={cart_item.title}
                  removeCartItem={() => removeCartItem(i)}
                  increaseCartItemQty={() => increaseCartItemQty(i)}
                  decreaseCartItemQty={() => decreaseCartItemQty(i)}
                />
              ))}
            </div>
            <hr />
            <div className="row">
              <p className="col-6 ml-2">Subtotal</p>
              <p className="col-5" style={{ textAlign: "right" }}>
                $61.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
