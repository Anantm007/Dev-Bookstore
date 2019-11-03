import React from 'react'
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({product, showViewProductButton = true}) => {
    
    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                            View Product
                        </button>
            )
        )
    }

    const showAddToCartButton = () => {
        return (
            <button className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        )
    }

    const showStock = (quantity) => {
        return quantity > 0 ? 
            <span className="badge badge-primary badge-pill">In Stock</span> 
            : <span className="badge badge-danger badge-pill">Out of Stock</span>
    }
    
    return (
            <div className="card">
                <div className="card-header name text-center">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    
                    <p className = "mt-2">{product.description}</p>
                    <p className = "font-weight-bold">₹ {product.price}</p>
                    <p className = "black-10">Category: {product.category && product.category.name}</p>
                    <p className = "black-8">Added {moment(product.createdAt).fromNow()}</p>

                    {showStock(product.quantity)}
                    <br />
                    <Link to={`/product/${product._id}`} >
                        {showViewButton(showViewProductButton)}
                    </Link>

                    <Link to='/'>
                        {showAddToCartButton()}
                    </Link>
                </div>
            </div>
            
    )
}

export default Card
