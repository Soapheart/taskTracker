import { nanoid } from "nanoid";
import dataService from "./dataService";

const{saveDataToLocalStorage, getDataFromLocalStorage} = dataService();

const projectManager = () =>{
    class Task{
        constructor(title='Task title', description='Task description', completed=false){
            this.id = `task-${nanoid()}`
            this.title = title;
            this.description = description;
            this.dateTime = new Date();
            this.completed = completed;
        }
    }
    class Project{
        constructor(title='Project title'){
            this.id = `project-${nanoid()}`
            this.title = title;
            this.dateTime = new Date();
            this.tasks = [];
        }
    }
    class DataStorage{
        constructor(data = {projects: [], appTheme: 'dark'}) {
            this.projects = data.projects;
            this.appTheme = data.appTheme;
        }
        saveProject = (project) => {
            this.projects.push(project);
        }
        saveTheme = (theme) => {
            this.appTheme = theme;
        }
    }

    let storage;
    const data = getDataFromLocalStorage();
    if(data != null){
        storage = new DataStorage(data);
    }else{
        storage = new DataStorage();
    }

    function createProject(title){
        const project = new Project (title);
        storage.saveProject(project);
        saveDataToLocalStorage(storage);
    }

    function editProject(projectID, title){
        const projectToChange = storage.projects.find(item => item.id.includes(projectID));
        projectToChange.title = title;
        saveDataToLocalStorage(storage);
    }

    function deleteProject(projectID){
        const index = storage.projects.findIndex(arr => arr.id === projectID);
            if (index !== -1) {
                storage.projects.splice(index, 1);
            }
            saveDataToLocalStorage(storage);
    }

    function getData(){
        return storage;
    }

    function createTask(selectedProject){
        if(selectedProject){
            const task = new Task();
            const projectToChange = storage.projects.find(item => item.id.includes(selectedProject));
            projectToChange.tasks.push(task);
            saveDataToLocalStorage(storage);
        }
    }
    function deleteTask(selectedProject, taskId){
        if(selectedProject){
            const projectToChange = storage.projects.find(item => item.id.includes(selectedProject));
            const index = projectToChange.tasks.findIndex(arr => arr.id === taskId);
            if (index !== -1) {
                projectToChange.tasks.splice(index, 1);
            }
            saveDataToLocalStorage(storage);
        }
    }
    function editTask(selectedProject, taskId, data){
        if(selectedProject){
            const projectToChange = storage.projects.find(item => item.id.includes(selectedProject));
            let changedTask = projectToChange.tasks.find(task => task.id === taskId);
            changedTask.title = data.title;
            changedTask.description = data.description;
            changedTask.completed = data.completed;
            saveDataToLocalStorage(storage);
        }
    }

    function changeTheme(theme){
        storage.saveTheme(theme)
        saveDataToLocalStorage(storage);
    }


    return {createProject, editProject, deleteProject, getData, createTask, deleteTask, editTask, changeTheme}
}
export default projectManager;