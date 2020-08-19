import React from "react";

function CurrencyRow({
  options,
  selectedCurrency,
  handleSelect,
  amount,
  onChangeAmount,
}) {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        value={selectedCurrency}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
