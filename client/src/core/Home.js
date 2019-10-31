import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const Home = () => {

    const [productsbySell, setProductsBySell] = useState([])
    const [productsbyArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.err)
            setError(data.err)

            else
            setProductsBySell(data)
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.err)
            setError(data.err)

            else
            setProductsByArrival(data)
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
    }, [])

    return (
        <Layout title="Home Page" description="Buy some awesome books now" className="container-fluid">
            
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">                
                {productsbyArrival.map((product, i) =>(<Card key={i} product={product} />))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">                
                {productsbySell.map((product, i) =>(<Card key={i} product={product} />))}
            </div>

        </Layout>
           
    )
};

export default Home
