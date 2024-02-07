import TaskListItem from '../task-list-item/task-list-item';
import './task-list.css';

const TaskList = (props) => {
    const {tasksArr, onDeleteTask, onCompleteTask, onEditTask} = props;

    // console.log('Входит в компонент:');
    // console.log(tasksArr);
    if(tasksArr.length > 0){
        const elements = tasksArr.map(element=>{
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
    }

}

export default TaskList;