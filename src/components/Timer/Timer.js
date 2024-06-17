import { useEffect, useRef, useState } from 'react';
import './Timer.css';


export default function Timer( {onTimerRun} ) {
    const [timerChecked, setTimerChecked] = useState(true);
    const [timerMode, setTimerMode] = useState('pomodoro'); // timer / pomodoro
    const [time, setTime] = useState({hours: 0, minutes: 0, seconds: 0});
    const [displayMessage, setDisplayMessage] = useState(false);
    const [playState, setPlayState] = useState(false);
    const intervalRef = useRef(null);

    const [pomodoroStages, setPomodoroStages] = useState({work: 4, pause: 4})

    const [pomodoroStage, setPomodoroStage] = useState('work');
    let pomodoroSettings = {work:{minutes:25, seconds:0}, pause:{minutes:5, seconds:0}, rest:{minutes:30, seconds:0}};



    const pomodoroManager = (pomodoroStage, pomodoroSettings, pomodoroStages) =>{
        // (work>pause)*4>rest 
        let {work, pause} = pomodoroStages;
        if(pomodoroStage === 'work' && pomodoroStages.pause !== 0){
            setPomodoroStages({...pomodoroStages, work: work - 1});
            setPomodoroStage('pause');
            setTime({...time, minutes: pomodoroSettings.pause.minutes, seconds: pomodoroSettings.pause.seconds});
        }else if (pomodoroStage === 'pause' && pomodoroStages.work !== 0){
            setPomodoroStages({...pomodoroStages, pause: pause - 1});
            setPomodoroStage('work');
            setTime({...time, minutes: pomodoroSettings.work.minutes, seconds: pomodoroSettings.work.seconds});
        }else if (pomodoroStage === 'rest'){
            setPomodoroStages({work: 4, pause: 4});
            setPomodoroStage('work');
            setTime({...time, minutes: pomodoroSettings.work.minutes, seconds: pomodoroSettings.work.seconds});
        }else{
            setPomodoroStage('rest');
            setTime({...time, minutes: pomodoroSettings.rest.minutes, seconds: pomodoroSettings.rest.seconds});
        }
    }

    const renders = useRef(0);


    useEffect(()=>{
        if(playState) {
            if(timerMode === 'timer'){
                intervalRef.current = setInterval(()=>{
                    const {hours, minutes, seconds} = time;
                    if(time.minutes === 60){
                        setTime({hours: hours + 1, minutes: 0, seconds: 0 });
                    }
                    else if (time.seconds === 60){
                        setTime({...time, minutes: minutes + 1, seconds: 0 });
                    }else{
                        setTime({ ...time, seconds: seconds + 1});
                    }
                    // console.log(time);
                }, 1000)
            }else if(timerMode === 'pomodoro'){
                // pomodoroManager(pomodoroStage, pomodoroSettings);
                intervalRef.current = setInterval(()=>{
                    const {minutes, seconds} = time;
                    if (seconds === 0){
                        if(minutes !== 0){
                            setTime({minutes: minutes - 1, seconds: 59});
                        }else{
                            console.log('Change of stage');
                            pomodoroManager(pomodoroStage, pomodoroSettings, pomodoroStages);
                            console.log('Current stage: ' + pomodoroStage);
                        }
                    }else{
                        setTime({...time, seconds: seconds - 1});
                    }
                }, 1000)
            }
        }
        return ()=>clearInterval(intervalRef.current);
    },[playState, pomodoroStage, pomodoroSettings])


    const startStopBtnHandler = () => {
        setPlayState(!playState);
    }

    const reloadBtnHandler = () => {
        setPlayState(false);
        if(timerMode === 'timer'){
            setTime({hours: 0, minutes: 0, seconds: 0})
        }
        if(timerMode === 'pomodoro'){
            setTime({})
            setPomodoroStages({work: 4, pause: 4});
            setPomodoroStage('work');
        }
    }
    const switchTimerMode = () => {
        setTimerChecked(!timerChecked);
        if(timerChecked){
            setTimerMode('timer');
            setTime({hours: 0, minutes: 0, seconds: 0});
        }else{
            setTimerMode('pomodoro');
            setTime({hours: 0, minutes: 0, seconds: 0});
        }
    }

  return (
    <div className="timer-wrapper">
        <div className='timer'>
            {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
            :
            {time.seconds < 10 ? `0${time.seconds}`: time.seconds}
        </div>
        {/* <div>Total seconds passed: {totalSeconds}</div> */}
        <div className='message'>
            {displayMessage && <div>Break!</div>}
        </div>
        {/* <p>Time passed: {renders.current}</p> */}
        <div className='timer__controls'>
            <button onClick={startStopBtnHandler}>{playState ? "⏸" : "⏵"}</button>
            <button onClick={reloadBtnHandler}>↻</button>
            <input type="checkbox" className="timerSwitch" checked={timerChecked} onChange={switchTimerMode}></input>
        </div>
    </div>
  );
}
