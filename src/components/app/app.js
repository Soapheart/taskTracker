import { useEffect, useRef, useState } from "react";

import './app.css';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import TaskList from "../task-list/task-list";
import projectManager from "../../services/projectConstructorService";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";


const App = () => {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [appTheme, setAppTheme] = useState();
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const pmInstance = projectManager();

    useEffect(()=>{
        updateStorage();
    },[])

    // const newProjectRef = useRef();

    const updateStorage = () => {
        const data = pmInstance.getData();
        setProjects(data.projects);
        setAppTheme(data.appTheme === 'light' ? 'dark' : 'light');
    }
    
    const addProject = () => {
        pmInstance.createProject();
        updateStorage();
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

    const changeTheme = () => {
        setAppTheme(appTheme === 'light' ? 'dark' : 'light');
        pmInstance.changeTheme(appTheme);
    }

    const openPomodoroSettings = () => {
        setSettingsModalOpen(!settingsModalOpen);
    }

    return(
        <div className="app">
            <ProjectsTab
                onAddProject={addProject}
                editProject={editProject}
                deleteProject={deleteProject}
                onSetSelectedProject = {(id) => setSelectedProject(id)}
                projectsArr={projects}
                // newProjectRef={newProjectRef}
                changeTheme={changeTheme}
                appTheme={appTheme}
                openPomodoroSettings={openPomodoroSettings}
            />
            <Button 
                action="createTask" 
                variant="createTask" 
                text='+ Create task' 
                onClick={()=>addTask(selectedProject)}
            />
            <TaskList 
                onDeleteTask={(taskId) => deleteTask(selectedProject, taskId)}
                onEditTask={(...args)=> editTask(...args)}
                projectsArr={projects}
                selectedProject={selectedProject}
                />
            <Modal openedState={settingsModalOpen} openPomodoroSettings={openPomodoroSettings}/>
        </div>
    )
}

export default App;