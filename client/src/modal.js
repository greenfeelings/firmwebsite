import { useState } from "react";

export default function Modal({ product, hideModal }) {
    const [modalDisplay, setModalDisplay] = useState(false);

    function getClassName() {
        return "modal-products " + (modalDisplay ? "" : "hidden");
    }

    console.log(product, "this is the product in modal");
    return (
        <div className="modal-products">
            <img
                onClick={() => hideModal()}
                className="modal-image"
                src={product.url || "/products/grillz-gold.png"}
            ></img>
            <div className="modal-description">
                <h1 className="modal-title">{product && product.name}</h1>
                <p>{product && product.description}</p>
                <h3>${product && product.price}</h3>

                <button className="cart-button">Add To Cart</button>
            </div>
        </div>
    );
}
