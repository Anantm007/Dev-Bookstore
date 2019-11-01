import React, {useState} from 'react'

const Checkbox = ({categories, handleFilters}) => {
    
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c); // return the first index or -1

        const newCheckedCategoryId = [...checked]
        // if currently checked was not alredy in checked state then we want to push
        // else pull/take off
        if(currentCategoryId === -1)    //  Not already in the state
        {
            newCheckedCategoryId.push(c);
        }
        else // Already in state, we need to remove it
        {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }
    
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default Checkbox;
