import "./item.scss";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function Item({ item, element, updateElement, deleteElement }) {
    return (
    <div className="item">
      <div className="item_element">{element}</div>
      <div className="item_actions">
        <button onClick={() => updateElement(item)}>
          <FaRegEdit />
        </button>
        <button onClick={() => deleteElement(item._id)}>
          <IoTrashBinSharp />
        </button>
      </div>
    </div>
  );
}
