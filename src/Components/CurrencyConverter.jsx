import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const res = await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/${fromCurrency}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch exchange rates");
                }
                const data = await res.json();
                setExchangeRates(data.conversion_rates);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        fetchExchangeRates();

    }, [fromCurrency]);

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
        if (exchangeRates && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
            const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
            const converted = parseFloat(amount) * rate;
            setConvertedAmount(converted.toFixed(2));
        } else {
            setConvertedAmount(null);
            alert("Exchange rate not available for the selected currencies.");
        }
    };

    return (
        <center>
            <div className="border border-dark rounded-5 w-50 mt-5 p-5">
                <h2 className="mb-4">Currency Converter</h2>
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
                        <label>From :</label>
                        <select
                            className="ms-2 w-100"
                            value={fromCurrency}
                            onChange={handleFromCurrencyChange}
                        >
                            {exchangeRates && Object.keys(exchangeRates).map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>To :</label>
                        <select
                            className="ms-2 w-100"
                            value={toCurrency}
                            onChange={handleToCurrencyChange}
                        >
                            {exchangeRates && Object.keys(exchangeRates).map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end me-5 mt-5">
                    <button className="btn btn-outline-primary" onClick={convertCurrency}>
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

export default CurrencyConverter;
