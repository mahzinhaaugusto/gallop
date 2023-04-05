export function Localization() {
    let cityInfo = sessionStorage.getItem("city");

    return (
        <div className="filter_cont_localization">
            <label className="filter_cont_localization_label">Location</label>
            <span className='filter_cont_localization_info'><strong>{cityInfo}</strong></span>
        </div>
    )
}