import React from "react";
import ReactDOM from "react-dom";

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
export default class PaypalCheckout extends React.Component {
    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01",
                    },
                },
            ],
        });
    }
    onApprove(data, actions) {
        return actions.order.capture();
    }
    render() {
        return (
            <div className="paypal-container">
                <PayPalButton
                    createOrder={(data, actions) =>
                        this.createOrder(data, actions)
                    }
                    onApprove={(data, actions) => this.onApprove(data, actions)}
                />
            </div>
        );
    }
}
