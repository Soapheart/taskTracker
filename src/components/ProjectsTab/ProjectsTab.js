import './ProjectsTab.css';

import dataService from "../../services/dataService";
import ProjectList from '../ProjectsList/ProjectsList';
import Button from '../Button/Button';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

const ProjectTab = (props) => {
    const {clearLocalStorage, exportData} = dataService();
    const {projectsArr, onSetSelectedProject, editProject, deleteProject, openPomodoroSettings} = props;
    const [servicesVisible, setServicesVisible] = useState(false);
    const [appTheme, setAppTheme] = useContext(ThemeContext);

    const addProjectMod = () =>{
        props.onAddProject();
    }

    const toggleServicesVisibility = () =>{
        setServicesVisible(!servicesVisible)
    }

    const changeTheme = () =>{
        setAppTheme(appTheme === 'light' ? 'dark' : 'light');
    }


    return(
        <div className="projectsTab">
            <span className='projectsTab__title'>Project List</span>
            <Button action="addProject" variant="addProject" text="Add Project" onClick={addProjectMod}/>
            <ProjectList 
                projectsArr={projectsArr} 
                onSetSelectedProject={onSetSelectedProject} 
                editProject={editProject}
                deleteProject={deleteProject}
            />
            <div className='services'>
                <Button action='toggleServices' variant='settings' text='' onClick={toggleServicesVisibility}/>
                {servicesVisible &&(
                    <div className='services-menu'>
                        <Button action="clearLocalStorage" variant="clearLocalStorage" onClick={()=>{clearLocalStorage()}} text=''/>
                        <Button action="exportData" variant="exportData" onClick={()=>{exportData()}} text=''/>
                        <Button action="openTimeSettings" variant="timeSettings" onClick={() => openPomodoroSettings()} text=''/>
                        <Button action="toggleTheme" variant={`toggleTheme-${appTheme}`} onClick={changeTheme} text=''/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProjectTab;