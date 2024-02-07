
const ProjectList = (props) => {
    const {projectsArr} = props;

    if(projectsArr.length>0){
        const projects = projectsArr.map(element=>{
            return(
                <div className="item">
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