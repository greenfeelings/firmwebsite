import PaypalCheckout from "./paypal";
import Product from "./product";


export default function Checkout(props) {
    const { products } = props;
    console.log("products in checkout", products);
    return (
        <div>
            <h1>Checkout</h1>
            <main className="checkout-background">
                <div className="product-checkout">
                    {products &&
                        products.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                            ></Product>
                        ))}

                    <h1>{props.name}</h1>
                    <PaypalCheckout />
                </div>
            </main>
        </div>
    );
}
