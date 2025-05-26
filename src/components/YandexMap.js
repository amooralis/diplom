import React, { useEffect, useRef } from "react";

const YandexMap = ({ coordinates, handleChange }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const placemarkRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ymaps) {
      window.ymaps.ready(() => {
        try {
          // Создаем карту только один раз
          if (!mapInstance.current) {
            mapInstance.current = new window.ymaps.Map(mapRef.current, {
              center: [coordinates.x || 55.7558, coordinates.y || 37.6176], // Координаты центра по умолчанию (Москва)
              zoom: 10,
            });
          }

          // Удаляем старую метку, если она есть
          if (placemarkRef.current) {
            mapInstance.current.geoObjects.remove(placemarkRef.current);
          }

          // Создаем новую метку
          placemarkRef.current = new window.ymaps.Placemark(
            [coordinates.x || 55.7558, coordinates.y || 37.6176],
            {
              balloonContent: `Координаты: ${coordinates.x}, ${coordinates.y}`,
            }
          );

          mapInstance.current.geoObjects.add(placemarkRef.current);

          // Центрируем карту на новых координатах
          mapInstance.current.setCenter([
            coordinates.x || 55.7558,
            coordinates.y || 37.6176,
          ]);
        } catch (error) {
          console.error("Ошибка при инициализации карты:", error);
        }
      });
    } else {
      console.error("Yandex Maps API не загружен.");
    }
  }, [coordinates]);

  return (
    <div className="form__container">
      <label className="coordinates_container">
        <span>Координаты нужного места:</span>
        <div className="coordinates">
          <input
            type="text"
            name="coordinates.x"
            value={coordinates.x}
            onChange={handleChange}
          />
          <input
            type="text"
            name="coordinates.y"
            value={coordinates.y}
            onChange={handleChange}
          />
        </div>
      </label>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default YandexMap;
