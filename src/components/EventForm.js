import React, { useEffect, useState } from "react";
import "./styles/EventForm.css";
import "./styles/Buttons.css";
import UploadingSponsors from "./UploadingSponsors";
import CreateSchedule from "./CreateSchedule";
import SetSettings from "./SetSettings";
import YandexMap from "./YandexMap";

function EventForm({ eventData, setEventData, updateEventData }) {
  useEffect(() => {
    const savedData = localStorage.getItem("eventData");
    if (savedData) {
      setEventData(JSON.parse(savedData));
    }
  }, [setEventData]); // Добавлено 'setEventData' в зависимости

  useEffect(() => {
    localStorage.setItem("eventData", JSON.stringify(eventData));
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("coordinates.")) {
      const key = name.split(".")[1];
      setEventData((prevData) => ({
        ...prevData,
        coordinates: {
          ...prevData.coordinates,
          [key]: value,
        },
      }));
    } else if (e.target.type === "date") {
      const formattedDate = value.split("-").reverse().join(".");
      updateEventData({ [name]: formattedDate });
    } else {
      updateEventData({ [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Динамически обновляем поле в зависимости от имени
        updateEventData({ [fieldName]: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      updateEventData({ [fieldName]: null });
      alert("Please select a valid image file.");
    }
  };

  const {
    title,
    description,
    fartukImgUrl,
    logo,
    location,
    organizers,
    schedule,
    dateStart,
    dateEnd,
    coordinates,
  } = eventData;

  const [color, setColor] = useState(
    eventData.color || ["#000000", "#ffffff", "#007bff", "#ff5722", "#4caf50"]
  );

  const handleColorChange = (e, i) => {
    const newColor = [...color];
    newColor[i] = e.target.value;
    setColor(newColor);
    updateEventData({ color: newColor });
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
        <title>${title}</title>
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
          fartukImgUrl
            ? `<img className="res-header-fartuk" src="${fartukImgUrl}" alt="Event Image" />`
            : ""
        }
        
        ${
          logo
            ? `<img className="res-header-logo" src="${logo}" alt="Event Image" />`
            : ""
        }
        
        </div>
        
        <div class="container">
          <h1>${title}</h1>
          <p><strong>Date:</strong> ${dateStart} - ${dateEnd}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p>${description}</p>
          <p><strong>Organizers:</strong> ${organizers}</p>
          
          <h3>Schedule</h3>
          // <ul>
          //   ${schedule.map((item) => `<li>${item}</li>`).join("")}
          // </ul>
        </div>
      </body>
      </html>
    `;

    newWindow.document.write(pageContent);
    newWindow.document.close();
  };

  const formatDateForInput = (date) => {
    if (!date) return ""; // Если дата отсутствует
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`; // Преобразуем в формат гггг-мм-дд
  };

  return (
    <div className="create">
      <form className="form">
        <div className="form__container">
          <h3 className="form__title">Создание мероприятия</h3>
          <label className="form__label">
            <span>Название:</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <span>Дата начала:</span>
            <input
              type="date"
              name="dateStart"
              value={formatDateForInput(dateStart)} // Преобразуем дату для отображения
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <span>Дата окончания:</span>
            <input
              type="date"
              name="dateEnd"
              value={formatDateForInput(dateEnd)} // Преобразуем дату для отображения
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <span>Место:</span>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <span>Описание:</span>
            <textarea
              className="create__description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <span>Организаторы:</span>
            <input
              type="text"
              name="organizers"
              value={organizers}
              onChange={handleChange}
            />
          </label>
        </div>
        <CreateSchedule eventData={eventData} setEventData={setEventData} />

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
              {fartukImgUrl && (
                <div className="upload__fartuc">
                  <h3>Image Preview:</h3>
                  <img src={fartukImgUrl} alt="Preview fartuc" />
                </div>
              )}
            </label>
          </div>
          <div className="upload__image">
            <label>
              Изображение для логотипа:
              <input type="file" name="logo" onChange={handleFileChange} />
              {logo && (
                <div className="upload__logo">
                  <h3>Image Preview:</h3>
                  <img src={logo} alt="Preview logo" />
                </div>
              )}
            </label>
          </div>
        </div>

        <UploadingSponsors eventData={eventData} setEventData={setEventData} />

        <SetSettings eventData={eventData} setEventData={setEventData} />

        <YandexMap coordinates={coordinates} handleChange={handleChange} />

        <div className="form__container">
          <h3 className="form__title">Выбор акцентных цветов</h3>
          <table className="color-table">
            <tbody>
              <tr>
                <td className="color-table__label">Основной цвет текста:</td>
                <td>
                  <input
                    type="color"
                    className="color-input"
                    value={color[0]}
                    onChange={(e) => handleColorChange(e, 0)}
                  />
                </td>
              </tr>
              <tr>
                <td className="color-table__label">Фоновый цвет:</td>
                <td>
                  <input
                    type="color"
                    className="color-input"
                    value={color[1]}
                    onChange={(e) => handleColorChange(e, 1)}
                  />
                </td>
              </tr>
              <tr>
                <td className="color-table__label">
                  Цвет акцентов (заголовки, ссылки):
                </td>
                <td>
                  <input
                    type="color"
                    className="color-input"
                    value={color[2]}
                    onChange={(e) => handleColorChange(e, 2)}
                  />
                </td>
              </tr>
              <tr>
                <td className="color-table__label">Цвет кнопок:</td>
                <td>
                  <input
                    type="color"
                    className="color-input"
                    value={color[3]}
                    onChange={(e) => handleColorChange(e, 3)}
                  />
                </td>
              </tr>
              <tr>
                <td className="color-table__label">Цвет рамок:</td>
                <td>
                  <input
                    type="color"
                    className="color-input"
                    value={color[4]}
                    onChange={(e) => handleColorChange(e, 4)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form__container"></div>

        <button type="button" onClick={handleGeneratePage}>
          Generate Page
        </button>
      </form>
    </div>
  );
}

export default EventForm;
