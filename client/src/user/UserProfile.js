import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {read, update, updateUser} from './apiUser';

const UserProfile = ({match}) => {
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        loading: true,
        success: false
    });

    const {name, email, password, error, success, loading} = values;
    const {token} = isAuthenticated()

    const init = (userId) => {
        read(userId, token).then(data => {
            if(data.error)
            {
                setValues({...values, error: true, loading: false})
            }
            else
            {
                setValues({...values, name: data.name, email: data.email, loading: false})
            }
        })
    }

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }   

    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password}).then(data => {
            if(data.error)
            {
                console.log(data.error)
            }

            else
            {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} onChange={handleChange('email')} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} onChange={handleChange('password')} className="form-control"/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const redirectuser = success => {
        if(success)
        {
            return <Redirect to="/dashboard" />
        }
    }

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )

    useEffect(() => {
        init(match.params.userId);
        showLoading()
        //eslint-disable-next-line
    }, [])
    
    return (
        <Layout title="My Profile" description="Update your profile" className="container-fluid">
            <h2>Profile Update</h2>
            {showLoading()}
            {profileUpdate(name ,email, password)}
            {redirectuser(success)}
        </Layout>
           
    )
}

export default UserProfile;
