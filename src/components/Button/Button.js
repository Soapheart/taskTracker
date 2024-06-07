import { useEffect, useState } from "react";
import './Button.css'

const Button = (props) =>{

    const {variant='primary', action, onClick, text } = props;
    const [classes, setClasses] = useState('');

    useEffect(() => {
        setClasses(variant);
      }, [variant]);    

    return(
        <button action={action} className={`btn btn-${classes}`} onClick={onClick}>{text}</button>
    )
}
export default Button;