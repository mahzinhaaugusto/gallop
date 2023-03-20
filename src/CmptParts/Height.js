export function Height() {
    return (
        <div className="filter_cont_height_exterior">
            <label className="filter_cont_height_label">Height</label>
            <div className="filter_cont_height">
                <input id="minHeight" type="number" min="1" placeholder="min" onWheel={(e) => e.target.blur()} />
                <input id="maxHeight" type="number" min="1" placeholder="max" onWheel={(e) => e.target.blur()} />
            </div>
        </div>
    )
}