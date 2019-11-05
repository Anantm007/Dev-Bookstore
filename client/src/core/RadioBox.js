import React, {useState} from 'react'

const RadioBox = ({prices, handleFilters}) => {
    
    const [value, setValue] = useState(0)
    
    const handleChange = (e) => {
        handleFilters(e.target.value);
        setValue(e.target.value);
        console.log(value);
    }


    return prices.map((p, i) => (
        <div key={i}>
            <input onChange={handleChange} value={`${p._id}`} type="radio" name={p} className="mr-2 ml-4" />
            <label className="form-check-label">{p.name}</label>
        </div>
    ))
}

export default RadioBox;
