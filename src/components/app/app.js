import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './app.css';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import AddTask from "../add-task/add-task";
import TaskList from "../task-list/task-list";
import dataService from "../../services/dataService";


const App = () => {

    const{saveDataToLocalStorage, getDataFromLocalStorage} = dataService();
    
    let [projects, setProjects] = useState([]);
    let [tasks, setTasks] = useState([]);

    useEffect(()=>{
        let data = getDataFromLocalStorage();
        // console.log(data);
        data ? setTasks(tasks = data.data) : setTasks(tasks = [])
        setProjects(
            projects= [
            {id: 'project-dRAqM62tO1KzBb8A5UpH7', title: 'Project - 17:38, 7', dateTime: 123, tasks: Array(0)},
            {id: 'project-8vOd3ZIgdy9CAD--fxVIE', title: 'Project - 17:38, 7', dateTime: 321, tasks: Array(0)}
            ])
    },[])

    const addProject = (project) => {
        setProjects(...projects, project);
        if (Array.isArray(projects)) {
            setProjects(projects.concat(project));
        } else {
            setProjects([project]);
        }
        console.log(projects);
    }

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
            // console.log('Входит в компонент:');
            // console.log(tasks);
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
        // console.log(data);
        // saveDataToLocalStorage(tasks);
    }

    return(
        <div className="app">
            <ProjectsTab
                onAddProject={addProject}
                projectsArr={projects}/>
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