export default function EditBtn({ role, editMode, triggerEditMode }) {
    if(role === "admin" && editMode === false){
        return (
            <button className="btn" onClick={()=> triggerEditMode()}>Editer</button>
        )
    } else if (role === "admin" && editMode === true) {
        return (
            <button className="btn" onClick={() => triggerEditMode()}>Voir CV</button>
        )
    } else {
        return (
            <button className="btn">Me contacter</button>
        )
    }
}
