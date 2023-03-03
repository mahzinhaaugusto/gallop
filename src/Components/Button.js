export function Button(props) {
    const { title, onClick, className } = props;
    return (
        <div className="btn_cont">
            <button className={className} onClick={onClick}>{title}</button>
        </div>
    );
}