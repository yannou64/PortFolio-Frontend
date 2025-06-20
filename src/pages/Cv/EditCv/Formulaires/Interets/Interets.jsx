import "./interets.css";
import { useState, useEffect } from "react";
import Item from "../../../../../components/Item/Item.jsx";

export default function Interets() {
  const [newInteret, setNewInteret] = useState("");
  const [interets, setInterets] = useState([]);
  const API_URI = import.meta.env.VITE_API_URL;

  async function getInterets() {
    try {
      const response = await fetch(`${API_URI}/cv/interets`);
      const data = await response.json();
      setInterets(data.data)
    } catch (e) {
      console.log(`Error in getInterets : ${e.message}`);
    }
  }

  async function addNewInteret(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/cv/newInteret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interet: newInteret }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log("Error in addNewInterest : ", e);
    }
    setNewInteret("");
    getInterets();
  }

  function updateElement(id){

  }

  function deleteElement(id){

  }

  useEffect(() => {
    getInterets();
  }, []);

  return (
    <div id="interetsContainer">
      <form onSubmit={addNewInteret} id="interetsForm">
        <input
          value={newInteret}
          onChange={(e) => setNewInteret(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="Intérêt"
        />
        <button className="btn">Add</button>
      </form>
      <div id="interetsList">
        {interets.map(data => <Item id={data._id} element={data.interet} updateElement={updateElement} deleteElement={deleteElement}/>)}
      </div>
    </div>
  );
}
