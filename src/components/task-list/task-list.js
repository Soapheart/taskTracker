import TaskListItem from '../task-list-item/task-list-item';
import './task-list.css';

const TaskList = (props) => {
    const {tasksArr, onDeleteTask, onCompleteTask} = props;
    const tasks = tasksArr;

    // console.log('Входит в компонент:');
    // console.log(tasksArr);
    if(tasks.length > 0){
        const elements = tasks.map(element=>{
            console.log(element);
            return(
                <TaskListItem 
                key={element.id}
                onDeleteTask={()=>onDeleteTask(element.id)}
                onCompleteTask={()=>onCompleteTask(element.id)}
                taskData={element}
                />
            )
        })
        return(
            <ul className='taskList'>
                {elements}
            </ul>
        )
    }

}

export default TaskList;