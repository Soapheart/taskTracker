import TaskListItem from '../task-list-item/task-list-item';
import './task-list.css';

import { useEffect, useState } from 'react';

const TaskList = (props) => {
    const {tasksArr, selectedProject, onDeleteTask, onCompleteTask, onEditTask} = props;

    const [arrItems, setArrItems] = useState([]);

    useEffect(()=>{

        setArrItems(tasksArr);
        // console.log(selectedProject);
        // console.log(typeof(arrItems));
        // console.log(arrItems);
        console.log(selectedProject);


    },[tasksArr, selectedProject])

    // console.log('Входит в компонент:');
    // console.log(tasksArr);
    if(arrItems.length > 0){
        const elements = arrItems.map(element=>{
            // console.log(element);
            return(
                <TaskListItem 
                    key={element.id}
                    onDeleteTask={()=>onDeleteTask(element.id)}
                    onCompleteTask={()=>onCompleteTask(element.id)}
                    onEditTask={(data)=>onEditTask(element.id, data)}
                    taskData={element}
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
            <div className='taskList_empty'>Empty task list</div>
        )
    }

}

export default TaskList;