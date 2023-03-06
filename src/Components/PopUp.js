export function PopUp({ title, description, addContent }) {
    return (
        <div className="popUp" id="popUp_master">
            <div className="popUp_cont_master">
                <div className="popUp_cont">
                    <div className="popUp_cont_title">
                        <h2 className="popUp_cont_title_heading">{title}</h2>
                    </div>
                    <div className="popUp_cont_description">
                        <p className="popUp_cont_description_text">{description}</p>
                    </div>
                    <div className="popUp_cont_additionalContent">{addContent}</div>
                </div>
            </div>
        </div>
    )
}