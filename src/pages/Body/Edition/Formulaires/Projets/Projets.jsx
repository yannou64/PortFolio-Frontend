import "./projets.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import imgDefault from "../../../../../assets/noImage.jpg";
import { useRef, useState, useEffect } from "react";
import Item from "../../components/Item/Item";
import { IoTrashBinSharp } from "react-icons/io5";

export default function Projet() {
  const listeProjet = useRef();
  const formProjet = useRef();
  const alertDoublonTechno = useRef();
  // Constante des champs
  const [titre_projet, setTitre_projet] = useState("");
  const [alt_img_projet, setAlt_img_projet] = useState("");
  const [description_projet, setDescription_projet] = useState("");
  const [is_favoris_projet, setIs_favoris_projet] = useState(false);
  const [technos_projet, setTechnos_projet] = useState([]);
  //
  const [imgApercuUrl, setImgApercuUrl] = useState("");
  const [image_projet, setImage_projet] = useState(null);
  
  const [allTechno, setAllTechno] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [editorMode, setEditorMode] = useState("Add");
  const [idProjectSelected, setIdProjectSelected] = useState("");
  const [technoDoublonAlert, setTechnoDoublonAlert] = useState(false);
  const technoSelect = useRef();
  const modal = useRef(null);
  const modal_button = useRef(null);
  const [error, setError] = useState(null);

  // Initialisation des inputs
  function initInput() {
    setTitre_projet("");
    setImage_projet(null);
    setAlt_img_projet("");
    setDescription_projet("");
    setIs_favoris_projet(false);
    setIdProjectSelected("");
    setTechnos_projet([]);
    setEditorMode("Add");
  }

  // hydratation des inputs à partir d'un projet
  function hydrateInputs(projet) {
    setTitre_projet(projet.titre_projet);
    setImage_projet(projet.image_projet);
    setAlt_img_projet(projet.alt_img_projet);
    setDescription_projet(projet.description_projet);
    setIs_favoris_projet(projet.is_favoris_projet);
    setTechnos_projet(projet.technos_projet);
  }

  // Affiche le formulaire et cache la liste des projets
  function displayForm(mode) {
    updateFormButton(mode);
    listeProjet.current.style.display = "none";
    formProjet.current.style.display = "flex";
  }

  // Affiche la liste de projet et cache le formulaire
  function displayProjetsList() {
    updateFormButton(editorMode);
    initInput();
    listeProjet.current.style.display = "flex";
    formProjet.current.style.display = "none";
  }

  // Function pour la mise à jour du bouton principale du formulaire (sauvegarder, update, supprimer)
  function updateFormButton(mode) {
    // j'initialise tous les boutons editor en display none
    const allBtnEditor = document.querySelectorAll(".btn_editor");
    for (const btn of allBtnEditor) {
      btn.style.display = "none";
    }
    // je change le display d'un bouton editor en particulier en fonction de la variable editorMode
    switch (mode) {
      case "Add":
        document.getElementById("btn_save").style.display = "inline";
        break;
      case "Update":
        document.getElementById("btn_update").style.display = "inline";
        break;
      case "Delete":
        document.getElementById("btn_delete").style.display = "inline";
    }
  }

  // En appuyant sur icone Delete de la liste des projets, on va récupérer le projet concerné et hydrater les champs pour afficher le formulaire complété
  // avec le bouton supprimé qui apparait (Sécurité)
  async function askingForDelete(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets/${id}`);
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error("Error status in askingForDelete : ", response.status);
      }
      
      const data = await response.json();
      setEditorMode("Delete");
      displayForm("Delete");
      hydrateInputs(data.data);
      setIdProjectSelected(id);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network error in askinForDelete : ${e.message}`);
    }
  }

  // En appuyant sur icone Update de la liste des projets, on va récupérer le projet concerné et hydrater les champs pour afficher le formulaire complété
  // avecle bouton update pour valider les modifications
  async function askingForUpdate(item) {
    const id = item._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets/${id}`);
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error("Error status in askingForUpdate : ", response.status);
      }

      const data = await response.json();
      setEditorMode("Update");
      displayForm("Update");
      hydrateInputs(data.data);
      setIdProjectSelected(id);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network error in askinForUpdate : ${e.message}`);
    }
  }

  // Submit du bouton de soumission du formulaire en fonction de editorMode indiquant si on lance une action d'ajout, de suppression, ou de modification
  async function handleSubmit(e) {
    e.preventDefault();
    switch (editorMode) {
      case "Add":
        await createProject();
        break;
      case "Delete":
        await deleteProject();
        break;
      case "Update":
        await updateProject();
        break;
      default:
        console.log("Erreur dans le contenu de editorMode :", editorMode);
    }
    // On réinitialise l'affichage sur la liste des projets
    await getAllProjet();
    await getAllTechno();
    displayProjetsList();
    initInput();
    setEditorMode("Add");
  }

  // CRUD
  // En appuyant sur le bouton_editor supprimer
  async function deleteProject() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets/${idProjectSelected}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error(`Error status in deleteProject : ${response.status}`);
      }
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network error in deleteProjet : ${e.message}`);
    }
  }

  // En appuyant sur le bouton_editor update
  async function updateProject() {
    const formdata = new FormData();
    formdata.append("titre_projet", titre_projet);
    formdata.append("image_projet", image_projet);
    formdata.append("alt_img_projet", alt_img_projet);
    formdata.append("description_projet", description_projet);
    formdata.append("is_favoris_projet", is_favoris_projet);
    formdata.append("technos_projet", JSON.stringify(technos_projet));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets/${idProjectSelected}`, {
        method: "PUT",
        body: formdata,
        credentials: "include",
      });
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error(`Error status in updateProject : ${response.status}`);
      }
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Network error in updateProject : ${e.message}`);
    }
  }

  // En appuyant sur le bouton_editor enregistrer
  async function createProject() {
    // On construit le formData
    const formdata = new FormData();
    formdata.append("titre_projet", titre_projet);
    formdata.append("image_projet", image_projet);
    formdata.append("alt_img_projet", alt_img_projet);
    formdata.append("description_projet", description_projet);
    formdata.append("is_favoris_projet", is_favoris_projet);
    formdata.append("technos_projet", JSON.stringify(technos_projet));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets`, {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error(`Error Status in createProject : ${response.status}`);
      }
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Error network in createProject : ${e}`);
    }
  }

  async function getAllProjet() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projets`);
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error(`Error Status in getAllProjet : ${response.status}`);
      }

      const data = await response.json();
      setAllProject(data.data);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Error network in getAllProjet: ${e}`);
    }
  }

  async function getAllTechno() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`);
      if (!response.ok) {
        setError("Status : " + response.status);
        modal.current.showModal();
        return console.error(`Error Status in getAllTechno: ${response.status}`);
      }

      const data = await response.json();
      setAllTechno(data.data);
    } catch (e) {
      setError("Erreur réseau");
      modal.current.showModal();
      console.error(`Error network in getAllTechno: ${e}`);
    }
  }

  function deleteTechno(id) {
    console.log(id);
    setTechnos_projet((oldArray) => oldArray.filter((value) => value !== id));
  }

  function addATechno() {
    setTechnos_projet((oldArray) => {
      if (oldArray?.includes(technoSelect.current.value)) {
        alertDoublonTechno.current.value = "test";
        setTechnoDoublonAlert(true);
        return oldArray;
      }
      setTechnoDoublonAlert(false);
      return oldArray == [] ? [technoSelect.current.value] : [...oldArray, technoSelect.current.value];
    });
  }

  // UseEffect
  useEffect(() => {
    getAllProjet();
    getAllTechno();
  }, [technos_projet]);

  // UseEffect pour la gestion du rendu de l'aperçu image
  useEffect(() => {
    let objectUrl;
    if (image_projet instanceof File || image_projet instanceof Blob) {
      objectUrl = URL.createObjectURL(image_projet);
      setImgApercuUrl(objectUrl);
    } else if (typeof image_projet === "string" && image_projet !== "") {
      setImgApercuUrl(`${import.meta.env.VITE_API_URL}/${image_projet}`);
    } else {
      setImgApercuUrl("");
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [image_projet]);

  return (
    <div id="container_Projets">
      <div ref={listeProjet} id="liste_projets">
        <div id="liste_projets_display">
          <ul>
            {allProject.map((element) => (
              <li key={element._id}>
                <Item
                  item={element}
                  element={element.titre_projet}
                  updateElement={askingForUpdate}
                  deleteElement={askingForDelete}
                />
              </li>
            ))}
          </ul>
        </div>
        <button className="btn addButton" onClick={() => displayForm("Add")}>
          Add
        </button>
      </div>
      <form ref={formProjet} id="formulaire_Projet" onSubmit={handleSubmit}>
        <div id="formulaire_Projet_inputs">
          <div id="leftPart">
            {/* champ Intitule */}
            <input
              type="text"
              aria-label="Intitule"
              className="input"
              placeholder="Intitulé de projet"
              value={titre_projet}
              onChange={(e) => setTitre_projet(e.target.value)}
              required
            />

            {/* champ image_projet */}
            <label htmlFor="input_img" className="container_img">
              <img
                src={imgApercuUrl && imgApercuUrl !== "" ? imgApercuUrl : imgDefault}
                alt="Image représentant le projet"
              />
            </label>
            <input
              type="file"
              id="input_img"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage_projet(e.target.files[0]);
                } else {
                  setImage_projet(null);
                }
              }}
            />

            {/* champ alt_img_projet */}
            <input
              aria-label="Alt_image"
              required
              type="text"
              className="input"
              placeholder="Description de l'image"
              onChange={(e) => setAlt_img_projet(e.target.value)}
              value={alt_img_projet}
            ></input>

            {/* champ description_projet */}
            <textarea
              aria-label="Description"
              id="description"
              placeholder="Description du projet"
              value={description_projet}
              onChange={(e) => setDescription_projet(e.target.value)}
              className="input"
              required
            ></textarea>

            {/* champ is_favoris_projet */}
            <label>
              <input
                aria-label="Favoris"
                type="checkbox"
                checked={is_favoris_projet}
                onChange={(e) => setIs_favoris_projet(e.target.checked)}
              />{" "}
              Mettre en favoris
            </label>
          </div>
          <div id="rightPart">
            <div id="liste_techno">
              <ul>
                {technos_projet.map((idTechno) => {
                  const technoObj = allTechno.find((techno) => techno._id === idTechno);
                  return (
                    <li key={idTechno}>
                      {technoObj ? technoObj.titre : "Techno inconnue"}
                      <IoTrashBinSharp onClick={() => deleteTechno(idTechno)} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div id="select_row">
              {/* champ Techno */}
              <select aria-label="Techonologies" ref={technoSelect} className="input" defaultValue="">
                <option value="" disabled>
                  --techno--
                </option>
                {allTechno.map((element) => (
                  <option value={element._id} key={element._id}>
                    {element.titre}
                  </option>
                ))}
              </select>
              <MdOutlineAddCircleOutline size={40} onClick={addATechno} />
            </div>
            <div id="alert_techno" style={{ display: technoDoublonAlert ? "inline" : "none" }} ref={alertDoublonTechno}>
              Cette techno fait déjà partie du projet
            </div>
          </div>
        </div>

        {/* bouttons */}
        <div id="formulaire_Projet_controle">
          <button id="btn_save" className="btn btn_editor" onClick={() => setEditorMode("Add")}>
            Enregistrer
          </button>
          <button id="btn_update" className="btn btn_editor" onClick={() => setEditorMode("Update")}>
            Update
          </button>
          <button id="btn_delete" className="btn btn_editor" onClick={() => setEditorMode("Delete")}>
            Supprimer
          </button>
          <button type="button" className="btn" value="Annuler" onClick={displayProjetsList}>
            Retour
          </button>
        </div>
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
    </div>
  );
}
