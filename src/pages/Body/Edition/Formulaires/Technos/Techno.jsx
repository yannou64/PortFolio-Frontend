import "./techno.scss";
import { useState, useEffect, useRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import apercuDefault from "../../../../../assets/noImage.jpg";
import Item from "../../components/Item/Item";

export default function Techno() {
  const [updateMode, setUpdateMode] = useState(false);
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [niveau, setNiveau] = useState("");
  const [allTechnos, setAllTechnos] = useState([]);
  const [technoIdToUpdate, setTechnoIdToUpdate] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageApercuUrl, setImageApercuUrl] = useState("");

  const [alt_img, setAlt_img] = useState("");
  const modal = useRef(null);
  const modal_button = useRef(null);
  const [error, setError] = useState(null);

  async function getAllTechnos() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`);
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.log(`Error status in getAllTechnos : ${response.status}`);
      }
      const data = await response.json();
      setAllTechnos(data.data);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network Error in getAllTechno : ${e.message}`);
    }
  }

  async function addSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("categorie", categorie);
    formData.append("niveau", niveau);
    formData.append("image", imageFile);
    formData.append("alt_img", alt_img);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        setError("status : " + response.status);
        modal.current.showModal();
        return console.log(`Error Status in addSubmit: ${response.status}`);
      }

      reinitData();
      getAllTechnos();
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network Error in addSubmit : ${e.message}`);
    }
  }

  async function updateSubmit(e) {
    e.preventDefault(e);

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("categorie", categorie);
    formData.append("niveau", niveau);
    formData.append("image", imageFile);
    formData.append("alt_img", alt_img);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${technoIdToUpdate}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.log(`Error Status in updateSubmit : ${response.status}`);
      }
      reinitData();
      getAllTechnos();
      setUpdateMode(false);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network Error in updateSubmit : ${e.message}`);
    }
  }

  async function hydrateTechnoToUpdate(techno) {
    setTitre(techno.titre);
    setCategorie(techno.categorie);
    setAlt_img(techno.alt_img);
    setNiveau(techno.niveau);
    setImageApercuUrl(`${import.meta.env.VITE_API_URL}/${techno.image}`);
    setImageFile(techno.image);
    setUpdateMode(true);
    setTechnoIdToUpdate(techno._id);
  }

  async function deleteTechno(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.log(`Error Status in deleteTechno: ${response.status}`);
      }
      reinitData();
      getAllTechnos();
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network Error in deleteTechno : ${e.message}`);
    }
  }

  function reinitData() {
    setTitre("");
    setNiveau("");
    setImageApercuUrl("");
    setImageFile("");
    setCategorie("");
    setAlt_img("");
  }

  useEffect(() => {
    getAllTechnos();
  }, []);

  return (
    <section id="technoContainer">
      <form onSubmit={updateMode ? updateSubmit : addSubmit} id="technoForm">
        {/* Champ titre */}
        <input
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="input w-full"
          type="text"
          placeholder="Entrez la compétence"
          required
        />
        {/* Champ image */}
        <div id="image_row">
          <label htmlFor="image">
            <img
              className="image_container"
              src={imageApercuUrl && imageApercuUrl !== "" ? imageApercuUrl : apercuDefault}
              alt="Image représentant le projet"
            />
          </label>
          <input
            hidden
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              const objectUrl = URL.createObjectURL(e.target.files[0]);
              setImageApercuUrl(objectUrl);
            }}
          />
        </div>
        {/* Champ alt_img */}
        <input
          type="text"
          value={alt_img}
          onChange={(e) => setAlt_img(e.target.value)}
          placeholder="Description de l'image"
          className="input w-full"
          required
        />
        {/* Champ categorie */}
        <select required onChange={(e) => setCategorie(e.target.value)} value={categorie}>
          <option value="" disabled>
            --Categorie--
          </option>
          <option value="Langage / Framework">Langage / Framework</option>
          <option value="Outil de développement">Outil de développement</option>
          <option value="Design / Organisation">Organisation / Design</option>
        </select>
        {/* Champ niveau */}
        <select required onChange={(e) => setNiveau(e.target.value)} value={niveau}>
          <option value="" disabled>
            --Niveau--
          </option>
          <option value="Debutant">Débutant</option>
          <option value="Maitrise">Maitrise</option>
          <option value="Expertise">Expertise</option>
        </select>

        {/* Boutton soummission */}
        <button className="btn">{updateMode ? "Update" : "Add"}</button>
      </form>

      {/* Modal dans le cas ou mauvais format de données envoyés */}
      <dialog ref={modal}>
        <h3>Erreur détectée</h3>
        <p>Un problème est survenue :</p>
        <p>
          <strong>{error}</strong>
        </p>
        <div>
          <button className="btn" onClick={() => modal.current.close()} ref={modal_button}>
            OK
          </button>
        </div>
      </dialog>

      {/* Listing des compétences déjà enregistré dans la bdd */}
      <section id="technoList">
        {allTechnos.map((item) => (
          <Item
            key={item._id}
            item={item}
            element={item.titre}
            updateElement={hydrateTechnoToUpdate}
            deleteElement={deleteTechno}
          />
        ))}
      </section>
    </section>
  );
}
