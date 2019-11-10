import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };
    
        const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if(data.err)
            {
                setValues({...values, error: data.err, loading: false})
            }
            else
            {
                authenticate(data, () => {
                    setValues({...values, redirectToReferrer:true, loading: false});
                })
            }
        })

    }

    const signUpForm = () => (
        <form>
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

    const showLoading = () => 
        
            loading && (<div className="alert alert-info">
                <h2>Loading...</h2>
            </div>);

    const redirectUser = () => {
            if(redirectToReferrer)
            {
                if(user.role===1)
                return <Redirect to="/admin/dashboard" />

                else
                return <Redirect to="/user/dashboard" />
            }

            if(isAuthenticated())
            {
                return <Redirect to="/" />
            }
        };


    return (
        <Layout title="Signin" description="Login to your account to view and purchase awesome content" className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
            {redirectUser()}
            {signUpForm()}
        </Layout>
           
    )
};

export default Signin
