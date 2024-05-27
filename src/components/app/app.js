import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './app.css';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import AddTask from "../add-task/add-task";
import TaskList from "../task-list/task-list";
import dataService from "../../services/dataService";
import projectManager from "../../services/projectConstructorService";


const App = () => {

    const{saveDataToLocalStorage, getDataFromLocalStorage} = dataService();
    
    let [projects, setProjects] = useState([]);
    let [tasks, setTasks] = useState([]);
    let [selectedProject, setSelectedProject] = useState(null);

    useEffect(()=>{
        let data = getDataFromLocalStorage();
        // data ? setTasks(tasks = data.data) : setTasks(tasks = [])
        data ? setProjects(projects = data.data) : setProjects(projects = [
                {id: 'project-dRAqM62tO1KzBb8A5UpH7', title: 'Project - 17:38, 7', dateTime: 123, tasks: []},
                {id: 'project-8vOd3ZIgdy9CAD--fxVIE', title: 'Project - 17:39, 8', dateTime: 321, tasks: []}
            ])
        // setProjects(
        //     projects = [
        //     {id: 'project-dRAqM62tO1KzBb8A5UpH7', title: 'Project - 17:38, 7', dateTime: 123, tasks: []},
        //     {id: 'project-8vOd3ZIgdy9CAD--fxVIE', title: 'Project - 17:38, 7', dateTime: 321, tasks: []}
        //     ])
        console.log(projects);
    },[])

    const addProject = (project) => {
        setProjects(...projects, project);
        if (Array.isArray(projects)) {
            setProjects(projects.concat(project));
        } else {
            setProjects([project]);
        }
        saveDataToLocalStorage(projects);
        
        return projects;
    }

    //Переписать функцию, нужно отправлять указатель (id) на проект и добавлять задачу в тот проект, на котором стоит указатель
    //Добавить конструктор задачи?
    const addTask = (title, desc, dateTime, completed) => {

        if(title){
            const newTask = {
                id:`task-${nanoid()}`,
                title,
                desc,
                dateTime,
                completed,
            }
            // console.log(projects);
            // console.log(projects.find(item => item.id === selectedProject));
            setTasks(
                projects.find(proj => proj.id === selectedProject).tasks = [...projects.find(proj => proj.id === selectedProject).tasks, newTask]
            )
            console.log('Входит в компонент:');
            console.log(tasks);
            // saveDataToLocalStorage(tasks);
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
                onSetSelectedProject = {(id) => setSelectedProject(selectedProject = id)}
                projectsArr={projects}/>
            <AddTask 
                onAddTask={addTask}/>
            <TaskList 
                onDeleteTask={(id) => deleteTask(id)}
                onCompleteTask={(id) => completeTask(id)}
                onEditTask={(id, data)=>changeTask(id, data)}
                tasksArr={tasks}
                projectsArr={projects}
                selectedProject={selectedProject}
                />
        </div>
    )
}

export default App;