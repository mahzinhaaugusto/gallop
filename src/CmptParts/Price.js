export function Price(props) {
  return (
    <div className="filter_cont_price_exterior">
      <label className="filter_cont_price_label">Price (Dollars)</label>
      <div className="filter_cont_price">
        <input
          id="minPrice"
          type="number"
          min="1"
          placeholder="min"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (document.getElementById("minPrice").value < 0) {
              document.getElementById("minPrice").value = 1;
            }
          }}
        />
        <input
          id="maxPrice"
          type="number"
          min="1"
          placeholder="max"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (
              document.getElementById("maxPrice").value <
              document.getElementById("minPrice").value
            ) {
              document.getElementById("maxPrice").value =
                Number(document.getElementById("minPrice").value) + 1;
            }
            props.handleMessage(
              document.getElementById("minPrice").value,
              document.getElementById("maxPrice").value
            );
          }}
        />
      </div>
    </div>
  );
}
