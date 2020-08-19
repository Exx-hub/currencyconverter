import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import axios from "axios";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount;
  let fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        const keys = Object.keys(res.data.rates);
        const first = Object.keys(res.data.rates)[0];
        setCurrencyOptions([res.data.base, ...keys]);
        setFromCurrency(res.data.base);
        setToCurrency(first);
        setExchangeRate(res.data.rates[first]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFrom = (input) => {
    setFromCurrency(input);
  };

  const handleTo = (input) => {
    setToCurrency(input);
  };

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow
        options={currencyOptions}
        selectedCurrency={fromCurrency}
        handleSelect={handleFrom}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        options={currencyOptions}
        selectedCurrency={toCurrency}
        handleSelect={handleTo}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
