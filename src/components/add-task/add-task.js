import { useState } from "react";

const AddTask = (props) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    let dateTime;


    const onValueChange = (e) => {
        switch(e.target.name){
            case 'Title':
                setTitle(e.target.value);
                break;
            case 'Desc':
                setDesc(e.target.value);
                break;
            default:
                console.log('Ничего не передано');
        }
    }

    const submitTask = (e) => {
        e.preventDefault();
        dateTime = new Date();
        console.log(dateTime);
        props.onAddTask(title, desc, dateTime);
        setDesc('');
        setTitle('');
    }

    return(
        <div>
            <p>Добавляем новую задачу</p>
            <form onSubmit={submitTask}>
                <input placeholder="Заголовок" onChange={onValueChange} value={title} name="Title" required></input>
                <input placeholder="Какой-то текст" onChange={onValueChange} value={desc} name="Desc" required></input>
                <button type="submit">Add task</button>
            </form>
        </div>
    )
}
export default AddTask;