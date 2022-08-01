import { useState } from "react";

export default function registerProduct() {
    const [productInfo, setProductInfo] = useState({});

    function handleChange(e) {
        console.log(
            "handleChange is running - user is typing in the input field"
        );
        // console.log(e.target.value);
        setProductInfo((current) => {
            return { ...current, [e.target.name]: e.target.value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const formData = new FormData(e.target);
        console.log("E.target", e.target);
        // console.log("clicked on submit button");
        fetch("/register", {
            method: "POST",
            body: new FormData(e.target),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /register.json: ", data);
                // TODO:
                // if registration was NOT successful -> render err conditionally
                if (data.success) {
                    location.href = "/shop";
                } else {
                    console.log("error in register");
                }
                // if registration WAS successful -> take them to the shop to see the product
            })
            .catch((err) => {
                // if something goes wrong => render an error
                console.log("Error in registration", err);
                ({
                    error: true,
                });
            });
    }

    console.log("product info in product registration", productInfo);

    return (
        <div>
            <h1>Register a new product dude</h1>
            <form
                encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
                className="product-registration"
            >
                <input
                    className="product-input"
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    className="product-input"
                    type="text"
                    name="description"
                    placeholder="description"
                    onChange={(e) => handleChange(e)}
                />

                <input
                    className="product-input"
                    type="text"
                    name="price"
                    placeholder="price"
                    onChange={(e) => handleChange(e)}
                />

                <input
                    className="product-input"
                    type="text"
                    name="quantity"
                    placeholder="quantity"
                    onChange={(e) => handleChange(e)}
                />

                <input
                    className="product-input"
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="image url"
                    onChange={(e) => handleChange(e)}
                />

                <button className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
}
