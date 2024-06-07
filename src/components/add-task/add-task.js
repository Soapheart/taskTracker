import { useEffect, useState } from "react";
import './add-task.css';
import Button from "../Button/Button";

const AddTask = (props) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const completed = false;
    const dateTime = new Date();


    useEffect(()=>{
        setTitle(`Task - ${dateTime.getHours()}:${dateTime.getMinutes()}, ${dateTime.getDate()}`);
        setDesc('Desc');
    },[])


    const createTask = (e) => {
        e.preventDefault();
        props.onAddTask(title, desc, dateTime, completed);
    }



    return(
        <Button action="createTask" variant="createTask" text='+ Create task'  onClick={createTask}/>
    )
}
export default AddTask;