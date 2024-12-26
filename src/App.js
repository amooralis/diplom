import React, { useState } from "react";
import Header from "./components/Header";
import EventForm from "./components/EventForm";
import EventPreview from "./components/EventPreview";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    const [eventData, setEventData] = useState(() => {
        const savedData = localStorage.getItem("eventData");
        return savedData ? JSON.parse(savedData) : {
            title: "",
            dateStart: "",
            dateEnd: "",
            location: "",
            description: "",
            organizers: "",
            schedule: {},
            fartukImgUrl: null,
            logo: null,
            sponsors:[],
            needRegistration: false,
            coordinates:{x: "", y: ""}
        };
    });

    // Функция для обновления данных мероприятия, включая URL превью
    const updateEventData = (newData) => {
        setEventData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <div className="App">
            <Header />
            <div className="content">
                {/* Передаем eventData и функцию обновления в EventForm */}
                <EventForm eventData={eventData} setEventData={setEventData} updateEventData={updateEventData} />

                {/* Передаем данные и imagePreviewUrl в EventPreview */}
                <EventPreview eventData={eventData} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
