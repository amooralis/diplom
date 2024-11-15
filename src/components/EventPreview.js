import React from "react";
import "./styles/EventPreview.css";

function EventPreview({ eventData}) {
    const {fartukImgUrl, logo, title, dateStart, dateEnd, location, description, organizers, schedule, sponsors} = eventData
    return (
        <div className="preview">
            {fartukImgUrl && <img className="preview__fartuk" src={fartukImgUrl} alt="fartuk" />}
            {logo && <img className="preview__logo" src={logo} alt="logo" />}
            {title && <h2>{title}</h2>}

            {dateStart && (
                <p>
                    <strong>Дата:</strong> {dateStart}
                    {dateEnd && ` - ${dateEnd}`}
                </p>
            )}
            {location && <p><strong>Location:</strong> {location}</p>}
            {description && <p><strong>Description:</strong> {description}</p>}
            {organizers && <p><strong>Organizers:</strong> {organizers}</p>}
            {schedule && schedule.length > 0 && (
                <></>
            )}
            {sponsors && <p><strong>Спонсоры:</strong> {sponsors}</p>}

        </div>
    );
}

export default EventPreview;
