import React, { useState } from "react";
import "./styles/SetSettings.css";
import "./styles/EventForm.css";

function SetSettings({ eventData, setEventData }) {
    const [settings, setSettings] = useState({
        needRegistration: false,
        isOnline: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        // Обновляем локальное состояние
        setSettings((prev) => ({
            ...prev,
            [name]: checked,
        }));

        // Обновляем глобальное состояние eventData
        setEventData((prevEventData) => ({
            ...prevEventData,
            [name]: checked,
        }));
    };

    return (
      <div className="form__container__settings">
        <h3>Настройки сайта конференции</h3>
        <div className="checkbox__group">
          <label>
            <input
              type="checkbox"
              name="needRegistration"
              checked={settings.needRegistration}
              onChange={handleCheckboxChange}
            />
            <span>Онлайн-конференция</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="needRegistration"
              checked={settings.isOnline}
              onChange={handleCheckboxChange}
            />
            <span>Нужна регистрация на конференцию</span>
          </label>
        </div>
      </div>
    );
}

export default SetSettings;
