export function Height(props) {
  return (
    <div className="filter_cont_height_exterior">
      <label className="filter_cont_height_label">Height (cm)</label>
      <div className="filter_cont_height">
        <input
          id="minHeight"
          type="number"
          min="1"
          placeholder="min"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (document.getElementById("minHeight").value < 0) {
              document.getElementById("minHeight").value = 1;
            }
          }}
        />
        <input
          id="maxHeight"
          type="number"
          min="1"
          placeholder="max"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (
              document.getElementById("maxHeight").value <
              document.getElementById("minHeight").value
            ) {
              document.getElementById("maxHeight").value =
                Number(document.getElementById("minHeight").value) + 1;
            }
            props.handleMessage(
              document.getElementById("minHeight").value,
              document.getElementById("maxHeight").value
            );
          }}
        />
      </div>
    </div>
  );
}
