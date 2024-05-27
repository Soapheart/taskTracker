import './ProjectsTab.css';

import { nanoid } from "nanoid";
import AddProject from '../add-project/add-project';
import dataService from "../../services/dataService";
import ProjectList from '../ProjectsList/ProjectsList';

const ProjectTab = (props) => {

    const {clearLocalStorage, exportData} = dataService();
    const {projectsArr, onSetSelectedProject} = props;

    const addProject = (title, dateTime) => {
        const project = {
            id:`project-${nanoid()}`,
            title: title,
            dateTime: dateTime,
            completeness: 0,
            tasks: []
        }
        props.onAddProject(project);
    }


    return(
        <div className="projectsTab">
            <span className='projectsTab__title'>Project List</span>
            {/* <button onClick={()=>addProject()}>Add Project</button> */}
            <AddProject onAddProject={addProject}/>
            <ProjectList projectsArr={projectsArr} onSetSelectedProject={onSetSelectedProject}/>
            <div className='services'>
                <button onClick={()=>{clearLocalStorage()}}>Clear Local Storage</button>
                <button onClick={()=>{exportData()}}>Export Data</button>
            </div>
        </div>
    )
}
export default ProjectTab;