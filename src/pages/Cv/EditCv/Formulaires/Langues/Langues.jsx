import Item from "../../components/Item/Item.jsx";
import { useState, useEffect } from "react";
import "./langues.scss";

export default function Langues() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [langue, setLangue] = useState("");
  const [level, setLevel] = useState("");
  const [allLangue, setAllLangue] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [langueToUpdate, setLangueToUpdate] = useState("");

  // Afficher les langues dans la bdd
  async function getData() {
    try {
      const response = await fetch(`${API_URL}/api/cv/langues`);
      const data = await response.json();
      if (response.ok) {
        setAllLangue(data.data);
        setLangue("");
        setLevel("");
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // Enregistrer une nouvelle langue
  async function addSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/cv/langues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ langue, level }),
      });
      const data = await response.json();
      if (response.ok) {
        setLangue("");
        setLevel("");
        getData();
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function deleteElement(id) {
    try {
      const response = await fetch(`${API_URL}/api/cv/langues/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        getData();
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function updateElement(element) {
    try {
      const response = await fetch(`${API_URL}/api/cv/langues/${element._id}`);
      const data = await response.json();
      if (response.ok) {
        setLangue(element.langue);
        setLevel(element.level);
        setUpdateMode(true);
        setLangueToUpdate(element);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function updateSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/cv/langues/${langueToUpdate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ langue, level }),
      });
      const data = await response.json();
      if (response.ok) {
        getData();
        setUpdateMode(false);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="langContainer">
      <form onSubmit={updateMode ? updateSubmit : addSubmit} id="langForm">
        <input
          value={langue}
          onChange={(e) => setLangue(e.target.value)}
          className="input w-full"
          type="text"
          placeholder="Entrez la langue"
          required
        />
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="input w-full"
          type="text"
          placeholder="Entrez le niveau de maitrise"
          required
        />
        <button className="btn">{updateMode ? "Update" : "Add"}</button>
      </form>
      <div id="langList">
        {allLangue.map((item) => (
          <Item item={item} element={item.langue} updateElement={updateElement} deleteElement={deleteElement} />
        ))}
      </div>
    </div>
  );
}
