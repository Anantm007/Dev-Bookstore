import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search'

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
                console.log(error);
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
        //eslint-disable-next-line
    }, [])

    return (
        <Layout title="Dev Bookstore" description="Buy some awesome dev related books now" className="container-fluid">
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            {showLoading()}
            <div className="row">                
                {productsbyArrival.map((product, i) =>(
                    <div key={i} className="col-4 mb-3">    
                       <Card product={product} />      
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            {showLoading()}
            <div className="row">                
                {productsbySell.map((product, i) =>(
                    <div key={i} className="col-4 mb-3">    
                       <Card product={product} />      
                    </div>
                ))}
            </div>

        </Layout>
           
    )
};

export default Home
