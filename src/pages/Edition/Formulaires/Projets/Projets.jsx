import "./projets.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import imgDefault from "../../../../assets/noImage.jpg";
import { useRef, useState, useEffect } from "react";
import Item from "../../components/Item/Item";
import { IoTrashBinSharp } from "react-icons/io5";

export default function Projet() {
  const listeProjet = useRef();
  const formProjet = useRef();
  const alertDoublonTechno = useRef();
  // Constante des champs
  const [titre_projet, setTitre_projet] = useState("");
  const [image_projet, setImage_projet] = useState(null);
  const [alt_img_projet, setAlt_img_projet] = useState("")
  const [description_projet, setDescription_projet] = useState("");
  const [is_favoris_projet, setIs_favoris_projet] = useState(false)
  const [technosProject, setTechnosProject] = useState([]);
  //
  const [imgApercuUrl, setImgApercuUrl] = useState("");
  const [allTechno, setAllTechno] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [editorMode, setEditorMode] = useState("Add");
  const [idProjectSelected, setIdProjectSelected] = useState("");
  const [technoDoublonAlert, setTechnoDoublonAlert] = useState(false);
  const technoSelect = useRef();

  // Initialisation des inputs
  function initInput() {
    setTitre_projet("");
    setImage_projet(null);
    setAlt_img_projet("");
    setDescription_projet("");
    setIs_favoris_projet(false)
    setIdProjectSelected("");
    setTechnosProject([]);
    setEditorMode("Add");
  }

  // hydratation des inputs à partir d'un projet
  function hydrateInputs(projet) {
    setTitre_projet(projet.titre_projet);
    setImage_projet(projet.image_projet);
    setAlt_img_projet(projet.alt_img_projet)
    setDescription_projet(projet.synthese_projet);
    setIs_favoris_projet(projet.is_favoris_projet)
    setTechnosProject(projet.technos);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet/${id}`);
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

  // En appuyant sur icone Update de la liste des projets, on va récupérer le projet concerné et hydrater les champs pour afficher le formulaire complété
  // avecle bouton update pour valider les modifications
  async function askingForUpdate(item) {
    const id = item._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet/${id}`);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet/${idProjectSelected}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de status du fetch de deleteProject : ${data.message}`);
      console.log("projet delete");
    } catch (e) {
      console.log(`Erreur dans deleteProjet : ${e.message}`);
    }
  }

  // En appuyant sur le bouton_editor update
  async function updateProject() {
    const formdata = new FormData();
    formdata.append("intitule", intitule);
    formdata.append("year", year);
    formdata.append("synthese", synthese);
    formdata.append("technos", JSON.stringify(technosProject));
    formdata.append("img", img);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet/${idProjectSelected}`, {
        method: "PUT",
        body: formdata,
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de status dans le fetch de updateProject : ${data.message}`);
      console.log("update ok");
    } catch (e) {
      console.log(`Erreur dans updateProject : ${e.message}`);
    }
  }

  // En appuyant sur le bouton_editor enregistrer
  async function createProject() {
    // On construit le formData
    const formData = new FormData();
    formData.append("intitule", intitule);
    formData.append("synthese", synthese);
    formData.append("year", year);
    formData.append("technos", JSON.stringify(technosProject));
    formData.append("img", img);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log(`Erreur pendant le createProjet : ${e.message}`);
    }
  }

  async function getAllProjet() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/projet`);
      const data = await response.json();
      if (!response.ok) return console.log("Erreur de status dans getAllProjet: ", data.message);
      setAllProject(data.data);
    } catch (e) {
      console.log(`Erreur dans getAllProjet : ${e.message}`);
    }
  }

  async function getAllTechno() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`);
      const data = await response.json();
      if (!response.ok) return console.log(`problème de status dans getAllTechno : ${response.status}`);
      setAllTechno(data.data);
    } catch (e) {
      console.log(`Erreur pendant le getAllTechno : ${e.message}`);
    }
  }

  async function deleteTechno(id) {
    console.log(id);
    setTechnosProject((oldArray) => oldArray.filter((value) => value !== id));
  }

  function addATechno() {
    setTechnosProject((oldArray) => {
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
    console.log(technosProject);
  }, [technosProject]);

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
            <div id="liste_techno">
              <ul>
                {technosProject.map((idTechno) => {
                  const technoObj = allTechno.find((techno) => techno._id === idTechno);
                  return (
                    <li key={idTechno}>
                      {technoObj ? technoObj.techno : "Techno inconnue"}
                      <IoTrashBinSharp onClick={() => deleteTechno(idTechno)} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div id="select_row">
              {/* champ Techno */}
              <select ref={technoSelect}>
                <option value="" disabled>
                  --techno--
                </option>
                {allTechno.map((element) => (
                  <option value={element._id} key={element._id}>
                    {element.techno}
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
    </div>
  );
}
