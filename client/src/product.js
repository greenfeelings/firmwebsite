import React from "react";

export default function Product(props) {
    const { product } = props;
    return (
        <div>
            <h1>{product.name}</h1>
        </div>
    );
}
