import './task-list-item.css';
import {useState, useEffect} from "react";
import Timer from "../Timer/Timer";
import formatDateTimeService from '../../services/formatDateTimeService';
import Button from '../Button/Button';


const TaskListItem = ({taskData, onDeleteTask, onEditTask, selectedProject}) => {
    const {id, title, description, dateTime, completed} = taskData;
    const {formatTime, formatDateTime} = formatDateTimeService();
    
    const [totalSec, setTotalSec] = useState(0);

    const [data, setData] = useState({
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed
    });

    useEffect(() => {
        onEditTask(selectedProject, id, data);
      }, [data]);

    const handleTimeChange = (totalTime) => {
        setTotalSec(totalTime);
    }

    const handleTaskChange = (e) => {
        const name = e.target.getAttribute('name');
        if(e.target.tagName === 'LABEL'){
            taskData.completed = !taskData.completed;
            setData((prevData) => ({
                ...prevData,
                [name]: taskData.completed
            }))
        }else{
            const innerText = e.target.innerText;
            setData((prevData) => ({
                ...prevData,
                [name]: innerText
            }));
        }
    }

    return (
        <li className={`taskListItem ${completed ? 'taskListItem_completed' : ''}`}>
            <div className="taskListItem-data">
                <input className='taskListItem-data__checkbox' name='completed' type="checkbox" checked={completed} readOnly/>
                <label htmlFor="checkbox" name='completed' onClick={(e)=>{handleTaskChange(e)}}></label>
                <div className='text-content'>
                    <div className='text-content__title' name='title' contentEditable onBlur={handleTaskChange} suppressContentEditableWarning={true}>
                        {title}
                    </div>
                    <div className='text-content__description' name='description' contentEditable onBlur={(e)=>{handleTaskChange(e)}} suppressContentEditableWarning={true}>
                        {description}
                    </div>
                </div>
                <Timer onTimerRun={handleTimeChange}/>
                <Button action="deleteTask" variant="deleteTask" onClick={onDeleteTask}/>
            </div>
            <div className='taskListItem-meta'>
                <div className='taskListItem-meta__time'>
                    Сreated: {formatDateTime(dateTime)}
                </div>
                <div className="taskListItem-meta__totalTime">
                    Total time passed: {formatTime(totalSec)}
                </div>
            </div>
            
        </li>
    )
}

export default TaskListItem;