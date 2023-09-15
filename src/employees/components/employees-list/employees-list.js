import EmployeerListItem from "../employees-list-item/employeers-list-item";
import "./employees-list.css";

const EmployeesList = ({data, onDelete, onToggleProp}) => { //onToggleIncrease, onToggleRise, 

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return(
            <EmployeerListItem
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp = {(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                // onToggleIncrease = {() => onToggleIncrease(id)}
                // onToggleRise = {() => onToggleRise(id)}
                />
        )
    })

    return(
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;