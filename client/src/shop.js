import { useState, useEffect } from "react";
import Modal from "./modal";

export default function Shop() {
    const [products, setProducts] = useState();
    const [modalDisplay, setModalDisplay] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();

    function toggleModal(product) {
        setSelectedProduct(product);
        console.log("the modal is ready");
        setModalDisplay(!modalDisplay);
    }

    function hideModal() {
        setModalDisplay(false);
    }

    useEffect(() => {
        fetch("/findProduct")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("this is the data.products", data.product);

                setProducts(data.product);
            })
            .catch((err) => {
                console.log("error is ", err);
            });
    }, []);
    return (
        <>
            {modalDisplay && (
                <Modal product={selectedProduct} hideModal={hideModal} />
            )}
            <main className="shop-background">
                <div className="whole-product-container">
                    {/* map through profuct and display them. */}

                    {products &&
                        products.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className="product-container"
                                >
                                    <img
                                        onClick={() => toggleModal(product)}
                                        className="product-image"
                                        src={
                                            product.url ||
                                            "/products/grillz-gold.png"
                                        }
                                    ></img>

                                    <div
                                        onClick={() => toggleModal(product)}
                                        className="description-container"
                                    >
                                        <h1> {product.name}</h1>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </main>
        </>
    );
}
