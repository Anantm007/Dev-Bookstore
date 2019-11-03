import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHelpers';
import Card from './Card';

const Cart = () => {

    const [items, setItems] = useState([]);

    const noItemsMessage = () => {
        return (
            <div>
                <h2>Your cart is empty</h2>
                <br />
                <Link to ="/shop">Start Shopping now!</Link>
            </div>
        )
    }

    
    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((p, i) => (
                <Card key={i} product={p} showAddToCartButton={false} />
                ))}
            </div>
        )
    }

    useEffect(() => {
        setItems(getCart())
        //eslint-disable-next-line
    }, [])

    return (
        <Layout title="My Cart" description="Manage your cart items. Add, Remove, Checkout or continue shopping"
         className="container-fluid">
             
        <div className="row">
            <div className="col-6">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>

            
            <div className="col-6">
                <p>Show checkout options / shipping address / total / update quantity</p>
            </div>
        </div>
        </Layout>
           
    )
}

export default Cart
