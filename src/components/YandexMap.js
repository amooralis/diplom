import React, { useEffect, useRef, useState } from "react";

const YandexMap = ({ coordinates, handleChange }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const placemarkRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.ymaps) {
      window.ymaps.ready(() => {
        try {
          // Initialize the map only once
          if (!mapInstance.current) {
            mapInstance.current = new window.ymaps.Map(mapRef.current, {
              center: [coordinates.x || 55.7558, coordinates.y || 37.6176], // Default center (Moscow)
              zoom: 10,
            });

            // Add a click event listener to the map
            mapInstance.current.events.add("click", (e) => {
              const coords = e.get("coords");
              updateCoordinates(coords);
            });
          }

          // Remove the old placemark if it exists
          if (placemarkRef.current) {
            mapInstance.current.geoObjects.remove(placemarkRef.current);
          }

          // Create a new placemark
          placemarkRef.current = new window.ymaps.Placemark(
            [coordinates.x || 55.7558, coordinates.y || 37.6176],
            {
              balloonContent: `Координаты: ${coordinates.x}, ${coordinates.y}`,
            }
          );

          mapInstance.current.geoObjects.add(placemarkRef.current);

          // Center the map on the new coordinates
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

  const handleSearch = async () => {
    if (typeof window !== "undefined" && window.ymaps) {
      try {
        const res = await window.ymaps.geocode(searchQuery);
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const coords = firstGeoObject.geometry.getCoordinates();
          updateCoordinates(coords); // Update coordinates in the map and inputs
        } else {
          alert("Место не найдено. Попробуйте другой запрос.");
        }
      } catch (error) {
        console.error("Ошибка при выполнении поиска:", error);
        alert("Не удалось выполнить поиск. Проверьте подключение к интернету.");
      }
    } else {
      alert("Yandex Maps API не загружен. Проверьте подключение к интернету.");
      console.error("Yandex Maps API не загружен.");
    }
  };

  const updateCoordinates = (coords) => {
    // Update the input fields
    handleChange({ target: { name: "coordinates.x", value: coords[0] } });
    handleChange({ target: { name: "coordinates.y", value: coords[1] } });

    // Update the placemark position
    if (placemarkRef.current) {
      placemarkRef.current.geometry.setCoordinates(coords);
    }

    // Center the map on the new coordinates
    if (mapInstance.current) {
      mapInstance.current.setCenter(coords);
    }
  };

  return (
    <div className="form__container">
      <label className="coordinates_container">
        <span>Координаты нужного места:</span>
        <div className="coordinates">
          <input
            type="text"
            name="coordinates.x"
            value={coordinates.x}
            readOnly
          />
          <input
            type="text"
            name="coordinates.y"
            value={coordinates.y}
            readOnly
          />
        </div>
      </label>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default YandexMap;
