export function Button(props) {
    const { title, onClick } = props;
    return (
        <div className="btn_cont">
            <button className="btn_cont_element" onClick={onClick}>{title}</button>
        </div>
    );
}