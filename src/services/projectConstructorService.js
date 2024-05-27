import { nanoid } from "nanoid";
import formatDateTimeService from "./formatDateTimeService";

const projectManager = () =>{
    class Task{
        constructor(title='Task title'){
            this.id = `task-${nanoid()}`
            this.title = title;
            this.description = '';
            this.dateTime = '';
        }
    }
    class Project{
        constructor(title='Project title'){
            this.id = `project-${nanoid()}`
            this.title = title;
            this.dateTime = '';
            this.tasks = [];
        }
        addTask(task){
            this.tasks.push(task);
            return this;
        }
        getTask(){
            return this.tasks;
        }
    }
    class ProjectStorage{
        constructor(){
            this.projects = [];
        }
        saveProject(project){
            this.projects.push(project);
        }
        getProjects(){
            return this.projects;
        }
    }

    function createProject(title){
        const project = new Project (title);
        const storage = new ProjectStorage();
        storage.saveProject(project);
        return project;
    }

    function createTask(title){
        return new Task(title);
    }
}
export default projectManager;