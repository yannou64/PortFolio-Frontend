import "./certifications.scss";
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";
import urlImageDefault from "../../../../../assets/noImage.jpg";
import { FaFileDownload } from "react-icons/fa";

export default function Certifications() {
  const [idCompetenceToUpdate, setIdCompetenceToUpdate] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [allCertifications, setAllCertifications] = useState([]);
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [dateObtention, setDateObtention] = useState("");
  const [lieu, setLieu] = useState("");
  const [organisme, setOrganisme] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAperçu, setImageAperçu] = useState("");

  async function addCertification(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    formData.append("categorie", categorie);
    formData.append("dateObtention", dateObtention);
    formData.append("lieu", lieu);
    formData.append("organisme", organisme);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log(`Erreur de fetch dans addCertification : ${data.message}`);
      }
      console.log("Certification create");
      setTitle("");
      setImageUrl(null);
      setCategorie("");
      setDateObtention("");
      setLieu("");
      setOrganisme("");

      getAllCertifications();
    } catch (e) {
      console.log("Erreur dans addCertification : ", e);
    }
  }

  async function getAllCertifications() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications`);
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de fetch dans getAllCertifications : ${data.message}`);
      setAllCertifications(data.data);
      console.log("getAllCertifications success : ", data.data);
    } catch (e) {
      console.log("Error in getAllCertification: ", e);
    }
  }

  async function getCertification(element) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications/${element._id}`, {
        credentials: "include",
      });
      const data = await response.json();
      setTitle(data.data.title);
      setCategorie(data.data.categorie);
      // formattage de la date pour pouvoir l'afficher
      const date = new Date(data.data.dateObtention);
      const formattedDate = date.toISOString().split("T")[0];
      setDateObtention(formattedDate);
      setLieu(data.data.lieu);
      setOrganisme(data.data.organisme);
      setIsUpdateMode(true);
      setIdCompetenceToUpdate(element._id);

      setImageUrl(data.data.urlImage); 
      setImageAperçu(`${import.meta.env.VITE_API_URL}/${imageUrl}`)

      console.log(data.data)

    } catch (e) {
      console.log(`Error in getCertification : ${e.message}`);
    }
  }

  async function deleteElement(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de fetch dans deleteElement : ${data.message}`);
      console.log("deleteCertification success : ", data.message);
      getAllCertifications();
    } catch (e) {
      console.log(`Erreur dans deleteElement : ${e.message}`);
    }
  }

  async function updateCertification(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("categorie", categorie)
    formData.append("dateObtention", dateObtention)
    formData.append("lieu", lieu)
    formData.append("organisme", organisme)
    formData.append("imageUrl", imageUrl)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications/${idCompetenceToUpdate}`, {
        method: "PUT",
        credentials: "include",
        body: formData
      });
      const data = await response.json();
      if (!response.ok) return console.log("Erreur dans fetch de updateCertification : ", data.message);
      setTitle("");
      setImageUrl(null);
      setCategorie("");
      setDateObtention("");
      setLieu("");
      setOrganisme("");
      setIsUpdateMode(false);
      setIdCompetenceToUpdate("");
      getAllCertifications();
      
    } catch (e) {
      console.log(`Erreur dans front updateCertification : ${e.message}`);
    }
  }

  useEffect(() => {
  let objectUrl;
  if (imageUrl instanceof File || imageUrl instanceof Blob) {
    objectUrl = URL.createObjectURL(imageUrl);
    setImageAperçu(objectUrl);
  } else if (typeof imageUrl === "string" && imageUrl !== "") {
    setImageAperçu(`${import.meta.env.VITE_API_URL}/${imageUrl}`);
  } else {
    setImageAperçu("");
  }
  return () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  };
}, [imageUrl]);

  useEffect(() => {
    getAllCertifications();
  }, []);

  return (
    <div id="certificationsContainer">
      <form id="certificationsForm" onSubmit={isUpdateMode ? updateCertification : addCertification}>
        <input
          type="text"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="nom de la certification"
          required
        />
        <div className="row_img">
          <input
            id="imgCompetence"
            className="btn_upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageUrl(e.target.files[0])}
            hidden
          />
          <label htmlFor="imgCompetence">
            <FaFileDownload size={40} color="gray" />
          </label>
          <div className="img_container">
            <img src={imageAperçu ? imageAperçu : urlImageDefault} alt="Image certification" />
          </div>
        </div>
        <select onChange={(e) => setCategorie(e.target.value)} value={categorie}>
          <option value="" disabled>
            --choisir--
          </option>
          <option value="Diplôme">Diplôme</option>
          <option value="Certification">Certification</option>
        </select>
        <input type="date" className="input" onChange={(e) => setDateObtention(e.target.value)} value={dateObtention} />
        <input
          type="text"
          className="input"
          onChange={(e) => setLieu(e.target.value)}
          value={lieu}
          placeholder="Lieu d'obtention"
        />
        <input
          type="text"
          className="input"
          onChange={(e) => setOrganisme(e.target.value)}
          value={organisme}
          placeholder="Organisme de certification"
        />
        <button className="btn">{isUpdateMode ? "Update" : "Add"}</button>
      </form>
      <div id="certificationsList">
        <p>-- Mes Diplômes --</p>
        <ul>
          {allCertifications
            .filter((item) => item.categorie === "Diplôme")
            .map((item) => (
              <Item
                key={item._id}
                item={item}
                element={item.title}
                updateElement={getCertification}
                deleteElement={deleteElement}
              />
            ))}
        </ul>
        <p>-- Mes Certifications --</p>
        <ul>
          {allCertifications
            .filter((item) => item.categorie === "Certification")
            .map((item) => (
              <Item
                key={item._id}
                item={item}
                element={item.title}
                updateElement={getCertification}
                deleteElement={deleteElement}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
