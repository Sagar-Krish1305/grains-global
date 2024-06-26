import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setcartvalue } from "../../store/AuthSlice";
const CartPage = () => {
    const lentilImage = "one.jpg";
    const [cartitems, setcartitems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [iscartempty, setiscartempty] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        let cart = localStorage.getItem("CartItems");
        if (cart) {
            cart = JSON.parse(cart);
            setcartitems(cart);
            const totalprice =
                Math.round(
                    cart.reduce((total, current) => {
                        return total + current.price;
                    }, 0) * 100
                ) / 100;
            console.log(totalprice);
            settotalPrice(totalprice);
            setiscartempty(false);
        } else {
            cart = [];
            settotalPrice(0);
            setiscartempty(true);
        }
    }, []);

    const deleteItem = (name) => {
        const updatedCartItems = cartitems.filter((item) => item.name !== name);
        setcartitems(updatedCartItems);
        dispatch(setcartvalue(updatedCartItems.length))
        localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
        const totalprice =
            Math.round(
                updatedCartItems.reduce((total, current) => {
                    return total + current.price;
                }, 0) * 100
            ) / 100;
        settotalPrice(totalprice);
        if (updatedCartItems.length === 0) {
            setiscartempty(true);
        }
    };

    function buynowhandle() {
        setShowModal(true);
    }

    return (
        <>
            <div className="cart-heading">
                <h1>Your Cart</h1>
            </div>
            <div className="cart-container">
                <div className="cart-items">
                    {cartitems &&
                        cartitems.length > 0 &&
                        cartitems.map((cartitem) => (
                            <div className="cart-item" key={cartitem.name}>
                                <img src={lentilImage} alt="Yellow Lentil" />
                                <div className="item-details">
                                    <span>{cartitem.name}</span>
                                </div>
                                <div className="item-details">
                                    <span>${cartitem.price}/kg</span>
                                </div>
                                <button className="delete-button" onClick={() => deleteItem(cartitem.name)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        ))}
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>
                        <span className="label">Order Total</span>
                        <span className="value">${totalPrice}</span>
                    </p>
                    <p>
                        <span className="label">Discount</span>
                        <span className="value">-$0</span>
                    </p>
                    <p className="total">
                        <span className="label">Total</span>
                        <span className="value">${totalPrice}</span>
                    </p>
                </div>
            </div>
            <div className="bottom-nav">
                <span>
                    Total ({cartitems.length} ITEMS) : ${totalPrice}
                </span>
                <div>
                    <Link to={"/products/cereals"} className="nav-button">
                        Continue Shopping
                    </Link>
                    <button className="nav-button" onClick={buynowhandle}>
                        Buy Now
                    </button>
                </div>
            </div>
            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Service Under Development</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This service is currently under development. Please check back later.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CartPage;