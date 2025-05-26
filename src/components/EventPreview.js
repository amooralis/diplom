import React from "react";
import "./styles/EventPreview.css";

function EventPreview({ eventData }) {
  const {
    fartukImgUrl,
    logo,
    title,
    dateStart,
    dateEnd,
    location,
    description,
    organizers,
    schedule,
    sponsors,
    color,
  } = eventData;

  const styleVariables = {
    "--primary-color": color[0] || "#000000",
    "--background-color": color[1] || "#ffffff",
    "--accent-color": color[2] || "#007bff",
    "--button-color": color[3] || "#ff5722",
    "--border-color": color[4] || "#4caf50",
  };

  return (
    <div className="event-preview" style={styleVariables}>
      {fartukImgUrl && (
        <div className="event-preview__header">
          <img
            className="event-preview__fartuk"
            src={fartukImgUrl}
            alt="Фартук"
          />
          {logo && (
            <img
              className="event-preview__logo-overlay"
              src={logo}
              alt="Логотип"
            />
          )}
          <div className="event-preview__header-details">
            {title && <h2 className="event-preview__title">{title}</h2>}
            {dateStart && (
              <p className="event-preview__date">
                <strong>Дата:</strong> {dateStart}
                {dateEnd && ` - ${dateEnd}`}
              </p>
            )}
            {location && (
              <p className="event-preview__location">
                <strong>Место:</strong> {location}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="event-preview__details">
        {description && (
          <p>
            <strong>Описание:</strong> {description}
          </p>
        )}
        {organizers && (
          <p>
            <strong>Организаторы:</strong> {organizers}
          </p>
        )}
      </div>

      {schedule && Object.keys(schedule).length > 0 && (
        <div className="event-preview__schedule">
          <h3>Расписание:</h3>
          {Object.entries(schedule).map(([date, events]) => (
            <div key={date} className="event-preview__schedule-day">
              <h4>{date}</h4>
              <ul>
                {events.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {sponsors && sponsors.length > 0 && (
        <div className="event-preview__sponsors">
          <h3>Спонсоры:</h3>
          <div className="event-preview__sponsors-list">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="event-preview__sponsor">
                {sponsor.image && (
                  <img
                    src={sponsor.image}
                    alt={`Sponsor ${index + 1}`}
                    className="event-preview__sponsor-image"
                  />
                )}
                {sponsor.link && (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-preview__sponsor-link"
                  >
                    {sponsor.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {color && color.length > 0 && (
        <div className="event-preview__colors">
          <h3>Акцентные цвета:</h3>
          <div className="event-preview__color-list">
            {color.map((c, index) => (
              <div
                key={index}
                className="event-preview__color"
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPreview;
