export function Price() {
    return (
        <div className="filter_cont_price_exterior">
            <label className="filter_cont_price_label">Price</label>
            <div className="filter_cont_price">
                <input id="minPrice" type="number" min="1" placeholder="min" />
                <input id="maxPrice" type="number" min="1" placeholder="max" />
            </div>
        </div>
    )
}