export function Age() {
    return (
        <div className="filter_cont_age_exterior">
            <label className="filter_cont_age_label">Age</label>
            <div className="filter_cont_age">
                <input id="minAge" type="number" min="1" max="35" placeholder="min" />
                <input id="maxAge" type="number" min="1" max="35" placeholder="max" />
            </div>
        </div>
    )
}