import React, {Fragment, useState, useEffect} from 'react';
import Layout from './Layout';
import {read, listRelated} from './apiCore';
import Card from './Card';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.err)
            {
                setError(data.err);
                console.log(error);
                setLoading(false);
            }

            else
            {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.err)
                    {
                        setError(data.err);
                    }

                    else
                    {
                        setRelatedProducts(data);
                    }
                });

                setLoading(false);
            }
        })
    }
    
    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2 className = "text-center">Loading...</h2>
        </div>)
    )

    useEffect(() => {
        const productId = props.match.params.productId;

        loadSingleProduct(productId);
        showLoading();
        // eslint-disable-next-line
    }, [props])

    return (
        <Fragment>
            
            {loading ? (
                showLoading()
            ): (<Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
                      
            <div className="row">
                <div className="col-8">
                { product && product.description && <Card product={product} showViewProductButton ={false} /> }                
                </div>

                <div className="col-4">
                    <h4>Related Products</h4>
                    {relatedProducts.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />    
                        </div>
                    ) )}
                </div>
            </div>

        </Layout>)}

        </Fragment>
    )
}

export default Product
