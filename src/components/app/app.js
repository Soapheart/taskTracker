import { useEffect, useRef, useState } from "react";

import './app.css';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import TaskList from "../task-list/task-list";
import projectManager from "../../services/projectConstructorService";
import Button from "../Button/Button";


const App = () => {

    let [projects, setProjects] = useState([]);
    let [selectedProject, setSelectedProject] = useState(null);

    useEffect(()=>{
        updateStorage();
    },[])

    const pmInstance = projectManager();

    const newProjectRef = useRef();

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
                projectsArr={projects}
                newProjectRef={newProjectRef}    
            />
            <Button action="createTask" variant="createTask" text='+ Create task' onClick={()=>addTask(selectedProject)}/>
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