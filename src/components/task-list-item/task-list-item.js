import './task-list-item.css';
import {useState } from "react";
import Pomodoro from "../pomodoro/Pomodoro";



const TaskListItem = ({taskData, onDeleteTask, onCompleteTask}) => {
    const {title, desc, dateTime, completed} = taskData;
    
    const [checked, setChecked] = useState(completed);
    const [totalSec, setTotalSec] = useState(0);

    const formatDateTime = (dateTime) =>{
        const formatNum = (num) => {
            if(num<10){
                return `0${num}`;
            }else{
                return num;
            }
        }
        const dateObj = new Date(dateTime)
        let time = formatNum(dateObj.getHours()) + ':'+ formatNum(dateObj.getMinutes());
        let date = formatNum(dateObj.getDate()) + '.' + (formatNum(dateObj.getMonth()+1)) + '.' + dateObj.getUTCFullYear().toString();
        return `${time} ${date}`;
    }

    const checkboxChange = () => {
        setChecked(!checked);
        onCompleteTask();
    }

    const handleTimeChange = (totalTime) => {
        setTotalSec(totalTime);
    }

    const formatTime = (totalTime) => {
        let hours = Math.floor(totalTime / 3600);
        let minutes = Math.floor(totalTime / 60 ) - (hours * 60);
        let seconds = totalTime % 60;
        let formattedTime = hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
        return formattedTime;
    }

    return (
        <li className='taskListItem'>
            <div className="taskListItem-data">
                <input className='taskListItem-data__checkbox' name='checkbox' type="checkbox" checked={checked}/>
                <label htmlFor="checkbox"  onClick={()=>{checkboxChange()}}></label>
                <div className='text-content'>
                    <div className='text-content__title'>
                        {title}
                    </div>
                    <div className='text-content__desc'>
                        {desc}
                    </div>
                </div>
                <Pomodoro onTimerRun={handleTimeChange}/>
                <button onClick={onDeleteTask}>Delete</button>
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