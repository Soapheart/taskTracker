import './ProjectsTab.css';

import dataService from "../../services/dataService";
import ProjectList from '../ProjectsList/ProjectsList';
import Button from '../Button/Button';
import { useState } from 'react';

const ProjectTab = (props) => {
    const {clearLocalStorage, exportData} = dataService();
    const {projectsArr, onSetSelectedProject, editProject, deleteProject, newProjectRef} = props;
    const [servicesVisible, setServicesVisible] = useState(false);
    const [appTheme, setAppTheme] = useState('light');

    const addProjectMod = () =>{
        props.onAddProject();
    }

    const toggleServicesVisibility = () =>{
        setServicesVisible(!servicesVisible)
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
                newProjectRef={newProjectRef}
            />
            <div className='services'>
                <Button action='toggleServices' variant='settings' text='' onClick={toggleServicesVisibility}/>
                {servicesVisible &&(
                    <div className='services-menu'>
                        <Button action="clearLocalStorage" variant="clearLocalStorage" onClick={()=>{clearLocalStorage()}} text=''/>
                        <Button action="exportData" variant="exportData" onClick={()=>{exportData()}} text=''/>
                        <Button action="openTimeSettings" variant="timeSettings" onClick={()=>{console.log('Time settings modal')}} text=''/>
                        <Button action="toggleTheme" variant="toggleTheme-light" onClick={()=>{console.log('Change theme')}} text=''/>
                        <Button action="toggleTheme" variant="toggleTheme-dark" onClick={()=>{console.log('Change theme')}} text=''/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProjectTab;