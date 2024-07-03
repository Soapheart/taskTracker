import { useEffect, useState } from "react";

import './app.scss';

import ProjectsTab from "../ProjectsTab/ProjectsTab";
import TaskList from "../task-list/task-list";
import projectManager from "../../services/projectConstructorService";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { ThemeProvider } from "../../providers/ThemeProvider";


const App = () => {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const [pomodoroSettings, setPomodoroSettings] = useState({
        work:{minutes:25, seconds:0}, 
        pause:{minutes:5, seconds:0}, 
        rest:{minutes:30, seconds:0}
    });


    const pmInstance = projectManager();

    useEffect(()=>{
        updateStorage();
    },[])

    const updateStorage = () => {
        const data = pmInstance.getData();
        setProjects(data.projects);
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

    const openPomodoroSettings = () => {
        setSettingsModalOpen(!settingsModalOpen);
    }

    const changePomodoroSettings = (settings) => {
        setPomodoroSettings(settings);
    }

    const onSetSelectedProject = (id) => {
        setSelectedProject(id);
        if(id){
            const tasksTab = document.querySelector('.tasksTab');
            const tasksTabWrapper = document.querySelector('.tasksTab-wrapper');
            tasksTab.classList.add('show');
            tasksTabWrapper.classList.add('show');
        }
    }

    const onCloseTasksTab = (e) =>{
        const tasksTab = document.querySelector('.tasksTab');
        const tasksTabWrapper = document.querySelector('.tasksTab-wrapper');
        const closeTab = () => {
            setSelectedProject(null);
            tasksTab.classList.remove('show');
            tasksTabWrapper.classList.remove('show');
        }
        if (e.target === tasksTabWrapper){
            closeTab();
        }
    }

    return(
        <ThemeProvider pmInstance={pmInstance}>
            <div className="app">
                <ProjectsTab
                    onAddProject={addProject}
                    editProject={editProject}
                    deleteProject={deleteProject}
                    onSetSelectedProject = {(id) => onSetSelectedProject(id)}
                    projectsArr={projects}
                    openPomodoroSettings={openPomodoroSettings}
                />
                <div className="tasksTab-wrapper" onClick={(e)=>{onCloseTasksTab(e)}}>
                    <div className="tasksTab">
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
                            pomodoroSettings={pomodoroSettings}
                            />
                    </div>
                </div>
                <Modal
                    openedState={settingsModalOpen}
                    openPomodoroSettings={openPomodoroSettings}
                    pomodoroSettings={pomodoroSettings}
                    changePomodoroSettings={changePomodoroSettings}
                    />
            </div>
        </ThemeProvider>
    )
}

export default App;