import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {createCategory} from './ApiAdmin';

const AddCateogary = () => {

    const[name, setName] = useState('')
    const[error, setError] = useState(false)
    const[success, setSuccess] = useState(false)

    // Destructure user and token from localstorage
    const {user, token} = isAuthenticated()

    const handleChange = e => {
        setError(false)
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError(false)
        setSuccess(false)

        // make request to backend to create category
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error)
                {
                    setError(true)
                }
                else
                {
                    setError(false);
                    setSuccess(true);
                }
            })
    }

    const newCategoryForm = () => (
        <form>
            <div className="form-group text-center">
                <label className="text-muted">Name</label>
                <input onChange={handleChange} type="name" className="form-control" value={name} required/>
            </div>
               
            <div style={{textAlign : "center"}} >
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </div>

        </form>
    );

    const showSuccess = () => {
        if(success)
        {
            return <h3 className="text-success">{name} is created</h3>
        }
    }
    
    const showError = () => {
        if(error)
        {
            return <h3 className="text-danger">{name} is not unique</h3>
        }
    }

    return (
        <Layout title="Add a new Category" description={`Ready to add a new category?`}>
            <div className="row">
                <div className="xs-col-12 col-sm-8">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )


}

export default AddCateogary
