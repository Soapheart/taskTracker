import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './app.css';

import ProjectsList from "../ProjectsList/ProjectsList";
import AddTask from "../add-task/add-task";
import TaskList from "../task-list/task-list";
import dataService from "../../services/dataService";


const App = () => {

    const{saveDataToLocalStorage, getDataFromLocalStorage} = dataService();
    
    let [tasks, setTasks] = useState([]);

    useEffect(()=>{
        let data = getDataFromLocalStorage();
        console.log(data);
        data ? setTasks(tasks = data.data) : setTasks(tasks = [])
    },[])


    const addTask = (title, desc, dateTime, completed) => {
        if(title){
            const newTask = {
                id:`task-${nanoid()}`,
                title,
                desc,
                dateTime,
                completed,
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
        setTasks(
            tasks = tasks.filter(item => item.id !== id)
        )
        saveDataToLocalStorage(tasks);
    }

    const completeTask = (id) => {
        const completedTask = tasks.find(task=>task.id===id);
        if(completedTask){
            completedTask.completed = !completedTask.completed;
        }
        saveDataToLocalStorage(tasks);
    }

    const changeTask = (id, data) => {
        const changedTask = tasks.find(task=>task.id===id);
        const updatedTask = {
            ...changedTask,
            ...data
        };
        console.log(data);
        // saveDataToLocalStorage(tasks);
    }

    return(
        <div className="app">
            <ProjectsList/>
            <AddTask onAddTask={addTask}/>
            <TaskList 
            onDeleteTask={(id) => deleteTask(id)}
            onCompleteTask={(id) => completeTask(id)}
            onEditTask={(id, data)=>changeTask(id, data)}
            tasksArr={tasks}/>
        </div>
    )
}

export default App;