import './task-list-item.css';


const TaskListItem = ({taskData, onDeleteTask}) => {
    const {title, desc, dateTime} = taskData;
    // console.log(new Date(dateTime).getHours());
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

    return (
        <li className='taskListItem'>
            <div className='taskListItem__title'>
                {title}
            </div>
            <div className='taskListItem__desc'>
                {desc}
            </div>
            <div className='taskListItem__time'>
                Time created: {formatDateTime(dateTime)}
            </div>
            <button onClick={onDeleteTask}>Delete</button>
        </li>
    )
}

export default TaskListItem;