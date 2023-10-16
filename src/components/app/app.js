import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './app.css';

import AddTask from "../add-task/add-task";
import TaskList from "../task-list/task-list";
import dataService from "../../services/dataService";
import Pomodoro from "../pomodoro/Pomodoro";


const App = () => {

    const{saveDataToLocalStorage, getDataFromLocalStorage} = dataService();
    
    let [tasks, setTasks] = useState([]);

    useEffect(()=>{
        let data = getDataFromLocalStorage();
        console.log(data.data);
        data.data.length > 0 ? setTasks(tasks = data.data) : setTasks(tasks = [])

        // console.log(data.data);
    },[])

    const addTask = (title, desc, dateTime) => {
        if(title){
            const newTask = {
                id:`task-${nanoid()}`,
                title,
                desc,
                dateTime
            }
            setTasks(
                tasks = [...tasks, newTask]
            )
            console.log('Входит в компонент:');

            console.log(tasks);
            saveDataToLocalStorage(tasks);
        }
    }
    const deleteTask = (id) =>{
        console.log(id);
        setTasks(
            tasks = tasks.filter(item => item.id !== id)
        )
        saveDataToLocalStorage(tasks);
    }

    return(
        <div className="app">
            <Pomodoro/>
            <AddTask onAddTask={addTask}/>
            <TaskList 
            onDeleteTask={(id) => deleteTask(id)} 
            tasksArr={tasks}/>
            {/* <Pomodoro /> */}
        </div>
    )
}

export default App;