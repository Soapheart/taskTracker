import { useState, useEffect } from "react";

const AddProject = (props) =>{
    const [title, setTitle] = useState('');
    const dateTime = new Date;

    useEffect(()=>{
        setTitle(`Project - ${dateTime.getHours()}:${dateTime.getMinutes()}, ${dateTime.getDate()}`);
    },[]);

    const addProject = () => {
        props.onAddProject(title, dateTime);
    }

    return(
        <div className="createProject-btn">
            <button onClick={addProject}>Add project</button>
        </div>
    )
}
export default AddProject;