export function Age(props) {
  return (
    <div className="filter_cont_age_exterior">
      <label className="filter_cont_age_label">Age (Years)</label>
      <div className="filter_cont_age">
        <input
          id="minAge"
          type="number"
          min="1"
          max="35"
          placeholder="min"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (document.getElementById("minAge").value < 0) {
              document.getElementById("minAge").value = 1;
            }
          }}
        />
        <input
          id="maxAge"
          type="number"
          min="1"
          max="35"
          placeholder="max"
          onWheel={(e) => e.target.blur()}
          onChange={() => {
            if (
              document.getElementById("maxAge").value <
              document.getElementById("minAge").value
            ) {
              document.getElementById("maxAge").value =
                Number(document.getElementById("minAge").value) + 1;
            }
            props.handleMessage(
              document.getElementById("minAge").value,
              document.getElementById("maxAge").value
            );
          }}
        />
      </div>
    </div>
  );
}
