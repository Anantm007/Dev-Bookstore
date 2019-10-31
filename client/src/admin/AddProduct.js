import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {createProduct, getCategories} from './ApiAdmin';

const AddProduct = () => {

    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: 0,
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        formData: ''
    });

    const {name, description, price, categories, category, shipping, quantity,
        loading, error, createdProduct, formData} = values;

    // load categories and form set data
    const init = () => {
        getCategories().then(data => {
            if(data.err)
            {
                setValues({...values, error: data.err})
            }
            else
            {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }
    
    useEffect(() => {
        init();
        
        // eslint-disable-next-line
    }, [])
    

    const handleChange = name => e => {
        const value = name ==='photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value}) 
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.err)
            {
                setValues({...values, error: data.err});
            }

            else
            {
                setValues({
                    ...values, name: '', description: '', photo: '', price: '', quantity: 0, loading: '', 
                    category: '', shipping: '',createdProduct: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>

            <h4>Post photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select onChange={handleChange('category')} className="form-control" value={category}>
                    <option>Select</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                    </select>
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control" value={shipping}>
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct? '': 'none'}}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )


    return (
        <Layout title="Add a new Product" description={`Ready to add a new Product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )


}

export default AddProduct;
