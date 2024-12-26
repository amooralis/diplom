import "./styles/Buttons.css";
import "./styles/EventForm.css";
import React, {useState} from "react";


function CreateSchedule({ eventData, setEventData }) {
    const [newScheduleDate, setNewScheduleDate] = useState("");
    const [newScheduleItem, setNewScheduleItem] = useState("");


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



    return (
        <div className="form__container">
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
    );
}

export default CreateSchedule;
