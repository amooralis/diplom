import "./styles/UploadingSponsors.css";
import "./styles/Buttons.css";
import "./styles/EventForm.css";

function UploadingSponsors({ eventData, setEventData }) {
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData((prevData) => {
          const updatedSponsors = [...prevData.sponsors];
          updatedSponsors[index] = {
            ...updatedSponsors[index],
            image: reader.result,
          };
          return { ...prevData, sponsors: updatedSponsors };
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleLinkChange = (e, index) => {
    const { value } = e.target;
    setEventData((prevData) => {
      const updatedSponsors = [...prevData.sponsors];
      updatedSponsors[index] = { ...updatedSponsors[index], link: value };
      return { ...prevData, sponsors: updatedSponsors };
    });
  };

  const addSponsor = () => {
    setEventData((prevData) => ({
      ...prevData,
      sponsors: [...prevData.sponsors, { image: null, link: "" }],
    }));
  };

  const removeSponsor = (index) => {
    setEventData((prevData) => ({
      ...prevData,
      sponsors: prevData.sponsors.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form__container">
      <h3 className="form__title">Спонсоры и партнёры</h3>
      <button type="button" className="button--add" onClick={addSponsor}>
        Добавить партнёра
      </button>
      <div className="sponsor__grid">
        {eventData.sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor__card">
            <input type="file" onChange={(e) => handleFileChange(e, index)} />
            <input
              type="text"
              placeholder="Ссыдка на сайт спонсора"
              value={sponsor.link}
              onChange={(e) => handleLinkChange(e, index)}
            />
            {sponsor.image && (
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <img src={sponsor.image} alt={`Sponsor ${index + 1}`} />
              </a>
            )}
            <button
              type="button"
              className="remove__btn"
              onClick={() => removeSponsor(index)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadingSponsors;
