import "./interets.scss";
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item.jsx";

export default function Interets() {
  const [interet, setInteret] = useState("");
  const [interets, setInterets] = useState([]);
  const [updateInteretId, setUpdateInteretId] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const API_URI = import.meta.env.VITE_API_URL;

  async function getInterets() {
    try {
      const response = await fetch(`${API_URI}/cv/interets`);
      const data = await response.json();
      setInterets(data.data);
    } catch (e) {
      console.log(`Error in getInterets : ${e.message}`);
    }
  }

  async function addNewSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/cv/newInteret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interet: interet }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log("Error in addNewInterest : ", e);
    }
    setInteret("");
    getInterets();
  }

  async function updateElement(element) {
    setUpdateMode(true);

    try {
      const response = await fetch(`${API_URI}/cv/interet/${element._id}`);
      // On récupère les données à hydrater
      const data = await response.json();
      // On hydrate les données
      setInteret(data.interet.interet);
      setUpdateInteretId(data.interet._id);
    } catch (e) {
      console.log(`Error to get and hydrate : ${e.message}`);
    }
  }

  async function deleteElement(id) {
    try {
      const response = await fetch(`${API_URI}/cv/interet/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) console.log(data.message);
    } catch (e) {
      console.log(`Error to delete : ${e.message}`);
    }
    getInterets();
  }

  async function updateSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/cv/interet/${updateInteretId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interet }),
      });
      const data = await response.json();
      setInteret("");
      setUpdateMode(false);
      getInterets();
    } catch (e) {
      console.log(`Error dans updateSubmit : ${e.message}`);
    }
  }

  useEffect(() => {
    getInterets();
  }, []);

  return (
    <div id="interetsContainer">
      <form onSubmit={updateMode ? updateSubmit : addNewSubmit} id="interetsForm">
        <input
          value={interet}
          onChange={(e) => setInteret(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="Intérêt"
        />
        <button className="btn">{updateMode ? "Update" : "Add"}</button>
      </form>
      <div id="interetsList">
        {interets.map((data) => (
          <Item item={data} element={data.interet} updateElement={updateElement} deleteElement={deleteElement} />
        ))}
      </div>
    </div>
  );
}
