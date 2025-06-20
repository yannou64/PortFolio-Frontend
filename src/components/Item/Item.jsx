import "./item.css";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function Item({ id, element, updateElement, deleteElement }) {
  return (
    <div className="item">
      <div className="item_element">{element}</div>
      <div className="item_actions">
        <button onClick={()=>updateElement(id)}>
          <FaRegEdit />
        </button>
        <button onClick={()=>deleteElement(id)}>
          <IoTrashBinSharp />
        </button>
      </div>
    </div>
  );
}
