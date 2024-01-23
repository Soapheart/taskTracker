import './ProjectsList.css';

import dataService from "../../services/dataService";

const ProjectList = (props) => {

    const {clearLocalStorage, exportData} = dataService();

    return(
        <div className="projectsList">
            <span className='projectsList__title'>Project List</span>
            <button>Add Project</button>
            <div>Projects</div>
            <div className='services'>
                <button onClick={()=>{clearLocalStorage()}}>Clear Local Storage</button>
                <button onClick={()=>{exportData()}}>Export Data</button>
            </div>
        </div>
    )
}
export default ProjectList;