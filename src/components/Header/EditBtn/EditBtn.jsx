export default function EditBtn({ role, editMode, triggerEditMode }) {
    if(role === "admin" && editMode === false){
        return (
            <button onClick={()=> triggerEditMode()}>Voir CV</button>
        )
    } else if (role === "admin" && editMode === true) {
        return (
            <button onClick={() => triggerEditMode()}>Editer</button>
        )
    } else {
        return (
            <button>Me contacter</button>
        )
    }
}
