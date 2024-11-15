import React, {useEffect, useState} from "react";
import "./styles/EventForm.css";
import "./styles/Buttons.css";
import UploadingSponsors from "./UploadingSponsors";

function EventForm({eventData, setEventData, updateEventData}) {
    // const [eventData, setEventData] = useState({ schedule: {} }); // Расписание в формате { "09 апреля": ["событие1", "событие2"] }
    const [newScheduleDate, setNewScheduleDate] = useState("");
    const [newScheduleItem, setNewScheduleItem] = useState("");

    useEffect(() => {
        const savedData = localStorage.getItem("eventData");
        if (savedData) {
            setEventData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        console.log("Saving eventData to localStorage:", eventData);
        localStorage.setItem("eventData", JSON.stringify(eventData));
    }, [eventData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        updateEventData({[name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fieldName = e.target.name;

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Динамически обновляем поле в зависимости от имени
                updateEventData({[fieldName]: reader.result});
            };
            reader.readAsDataURL(file);
        } else {
            updateEventData({[fieldName]: null});
            alert("Please select a valid image file.");
        }
    };

    const addScheduleItem = () => {
        if (newScheduleDate.trim() === "" || newScheduleItem.trim() === "") return;

        setEventData((prevData) => {
            const updatedSchedule = {...prevData.schedule};

            if (!updatedSchedule[newScheduleDate]) {
                updatedSchedule[newScheduleDate] = [];
            }

            updatedSchedule[newScheduleDate].push(newScheduleItem);

            return {...prevData, schedule: updatedSchedule};
        });

        setNewScheduleItem("");
    };


    const deleteScheduleDay = (date) => {
        setEventData((prevData) => {
            const updatedSchedule = {...prevData.schedule};
            delete updatedSchedule[date]; // Удаляем выбранную дату и её события

            return {...prevData, schedule: updatedSchedule};
        });
    };

    const handleGeneratePage = (e) => {
        e.preventDefault();

        const newWindow = window.open("", "_blank");
        const pageContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${eventData.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          .container { max-width: 800px; margin: 0 auto; }
          img { max-width: 100%; height: auto; margin-top: 20px; }
          h1 { color: #333; }
          p { margin-bottom: 10px; }
          ul { padding-left: 20px; }
        </style>
      </head>
      <body>
        <div className="res-header">
        ${
            eventData.fartukImgUrl
                ? `<img className="res-header-fartuk" src="${eventData.fartukImgUrl}" alt="Event Image" />`
                : ""
        }
        
        ${
            eventData.logo
                ? `<img className="res-header-logo" src="${eventData.logo}" alt="Event Image" />`
                : ""
        }
        
        </div>
        
        <div class="container">
          <h1>${eventData.title}</h1>
          <p><strong>Date:</strong> ${eventData.date}</p>
          <p><strong>Location:</strong> ${eventData.location}</p>
          <p>${eventData.description}</p>
          <p><strong>Organizers:</strong> ${eventData.organizers}</p>
          
          <h3>Schedule</h3>
          // <ul>
          //   ${eventData.schedule.map((item) => `<li>${item}</li>`).join("")}
          // </ul>
        </div>
      </body>
      </html>
    `;

        newWindow.document.write(pageContent);
        newWindow.document.close();
    };

    return (
        <div className="create">
            <form className="form">
                <div className="form__container">
                <h3 className="form__title">Создание мероприятия</h3>
                <label>
                    <span>Название:</span>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Дата:</span>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Место:</span>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Описание:</span>
                    <textarea className="create__description"
                              name="description"
                              value={eventData.description}
                              onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Организаторы:</span>
                    <input
                        type="text"
                        name="organizers"
                        value={eventData.organizers}
                        onChange={handleChange}
                    />
                </label>
                </div>
                <div className="form__container">
                    <div className="create__schedule__add__items">
                        <h3 className="form__title">Расписание</h3>

                        <input
                            type="text"
                            placeholder="Дата (например, 09 апреля)"
                            value={newScheduleDate}
                            onChange={(e) => setNewScheduleDate(e.target.value)}
                        />
                        <div className="create__schedule__add__item">
                            <input
                                type="text"
                                placeholder="Событие (например, 10:00-11:00 - Регистрация участников)"
                                value={newScheduleItem}
                                onChange={(e) => setNewScheduleItem(e.target.value)}
                            />
                            <button type="button" className="button--add" onClick={addScheduleItem}>
                                добавить в расписание
                            </button>
                        </div>
                    </div>

                    <div className="schedule__form__preview">
                        {Object.entries(eventData.schedule).map(([date, events]) => (
                            <div key={date} className="schedule__day">
                                <div className="schedule__form__preview__firstline">
                                    <h3>{date}</h3>
                                    <button
                                        type="button"
                                        className="button--delete"
                                        onClick={() => deleteScheduleDay(date)}>x
                                    </button>
                                </div>
                                <ul>
                                    {events.map((event, index) => (
                                        <li key={index}>{event}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form__container">
                    <h3 className="form__title">Загрузка изображений для заголовка</h3>
                    <div className="upload__image">
                        <label>
                            Изображение для фартука:
                            <input
                                type="file"
                                name="fartukImgUrl"
                                onChange={handleFileChange}
                            />
                            {eventData.fartukImgUrl && (
                                <div className="upload__fartuc">
                                    <h3>Image Preview:</h3>
                                    <img src={eventData.fartukImgUrl} alt="Preview fartuc"/>
                                </div>
                            )}
                        </label>
                    </div>
                    <div className="upload__image">
                        <label>
                            Изображение для логотипа:
                            <input
                                type="file"
                                name="logo"
                                onChange={handleFileChange}
                            />
                            {eventData.logo && (
                                <div className="upload__logo">
                                    <h3>Image Preview:</h3>
                                    <img src={eventData.logo} alt="Preview logo"/>
                                </div>
                            )}
                        </label>

                    </div>
                </div>

                <UploadingSponsors eventData={eventData} setEventData={setEventData}/>

                <button type="button" onClick={handleGeneratePage}>
                    Generate Page
                </button>
            </form>
        </div>
    );
}

export default EventForm;
