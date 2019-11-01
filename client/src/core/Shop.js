import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';

const Shop = () => {

    const[myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    // load categories
    const init = () => {
        getCategories().then(data => {
            if(data.err)
            {
                setError(data.err)
            }
            else
            {
                setCategories(data);
            }
        })
    }
    
    useEffect(() => {
        init();
        
        // eslint-disable-next-line
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        setMyFilters(newFilters);
    }
    

    return (
        <Layout title="Shop Page" description="Search and find developer books of your choice" className="container-fluid">
            
        <div className="row">
            
            <div className="col-4">
                <h4>Filter by categories</h4>
                <ul>
                    <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                </ul>
            </div>

            <div className="col-8">
                {JSON.stringify(myFilters)}
            </div>

        </div>

        </Layout>
           
    )
}

export default Shop;
