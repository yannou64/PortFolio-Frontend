import "./certifications.scss";
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";

export default function Certifications() {
  const [idCompetenceToUpdate, setIdCompetenceToUpdate] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [allCertifications, setAllCertifications] = useState([]);
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [categorie, setCategorie] = useState("");
  const [dateObtention, setDateObtention] = useState("");
  const [lieu, setLieu] = useState("");
  const [organisme, setOrganisme] = useState("");

  async function addCertification(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          urlImage,
          categorie,
          dateObtention,
          lieu,
          organisme,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log(`Erreur de fetch dans addCertification : ${data.message}`);
      }
      console.log("Certification create");
      setTitle("");
      setUrlImage("");
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications/${element._id}`, {credentials: "include"});
      const data = await response.json();
      setTitle(data.data.title);
      setUrlImage(data.data.urlImage);
      setCategorie(data.data.categorie);
      // formattage de la date pour pouvoir l'afficher
      const date = new Date(data.data.dateObtention);
      const formattedDate = date.toISOString().split("T")[0];
      setDateObtention(formattedDate);
      setLieu(data.data.lieu);
      setOrganisme(data.data.organisme);
      setIsUpdateMode(true);
      setIdCompetenceToUpdate(element._id);
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
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/certifications/${idCompetenceToUpdate}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          urlImage,
          categorie,
          dateObtention,
          lieu,
          organisme,
        }),
      });
      const data = await response.json();
      if (!response.ok) return console.log("Erreur dans fetch de updateCertification : ", data.message);
      setTitle("");
      setUrlImage("");
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
        <input
          type="text"
          className="input"
          onChange={(e) => setUrlImage(e.target.value)}
          value={urlImage}
          placeholder="url de l'image"
        />
        <div className="img_container">
          <img />
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
          .filter(item => item.categorie === "Diplôme")
          .map((item) => (
            <Item item={item} element={item.title} updateElement={getCertification} deleteElement={deleteElement} />
          ))}
        </ul>
        <p>-- Mes Certifications --</p>
        <ul>
          {allCertifications
          .filter(item => item.categorie === "Certification")
          .map((item) => (
            <Item item={item} element={item.title} updateElement={getCertification} deleteElement={deleteElement} />
          ))}
        </ul>
      </div>
    </div>
  );
}
