export function Age() {
    return (
        <div className="filter_cont_age_exterior">
            <label className="filter_cont_age_label">Age</label>
            <div className="filter_cont_age">
                <input id="minAge" type="number" min="1" max="35" placeholder="min" onWheel={(e) => e.target.blur()} />
                <input id="maxAge" type="number" min="1" max="35" placeholder="max" onWheel={(e) => e.target.blur()} />
            </div>
        </div>
    )
}