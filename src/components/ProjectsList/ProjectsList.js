import { useState } from "react";
import './ProjectList__item.css';

const ProjectList = (props) => {
    const {projectsArr, onSetSelectedProject} = props;
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (id) =>{
        setSelectedItem(id);
        onSetSelectedProject(id);
        console.log(id);
    }


    if(projectsArr.length>0){
        const projects = projectsArr.map(element=>{
            return(
                <div 
                    key={element.id}
                    onClick={() => handleClick(element.id)} 
                    className={`ProjectList__item ${element.id === selectedItem ? 'ProjectList__item_selected' : ''}`}
                >
                    {element.title}
                </div>
            )
        })
        return(
            <div className="ProjectsList">
                {projects}
            </div>
        )
    }

}
export default ProjectList;