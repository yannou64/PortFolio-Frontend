import "./projets.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import imgDefault from "../../../../../assets/noImage.jpg";
import { useRef, useState, useEffect } from "react";
import Item from "../../components/Item/Item";

export default function Projet() {
  const listeProjet = useRef();
  const formProjet = useRef();
  const [intitule, setIntitule] = useState("");
  const [synthese, setSynthese] = useState("");
  const [year, setYear] = useState("");
  const [img, setImg] = useState(null);
  const [imgApercuUrl, setImgApercuUrl] = useState("");
  const [allTechno, setAllTechno] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [editorMode, setEditorMode] = useState("Add");
  const [idProjectSelected, setIdProjectSelected] = useState("");

  // Initialisation des inputs
  function initInput() {
    setIntitule("");
    setSynthese("");
    setYear("");
    setImg(null);
    setIdProjectSelected("");
    setEditorMode("Add");
  }

  // hydratation des inputs à partir d'un projet
  function hydrateInputs(projet) {
    setIntitule(projet.intitule);
    setSynthese(projet.synthese);
    setYear(projet.year);
    setImg(projet.img);
  }

  // Affiche le formulaire
  function displayForm(mode) {
    updateFormButton(mode);
    listeProjet.current.style.display = "none";
    formProjet.current.style.display = "flex";
  }

  // Affiche la liste de projet
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

  // Action de Supprimer un projet
  // En appuyant sur icone Delete
  async function askingForDelete(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet/${id}`);
      const data = await response.json();
      if (!response.ok) return console.log("Erreur de status dans askingForDelete : ", data.message);
      setEditorMode("Delete");
      displayForm("Delete");
      hydrateInputs(data.data);
      setIdProjectSelected(id);
    } catch (e) {
      console.log(`Erreur dans askinForDelete : ${e.message}`);
    }
  }
  // En appuyant sur le bouton_editor supprimer
  async function deleteProject() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet/${idProjectSelected}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de status du fetch de deleteProject : ${data.message}`);
      console.log("projet delete");
    } catch (e) {
      console.log(`Erreur dans deleteProjet : ${e.message}`);
    }
  }

  // Action de Update un projet
  // En appuyant sur icone Update
  async function askingForUpdate(item) {
    const id = item._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet/${id}`);
      const data = await response.json();
      if (!response.ok) return console.log("Erreur de status dans askingForUpdate : ", data.message);
      setEditorMode("Update");
      displayForm("Update");
      hydrateInputs(data.data);
      setIdProjectSelected(id);
    } catch (e) {
      console.log(`Erreur dans askinForDelete : ${e.message}`);
    }
  }
  // En appuyant sur le bouton_editor update
  async function updateProject(){
    const formdata = new FormData()
    formdata.append("intitule", intitule)
    formdata.append("year", year)
    formdata.append("synthese", synthese)
    formdata.append("img", img)
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet/${idProjectSelected}`, {
        method: "PUT",
        body: formdata
      })
      const data = await response.json()
      if(!response.ok) return console.log(`Erreur de status dans le fetch de updateProject : ${data.message}`)
      console.log("update ok")
    } catch(e) {
      console.log(`Erreur dans updateProject : ${e.message}`)
    }
  }

  // Submit à partir d'un des bouton_editor
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
    await getAllProjet();
    await getAllTechno();
    displayProjetsList();
    initInput();
    setEditorMode("Add");
  }

  // CRUD
  async function createProject() {
    // On construit le formData
    const formData = new FormData();
    formData.append("intitule", intitule);
    formData.append("synthese", synthese);
    formData.append("year", year);
    formData.append("img", img);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log(`Erreur pendant le createProjet : ${e.message}`);
    }
  }

  async function getAllProjet() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/projet`);
      const data = await response.json();
      if (!response.ok) return console.log("Erreur de status dans getAllProjet: ", data.message);
      setAllProject(data.data);
    } catch (e) {
      console.log(`Erreur dans getAllProjet : ${e.message}`);
    }
  }

  async function getAllTechno() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/technos`);
      const data = await response.json();
      if (!response.ok) return console.log(`problème de status dans getAllTechno : ${response.status}`);
      setAllTechno(data.data);
    } catch (e) {
      console.log(`Erreur pendant le getAllTechno : ${e.message}`);
    }
  }

  // UseEffect
  useEffect(() => {
    getAllProjet();
    getAllTechno();
  }, []);

  // UseEffect pour la gestion du rendu de l'aperçu image
  useEffect(() => {
    let objectUrl;
    if (img instanceof File || img instanceof Blob) {
      objectUrl = URL.createObjectURL(img);
      setImgApercuUrl(objectUrl);
    } else if (typeof img === "string" && img !== "") {
      setImgApercuUrl(`${import.meta.env.VITE_API_URL}/${img}`);
    } else {
      setImgApercuUrl("");
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [img]);

  return (
    <div id="container_Projets">
      <div ref={listeProjet} id="liste_projets">
        <div id="liste_projets_display">
          <ul>
            {allProject.map((element) => (
              <li key={element._id}>
                <Item
                  item={element}
                  element={element.intitule}
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
              className="input"
              placeholder="Intitulé de projet"
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
              required
            />

            {/* champ Img */}
            <label htmlFor="input_img" className="container_img">
              <img src={imgApercuUrl && imgApercuUrl !== "" ? imgApercuUrl : imgDefault} alt="Image représentant le projet" />
            </label>
            <input
              type="file"
              id="input_img"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImg(e.target.files[0]);
                } else {
                  setImg(null);
                }
              }}
            />

            {/* champ Synthese */}
            <textarea
              id="synthese"
              placeholder="synthèse du projet"
              value={synthese}
              onChange={(e) => setSynthese(e.target.value)}
              required
            ></textarea>

            {/* champ Year */}
            <input
              className="input"
              type="number"
              placeholder="Année de réalisation"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div id="rightPart">
            <div id="liste_techno"></div>
            <div id="select_row">
              {/* champ Techno */}
              <select>
                <option value="" disabled>
                  --techno--
                </option>
                {allTechno.map((element) => (
                  <option value={element.techno} key={element._id}>
                    {element.techno}
                  </option>
                ))}
              </select>
              <MdOutlineAddCircleOutline size={40} />
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
    </div>
  );
}
