import React, { useState } from "react";
import { exchangeRates } from "./ExchangeRates";

const CurrencyConverter1 = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const convertCurrency = () => {
        if (
            exchangeRates[fromCurrency] &&
            exchangeRates[fromCurrency][toCurrency]
        ) {
            const rate = exchangeRates[fromCurrency][toCurrency];
            const converted = parseFloat(amount) * rate;
            setConvertedAmount(converted.toFixed(2));
        } else {
            setConvertedAmount(null);
            console.error("Exchange rate not available for the selected currencies.");
        }
    };

    return (
        <center>
            <div className="border border-dark rounded-1 w-50 mt-5 p-5 ">
                <h2>Currency Converter</h2>
                <div>
                    <label>Amount :</label>
                    <input
                        className="ms-3 w-auto"
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
                <div className="d-flex justify-content-evenly m-4 ">
                    <div>
                        <label>From:</label>
                        <select
                            className="ms-2 w-100"
                            value={fromCurrency}
                            onChange={handleFromCurrencyChange}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="CAD">CAD</option>
                            <option value="AUD">AUD</option>
                            <option value="CHF">CHF</option>
                            <option value="CNY">CNY</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                    <div>
                        <label>To:</label>
                        <select
                            className="ms-2 w-100"
                            value={toCurrency}
                            onChange={handleToCurrencyChange}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="CAD">CAD</option>
                            <option value="AUD">AUD</option>
                            <option value="CHF">CHF</option>
                            <option value="CNY">CNY</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={convertCurrency}>
                        Convert
                    </button>
                </div>
                {convertedAmount && (
                    <p className="text-success">
                        Converted Amount: {convertedAmount} {toCurrency}
                    </p>
                )}
            </div>
        </center>
    );
};

export default CurrencyConverter1;
