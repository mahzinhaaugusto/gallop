export function Price() {
    return (
        <div className="filter_cont_price_exterior">
            <label className="filter_cont_price_label">Price</label>
            <div className="filter_cont_price">
                <input id="minPrice" type="number" min="0" placeholder="min" onWheel={(e) => e.target.blur()} />
                <input id="maxPrice" type="number" min="1" placeholder="max" onWheel={(e) => e.target.blur()} />
            </div>
        </div>
    )
}