import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './app.css';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import AddTask from "../add-task/add-task";
import TaskList from "../task-list/task-list";
import projectManager from "../../services/projectConstructorService";

const App = () => {

    let [projects, setProjects] = useState([]);
    let [selectedProject, setSelectedProject] = useState(null);

    useEffect(()=>{
        updateStorage();
    },[])

    const pmInstance = projectManager();

    const updateStorage = () => {
        const data = pmInstance.getProjects();
        setProjects(
            projects = data.projects
        )
    }
    
    const addProject = () => {
        pmInstance.createProject();
        updateStorage();
    }
    const getProjects = () => {
        pmInstance.getProjects();
    }
    const editProject = (projectID, title) =>{
        pmInstance.editProject(projectID, title);
    }
    const deleteProject = (projectID) => {
        pmInstance.deleteProject(projectID);
        updateStorage();
    }

    const addTask = (selectedProject) => {
        pmInstance.createTask(selectedProject);
        updateStorage();
    }
    const deleteTask = (selectedProject, taskId) =>{
        pmInstance.deleteTask(selectedProject, taskId);
        updateStorage();
    }
    const editTask = (selectedProject, taskId, data) => {
        pmInstance.editTask(selectedProject, taskId, data);
        updateStorage();
    }


    return(
        <div className="app">
            <ProjectsTab
                onAddProject={addProject}
                onGetProjects={getProjects}
                editProject={editProject}
                deleteProject={deleteProject}
                onSetSelectedProject = {(id) => setSelectedProject(selectedProject = id)}
                projectsArr={projects}/>
            <AddTask 
                onAddTask={()=>{addTask(selectedProject)}} onClick={()=>{updateStorage()}}/>
            <TaskList 
                onDeleteTask={(taskId) => deleteTask(selectedProject, taskId)}
                onEditTask={(...args)=> editTask(...args)}
                projectsArr={projects}
                selectedProject={selectedProject}
                />
        </div>
    )
}

export default App;