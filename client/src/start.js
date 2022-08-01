import ReactDOM from "react-dom";
import Shop from "./shop";
import About from "./about";
import Home from "./home";
import Checkout from "./checkout";
import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "/client/style.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import RegisterProduct from "./registerproduct";
import Modal from "./modal";
// import data from "./data";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

export default function App() {
    return (
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );
}

function HelloWorld() {
    const [modalDisplay, setModalDisplay] = useState(false);

    function toggleModal() {
      
        setModalDisplay(!modalDisplay);
    }

    const data = {
        products: [
            {
                id: "1",
                name: "Gold",
                price: 400,
                image: "",
            },

            {
                id: "2",
                name: "Silver",
                price: 300,
                image: "",
            },

            {
                id: "3",
                name: "Custom",
                price: "TBD",
                image: "",
            },
        ],
    };
    console.log("data in hellow world", data);
    const { products } = data;
    console.log("product in hellow world", products);
    return (
        <div>
            <BrowserRouter>
                <form className="search-container">
                    <input className="product-search"></input>
                    <button className="search-button">search</button>
                </form>
                <nav className="Nav-bar">
                    <h1>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </h1>

                    <h1>
                        <Link className="nav-link" to="/shop">
                            Shop
                        </Link>
                    </h1>
                    <h1>
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                    </h1>
                </nav>
                {modalDisplay && <Modal />}

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/shop">
                        <Shop />
                    </Route>

                    <Route path="/about">
                        <About />
                    </Route>

                    <Route path="/checkout">
                        <Checkout products={products} />
                    </Route>

                    <Route path="/register">
                        <RegisterProduct />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
