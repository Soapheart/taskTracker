import TaskListItem from '../task-list-item/task-list-item';
import './task-list.css';

import { useEffect, useState } from 'react';

const TaskList = (props) => {
    const {projectsArr, selectedProject, onDeleteTask, onCompleteTask, onEditTask, pomodoroSettings} = props;

    const [arrItems, setArrItems] = useState([]);
    const [taskListMessage, setTaskListMessage] = useState('');

    useEffect(()=>{
        if(projectsArr && selectedProject){
            const selProj = projectsArr.find(item => item.id.includes(selectedProject));
            setArrItems(selProj.tasks);
            if (projectsArr.find(item => item.id.includes(selectedProject)).tasks.length === 0){
                setTaskListMessage('No tasks found');
                setArrItems(null);
            }
        }else if (selectedProject === null){
            setTaskListMessage('Please select a project');
            setArrItems(null);
        }
    },[selectedProject, projectsArr])

    if(arrItems){
        const elements = arrItems.map(element=>{
            return(
                <TaskListItem 
                    key={element.id}
                    onDeleteTask={()=>onDeleteTask(element.id)}
                    onCompleteTask={()=>onCompleteTask(element.id)}
                    onEditTask={(...args)=>onEditTask(...args)}
                    taskData={element}
                    selectedProject={selectedProject}
                    pomodoroSettings={pomodoroSettings}
                />
            )
        })
        return(
            <ul className='taskList'>
                {elements}
            </ul>
        )
    }else{
        return(
            <div className='taskList_message'>{taskListMessage}</div>
        )
    }

}

export default TaskList;