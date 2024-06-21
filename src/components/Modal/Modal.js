import Button from '../Button/Button';
import './Modal.scss';



const Modal = (props) => {
    const {openedState, openPomodoroSettings} = props;

    if(openedState){
        return(
            <div className='modal-wrapper' onClick={()=>openPomodoroSettings()}>
                <div className='modal' onClick={()=>{}}>
                    <div className='modal-header'>
                        <span>Pomodoro settings</span>
                        <Button action="closeModal" variant="deleteProject" onClick={()=>openPomodoroSettings()}/>
                    </div>
                    <div className='modal-body'>
                        Adjust time intervals for pomodoro:
                        <div className='param'>
                            <span className='param-name'>Work time:</span>
                            <input type='number' min={0}></input>
                            <span>:</span>
                            <input type='number' min={0} max={59}></input>
                        </div>
                        <div className='param'>
                            <span className='param-name'>Pause time:</span>
                            <input type='number' min={0}></input>
                            <span>:</span>
                            <input type='number' min={0} max={59}></input>
                        </div>
                        <div className='param'>
                            <span className='param-name'>Rest time:</span>
                            <input type='number' min={0}></input>
                            <span>:</span>
                            <input type='number' min={0} max={59}></input>
                        </div>
                    </div>            
                </div>
            </div>
        )
    }
};
export default Modal;