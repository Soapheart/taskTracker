import { useEffect, useState } from "react";
import Button from "../Button/Button";
import formatDateTimeService from '../../services/formatDateTimeService';
import './ProjectList__item.css';

const ProjectList = (props) => {
    const {projectsArr, onSetSelectedProject, editProject, deleteProject, newProjectRef} = props;
    const [selectedItem, setSelectedItem] = useState(null);
    const {formatDateTime} = formatDateTimeService();

    useEffect(()=>{
    },[projectsArr]);


    const handleClick = (e, id) =>{
        if(e.target.getAttribute('action') == 'deleteProject'){
            onDeleteProject(id);
        }else{
            setSelectedItem(id);
            onSetSelectedProject(id);
        }
    }

    const projectCompletness = (element) => {
        let projectCompletness = 0;
        let taskCount = element.tasks.length;
        if(element.tasks.length === undefined){taskCount = 0}
        element.tasks.forEach(task => {
            if(task.completed){
                projectCompletness++;
            };
        });
        let percent = projectCompletness/taskCount * 100;
        if(element.tasks.length == 0){
            percent = 0;
        }
        return percent;
    }

    const onDeleteProject = (projectID) => {
        setSelectedItem(null);
        onSetSelectedProject(null);
        deleteProject(projectID);
    }

    const handleProjectChange = (e, projectID) => {
        const innerText = e.target.innerText;
        editProject(projectID, innerText);
    }

    

    if(projectsArr){
        const projects = projectsArr.map(element=>{

            let completnessPercent = 100 - projectCompletness(element);

            return(
                <div 
                    key={element.id}
                    onClick={(e) => handleClick(e, element.id)} 
                    className={`ProjectList__item ${element.id === selectedItem ? 'ProjectList__item_selected' : ''}`}
                >
                    <div className="ProjectList__item-contentWrapper">
                        <div className="ProjectList__item-title" name='title' contentEditable onBlur={(e)=>handleProjectChange(e, element.id)} suppressContentEditableWarning={true}>
                            {element.title}
                        </div>
                        <div className="ProjectList__item-meta">
                            Created: {formatDateTime(element.dateTime)}
                        </div>
                        <Button action="deleteProject" variant="deleteProject" onClick={()=>onDeleteProject(element.id)}/>
                    </div>
                    <div className="ProjectList__item-progressBar" style={{left: `-${completnessPercent}%`}}></div>
                </div>
            )
        })
        return(
            <div className="ProjectsList">
                {projects}
            </div>
        )
    }else{
        return(
            <div className="ProjectsList_empty"></div>
        )
    }

}
export default ProjectList;