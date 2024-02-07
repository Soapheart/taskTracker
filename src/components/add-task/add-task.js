import { useEffect, useState } from "react";
import './add-task.css';

const AddTask = (props) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const completed = false;
    const dateTime = new Date();


    useEffect(()=>{
        setTitle(`Task - ${dateTime.getHours()}:${dateTime.getMinutes()}, ${dateTime.getDate()}`);
        setDesc('Desc');
    },[])


    const submitTask = (e) => {
        e.preventDefault();
        props.onAddTask(title, desc, dateTime, completed);
        // setDesc('');
        // setTitle('');
    }



    return(
        <div className="taskCreate-form">
            <button onClick={submitTask}>Create task</button>
        </div>
    )
}
export default AddTask;