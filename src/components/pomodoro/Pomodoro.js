import { useEffect, useRef, useState } from 'react';
import './Pomodoro.css';


export default function Pomodoro( {onTimerRun} ) {
    const [minutes, setMinutes] = useState (25);
    const [seconds, setSeconds] = useState (0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [playState, setPlayState] = useState(false);
    const intervalRef = useRef(null);


    const renders = useRef(0);

    useEffect(()=>{
        if(playState){
            intervalRef.current = setInterval(()=>{
                clearInterval(intervalRef.current);
                if (seconds === 0){
                    if(minutes !== 0){
                        setSeconds(59);
                        setMinutes(minutes-1);
                    }else{
                        let minutes = displayMessage ? 24 : 4;
                        let seconds = 59;
                        setSeconds(seconds);
                        setMinutes(minutes);
                        setDisplayMessage(!displayMessage);
                    }
                }else{
                    setSeconds(seconds - 1);
                }
                renders.current++;
                onTimerRun(renders.current);
                console.log(renders.current);
            },1000)
        }else{
            clearInterval(intervalRef.current);
        }
    },[playState, seconds, minutes])

    const startStopBtnHandler = () => {
        setPlayState(!playState);
    }


        // let interval = setInterval(() => {
        //         clearInterval(interval);
        //             if (seconds === 0){
        //                 if(minutes !== 0){
        //                     setSeconds(59);
        //                     setMinutes(minutes-1);
        //                 }else{
        //                     let minutes = displayMessage ? 24 : 4;
        //                     let seconds = 59;
        
        //                     setSeconds(seconds);
        //                     setMinutes(minutes);
        //                     setDisplayMessage(!displayMessage);
        //                 }
        //             }else{
        //                 setSeconds(seconds - 1);
        //             }
        //             setTotalSeconds(totalSeconds + 1);
        //             renders.current++;
        //         }, 1000);
    // }
    // const intervalRef = useRef();


    // useEffect(()=>{
    //   if(playState){
    //     let interval = setInterval(() => {
    //         clearInterval(interval);
    //         if (seconds === 0){
    //             if(minutes !== 0){
    //                 setSeconds(59);
    //                 setMinutes(minutes-1);
    //             }else{
    //                 let minutes = displayMessage ? 24 : 4;
    //                 let seconds = 59;

    //                 setSeconds(seconds);
    //                 setMinutes(minutes);
    //                 setDisplayMessage(!displayMessage);
    //             }
    //         }else{
    //             setSeconds(seconds - 1);
    //         }
    //         setTotalSeconds(totalSeconds + 1);
    //         renders.current++;
    //     }, 1000);
    //   }
    // },[])

  return (
    <div className="pomodoro">
        <div className='timer'>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}`: seconds}
        </div>
        {/* <div>Total seconds passed: {totalSeconds}</div> */}
        <div className='message'>
            {displayMessage && <div>Break!</div>}
        </div>
        {/* <p>Time passed: {renders.current}</p> */}
        <button onClick={startStopBtnHandler}>{playState ? "⏸" : "⏵"}</button>
        <button onClick={()=>{console.log('Reload')}}>↻</button>
    </div>
  );
}
