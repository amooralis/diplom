import React from "react";
import "./styles/EventPreview.css";

function EventPreview({ eventData}) {
    const {fartukImgUrl, logo, title, date, location, description, organizers, schedule, sponsors} = eventData
    return (
        <div className="preview">
            {fartukImgUrl && <img className="preview__fartuk" src={fartukImgUrl} alt="fartuk" />}
            {logo && <img className="preview__logo" src={logo} alt="logo" />}
            {title && <h2>{title}</h2>}
            {date && <p><strong>Date:</strong> {date}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
            {description && <p><strong>Description:</strong> {description}</p>}
            {organizers && <p><strong>Organizers:</strong> {organizers}</p>}
            {schedule && schedule.length > 0 && (
                <></>
            )}
        </div>
    );
}

export default EventPreview;
