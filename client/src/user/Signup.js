import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };
    
        const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            if(data.error)
            {
                setValues({...values, error: data.error, success: false})
            }
            else
            {
                setValues({...values, name: "", email: "", password: "", error: "", success: true});
            }
        })

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>

            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>

            </div>
             
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            
            <div style={{textAlign : "center"}} >
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </div>

        </form>
    );

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showSuccess = () => {
        return (
        <div className="alert alert-info" style={{display: success ? '': 'none'}}>
            New account is created. Please <Link to='/signin'>Signin</Link>
        </div>
        )
    }


    return (
        <Layout title="Signup" description="Sign up to the Node React E-commerce app" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
           
    )
};

export default Signup;
