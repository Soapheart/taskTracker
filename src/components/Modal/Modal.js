import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './Modal.scss';



const Modal = (props) => {
    const {openedState, openPomodoroSettings, changePomodoroSettings, pomodoroSettings} = props;

    const modalWrapperRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        
    }, [pomodoroSettings])
    
    const closeWindow = (e) => {
        if(e.target === modalWrapperRef.current){
            openPomodoroSettings();
        }
    }

    const handleTimeChange = (e) => {
        const parentName = e.target.parentNode.getAttribute('name');
        const name = e.target.getAttribute('name');
        pomodoroSettings[parentName][name] = Number(e.target.value);
        changePomodoroSettings(pomodoroSettings);
    }

    if(openedState){
        return(
            <div ref={modalWrapperRef} className='modal-wrapper' onClick={(e)=>closeWindow(e)}>
                <div ref={modalRef} className='modal'>
                    <div className='modal-header'>
                        <span>Pomodoro settings</span>
                        <Button action="closeModal" variant="deleteProject" onClick={()=>openPomodoroSettings()}/>
                    </div>
                    <div className='modal-body'>
                        Adjust time intervals for pomodoro:
                        <div className='param' name='work'>
                            <span className='param-name'>Work time:</span>
                            <input name='minutes' type='number' min={0} onBlur={(e)=>handleTimeChange(e)} 
                                defaultValue={pomodoroSettings.work.minutes}
                            />
                            <span>:</span>
                            <input name='seconds' type='number' min={0} max={59} onBlur={(e)=>handleTimeChange(e)}
                            defaultValue={pomodoroSettings.work.seconds}
                            />
                        </div>
                        <div className='param' name='pause'>
                            <span className='param-name'>Pause time:</span>
                            <input name='minutes' type='number' min={0} onBlur={(e)=>handleTimeChange(e)}
                            defaultValue={pomodoroSettings.pause.minutes}
                            />
                            <span>:</span>
                            <input name='seconds' type='number' min={0} max={59} onBlur={(e)=>handleTimeChange(e)}
                            defaultValue={pomodoroSettings.pause.seconds}
                            />
                        </div>
                        <div className='param' name='rest'>
                            <span className='param-name'>Rest time:</span>
                            <input name='minutes' type='number' min={0} onBlur={(e)=>handleTimeChange(e)}
                            defaultValue={pomodoroSettings.rest.minutes}
                            />
                            <span>:</span>
                            <input name='seconds' type='number' min={0} max={59} onBlur={(e)=>handleTimeChange(e)}
                            defaultValue={pomodoroSettings.rest.seconds}
                            />
                        </div>
                    </div>            
                </div>
            </div>
        )
    }
};
export default Modal;