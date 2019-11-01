import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const Home = () => {

    const [productsbySell, setProductsBySell] = useState([])
    const [productsbyArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.err)
            {
                setError(data.err);
                setLoading(false);
            }

            else
            {
                setProductsBySell(data);
                setLoading(false);
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.err)
            {
                setError(data.err);
                setLoading(false);
            }

            else
            {
                setProductsByArrival(data);
                setLoading(false);
            }
        })
    }

    
    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
        showLoading()
    }, [])

    return (
        <Layout title="Home Page" description="Buy some awesome books now" className="container-fluid">
            
            <h2 className="mb-4">New Arrivals</h2>
            {showLoading()}
            <div className="row">                
                {productsbyArrival.map((product, i) =>(<Card key={i} product={product} />))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            {showLoading()}
            <div className="row">                
                {productsbySell.map((product, i) =>(<Card key={i} product={product} />))}
            </div>

        </Layout>
           
    )
};

export default Home
